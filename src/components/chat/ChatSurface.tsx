'use client';

import {
  useEffect,
  useRef,
  useImperativeHandle,
  useState,
  KeyboardEvent,
} from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import type { UIMessage } from 'ai';
import { PaperPlaneIcon, StopIcon } from '@/components/chat/icons';

// ── Starter chips (D-22, D-23, D-24, D-25) ─────────────────────────────────

const STARTER_CHIPS = [
  "What's Chand's background?",
  'What technologies does he work with?',
  'Tell me about his work at C24 Bank',
] as const;

// ── TypingIndicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-start gap-2" role="status" aria-label="AI is typing">
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 dark:from-blue-400 dark:to-violet-500 flex items-center justify-center text-white text-xs font-bold">
        AI
      </div>
      <div className="bg-muted rounded-2xl rounded-tl-sm px-3 py-2.5">
        <span className="flex gap-1 items-center h-4">
          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
        </span>
      </div>
    </div>
  );
}

// ── MessageBubble ────────────────────────────────────────────────────────────

function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === 'user';
  const text = message.parts
    .filter((p) => p.type === 'text')
    .map((p) => p.text)
    .join('');

  if (!text) return null;

  return (
    <div className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 dark:from-blue-400 dark:to-violet-500 flex items-center justify-center text-white text-xs font-bold">
          AI
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-gradient-to-r from-blue-500 to-violet-600 dark:from-blue-400 dark:to-violet-500 text-white rounded-tr-sm'
            : 'bg-muted text-foreground rounded-tl-sm'
        }`}
      >
        {text}
      </div>
    </div>
  );
}

// ── ChatSurface ──────────────────────────────────────────────────────────────

export type ChatSurfaceHandle = { reset: () => void };

export type ChatSurfaceProps = {
  scrollAreaClassName?: string;
  inputAreaClassName?: string;
  autoFocus?: boolean;
  surfaceRef?: React.RefObject<ChatSurfaceHandle | null>;
};

export function ChatSurface({
  scrollAreaClassName,
  inputAreaClassName,
  autoFocus = false,
  surfaceRef,
}: ChatSurfaceProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 1000;
  const CHAR_WARN_THRESHOLD = 900;

  const { messages, sendMessage, status, error, stop, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  // D-31: expose reset() via ref so parent can trigger new chat
  useImperativeHandle(surfaceRef, () => ({
    reset() {
      setMessages([]);
      setInputValue('');
      setCharCount(0);
    },
  }));

  // D-30: auto-focus textarea when autoFocus is true
  useEffect(() => {
    if (autoFocus) {
      textareaRef.current?.focus();
    }
  }, [autoFocus]);

  // Auto-scroll to bottom on new messages / streaming
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const hasMessages = messages.length > 0;
  const showTyping =
    isLoading && (!hasMessages || messages[messages.length - 1]?.role === 'user');

  const submitMessage = () => {
    if (!inputValue.trim() || isLoading || charCount > MAX_CHARS) return;
    const text = inputValue.trim();
    setInputValue('');
    setCharCount(0);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    sendMessage({ text });
  };

  // D-24: clicking a chip submits it immediately
  const handleChipClick = (chip: string) => {
    if (isLoading) return;
    sendMessage({ text: chip });
  };

  // D-27: Enter submits, Shift+Enter newlines, IME-safe
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submitMessage();
    }
  };

  // D-26: auto-resize textarea up to ~150px (6 lines)
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = `${Math.min(target.scrollHeight, 150)}px`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= MAX_CHARS) {
      setInputValue(val);
      setCharCount(val.length);
    }
  };

  const canSubmit = inputValue.trim().length > 0 && !isLoading && charCount <= MAX_CHARS;

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Scroll area */}
      <div
        className={`flex flex-col gap-3 p-4 overflow-y-auto flex-1 min-h-0 ${scrollAreaClassName ?? ''}`}
        role="log"
        aria-live="polite"
        aria-label="Chat conversation"
      >
        {/* D-22: empty state with intro + chips (D-23, D-24, D-25) */}
        {!hasMessages && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-8">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 dark:from-blue-400 dark:to-violet-500 flex items-center justify-center text-white font-bold text-sm">
              AI
            </div>
            <p className="text-sm text-muted-foreground max-w-[220px]">
              Hi! I&apos;m Chand&apos;s AI assistant. Ask me about his experience, skills, or
              projects.
            </p>
            <div className="flex flex-col gap-2 w-full max-w-[280px]">
              {STARTER_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleChipClick(chip)}
                  className="text-sm text-left px-3 py-2 rounded-lg border border-border bg-muted hover:bg-border transition-colors duration-150 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {showTyping && <TypingIndicator />}

        {error && (
          <p role="alert" className="text-xs text-red-500 text-center">
            Something went wrong. Please try again.
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div
        className={`flex flex-col gap-1 border-t border-border bg-background/80 backdrop-blur-sm shrink-0 ${inputAreaClassName ?? ''}`}
      >
        <div className="flex items-end gap-2 px-3 pt-3 pb-2">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            placeholder="Ask about Chand…"
            rows={1}
            disabled={isLoading}
            aria-label="Message input"
            className="flex-1 resize-none rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-60 min-h-[38px] max-h-[150px] overflow-y-auto leading-5"
            style={{ height: 'auto' }}
          />
          {/* D-20: Stop button while streaming, Send button otherwise */}
          {isLoading ? (
            <button
              type="button"
              onClick={() => stop()}
              aria-label="Stop generating"
              className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-muted text-muted-foreground hover:bg-border hover:text-foreground transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <StopIcon className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={!canSubmit}
              onClick={submitMessage}
              aria-label="Send message"
              className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-r from-blue-500 to-violet-600 dark:from-blue-400 dark:to-violet-500 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <PaperPlaneIcon className="w-4 h-4" />
            </button>
          )}
        </div>
        {/* D-29: character counter near limit */}
        {charCount >= CHAR_WARN_THRESHOLD && (
          <p className="text-xs text-muted-foreground text-right px-3 pb-2">
            {charCount} / {MAX_CHARS}
          </p>
        )}
      </div>
    </div>
  );
}

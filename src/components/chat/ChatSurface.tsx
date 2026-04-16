'use client';

import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import type { UIMessage } from 'ai';
import { PaperPlaneIcon, StopIcon } from './icons';

// ── Transport (hoisted to module scope to avoid re-creation on every render) ─

const chatTransport = new DefaultChatTransport({ api: '/api/chat' });

// ── Types ────────────────────────────────────────────────────────────────────

export type ChatSurfaceHandle = { reset: () => void };

export type ChatSurfaceProps = {
  scrollAreaClassName?: string;
  inputAreaClassName?: string;
  autoFocus?: boolean;
  surfaceRef?: React.RefObject<ChatSurfaceHandle | null>;
};

// ── Starter chips ─────────────────────────────────────────────────────────────

const STARTER_CHIPS = [
  "What's Chand's background?",
  'What technologies does he work with?',
  'Tell me about his work at C24 Bank',
];

// ── Message bubble ─────────────────────────────────────────────────────────────

const MessageBubble = React.memo(function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === 'user';
  const text = message.parts
    .filter((p) => p.type === 'text')
    .map((p) => (p as { type: 'text'; text: string }).text)
    .join('');

  if (!text) return null;

  return (
    <div className={`flex items-end ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2 text-base leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-gradient-to-r from-blue-500 to-violet-600 dark:from-blue-400 dark:to-violet-500 text-white rounded-br-sm'
            : 'bg-muted text-foreground border border-border rounded-bl-sm'
        }`}
      >
        {text}
      </div>
    </div>
  );
});

// ── Typing indicator ──────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-end justify-start" role="status" aria-label="Chand's AI is typing">
      <div className="bg-muted border border-border rounded-2xl rounded-bl-sm px-4 py-3">
        <span className="flex gap-1 items-center">
          <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:200ms]" />
          <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:400ms]" />
        </span>
      </div>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState({
  onChipClick,
}: {
  onChipClick: (text: string) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12 px-4">
      <p className="text-base text-foreground font-medium">
        Hi! I&apos;m Chand&apos;s AI assistant.
      </p>
      <p className="text-sm text-muted-foreground max-w-xs">
        Ask me about his experience, skills, or projects.
      </p>
      <div className="flex flex-wrap gap-2 justify-center mt-2">
        {STARTER_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => onChipClick(chip)}
            className="inline-flex items-center px-3 py-2 rounded-full text-sm border border-border bg-muted text-foreground cursor-pointer hover:border-blue-500/50 dark:hover:border-blue-400/50 hover:bg-muted transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Main ChatSurface ───────────────────────────────────────────────────────────

export function ChatSurface({
  scrollAreaClassName = '',
  inputAreaClassName = '',
  autoFocus = false,
  surfaceRef,
}: ChatSurfaceProps) {
  const { messages, sendMessage, status, error, stop, setMessages } = useChat({
    transport: chatTransport,
  });

  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const shouldAutoScroll = useRef(true);

  const isStreaming = status === 'streaming' || status === 'submitted';

  // Expose reset() via surfaceRef
  useImperativeHandle(surfaceRef, () => ({
    reset: () => {
      setMessages([]);
      setInputValue('');
    },
  }));

  // Auto-focus on desktop
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  // Auto-scroll on new messages / streaming
  useEffect(() => {
    if (shouldAutoScroll.current && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isStreaming]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
    shouldAutoScroll.current = scrollTop + clientHeight >= scrollHeight - 50;
  };

  const handleInputChange = (val: string) => {
    setInputValue(val.slice(0, 1000));
  };

  const submitMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isStreaming) return;
      shouldAutoScroll.current = true;
      setInputValue('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
      try {
        await sendMessage({ text });
      } catch {
        // useChat surfaces network errors via its `error` state —
        // this catch prevents unhandled promise rejections for
        // failures that fire before streaming begins.
      }
    },
    [isStreaming, sendMessage],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submitMessage(inputValue);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitMessage(inputValue);
  };

  const handleChipClick = (text: string) => {
    submitMessage(text);
  };

  const showTyping =
    isStreaming && (messages.length === 0 || messages[messages.length - 1]?.role === 'user');
  const showEmpty = messages.length === 0 && !isStreaming;
  const charCount = inputValue.length;

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Scroll area */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        role="log"
        aria-live="polite"
        aria-label="Conversation"
        className={`flex-1 overflow-y-auto min-h-0 ${scrollAreaClassName}`}
      >
        <div className="flex flex-col gap-6 py-4">
          {showEmpty && <EmptyState onChipClick={handleChipClick} />}
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {showTyping && <TypingIndicator />}
          {error && (
            <div role="alert" className="flex justify-start">
              <div className="max-w-[75%] rounded-2xl rounded-bl-sm px-4 py-3 bg-red-50 dark:bg-[#2d1515] border border-red-300 dark:border-red-900 text-red-700 dark:text-red-300 text-sm">
                Something went wrong. Try again or reload the page.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input area */}
      <div className={inputAreaClassName}>
        <form onSubmit={handleFormSubmit} className="flex items-end gap-2">
          <div className="flex-1 flex flex-col">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about Chand…"
              rows={1}
              aria-label="Message input"
              aria-multiline="true"
              className="flex-1 resize-none rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-base px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 min-h-[48px] max-h-[150px] overflow-y-auto leading-6"
              style={{ height: 'auto' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${Math.min(target.scrollHeight, 150)}px`;
              }}
            />
            {charCount >= 900 && (
              <span className="text-xs text-muted-foreground text-right mt-1">
                {charCount} / 1000
              </span>
            )}
          </div>

          {isStreaming ? (
            <button
              type="button"
              onClick={() => stop()}
              aria-label="Stop generating"
              className="shrink-0 h-10 w-10 rounded-lg flex items-center justify-center bg-muted border border-border text-foreground hover:bg-border transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <StopIcon className="w-4 h-4" />
              <span className="sr-only">Stop</span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={!inputValue.trim()}
              aria-label="Send message"
              aria-disabled={!inputValue.trim()}
              className="shrink-0 h-10 w-10 rounded-lg flex items-center justify-center bg-gradient-to-r from-blue-500 to-violet-600 dark:from-blue-400 dark:to-violet-500 text-white hover:opacity-90 transition-opacity duration-150 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <PaperPlaneIcon className="w-4 h-4" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

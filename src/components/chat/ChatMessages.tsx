'use client';

import { useEffect, useRef } from 'react';
import type { UIMessage } from 'ai';

interface ChatMessagesProps {
  messages: UIMessage[];
  isLoading: boolean;
  error?: Error;
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-2">
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

export function ChatMessages({ messages, isLoading, error }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages or streaming updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const hasMessages = messages.length > 0;
  // Show typing indicator when loading and last message is from user
  const showTyping =
    isLoading &&
    (!hasMessages || messages[messages.length - 1]?.role === 'user');

  return (
    <div className="flex flex-col gap-3 p-4 overflow-y-auto flex-1 min-h-0">
      {!hasMessages && !isLoading && (
        <div className="flex flex-col items-center justify-center h-full gap-2 text-center py-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 dark:from-blue-400 dark:to-violet-500 flex items-center justify-center text-white font-bold text-sm">
            AI
          </div>
          <p className="text-sm text-muted-foreground max-w-[200px]">
            Ask me anything about Chand's background and experience.
          </p>
        </div>
      )}
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {showTyping && <TypingIndicator />}
      {error && (
        <p className="text-xs text-red-500 text-center">
          Something went wrong. Please try again.
        </p>
      )}
      <div ref={bottomRef} />
    </div>
  );
}

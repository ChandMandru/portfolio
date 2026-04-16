'use client';

import { FormEvent, KeyboardEvent, useRef } from 'react';

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
}

export function ChatInput({
  input,
  isLoading,
  onInputChange,
  onSubmit,
  placeholder = 'Ask me anything about Chand…',
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!input.trim() || isLoading) return;
      // Trigger form submit
      const form = textareaRef.current?.closest('form');
      if (form) form.requestSubmit();
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex items-end gap-2 p-3 border-t border-border bg-background/80 backdrop-blur-sm">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={1}
        disabled={isLoading}
        className="flex-1 resize-none rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-60 min-h-[38px] max-h-32 overflow-y-auto leading-5"
        style={{ height: 'auto' }}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = 'auto';
          target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
        }}
      />
      <button
        type="submit"
        disabled={!input.trim() || isLoading}
        aria-label="Send message"
        className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-r from-blue-500 to-violet-600 dark:from-blue-400 dark:to-violet-500 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        {isLoading ? (
          <span className="flex gap-0.5 items-center">
            <span className="w-1 h-1 rounded-full bg-white/80 animate-bounce [animation-delay:0ms]" />
            <span className="w-1 h-1 rounded-full bg-white/80 animate-bounce [animation-delay:150ms]" />
            <span className="w-1 h-1 rounded-full bg-white/80 animate-bounce [animation-delay:300ms]" />
          </span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22 11 13 2 9l20-7z" />
          </svg>
        )}
      </button>
    </form>
  );
}

'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChatSurface } from '@/components/chat/ChatSurface';
import { RotateCcwIcon } from '@/components/chat/icons';

export default function ChatPage() {
  const surfaceRef = useRef<{ reset: () => void } | null>(null);
  const [autoFocus, setAutoFocus] = useState(false);

  // D-30: desktop-only autofocus; window is not available during SSR
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 640) {
      setAutoFocus(true);
    }
  }, []);

  const handleNewChat = () => {
    surfaceRef.current?.reset();
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* D-05: ambient glow orbs - dark mode only, identical to homepage */}
      <div
        className="pointer-events-none fixed -top-20 -left-20 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[80px] hidden dark:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-violet-600/15 blur-[80px] hidden dark:block"
        aria-hidden="true"
      />

      {/* D-03: sticky header with back-link and New chat button */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-3xl xl:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-baseline gap-2 hover:opacity-80 transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded"
            aria-label="Back to homepage"
          >
            <span className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-violet-600 dark:from-blue-400 dark:to-violet-500 bg-clip-text text-transparent">
              Chand Mandru
            </span>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Software Developer
            </span>
          </Link>
          {/* D-31: New chat reset button */}
          <button
            type="button"
            onClick={handleNewChat}
            aria-label="Start a new conversation"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            <RotateCcwIcon className="w-4 h-4" />
            <span>New chat</span>
          </button>
        </div>
      </header>

      {/* D-04: same container as homepage; D-19: chat fills remaining viewport */}
      <main className="relative flex-1 flex flex-col max-w-3xl xl:max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 min-h-0">
        <ChatSurface
          surfaceRef={surfaceRef}
          autoFocus={autoFocus}
          scrollAreaClassName=""
          inputAreaClassName="sticky bottom-0 bg-background/80 backdrop-blur-sm py-3"
        />
      </main>
    </div>
  );
}

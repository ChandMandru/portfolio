'use client';

import { useEffect, useRef, useState } from 'react';
import { ChatSurface } from '@/components/chat/ChatSurface';
import { ChatIcon, CloseIcon, RotateCcwIcon } from '@/components/chat/icons';

export function ChatFloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const fabRef = useRef<HTMLButtonElement>(null);
  const surfaceRef = useRef<{ reset: () => void } | null>(null);
  const prevOpen = useRef(false);

  // D-11: Escape key dismisses the widget
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // D-30: desktop detection for autofocus and single-mount branching
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Accessibility: restore focus to FAB on close
  useEffect(() => {
    if (prevOpen.current && !isOpen) {
      fabRef.current?.focus();
    }
    prevOpen.current = isOpen;
  }, [isOpen]);

  const handleClose = () => setIsOpen(false);
  const handleNewChat = () => surfaceRef.current?.reset();

  // Header used by both popover and sheet (D-10)
  const header = (
    <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
      <div className="flex flex-col">
        <span className="text-xl font-semibold text-foreground">Ask about Chand</span>
        <span className="text-sm text-muted-foreground">AI assistant</span>
      </div>
      <div className="flex items-center gap-1">
        {/* D-31: New chat button */}
        <button
          type="button"
          onClick={handleNewChat}
          aria-label="Start a new conversation"
          className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 cursor-pointer"
        >
          <RotateCcwIcon className="w-4 h-4" />
        </button>
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close chat"
          className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 cursor-pointer"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* FAB — D-07: 56px circular gradient button, fixed bottom-right */}
      <button
        ref={fabRef}
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Close chat' : "Chat with Chand's AI assistant"}
        aria-expanded={isOpen}
        className="hidden sm:flex fixed bottom-12 right-12 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 dark:from-blue-400 dark:to-violet-500 text-white shadow-lg hover:opacity-90 transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 items-center justify-center cursor-pointer"
      >
        {isOpen ? <CloseIcon className="w-6 h-6" /> : <ChatIcon className="w-6 h-6" />}
      </button>

      {/* SINGLE-MOUNT: exactly one ChatSurface via JS ternary (D-08/D-09) */}
      {isOpen && (
        isDesktop ? (
          /* Desktop popover — D-08: 380x560px anchored bottom-right */
          <div
            role="dialog"
            aria-label="Chat with Chand's AI assistant"
            data-state="open"
            className="fixed bottom-[calc(3rem+56px+8px)] right-12 z-40 w-[380px] h-[560px] bg-background border border-border rounded-xl shadow-xl flex flex-col overflow-hidden origin-bottom-right transition-all duration-150 ease-out scale-100 opacity-100"
          >
            {header}
            <div className="flex-1 flex flex-col min-h-0 px-3">
              <ChatSurface
                surfaceRef={surfaceRef}
                autoFocus={true}
                inputAreaClassName="py-3"
              />
            </div>
          </div>
        ) : (
          /* Mobile sheet — D-09: full-screen */
          <div
            role="dialog"
            aria-label="Chat with Chand's AI assistant"
            data-state="open"
            className="fixed inset-0 z-40 bg-background flex flex-col transition-transform duration-300 ease-out translate-y-0"
          >
            {header}
            <div className="flex-1 flex flex-col min-h-0 px-3">
              <ChatSurface
                surfaceRef={surfaceRef}
                autoFocus={false}
                inputAreaClassName="py-3"
              />
            </div>
          </div>
        )
      )}
    </>
  );
}

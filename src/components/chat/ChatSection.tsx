'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChatSurface } from './ChatSurface';

export function ChatSection() {
  const ref = useScrollAnimation();

  return (
    <section id="chat" className="py-12 md:py-16">
      <div ref={ref}>
        <div className="mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-violet-600 dark:from-blue-400 dark:to-violet-500 bg-clip-text text-transparent">
            Ask my AI
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Powered by AI — ask about my experience, skills, or background.
          </p>
        </div>
        <div
          className="rounded-2xl border border-border overflow-hidden flex flex-col bg-background/60 backdrop-blur-sm shadow-sm"
          style={{ height: '420px' }}
        >
          <ChatSurface
            scrollAreaClassName=""
            inputAreaClassName="border-t border-border px-3 py-3"
          />
        </div>
      </div>
    </section>
  );
}

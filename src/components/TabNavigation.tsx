'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { SkillsSection } from '@/components/SkillsSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { SocialLinksSection } from '@/components/SocialLinksSection';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const TABS = ['Skills', 'Projects', 'Connect'] as const;
type Tab = (typeof TABS)[number];
const TAB_INDEX: Record<Tab, number> = { Skills: 0, Projects: 1, Connect: 2 };

function TabContent({ tab }: { tab: Tab }) {
  switch (tab) {
    case 'Skills':
      return <SkillsSection />;
    case 'Projects':
      return <ExperienceSection />;
    case 'Connect':
      return <SocialLinksSection />;
  }
}

export function TabNavigation() {
  const [activeTab, setActiveTab] = useState<Tab>('Projects');
  const [displayedTab, setDisplayedTab] = useState<Tab>('Projects');
  const [animating, setAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');
  const ref = useScrollAnimation();
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const updateIndicator = useCallback(() => {
    const idx = TAB_INDEX[activeTab];
    const btn = tabRefs.current[idx];
    const indicator = indicatorRef.current;
    if (!btn || !indicator) return;
    const parent = btn.parentElement;
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    indicator.style.left = `${btnRect.left - parentRect.left}px`;
    indicator.style.width = `${btnRect.width}px`;
  }, [activeTab]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  const handleTabChange = (tab: Tab) => {
    if (tab === activeTab || animating) return;

    const direction = TAB_INDEX[tab] > TAB_INDEX[activeTab] ? 'left' : 'right';
    setSlideDirection(direction);
    setAnimating(true);

    // Phase 1: fade out + slide out current content
    setTimeout(() => {
      setDisplayedTab(tab);
      setActiveTab(tab);
      // Phase 2: fade in + slide in new content (triggered by state change)
      setTimeout(() => {
        setAnimating(false);
      }, 50);
    }, 200);
  };

  const contentClass = animating
    ? `opacity-0 ${slideDirection === 'left' ? '-translate-x-4' : 'translate-x-4'}`
    : 'opacity-100 translate-x-0';

  return (
    <section className="py-12 md:py-16">
      <div ref={ref}>
        <div className="relative flex border-b border-border mb-10">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              ref={(el) => { tabRefs.current[i] = el; }}
              onClick={() => handleTabChange(tab)}
              className={`flex-1 py-3 text-base font-semibold tracking-wide transition-colors duration-200 relative -mb-px ${
                activeTab === tab
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-all duration-300 ease-out"
          />
        </div>
        <div
          ref={contentRef}
          className={`transition-all duration-200 ease-out ${contentClass}`}
        >
          <TabContent tab={displayedTab} />
        </div>
      </div>
    </section>
  );
}

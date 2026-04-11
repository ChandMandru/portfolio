'use client';

import { skills } from '@/data/skills';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function SkillsSection() {
  const ref = useScrollAnimation();
  return (
    <section className="py-12 md:py-16">
      <div ref={ref}>
        <h2 className="text-xl font-semibold text-foreground mb-8">Skills</h2>
        <div className="flex flex-col gap-8">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                {group.category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="bg-blue-500/5 dark:bg-blue-400/10 border border-blue-500/10 dark:border-blue-400/15 rounded-full px-2 py-1 text-sm text-foreground"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

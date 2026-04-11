'use client';

import { experience } from '@/data/experience';
import type { ExperienceEntry } from '@/data/types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function formatDate(dateStr: string): string {
  if (dateStr === 'Present') return 'Present';
  const [year, month] = dateStr.split('-');
  const monthIndex = parseInt(month, 10) - 1;
  return `${MONTHS[monthIndex]} ${year}`;
}

function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  return (
    <div className="flex rounded-lg overflow-hidden hover:-translate-y-0.5 hover:shadow-md shadow-sm transition-all duration-200 ease-out">
      <div className="w-1 bg-gradient-to-b from-blue-500 to-violet-600 dark:from-blue-400 dark:to-violet-500 shrink-0" />
      <div className="bg-muted p-6 flex-1">
        <h3 className="text-xl font-semibold text-foreground">{entry.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {entry.company} &middot; {formatDate(entry.startDate)} &ndash; {formatDate(entry.endDate)}
        </p>
        <ul className="mt-4 space-y-2 list-disc list-inside">
          {entry.accomplishments.map((item, i) => (
            <li key={i} className="text-base text-foreground">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  const ref = useScrollAnimation();
  return (
    <section id="experience" className="py-12 md:py-16">
      <div ref={ref}>
        <h2 className="text-xl font-semibold text-foreground mb-8">Work Experience</h2>
        <div className="flex flex-col gap-8">
          {experience.map((entry, i) => (
            <ExperienceCard key={i} entry={entry} />
          ))}
        </div>
        <div className="mt-8 text-sm text-muted-foreground">
          <p>B.Sc. Media Information Technology &middot; RheinMain University &middot; 2025</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Bachelor&apos;s Thesis: Self Sovereign Identity im gr&uuml;nen Bereich
            <span className="ml-2 bg-muted rounded px-2 py-0.5 text-sm font-semibold text-foreground">
              1.2
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

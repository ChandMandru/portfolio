import Image from 'next/image';
import { experience } from '@/data/experience';
import type { ExperienceEntry } from '@/data/types';


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
      <div className="bg-muted flex-1 flex flex-col sm:flex-row">
        {entry.imageUrl && (
          <div className="relative w-full aspect-[16/9] sm:order-2 sm:w-48 md:w-56 sm:aspect-auto sm:self-stretch shrink-0 bg-background/40">
            <Image
              src={entry.imageUrl}
              alt={entry.imageAlt ?? entry.company}
              fill
              sizes="(min-width: 768px) 224px, (min-width: 640px) 192px, 100vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="p-6 flex-1 min-w-0">
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
          {entry.technologies && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {entry.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-blue-500/5 dark:bg-blue-400/10 border border-blue-500/10 dark:border-blue-400/15 rounded-full px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
          {entry.documentUrl && (
            <a
              href={entry.documentUrl}
              download
              className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-blue-500 dark:text-blue-400 hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M12 3v13" />
                <path d="M7 11l5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
              {entry.documentLabel ?? 'Download'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  return (
    <div className="flex flex-col gap-8">
      {experience.map((entry, i) => (
        <ExperienceCard key={i} entry={entry} />
      ))}
    </div>
  );
}

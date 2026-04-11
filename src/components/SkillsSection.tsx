import { skills } from '@/data/skills';

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const ICON_MAP: Record<string, { url: string; invertDark?: boolean }> = {
  Java: { url: `${DEVICON_BASE}/java/java-original.svg` },
  Kotlin: { url: `${DEVICON_BASE}/kotlin/kotlin-original.svg` },
  JavaScript: { url: `${DEVICON_BASE}/javascript/javascript-original.svg` },
  TypeScript: { url: `${DEVICON_BASE}/typescript/typescript-original.svg` },
  'Spring Web': { url: `${DEVICON_BASE}/spring/spring-original.svg` },
  Hibernate: { url: `${DEVICON_BASE}/hibernate/hibernate-original.svg` },
  React: { url: `${DEVICON_BASE}/react/react-original.svg` },
  'Vue.js': { url: `${DEVICON_BASE}/vuejs/vuejs-original.svg` },
  'Node.js': { url: `${DEVICON_BASE}/nodejs/nodejs-original.svg` },
  'Next.js': { url: `${DEVICON_BASE}/nextjs/nextjs-plain.svg`, invertDark: true },
  Git: { url: `${DEVICON_BASE}/git/git-original.svg` },
  JIRA: { url: `${DEVICON_BASE}/jira/jira-original.svg` },
  Gradle: { url: `${DEVICON_BASE}/gradle/gradle-original.svg`, invertDark: true },
  Maven: { url: `${DEVICON_BASE}/maven/maven-original.svg` },
  Sentry: { url: `${DEVICON_BASE}/sentry/sentry-original.svg`, invertDark: true },
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Languages: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  'Frameworks & Libraries': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  'Tools & DevOps': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
};

function FallbackIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-muted-foreground">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function SkillsSection() {
  return (
    <div className="flex flex-col gap-10">
      {skills.map((group) => (
        <div key={group.category}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-500 dark:text-blue-400">
              {CATEGORY_ICONS[group.category]}
            </span>
            <h3 className="text-lg font-semibold text-foreground">
              {group.category}
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {group.skills.map((skill) => {
              const icon = ICON_MAP[skill.name];
              return (
                <div
                  key={skill.name}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-md bg-background shrink-0">
                    {icon ? (
                      <img
                        src={icon.url}
                        alt={skill.name}
                        width={24}
                        height={24}
                        loading="lazy"
                        className={icon.invertDark ? 'dark:brightness-0 dark:invert' : ''}
                      />
                    ) : (
                      <FallbackIcon />
                    )}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

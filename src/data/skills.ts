import type { SkillCategory } from './types';

export const skills: SkillCategory[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'Java' },
      { name: 'Kotlin' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    skills: [
      { name: 'Spring Web' },
      { name: 'Hibernate' },
      { name: 'React' },
      { name: 'Vue.js' },
      { name: 'Node.js' },
      { name: 'Next.js' },
    ],
  },
  {
    category: 'Tools & DevOps',
    skills: [
      { name: 'Git' },
      { name: 'JIRA' },
      { name: 'Scrum' },
      { name: 'Gradle' },
      { name: 'Maven' },
      { name: 'Sentry' },
    ],
  },
];

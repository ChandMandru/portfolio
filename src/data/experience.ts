import type { ExperienceEntry } from './types';

export const experience: ExperienceEntry[] = [
  {
    title: 'Senior Software Engineer',
    company: 'Acme Corp',
    startDate: '2022-01',
    endDate: 'Present',
    accomplishments: [
      'Led migration of monolithic API to microservices, reducing deploy time by 60%',
      'Mentored 3 junior developers through structured onboarding program',
      'Designed and implemented real-time notification system serving 50k+ users',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'StartupCo',
    startDate: '2020-03',
    endDate: '2021-12',
    accomplishments: [
      'Built customer-facing dashboard with React and TypeScript',
      'Reduced API response times by 40% through query optimization',
    ],
  },
];

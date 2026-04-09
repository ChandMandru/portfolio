import type { SkillCategory } from './types';

export const skills: SkillCategory[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'TypeScript', proficiency: 'advanced' },
      { name: 'Python', proficiency: 'advanced' },
      { name: 'JavaScript', proficiency: 'expert' },
      { name: 'SQL', proficiency: 'intermediate' },
    ],
  },
  {
    category: 'Frameworks',
    skills: [
      { name: 'React', proficiency: 'advanced' },
      { name: 'Next.js', proficiency: 'advanced' },
      { name: 'Node.js', proficiency: 'advanced' },
      { name: 'Tailwind CSS', proficiency: 'intermediate' },
    ],
  },
  {
    category: 'Tools & Platforms',
    skills: [
      { name: 'Git', proficiency: 'advanced' },
      { name: 'Docker', proficiency: 'intermediate' },
      { name: 'VS Code', proficiency: 'expert' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', proficiency: 'intermediate' },
      { name: 'Vercel', proficiency: 'advanced' },
      { name: 'GitHub Actions', proficiency: 'intermediate' },
    ],
  },
];

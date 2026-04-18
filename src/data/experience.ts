import type { ExperienceEntry } from './types';

export const experience: ExperienceEntry[] = [
  {
    title: "Bachelor's Thesis — Self Sovereign Identity im grünen Bereich",
    company: 'RheinMain University, Wiesbaden',
    startDate: '2024-06',
    endDate: '2025-05',
    accomplishments: [
      'Researched and implemented Self-Sovereign Identity (SSI) concepts for sustainable applications',
      'Graded 1.2 (sehr gut), supervised by Prof. Dr. Philipp Schaible',
    ],
    technologies: ['Java', 'Spring Boot', 'Hyperledger Aries', 'DIDComm', 'Verifiable Credentials'],
    documentUrl: '/Bachelor-Thesis-Chand-Mandru.pdf',
    documentLabel: 'Download Thesis',
    imageUrl: '/experience/hsrm.jpg',
    imageAlt: 'RheinMain University of Applied Sciences',
  },
  {
    title: 'Working Student Android Developer',
    company: 'C24 Bank, Mainz',
    startDate: '2022-12',
    endDate: '2023-12',
    accomplishments: [
      'Feature development for the C24 Bank Android application',
      'QA testing and bug fixing across multiple release cycles',
      'Built Debug Log Screen for on-device debugging with Sentry integration, enabling faster issue resolution for the development team',
    ],
    technologies: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'Sentry', 'Gradle'],
    documentUrl: '/Chand-Mandru-Arbeitszeugnis.pdf',
    documentLabel: 'Work Reference',
    imageUrl: '/experience/c24-bank.png',
    imageAlt: 'C24 Bank',
  },
  {
    title: 'Lotcheck Coordination Assistant',
    company: 'Nintendo of Europe, Frankfurt',
    startDate: '2021-09',
    endDate: '2022-03',
    accomplishments: [
      'Coordinated SW/HW preparation for Nintendo Switch software testing',
      'Organized and managed testing staff schedules and assignments',
    ],
    imageUrl: '/experience/nintendo.jpg',
    imageAlt: 'Nintendo of Europe',
  },
  {
    title: 'Game Tester Lotcheck',
    company: 'Nintendo of Europe, Frankfurt',
    startDate: '2021-06',
    endDate: '2021-09',
    accomplishments: [
      'QA testing of Nintendo Switch software releases prior to market launch',
    ],
    imageUrl: '/experience/nintendo.jpg',
    imageAlt: 'Nintendo of Europe',
  },
];

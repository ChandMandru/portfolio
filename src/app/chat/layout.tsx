import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chat',
  description:
    "Chat with Chand Mandru's AI assistant — ask about his experience at C24 Bank, skills, projects, and background.",
  alternates: {
    canonical: '/chat',
  },
  openGraph: {
    type: 'website',
    url: 'https://chandmandru.dev/chat',
    title: 'Chat — Chand Mandru',
    description:
      "Chat with Chand Mandru's AI assistant — ask about his experience at C24 Bank, skills, projects, and background.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chat — Chand Mandru',
    description:
      "Chat with Chand Mandru's AI assistant — ask about his experience at C24 Bank, skills, projects, and background.",
  },
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

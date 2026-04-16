import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chat — Chand Mandru',
  description: "Chat with Chand Mandru's AI assistant.",
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

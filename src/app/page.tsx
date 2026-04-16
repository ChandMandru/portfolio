import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/HeroSection';
import { TabNavigation } from '@/components/TabNavigation';
import { ChatSection } from '@/components/chat/ChatSection';

// FloatingChatWidget uses browser APIs — skip SSR to avoid hydration mismatch
const FloatingChatWidget = dynamic(
  () =>
    import('@/components/chat/FloatingChatWidget').then(
      (m) => m.FloatingChatWidget
    ),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="relative">
      {/* Ambient glow orbs - dark mode only (D-04) */}
      <div
        className="pointer-events-none fixed -top-20 -left-20 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[80px] hidden dark:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-violet-600/15 blur-[80px] hidden dark:block"
        aria-hidden="true"
      />

      <main className="relative max-w-3xl xl:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <TabNavigation />
        <ChatSection />
      </main>

      {/* Floating chat widget — always visible, dynamically loaded to avoid SSR issues */}
      <FloatingChatWidget />
    </div>
  );
}

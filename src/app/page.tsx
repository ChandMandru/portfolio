import { HeroSection } from '@/components/HeroSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { SkillsSection } from '@/components/SkillsSection';
import { SocialLinksSection } from '@/components/SocialLinksSection';

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
        <ExperienceSection />
        <SkillsSection />
        <SocialLinksSection />
      </main>
    </div>
  );
}

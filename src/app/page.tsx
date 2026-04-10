import { HeroSection } from '@/components/HeroSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { SkillsSection } from '@/components/SkillsSection';
import { SocialLinksSection } from '@/components/SocialLinksSection';

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <HeroSection />
      <ExperienceSection />
      <SkillsSection />
      <SocialLinksSection />
    </main>
  );
}

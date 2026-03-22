import LandingWrapper from '@/components/landing/layout/LandingWrapper';
import ResourcesHero from '@/components/landing/sections/ResourcesHero';
import HelpCenter from '@/components/landing/sections/HelpCenter';
import Tutorials from '@/components/landing/sections/Tutorials';
import Community from '@/components/landing/sections/Community';

export default function ResourcesPage() {
  return (
    <LandingWrapper>
      <ResourcesHero />
      <HelpCenter />
      <Tutorials />
      <Community />
    </LandingWrapper>
  );
}
import LandingWrapper from '@/components/landing/layout/LandingWrapper';
import AboutHero from '@/components/landing/sections/AboutHero';
import Mission from '@/components/landing/sections/Mission';
import Team from '@/components/landing/sections/Team';
import Stats from '@/components/landing/sections/Stats';

export default function AboutUsPage() {
  return (
    <LandingWrapper>
      <AboutHero />
      <Mission />
      <Team />
      <Stats />
    </LandingWrapper>
  );
}
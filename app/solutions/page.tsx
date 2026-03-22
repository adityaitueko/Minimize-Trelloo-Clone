import LandingWrapper from '@/components/landing/layout/LandingWrapper';
import SolutionsHero from '@/components/landing/sections/SolutionsHero';
import UseCases from '@/components/landing/sections/UseCases';
import Testimonials from '@/components/landing/sections/Testimonials';

export default function SolutionsPage() {
  return (
    <LandingWrapper>
      <SolutionsHero />
      <UseCases />
      <Testimonials />
    </LandingWrapper>
  );
}
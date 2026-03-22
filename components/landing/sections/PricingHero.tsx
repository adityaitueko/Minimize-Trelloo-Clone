import React from 'react';
import FadeIn from '@/components/animations/FadeIn';

const PricingHero = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Simple, Transparent <span className="text-blue-600">Pricing</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose the plan that&apos;s right for your team. All plans include a 14-day free trial.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

export default PricingHero;

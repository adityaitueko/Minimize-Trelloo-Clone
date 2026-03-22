import React from 'react';
import FadeIn from '@/components/animations/FadeIn';

const SolutionsHero = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Solutions for Every <span className="text-blue-600">Team</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Whether you&apos;re a startup or an enterprise, Twillo adapts to your team&apos;s 
            unique workflow and helps you achieve more together.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

export default SolutionsHero;

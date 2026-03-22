import React from 'react';
import FadeIn from '@/components/animations/FadeIn';

const AboutHero = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-blue-600">Twillo</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We&apos;re on a mission to help teams work together more effectively, 
            no matter where they are in the world.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutHero;

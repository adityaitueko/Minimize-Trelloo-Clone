import React from 'react';
import FadeIn from '@/components/animations/FadeIn';

const ResourcesHero = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Resources & <span className="text-blue-600">Learning</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to get the most out of Twillo. Tutorials, guides, 
            and community resources to help you succeed.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

export default ResourcesHero;

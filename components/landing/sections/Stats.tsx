import React from 'react';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';

const Stats = () => {
  return (
    <section className="py-20 px-4 bg-blue-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
          <FadeIn delay={0}>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10M+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">150+</div>
              <div className="text-blue-100">Countries</div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Uptime</div>
            </div>
          </FadeIn>
        </div>
        
        <FadeIn delay={0.3}>
          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to join our community?
            </h3>
            <Link href="/register">
              <span className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Get Started Free
              </span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Stats;

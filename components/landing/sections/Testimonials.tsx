import React from 'react';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Twillo has transformed how our team collaborates. We&apos;ve seen a 40% increase in productivity since adopting it.",
      author: "Jennifer Lee",
      role: "Product Manager",
      company: "TechCorp"
    },
    {
      quote: "The best project management tool we&apos;ve ever used. Simple, powerful, and intuitive.",
      author: "Mark Thompson",
      role: "Engineering Lead",
      company: "StartupXYZ"
    },
    {
      quote: "Twillo&apos;s automation features have saved us countless hours on repetitive tasks.",
      author: "Sarah Martinez",
      role: "Operations Director",
      company: "GlobalInc"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Loved by Teams Worldwide
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              See what teams are saying about their experience with Twillo.
            </p>
          </FadeIn>
        </div>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={index}>
              <div className="bg-gray-800 p-8 rounded-lg shadow-md">
                <p className="text-gray-300 italic mb-6">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-blue-400">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-400">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        <FadeIn delay={0.3}>
          <div className="text-center mt-12">
            <Link href="/register">
              <span className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Start Your Free Trial
              </span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Testimonials;

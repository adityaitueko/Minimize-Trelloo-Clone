import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';

const Team = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-founder",
      description: "Passionate about building tools that bring teams together."
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-founder",
      description: "Loves creating intuitive user experiences and scalable systems."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      description: "Focused on solving real problems for real teams."
    },
    {
      name: "David Kim",
      role: "Head of Engineering",
      description: "Dedicated to building reliable and performant software."
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet Our Team
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We&apos;re a diverse group of people united by our passion for creating 
              the best project management experience.
            </p>
          </FadeIn>
        </div>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <StaggerItem key={index}>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
                <div className="w-24 h-24 bg-blue-900 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-400">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-400 mb-2">
                  {member.role}
                </p>
                <p className="text-gray-300 text-sm">
                  {member.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Team;

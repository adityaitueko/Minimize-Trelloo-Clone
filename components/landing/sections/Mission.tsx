import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';

const Mission = () => {
  const values = [
    {
      title: "Collaboration",
      description: "We believe the best work happens when teams can seamlessly work together."
    },
    {
      title: "Simplicity",
      description: "We design intuitive tools that anyone can use without extensive training."
    },
    {
      title: "Transparency",
      description: "We foster open communication and visibility across all projects."
    },
    {
      title: "Innovation",
      description: "We continuously improve our platform to meet evolving team needs."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Mission
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              To empower teams everywhere with tools that make collaboration effortless 
              and project management intuitive.
            </p>
          </FadeIn>
        </div>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <StaggerItem key={index}>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-300">
                  {value.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Mission;

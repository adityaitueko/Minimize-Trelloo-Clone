import React from 'react';
import Link from 'next/link';
import { FaVideo, FaBookOpen, FaGraduationCap, FaPencilAlt } from 'react-icons/fa';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';

const Tutorials = () => {
  const tutorials = [
    {
      Icon: FaVideo,
      title: "Video Tutorials",
      description: "Watch step-by-step video guides to master Twillo features.",
      link: "/resources",
      count: "25+ videos"
    },
    {
      Icon: FaBookOpen,
      title: "Written Guides",
      description: "Detailed written tutorials with screenshots and examples.",
      link: "/resources",
      count: "50+ guides"
    },
    {
      Icon: FaGraduationCap,
      title: "Webinars",
      description: "Join live sessions with Twillo experts and ask questions.",
      link: "/resources",
      count: "Weekly sessions"
    },
    {
      Icon: FaPencilAlt,
      title: "Blog",
      description: "Tips, best practices, and updates from the Twillo team.",
      link: "/resources",
      count: "100+ posts"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Learn & Grow
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-gray-300">
              Explore our tutorials, guides, and resources to become a Twillo expert.
            </p>
          </FadeIn>
        </div>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutorials.map((tutorial, index) => (
            <StaggerItem key={index}>
              <Link href={tutorial.link}>
                <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer text-center">
                  <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <tutorial.Icon className="text-3xl text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {tutorial.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">
                    {tutorial.description}
                  </p>
                  <span className="text-blue-400 text-sm font-medium">
                    {tutorial.count}
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Tutorials;

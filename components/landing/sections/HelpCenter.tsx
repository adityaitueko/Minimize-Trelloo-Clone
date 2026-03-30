import React from 'react';
import Link from 'next/link';
import { FaBook, FaBullseye, FaCog, FaLink, FaLock, FaBriefcase } from 'react-icons/fa';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';

const HelpCenter = () => {
  const categories = [
    {
      Icon: FaBook,
      title: "Getting Started",
      description: "Learn the basics of Twillo and get up and running quickly.",
      articles: 12
    },
    {
      Icon: FaBullseye,
      title: "Project Management",
      description: "Master project planning, task management, and team collaboration.",
      articles: 24
    },
    {
      Icon: FaCog,
      title: "Settings & Configuration",
      description: "Customize Twillo to fit your team&apos;s workflow and preferences.",
      articles: 18
    },
    {
      Icon: FaLink,
      title: "Integrations",
      description: "Connect Twillo with your favorite tools and services.",
      articles: 15
    },
    {
      Icon: FaLock,
      title: "Security & Privacy",
      description: "Learn about our security practices and privacy features.",
      articles: 8
    },
    {
      Icon: FaBriefcase,
      title: "Account & Billing",
      description: "Manage your account, subscription, and billing information.",
      articles: 10
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Help Center
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-gray-300">
              Find answers to common questions and learn how to use Twillo effectively.
            </p>
          </FadeIn>
        </div>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <StaggerItem key={index}>
              <Link href="/resources">
                <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                    <category.Icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">
                    {category.description}
                  </p>
                  <span className="text-blue-400 text-sm font-medium">
                    {category.articles} articles →
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

export default HelpCenter;

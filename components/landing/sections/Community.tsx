import React from 'react';
import Link from 'next/link';
import { FaComments, FaMobileAlt, FaNewspaper, FaHeadphones } from 'react-icons/fa';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';

const Community = () => {
  const resources = [
    {
      Icon: FaComments,
      title: "Community Forum",
      description: "Connect with other Twillo users, share tips, and get help.",
      link: "/resources",
      members: "50,000+ members"
    },
    {
      Icon: FaMobileAlt,
      title: "Social Media",
      description: "Follow us on social media for updates and tips.",
      link: "/resources",
      followers: "100,000+ followers"
    },
    {
      Icon: FaNewspaper,
      title: "Newsletter",
      description: "Subscribe to our newsletter for the latest news and tips.",
      link: "/resources",
      subscribers: "25,000+ subscribers"
    },
    {
      Icon: FaHeadphones,
      title: "Podcast",
      description: "Listen to interviews with productivity experts and Twillo users.",
      link: "/resources",
      episodes: "50+ episodes"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Our Community
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-gray-300">
              Connect with other Twillo users and stay up to date with the latest news.
            </p>
          </FadeIn>
        </div>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <StaggerItem key={index}>
              <Link href={resource.link}>
                <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer text-center">
                  <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <resource.Icon className="text-3xl text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">
                    {resource.description}
                  </p>
                  <span className="text-blue-400 text-sm font-medium">
                    {resource.members || resource.followers || resource.subscribers || resource.episodes}
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        <FadeIn delay={0.3}>
          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to get started?
            </h3>
            <Link href="/register">
              <span className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Create Free Account
              </span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Community;

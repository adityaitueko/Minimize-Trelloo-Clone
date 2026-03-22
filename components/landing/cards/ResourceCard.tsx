import React from 'react';
import Link from 'next/link';

interface ResourceCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
  category: string;
}

const ResourceCard = ({ title, description, icon, link, category }: ResourceCardProps) => {
  return (
    <Link href={link}>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">{icon}</span>
          </div>
          <div>
            <span className="text-sm text-blue-400 font-medium">
              {category}
            </span>
            <h3 className="text-lg font-semibold text-white mb-2">
              {title}
            </h3>
            <p className="text-gray-300 text-sm">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResourceCard;

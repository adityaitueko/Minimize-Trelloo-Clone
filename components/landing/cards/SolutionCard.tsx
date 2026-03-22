import React from 'react';

interface SolutionCardProps {
  title: string;
  description: string;
  features: string[];
  icon: string;
}

const SolutionCard = ({ title, description, features, icon }: SolutionCardProps) => {
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="w-16 h-16 bg-blue-900 rounded-lg flex items-center justify-center mb-6">
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-300 mb-4">
        {description}
      </p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-300">
            <span className="text-blue-600 mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SolutionCard;

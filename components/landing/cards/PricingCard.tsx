import React from 'react';
import Link from 'next/link';

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
}

const PricingCard = ({ name, price, description, features, popular, buttonText }: PricingCardProps) => {
  return (
    <div className={`bg-gray-800 p-8 rounded-lg shadow-md relative ${popular ? 'border-2 border-blue-600' : ''}`}>
      {popular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">
          {name}
        </h3>
        <div className="text-4xl font-bold text-white mb-2">
          {price}
          {price !== 'Free' && <span className="text-lg text-gray-400">/month</span>}
        </div>
        <p className="text-gray-300">
          {description}
        </p>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-300">
            <span className="text-blue-600 mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <Link href="/register">
        <span className={`block text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
          popular 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'bg-gray-700 text-white hover:bg-gray-600'
        }`}>
          {buttonText}
        </span>
      </Link>
    </div>
  );
};

export default PricingCard;

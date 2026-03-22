import React from 'react';
import FadeIn from '@/components/animations/FadeIn';

const FeatureComparison = () => {
  const features = [
    { name: "Unlimited boards", free: true, standard: true, premium: true },
    { name: "Unlimited cards", free: true, standard: true, premium: true },
    { name: "Unlimited lists", free: true, standard: true, premium: true },
    { name: "10MB file attachments", free: true, standard: true, premium: true },
    { name: "Unlimited file attachments", free: false, standard: true, premium: true },
    { name: "Custom backgrounds", free: false, standard: true, premium: true },
    { name: "Stickers", free: false, standard: true, premium: true },
    { name: "Advanced checklists", free: false, standard: true, premium: true },
    { name: "Board collections", free: false, standard: true, premium: true },
    { name: "Custom fields", free: false, standard: false, premium: true },
    { name: "Priority support", free: false, standard: false, premium: true },
    { name: "Admin & security features", free: false, standard: false, premium: true },
    { name: "Unlimited automations", free: false, standard: false, premium: true },
    { name: "Board & organization insights", free: false, standard: false, premium: true },
  ];

  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Compare Plans
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-gray-300">
              See what&apos;s included in each plan
            </p>
          </FadeIn>
        </div>
        
        <FadeIn delay={0.2}>
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-800 rounded-lg shadow-md">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-4 text-white font-semibold">Features</th>
                  <th className="text-center p-4 text-white font-semibold">Free</th>
                  <th className="text-center p-4 text-white font-semibold">Standard</th>
                  <th className="text-center p-4 text-white font-semibold">Premium</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className="border-b border-gray-700 last:border-b-0">
                    <td className="p-4 text-gray-300">{feature.name}</td>
                    <td className="text-center p-4">
                      {feature.free ? (
                        <span className="text-blue-600">✓</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {feature.standard ? (
                        <span className="text-blue-600">✓</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {feature.premium ? (
                        <span className="text-blue-600">✓</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default FeatureComparison;

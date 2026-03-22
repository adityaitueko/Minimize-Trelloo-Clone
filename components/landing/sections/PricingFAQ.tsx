import React from 'react';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';

const PricingFAQ = () => {
  const faqs = [
    {
      question: "Can I change my plan later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! All plans come with a 14-day free trial. No credit card required to start."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Yes, you can cancel your subscription at any time. You&apos;ll continue to have access until the end of your billing period."
    },
    {
      question: "Do you offer discounts for non-profits?",
      answer: "Yes, we offer a 50% discount for non-profit organizations. Contact our sales team for more information."
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </FadeIn>
        </div>
        
        <StaggerContainer className="space-y-6">
          {faqs.map((faq, index) => (
            <StaggerItem key={index}>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-300">
                  {faq.answer}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        <FadeIn delay={0.3}>
          <div className="text-center mt-12">
            <p className="text-gray-300 mb-4">
              Have more questions? We&apos;re here to help.
            </p>
            <Link href="/about-us">
              <span className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Contact Sales
              </span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default PricingFAQ;

import React from 'react';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';

interface LandingWrapperProps {
  children: React.ReactNode;
}

const LandingWrapper = ({ children }: LandingWrapperProps) => {
  return (
    <>
      <LandingHeader />
      <main className="bg-gray-950 min-h-screen">
        {children}
      </main>
      <LandingFooter />
    </>
  );
};

export default LandingWrapper;

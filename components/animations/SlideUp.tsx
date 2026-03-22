'use client';
import { motion } from 'framer-motion';
import React from 'react';

interface SlideUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

const SlideUp = ({ 
  children, 
  delay = 0, 
  duration = 0.6,
  distance = 50,
  className = '' 
}: SlideUpProps) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: distance 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0 
      }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SlideUp;

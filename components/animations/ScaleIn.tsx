'use client';
import { motion } from 'framer-motion';
import React from 'react';

interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  initialScale?: number;
  className?: string;
}

const ScaleIn = ({ 
  children, 
  delay = 0, 
  duration = 0.5,
  initialScale = 0.9,
  className = '' 
}: ScaleInProps) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        scale: initialScale 
      }}
      whileInView={{ 
        opacity: 1, 
        scale: 1 
      }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration, 
        delay,
        ease: 'easeOut' 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScaleIn;

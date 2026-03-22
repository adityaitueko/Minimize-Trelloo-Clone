'use client';
import { motion } from 'framer-motion';
import React from 'react';

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const StaggerContainer = ({ 
  children, 
  staggerDelay = 0.1,
  className = '' 
}: StaggerContainerProps) => {
  const variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string 
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5, ease: 'easeOut' }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default StaggerContainer;

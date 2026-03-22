'use client';
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

function LandingFooter() {
  const footerLinks = [
    {
      title: 'Product',
      links: [
        { href: '/pricing', label: 'Pricing' },
        { href: '/solutions', label: 'Features' },
        { href: '/solutions', label: 'Integrations' },
        { href: '/solutions', label: 'What&apos;s New' },
      ]
    },
    {
      title: 'Solutions',
      links: [
        { href: '/solutions', label: 'Project Management' },
        { href: '/solutions', label: 'Team Collaboration' },
        { href: '/solutions', label: 'Task Tracking' },
        { href: '/solutions', label: 'Workflow Automation' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { href: '/resources', label: 'Help Center' },
        { href: '/resources', label: 'Blog' },
        { href: '/resources', label: 'Tutorials' },
        { href: '/resources', label: 'Community' },
      ]
    },
    {
      title: 'Company',
      links: [
        { href: '/about-us', label: 'About Us' },
        { href: '/about-us', label: 'Careers' },
        { href: '/about-us', label: 'Contact' },
        { href: '/about-us', label: 'Press' },
      ]
    }
  ];

  const socialIcons = [
    { Icon: YoutubeIcon, href: '#' },
    { Icon: FacebookIcon, href: '#' },
    { Icon: TwitterIcon, href: '#' },
    { Icon: InstagramIcon, href: '#' },
    { Icon: LinkedinIcon, href: '#' },
  ];

  return (
    <motion.div 
      className='flex flex-col'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className='grid grid-cols-1 md:grid-cols-5 gap-10 px-10 py-10 md:px-20 md:py-20 bg-gray-900'>
        <motion.div 
          className='flex justify-center md:justify-start'
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className='text-white text-2xl font-bold'>Twillo</Link>
        </motion.div>
        {footerLinks.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ul className='flex flex-col gap-2 text-gray-300 text-center md:text-left'>
              <li className='font-semibold text-white'>{section.title}</li>
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className='hover:text-blue-500 transition-colors'>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <div className='flex flex-row bg-gray-900 justify-between md:px-20 py-4 border-t border-gray-800'>
        <span className='text-gray-400 text-sm'>
          © 2024 Twillo, Inc. All rights reserved.
        </span>
        <div className='flex flex-row gap-2'>
          {socialIcons.map(({ Icon, href }, index) => (
            <motion.a
              key={index}
              href={href}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.1 }}
            >
              <Icon size={20} className='text-gray-400 hover:text-blue-500 cursor-pointer transition-colors' />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default LandingFooter;

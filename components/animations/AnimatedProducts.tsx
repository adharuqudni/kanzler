'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SMOOTH_BOUNCY } from '@/lib/motion';

interface AnimatedProductsProps {
  variant?: 'hero' | 'section';
  className?: string;
}

export default function AnimatedProducts({ variant = 'section', className = '' }: AnimatedProductsProps) {
  const slideUpVariants = {
    hidden: {
      y: variant === 'hero' ? 400 : 100,
      x: variant === 'hero' ? -400 : -100,
      opacity: 0,
      scale: variant === 'hero' ? 2.5 : 1,
    },
    visible: {
      y: variant === 'hero' ? 100 : 0,
      x: variant === 'hero' ? -50 : 0,
      opacity: 1,
      scale: variant === 'hero' ? 2.5 : 1,
      rotate: variant === 'hero' ? 45 : -12,
      transition: {
        ...SMOOTH_BOUNCY,
        duration: 1.2,
      },
    },
  };

  const slideUpDelayedVariants = {
    hidden: {
      y: variant === 'hero' ? 400 : 100,
      x: variant === 'hero' ? 600 : 100,
      opacity: 0,
      scale: variant === 'hero' ? 2.5 : 1,
    },
    visible: {
      y: variant === 'hero' ? 100 : 0,
      x: variant === 'hero' ? 50 : 0,
      opacity: 1,
      scale: variant === 'hero' ? 2.5 : 1,
      rotate: variant === 'hero' ? -40 : 12,
      transition: {
        ...SMOOTH_BOUNCY,
        duration: 1.2,
        delay: 0.3,
      },
    },
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Left Side - Sausage */}
      <motion.div
        className={`absolute ${
          variant === 'hero' 
            ? 'left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2' 
            : 'left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 lg:-translate-x-24'
        }`}
        variants={slideUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="relative">
          <Image
            src="/assets/ASSET - SINGLES/1 ASSET - SINGLES/1 ASSET - SINGLES SOSIS GOCHU.png"
            alt="Kanzler Sosis Gochu"
            width={variant === 'hero' ? 200 : 350}
            height={variant === 'hero' ? 280 : 500}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </motion.div>

      {/* Right Side - Meatball */}
      <motion.div
        className={`absolute ${
          variant === 'hero'
            ? 'right-1/2 top-1/2 transform translate-x-1/2 -translate-y-1/2'
            : 'right-0 top-1/2 transform -translate-y-1/2 translate-x-16 lg:translate-x-24'
        }`}
        variants={slideUpDelayedVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="relative">
          <Image
            src="/assets/ASSET - SINGLES/1 ASSET - SINGLES/1 ASSET - SINGLES BAKSO HOT.png"
            alt="Kanzler Bakso Hot"
            width={variant === 'hero' ? 150 : 350}
            height={variant === 'hero' ? 150 : 350}
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </motion.div>
    </div>
  );
}

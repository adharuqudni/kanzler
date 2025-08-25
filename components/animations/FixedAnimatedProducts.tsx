'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { SMOOTH_BOUNCY } from '@/lib/motion';

export default function FixedAnimatedProducts({
  currentSection,
}: {
  currentSection: number;
}) {
  // Animation variants that change based on section
  const getAnimationVariants = (section: number) => {
    if (section === 0) {
      // First section - original animation
      return {
        slideUpVariants: {
          hidden: {
            y: 400,
            x: -400,
            opacity: 0,
            scale: 3.5,
          },
          visible: {
            y: 0,
            x: -50,
            opacity: 1,
            scale: 3.5,
            rotate: 25,
            transition: {
              ...SMOOTH_BOUNCY,
              duration: 1.2,
            },
          },
        },
        slideUpDelayedVariants: {
          hidden: {
            y: 400,
            x: 600,
            opacity: 0,
            scale: 3.5,
          },
          visible: {
            y: 0,
            x: 25,
            opacity: 1,
            scale: 3.5,
            rotate: -20,
            transition: {
              ...SMOOTH_BOUNCY,
              duration: 1.2,
              delay: 0.3,
            },
          },
        },
      };
    } else if (section === 1) {
      // Second section - different animation
      return {
        slideUpVariants: {
          hidden: {
            y: 0,
            x: -50,
            opacity: 1,
            scale: 3.5,
            rotate: 25,
          },
          visible: {
            y: 0,
            x: -50,
            opacity: 1,
            scale: 3.2,
            rotate: 35,
            transition: {
              ...SMOOTH_BOUNCY,
              duration: 1.2,
            },
          },
        },
        slideUpDelayedVariants: {
          hidden: {
            y: 0,
            x: 25,
            opacity: 1,
            scale: 3.5,
            rotate: -20,
          },
          visible: {
            y: 0,
            x: 25,
            opacity: 1,
            scale: 3.2,
            rotate: -30,
            transition: {
              ...SMOOTH_BOUNCY,
              duration: 1.2,
              delay: 0.3,
            },
          },
        },
      };
    } else if (section === 2) {
      return {
        slideUpVariants: {
          hidden: {
            y: 0,
            x: -50,
            opacity: 1,
            scale: 3.2,
            rotate: 35,
          },
          visible: {
            y: 300,
            x: -500,
            opacity: 0,
            scale: 0,
            display: 'none',
            rotate: 35,
            transition: {
              ...SMOOTH_BOUNCY,
              duration: 1.2,
            },
          },
        },
        slideUpDelayedVariants: {
          hidden: {
            y: 0,
            x: 25,
            opacity: 1,
            scale: 3.5,
            rotate: -20,
          },
          visible: {
            y: 0,
            x: 500,
            opacity: 0,
            scale: 0,
            display: 'none',
            rotate: -30,
            transition: {
              ...SMOOTH_BOUNCY,
              duration: 1.2,
              delay: 0.3,
            },
          },
        },
      };
    } else {
      return {
        slideUpVariants: {
          hidden: {
            y: 300,
            x: -500,
            opacity: 0,
            scale: 0,
            display: 'none',
            rotate: 35,
          },
          visible: {
            y: 300,
            x: -500,
            opacity: 0,
            scale: 0,
            display: 'none',
            rotate: 35,
            transition: {
              ...SMOOTH_BOUNCY,
              duration: 1.2,
            },
          },
        },
        slideUpDelayedVariants: {
          hidden: {
            y: 0,
            x: 500,
            opacity: 0,
            scale: 0,
            display: 'none',
            rotate: -30,
          },
          visible: {
            y: 0,
            x: 500,
            opacity: 0,
            scale: 0,
            display: 'none',
            rotate: -30,
            transition: {
              ...SMOOTH_BOUNCY,
              duration: 1.2,
              delay: 0.3,
            },
          },
        },
      };
    }
  };

  const variants = getAnimationVariants(currentSection);

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {/* Left Side - Sausage */}
      <motion.div
        key={`sausage-${currentSection}`}
        className="absolute left-16 lg:left-32 top-1/2 transform -translate-y-1/2"
        variants={variants.slideUpVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative">
          <Image
            src="/assets/ASSET - SINGLES/1 ASSET - SINGLES/1 ASSET - SINGLES SOSIS GOCHU.png"
            alt="Kanzler Sosis Gochu"
            width={200}
            height={280}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </motion.div>

      {/* Right Side - Meatball */}
      <motion.div
        key={`meatball-${currentSection}`}
        className="absolute right-16 lg:right-32 top-1/2 transform -translate-y-1/2"
        variants={variants.slideUpDelayedVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative">
          <Image
            src="/assets/ASSET - SINGLES/1 ASSET - SINGLES/1 ASSET - SINGLES BAKSO HOT.png"
            alt="Kanzler Bakso Hot"
            width={150}
            height={150}
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </motion.div>
    </div>
  );
}

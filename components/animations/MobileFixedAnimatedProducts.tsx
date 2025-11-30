'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SMOOTH_BOUNCY } from '@/lib/motion';

export default function MobileFixedAnimatedProducts({
  currentSection,
}: {
  currentSection: number;
}) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [lastSection, setLastSection] = useState(0);
  const [animationState, setAnimationState] = useState<'initial' | 'animated'>(
    'initial'
  );
  const [shouldReplay, setShouldReplay] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isAtTop = scrollY <= 50;

      if (isAtTop && hasAnimated && currentSection === 0) {
        setShouldReplay(true);
        setAnimationState('initial');
        setTimeout(() => {
          setShouldReplay(false);
          setAnimationState('animated');
        }, 1500);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAnimated, currentSection]);

  useEffect(() => {
    if (currentSection !== lastSection) {
      setLastSection(currentSection);
      if (currentSection === 0 && !hasAnimated) {
        setHasAnimated(true);
        setAnimationState('animated');
      }
    }
  }, [currentSection, lastSection, hasAnimated]);

  const getAnimationVariants = (section: number) => {
    // Mobile-optimized animation variants with smaller scale
    if (section === 0) {
      return {
        slideUpVariants: {
          hidden: {
            y: 400,
            x: -200,
            opacity: 0,
            scale: 1.5, // Smaller scale for mobile
          },
          visible: {
            y: 0,
            x: -20,
            opacity: 1,
            scale: 1.5, // Smaller scale for mobile
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
            x: 200,
            opacity: 0,
            scale: 1.5, // Smaller scale for mobile
          },
          visible: {
            y: 0,
            x: 20,
            opacity: 1,
            scale: 2, // Smaller scale for mobile
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
      return {
        slideUpVariants: {
          hidden: {
            y: 0,
            x: -20,
            opacity: 1,
            scale: 1.5,
            rotate: 25,
          },
          visible: {
            y: 550,
            x: 40,
            opacity: 1,
            scale: 1.5,
            rotate: 25,
            transition: {
              ...SMOOTH_BOUNCY,
              duration: 1.2,
            },
          },
        },
        slideUpDelayedVariants: {
          hidden: {
            y: 0,
            x: 20,
            opacity: 1,
            scale: 1.5,
            rotate: -20,
          },
          visible: {
            y: -500,
            x: 60,
            opacity: 1,
            scale: 1.5,
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
            x: -300,
            opacity: 0,
            scale: 0,
            display: 'none',
            rotate: 35,
          },
          visible: {
            y: 300,
            x: -300,
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
            x: 300,
            opacity: 0,
            scale: 0,
            display: 'none',
            rotate: -30,
          },
          visible: {
            y: 0,
            x: 300,
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

  const sausageAnimation = variants.slideUpVariants.visible;
  const meatballAnimation = variants.slideUpDelayedVariants.visible;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Left Side - Sausage */}
      <motion.div
        className="absolute -left-12  top-0 transform -translate-y-1/2"
        initial={
          currentSection === 0 && animationState === 'initial'
            ? variants.slideUpVariants.hidden
            : sausageAnimation
        }
        animate={sausageAnimation}
        transition={{ ...SMOOTH_BOUNCY, duration: 1.2 }}
      >
        <div className="relative">
          <Image
            src="/assets/ASSET - SINGLES/1 ASSET - SINGLES/1 ASSET - SINGLES SOSIS GOCHU.png"
            alt="Kanzler Sosis Gochu"
            width={200}
            height={250}
            className="object-contain drop-shadow-2xl mb-12   "
            priority
          />
        </div>
      </motion.div>

      {/* Right Side - Meatball */}
      <motion.div
        className="absolute right-12  -bottom-12 transform -translate-y-1/2"
        initial={
          currentSection === 0 && animationState === 'initial'
            ? variants.slideUpDelayedVariants.hidden
            : meatballAnimation
        }
        animate={meatballAnimation}
        transition={{
          ...SMOOTH_BOUNCY,
          duration: 1.2,
          delay: currentSection === 0 && animationState === 'initial' ? 0.3 : 0,
        }}
      >
        <div className="relative">
          <Image
            src="/assets/ASSET - SINGLES/1 ASSET - SINGLES/1 ASSET - SINGLES BAKSO HOT.png"
            alt="Kanzler Bakso Hot"
            width={150}
            height={150}
            className="object-contain drop-shadow-2xl  "
          />
        </div>
      </motion.div>
    </div>
  );
}

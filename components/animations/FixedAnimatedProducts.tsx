"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SMOOTH_BOUNCY } from "@/lib/motion";

export default function FixedAnimatedProducts({
  currentSection,
}: {
  currentSection: number;
}) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [lastSection, setLastSection] = useState(0);
  const [animationState, setAnimationState] = useState<'initial' | 'animated'>('initial');
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
    // Define your animation variants based on sections
    if (section === 0) {
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

  const sausageAnimation = variants.slideUpVariants.visible;
  const meatballAnimation = variants.slideUpDelayedVariants.visible;

  return (
    <div className="fixed inset-0 pointer-events-none z-50"> {/* Set z-index to 50 */}
      {/* Left Side - Sausage */}
      <motion.div
        className="absolute left-16 lg:left-28 top-1/2 transform -translate-y-1/2"
        initial={currentSection === 0 && animationState === 'initial' ? variants.slideUpVariants.hidden : sausageAnimation}
        animate={sausageAnimation}
        transition={{ ...SMOOTH_BOUNCY, duration: 1.2 }}
      >
        <div className="relative">
          <Image
            src="/assets/ASSET - SINGLES/1 ASSET - SINGLES/1 ASSET - SINGLES SOSIS GOCHU.png"
            alt="Kanzler Sosis Gochu"
            width={150}
            height={150}
            className="object-contain drop-shadow-2xl mb-20"
            priority
          />
        </div>
      </motion.div>

      {/* Right Side - Meatball */}
      <motion.div
        className="absolute right-16 lg:right-32 top-1/2 transform -translate-y-1/2"
        initial={currentSection === 0 && animationState === 'initial' ? variants.slideUpDelayedVariants.hidden : meatballAnimation}
        animate={meatballAnimation}
        transition={{ ...SMOOTH_BOUNCY, duration: 1.2, delay: currentSection === 0 && animationState === 'initial' ? 0.3 : 0 }}
      >
        <div className="relative">
          <Image
            src="/assets/ASSET - SINGLES/1 ASSET - SINGLES/1 ASSET - SINGLES BAKSO HOT.png"
            alt="Kanzler Bakso Hot"
            width={120}
            height={120}
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </motion.div>
    </div>
  );
}

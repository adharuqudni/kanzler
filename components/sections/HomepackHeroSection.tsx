'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import { BOUNCY_TRANSITION } from '@/lib/motion';

export default function HomepackHeroSection() {
  const [shouldExit, setShouldExit] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      // Start exit animation when scrolled past 50% of viewport height
      if (latest > window.innerHeight * 0.5) {
        setShouldExit(true);
      } else {
        setShouldExit(false);
      }
    });

    return () => unsubscribe();
  }, [scrollY]);

  const fadeInUpVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...BOUNCY_TRANSITION,
        duration: 0.8,
      },
    },
    exit: {
      opacity: 0,
      y: -100,
      transition: {
        ...BOUNCY_TRANSITION,

        duration: 0.6,
      },
    },
  };

  const logoFadeInVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        ...BOUNCY_TRANSITION,
        duration: 1,
        delay: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: {
        ...BOUNCY_TRANSITION,

        duration: 0.6,
      },
    },
  };

  return (
    <section className="relative min-h-screen overflow-visible pb-32 w-full">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME BACKGROUND.png"
          alt="Homepack Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0">
          <Image
            src="/assets/ASSET - SINGLES/1 ASSET - SINGLES/1 ASSET - SINGLES GRADIENT BLENDING SCREEN.png"
            alt="Gradient Overlay"
            fill
            className="object-cover mix-blend-screen opacity-80"
          />
        </div>
      </div>

      {/* Curved bottom transition */}
      <div className="absolute bottom-0 left-0 w-full h-[20vw] overflow-hidden scale-y-[-1] border-0">
        <div 
          className="absolute bottom-0 left-0 w-full h-full border-0"
          style={{
            background: '#fff',
            clipPath: 'ellipse(150% 100% at 50% 0%)',
            transform: 'translateY(-80%)'
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 py-24">
        {/* Top Section - Crown and Logo Split */}
        <div className="flex flex-col items-center mb-20">
          {/* Crown */}
          <motion.div
            className="mb-8"
            variants={logoFadeInVariants}
            initial="hidden"
            animate={shouldExit ? "exit" : "visible"}
          >
            <Image
              src="/assets/ASSET - HOME/1 ASSET - HOME/crown_white.svg"
              alt="Crown"
              width={150}
              height={150}
              className="object-contain filter brightness-110"
            />
          </motion.div>

          {/* Kanzler Title */}
          <motion.div
            className="mb-6"
            variants={fadeInUpVariants}
            initial="hidden"
            animate={shouldExit ? "exit" : "visible"}
            transition={{ delay: 0.3 }}
          >
            <Image
              src="/assets/ASSET - HOME/1 ASSET - HOME/Kanzler.svg"
              alt="Kanzler"
              width={700}
              height={150}
              className="object-contain filter brightness-110"
            />
          </motion.div>

          {/* Kanzler Quote */}
          <motion.div
            className="mb-6"
            variants={{
              hidden: {
                opacity: 0,
                y: 50,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  ...BOUNCY_TRANSITION,
                  duration: 1.5,
                  delay: 0.5,
                },
              },
              exit: {
                opacity: 0,
                y: -100,
                transition: {
                  duration: 0.6,
                },
              },
            }}
            initial="hidden"
            animate={shouldExit ? "exit" : "visible"}
            transition={{ delay: 1 }}
          >
            <Image
              src="/assets/ASSET - HOME/1 ASSET - HOME/Kanzler Quote.png"
              alt="Kanzler Quote"
              width={800}
              height={100}
              className="object-contain filter brightness-110"
            />
          </motion.div>
        </div>

        {/* Products Section */}
        <div className="relative w-full max-w-7xl mx-auto overflow-visible">
          {/* Central Nugget Package */}
          <motion.div
            className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            variants={{
              hidden: {
                opacity: 0,
                y: 100,
                scale: 0.8,
              },
              visible: {
                opacity: 1,
                y: -100,
                x: 150,
                scale: 1,
                transition: {
                  ...BOUNCY_TRANSITION,
                  duration: 1.2,
                  delay: 1.2,
                },
              },
              exit: {
                opacity: 0,
                y: 200,
                x: -200,
                scale: 0.5,
                transition: {
                  duration: 0.8,
                },
              },
            }}
            initial="hidden"
            animate={shouldExit ? "exit" : "visible"}
          >
            <Image
              src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK NUGGET PACKAGING.png"
              alt="Nugget Package"
              width={200}
              height={150}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>

          {/* Bottom right Mockup */}
          <motion.div
            className="absolute -bottom-16 -right-16 z-10"
            variants={{
              hidden: {
                opacity: 0,
                y: 800,
                x: 300,
                rotate: 0,
                scale: 0.7,
              },
              visible: {
                opacity: 1,
                y: 350,
                x: 120,
                rotate: -25,
                scale: 1,
                transition: {
                  ...BOUNCY_TRANSITION,
                  duration: 1.3,
                  delay: 0.8,
                },
              },
              exit: {
                opacity: 0,
                y: 800,
                x: 400,
                rotate: 45,
                scale: 0.3,
                transition: {
                  duration: 0.8,
                },
              },
            }}
            initial="hidden"
            animate={shouldExit ? "exit" : "visible"}
          >
            <Image
              src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK BEEF COCKTAIL MOCKUP.png"
              alt="Beef Cocktail Package"
              width={350}
              height={350}
              className="object-contain drop-shadow-xl"
            />
          </motion.div>

          {/* Bottom left Mockup */}
          <motion.div
            className="absolute -bottom-16 -left-16 z-10"
            variants={{
              hidden: {
                opacity: 0,
                y: 800,
                x: -300,
                rotate: 0,
                scale: 0.7,
              },
              visible: {
                opacity: 1,
                y: 400,
                x: -100,
                rotate: 15,
                scale: 1,
                transition: {
                  ...BOUNCY_TRANSITION,
                  duration: 1.3,
                  delay: 1.0,
                },
              },
              exit: {
                opacity: 0,
                y: 800,
                x: -400,
                rotate: -45,
                scale: 0.3,
                transition: {
                  duration: 0.8,
                },
              },
            }}
            initial="hidden"
            animate={shouldExit ? "exit" : "visible"}
          >
            <Image
              src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK CRISPY NUGGET MOCKUP.png"
              alt="Crispy Nugget Package"
              width={500}
              height={350}
              className="object-contain drop-shadow-xl"
            />
          </motion.div>

          {/* Top right Floating Nugget */}
          <motion.div
            className="absolute top-0 right-0 z-30"
            variants={{
              hidden: {
                opacity: 0,
                y: -1500,
                x: 500,
                rotate: 30,
                scale: 0.5,
              },
              visible: {
                opacity: 1,
                y: -500,
                x: 0,
                rotate: 45,
                scale: 1,
                transition: {
                  ...BOUNCY_TRANSITION,
                  duration: 1.4,
                  delay: 1.2,
                },
              },
              exit: {
                opacity: 0,
                y: -1000,
                x: 300,
                rotate: 90,
                scale: 0.2,
                transition: {
                  duration: 0.8,
                },
              },
            }}
            initial="hidden"
            animate={shouldExit ? "exit" : "visible"}
          >
            <Image
              src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK NUGGET KIRI ATAS.png"
              alt="Nugget Left"
              width={220}
              height={220}
              className="object-contain drop-shadow-lg scale-y-[-1]"
            />
          </motion.div>

          {/* Top left Floating Nugget */}
          <motion.div
            className="absolute top-0 left-0 z-30"
            variants={{
              hidden: {
                opacity: 0,
                y: -1500,
                x: -500,
                rotate: 0,
                scale: 0.5,
              },
              visible: {
                opacity: 1,
                y: -800,
                x: 0,
                rotate: -20,
                scale: 1,
                transition: {
                  ...BOUNCY_TRANSITION,
                  duration: 1.4,
                  delay: 1.4,
                },
              },
              exit: {
                opacity: 0,
                y: -1200,
                x: -300,
                rotate: -90,
                scale: 0.2,
                transition: {
                  duration: 0.8,
                },
              },
            }}
            initial="hidden"
            animate={shouldExit ? "exit" : "visible"}
          >
            <Image
              src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK NUGGET KANAN ATAS.png"
              alt="Nugget Right"
              width={300}
              height={300}
              className="object-contain drop-shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

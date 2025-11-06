'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import { BOUNCY_TRANSITION } from '@/lib/motion';

export default function MobileHomepackHeroSection({
  currentSection,
}: {
  currentSection: number;
}) {
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
    <section className="min-h-screen relative flex flex-col bg-[#1C2653]">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/assets/gradient-9x16.jpg"
          alt="Background Biru"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 py-12">
        {/* Top Section - Crown and Logo Split */}
        <div className="flex flex-col items-center mb-12">
          {/* Crown */}
          <motion.div
            className=""
            variants={logoFadeInVariants}
            initial="hidden"
            animate={shouldExit ? 'exit' : 'visible'}
          >
            <Image
              src="/assets/ASSET - HOME/1 ASSET - HOME/crown_white.svg"
              alt="Crown"
              width={80}
              height={80}
              className="object-contain filter brightness-110 w-16 h-16 sm:w-20 sm:h-20"
            />
          </motion.div>

          {/* Kanzler Title */}
          <motion.div
            className="mb-4"
            variants={fadeInUpVariants}
            initial="hidden"
            animate={shouldExit ? 'exit' : 'visible'}
            transition={{ delay: 0.3 }}
          >
            <Image
              src="/assets/KNZLR R.png"
              alt="Kanzler"
              width={400}
              height={100}
              className="object-contain filter brightness-110 w-96 "
            />
          </motion.div>

          {/* Kanzler Quote */}
          <motion.div
            className="mb-4"
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
            animate={shouldExit ? 'exit' : 'visible'}
            transition={{ delay: 1 }}
          >
            <Image
              src="/assets/ASSET - HOME/1 ASSET - HOME/Kanzler Quote.png"
              alt="Kanzler Quote"
              width={400}
              height={60}
              className="object-contain filter brightness-110 w-96 "
            />
          </motion.div>
        </div>

        {/* Products Section */}
        <div className="relative w-full max-w-7xl mx-auto overflow-visible">
          {/* Central Nugget Package */}
          <motion.div
            className="absolute left-24 top-12  transform -translate-x-1/2 -translate-y-1/2 z-10"
            variants={{
              hidden: {
                opacity: 0,
                y: 100,
                scale: 0.8,
              },
              visible: {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                rotate: 10,
                transition: {
                  ...BOUNCY_TRANSITION,
                  duration: 1.2,
                  delay: 1.2,
                },
              },
              exit: {
                opacity: 0,
                y: 200,
                x: 0,
                scale: 0.5,
                transition: {
                  duration: 0.8,
                },
              },
            }}
            initial="hidden"
            animate={shouldExit ? 'exit' : 'visible'}
          >
            <Image
              src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK NUGGET PACKAGING.png"
              alt="Nugget Package"
              width={120}
              height={90}
              className="object-contain drop-shadow-2xl w-24 sm:w-32"
              priority
            />
          </motion.div>


          {/* Bottom right Mockup */}
          <motion.div
            className="absolute -bottom-36 -right-8 z-10"
            variants={{
              hidden: {
                opacity: 0,
                y: 400,
                x: 150,
                rotate: 0,
                scale: 0.7,
              },
              visible: {
                opacity: 1,
                y: 100,
                x: 20,
                rotate: -30,
                scale: 1.5,
                transition: {
                  ...BOUNCY_TRANSITION,
                  duration: 1.3,
                  delay: 0.8,
                },
              },
              exit: {
                opacity: 0,
                y: 400,
                x: 200,
                rotate: 45,
                scale: 0.3,
                transition: {
                  duration: 0.8,
                },
              },
            }}
            initial="hidden"
            animate={shouldExit || currentSection === 1 ? 'exit' : 'visible'}
          >
            <Image
              src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK BEEF COCKTAIL MOCKUP.png"
              alt="Beef Cocktail Package"
              width={180}
              height={180}
              className="object-contain drop-shadow-xl w-32 sm:w-40"
            />
          </motion.div>

          {/* Bottom left Mockup */}
          <motion.div
            className="absolute -bottom-36 -left-8 z-10"
            variants={{
              hidden: {
                opacity: 0,
                y: 400,
                x: -150,
                rotate: 0,
                scale: 0.7,
              },
              visible: {
                opacity: 1,
                y: 120,
                x: -10,
                rotate: 20,
                scale: 1.8,
                transition: {
                  ...BOUNCY_TRANSITION,
                  duration: 1.3,
                  delay: 1.0,
                },
              },
              exit: {
                opacity: 0,
                y: 400,
                x: -200,
                rotate: -45,
                scale: 0.3,
                transition: {
                  duration: 0.8,
                },
              },
            }}
            initial="hidden"
            animate={shouldExit || currentSection === 1 ? 'exit' : 'visible'}
          >
            <Image
              src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK CRISPY NUGGET MOCKUP.png"
              alt="Crispy Nugget Package"
              width={200}
              height={180}
              className="object-contain drop-shadow-xl w-36 sm:w-44"
            />
          </motion.div>

          {/* Top right Floating Nugget */}
          <motion.div
            className="absolute -top-28 right-8 z-30"
            variants={{
              hidden: {
                opacity: 0,
                y: -800,
                x: 200,
                rotate: 30,
                scale: 0.5,
              },
              visible: {
                opacity: 1,
                y: -200,
                x: 0,
                rotate: 190,
                scale: 1.6,
                transition: {
                  ...BOUNCY_TRANSITION,
                  duration: 1.4,
                  delay: 1.2,
                },
              },
              exit: {
                opacity: 0,
                y: -500,
                x: 150,
                rotate: 90,
                scale: 0.2,
                transition: {
                  duration: 0.8,
                },
              },
            }}
            initial="hidden"
            animate={shouldExit ? 'exit' : 'visible'}
          >
            <Image
              src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK NUGGET KANAN ATAS.png"
              alt="Nugget Right"
              width={120}
              height={120}
              className="object-contain drop-shadow-lg scale-y-[-1] w-20 sm:w-24"
            />
          </motion.div>

          {/* Top left Floating Nugget */}
          <motion.div
            className="absolute -top-32 -left-12 z-30"
            variants={{
              hidden: {
                opacity: 0,
                y: -800,
                x: -200,
                rotate: 0,
                scale: 0.5,
              },
              visible: {
                opacity: 1,
                y: -250,
                x: 10,
                rotate: -30,
                scale: 1.4,
                transition: {
                  ...BOUNCY_TRANSITION,
                  duration: 1.4,
                  delay: 1.4,
                },
              },
              exit: {
                opacity: 0,
                y: -600,
                x: -150,
                rotate: -90,
                scale: 0.2,
                transition: {
                  duration: 0.8,
                },
              },
            }}
            initial="hidden"
            animate={shouldExit ? 'exit' : 'visible'}
          >
            <Image
              src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK NUGGET KIRI ATAS.png"
              alt="Nugget Left"
              width={150}
              height={150}
              className="object-contain drop-shadow-lg w-28 sm:w-32"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

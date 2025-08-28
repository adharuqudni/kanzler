'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { motionVariants, BOUNCY_TRANSITION, SMOOTH_BOUNCY } from '@/lib/motion';
import MotionWrapper from '@/components/animations/MotionWrapper';

export default function HomepackHero() {
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
  };

  const productSlideVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        ...BOUNCY_TRANSITION,
        duration: 1.2,
        delay: 0.6,
      },
    },
  };

  const nuggetFloatVariants = {
    hidden: {
      opacity: 0,
      y: -200,
      x: 0,
      rotate: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      rotate: -15,
      scale: 1,
      transition: {
        ...BOUNCY_TRANSITION,
        duration: 1.4,
        delay: 1.2,
      },
    },
  };

  const mockupSlideVariants = {
    hidden: {
      opacity: 0,
      y: 200,
      x: 0,
      rotate: 0,
      scale: 0.7,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      rotate: -15,
      scale: 1,
      transition: {
        ...BOUNCY_TRANSITION,
        duration: 1.3,
        delay: 0.8,
      },
    },
  };

  return (
    <section className="relative h-[100vh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/assets/ASSET - SINGLES/1 ASSET - SINGLES/1 ASSET - SINGLES BACKGROUND BIRU.png"
          alt="Singles Background"
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
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[120vh] px-8 py-24">
        {/* Top Section - Crown and Logo Split */}
        <div className="flex flex-col items-center mb-20">
          {/* Crown */}
          <motion.div
            className="mb-8"
            variants={logoFadeInVariants}
            initial="hidden"
            animate="visible"
          >
            <Image
              src="/assets/ASSET - HOME/1 ASSET - HOME/Logo Mahkota.png"
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
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <Image
              src="/assets/ASSET - HOME/1 ASSET - HOME/Kanzler Title.png"
              alt="Kanzler"
              width={700}
              height={150}
              className="object-contain filter brightness-110"
            />
          </motion.div>

          {/* Kanzler Title */}
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
            }}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1 }}
          >
            <Image
              src="/assets/ASSET - HOME/1 ASSET - HOME/Kanzler Quote.png"
              alt="Kanzler"
              width={800}
              height={100}
              className="object-contain filter brightness-110"
            />
          </motion.div>
        </div>

        {/* Products Section */}
        <div className="relative w-full max-w-7xl mx-auto">
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
            }}
            initial="hidden"
            animate="visible"
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
            }}
            initial="hidden"
            animate="visible"
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
            }}
            initial="hidden"
            animate="visible"
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
            className="absolute top-0 right-0 z-30 "
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
            }}
            initial="hidden"
            animate="visible"
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
            }}
            initial="hidden"
            animate="visible"
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

        {/* Bottom Text Section */}
        <motion.div
          className="mt-32 text-center max-w-4xl"
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.6 }}
        ></motion.div>
      </div>
    </section>
  );
}

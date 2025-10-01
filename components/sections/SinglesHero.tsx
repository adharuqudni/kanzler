"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { motionVariants, BOUNCY_TRANSITION, SMOOTH_BOUNCY } from "@/lib/motion";

export default function SinglesHero() {
  // Custom animation variants for coming up from below
  const slideUpVariants = {
    hidden: {
      y: 400,
      x: -400,
      opacity: 0,
      scale: 2.5,
    },
    visible: {
      y: 100,
      x: -50,
      opacity: 1,
      scale: 2.5,
      rotate: 45,
      transition: {
        ...SMOOTH_BOUNCY,
        duration: 1.2,
      },
    },
  };

  const slideUpDelayedVariants = {
    hidden: {
      y: 400,
      x: 600,
      opacity: 0,
      scale: 2.5,
    },
    visible: {
      y: 100,
      x: 50,
      opacity: 1,
      scale: 2.5,
      rotate: -40,
      transition: {
        ...SMOOTH_BOUNCY,
        duration: 1.2,
        delay: 0.3,
      },
    },
  };

  // Dramatic zoom bounce entry for Crown
  const crownBounceVariants = {
    hidden: {
      opacity: 0,
      scale: 0.2,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1, // Towewew zoom effect
      transition: {
        duration: 1.5,
        delay: 0.2,
        scale: {
          duration: 1.5,
          ease: [0.25, 0.46, 0.45, 0.94], // Custom bounce easing
        },
      },
    },
  };

  // Dramatic zoom bounce entry for Kanzler Logo
  const kanzlerBounceVariants = {
    hidden: {
      opacity: 0,
      scale: 0.1,
    },
    visible: {
      opacity: 1,
      scale: 1, // More dramatic towewew
      transition: {
        duration: 1.8,
        delay: 0.6,
        scale: {
          duration: 1.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
  };

  // Dramatic zoom bounce entry for Singles Text
  const singlesBounceVariants = {
    hidden: {
      opacity: 0,
      scale: 0.05,
    },
    visible: {
      opacity: 1,
      scale: [0.05, 1.5, 0.7, 1.3, 0.9, 1.1, 1], // Most dramatic towewew
      rotate: 0,
      transition: {
        duration: 2.2,
        delay: 1.0,
        scale: {
          duration: 2.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/assets/ASSET - SINGLES/1 ASSET - SINGLES/1 ASSET - SINGLES BACKGROUND BIRU.png"
          alt="Singles Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-10">
          <Image
            src="/assets/ASSET - SINGLES/1 ASSET - SINGLES/1 ASSET - SINGLES GRADIENT BLENDING SCREEN.png"
            alt="Gradient Overlay"
            className="object-cover mix-blend-screen opacity-80"
            style={{
              transform: "scale(1.5)",
              objectFit: "cover",
              objectPosition: "top",
            }}
            fill
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Main Content Area */}
        <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto relative z-40">
          {/* Crown */}
          <motion.div
            className="mb-6"
            variants={crownBounceVariants}
            initial="hidden"
            animate="visible"
          >
            <Image
              src="/assets/ASSET - HOME/1 ASSET - HOME/crown_white.svg"
              alt="Crown"
              width={100}
              height={100}
              className="object-contain filter brightness-110"
            />
          </motion.div>

          {/* Kanzler Logo */}
          <motion.div
            className="mb-4"
            variants={kanzlerBounceVariants}
            initial="hidden"
            animate="visible"
          >
            <Image
              src="/assets/ASSET - SINGLES/1 ASSET - SINGLES/1 ASSET - SINGLES LOGO TANPA R.png"
              alt="Kanzler"
              width={500}
              height={100}
              className="object-contain filter brightness-110"
            />
          </motion.div>

          {/* Singles Text */}
          <motion.div
            variants={singlesBounceVariants}
            initial="hidden"
            animate="visible"
          >
            <Image
              src="/assets/ASSET - HOME/1 ASSET - HOME/Singles.png"
              alt="Singles"
              width={700}
              height={150}
              className="object-contain filter brightness-110"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

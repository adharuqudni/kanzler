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

  const textFadeInVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...BOUNCY_TRANSITION,
        duration: 0.8,
        delay: 0.6,
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
            variants={logoFadeInVariants}
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
            variants={textFadeInVariants}
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
            variants={textFadeInVariants}
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

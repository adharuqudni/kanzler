"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BOUNCY_TRANSITION, SMOOTH_BOUNCY } from "@/lib/motion";

export default function MobileSinglesHero() {
  // Dramatic zoom bounce entry for Crown
  const crownBounceVariants = {
    hidden: {
      opacity: 0,
      scale: 0.2,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        delay: 0.2,
        scale: {
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94],
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
      scale: 1,
      transition: {
        duration: 1.5,
        delay: 0.5,
        scale: {
          duration: 1.5,
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
      scale: [0.05, 1.3, 0.8, 1.1, 0.95, 1],
      rotate: 0,
      transition: {
        duration: 1.8,
        delay: 0.9,
        scale: {
          duration: 1.8,
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
          src="/assets/gradient-9x16.jpg"
          alt="Background Biru"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4">
        {/* Main Content Area */}
        <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto relative z-40 mt-32">
          {/* Crown */}
          <motion.div
            className="mb-4"
            variants={crownBounceVariants}
            initial="hidden"
            animate="visible"
          >
            <Image
              src="/assets/ASSET - HOME/1 ASSET - HOME/crown_white.svg"
              alt="Crown"
              width={60}
              height={60}
              className="object-contain filter brightness-110 w-12 h-12 sm:w-16 sm:h-16"
            />
          </motion.div>

          {/* Kanzler Logo */}
          <motion.div
            className="mb-3"
            variants={kanzlerBounceVariants}
            initial="hidden"
            animate="visible"
          >
            <Image
              src="/assets/ASSET - SINGLES/1 ASSET - SINGLES/1 ASSET - SINGLES LOGO TANPA R.png"
              alt="Kanzler"
              width={300}
              height={80}
              className="object-contain filter brightness-110 w-56 mt"
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
              width={400}
              height={100}
              className="object-contain filter brightness-110 w-96 "
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}


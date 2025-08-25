'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { motionVariants, BOUNCY_TRANSITION, SMOOTH_BOUNCY } from '@/lib/motion';

export default function SinglesSecondSection() {
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

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900">
      {/* Background - Similar to first section */}
      <div className="absolute inset-0">
        <Image
          src="/assets/ASSET - SINGLES/1 ASSET - SINGLES/1 ASSET - SINGLES BACKGROUND BIRU.png"
          alt="Singles Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute  bottom-1/2 left 1/2" >
          <Image
            src="/assets/ASSET - SINGLES/1 ASSET - SINGLES/1 ASSET - SINGLES GRADIENT BLENDING SCREEN.png"
            alt="Gradient Overlay"
            fill
            className="object-cover mix-blend-screen opacity-80"
          />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-40 flex flex-col items-center justify-center min-h-screen px-8 py-16">
        {/* Header Text */}
        <div className="text-center mb-16">
          {/* Singles Logo */}
          <motion.div
            className="mb-8"
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image
              src="/assets/ASSET - SINGLES/2 ASSET - SINGLES/2 ASSET - SINGLES LOGO.png"
              alt="Singles"
              width={600}
              height={200}
              className="object-contain filter brightness-110 mx-auto"
            />
          </motion.div>

          {/* Indonesian Description */}
          <motion.div
            className="max-w-4xl mx-auto"
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-white text-lg lg:text-xl leading-relaxed text-center">
              Produk sosis dan bakso sudah matang tinggal makan
              <br />
              pertama di Indonesia. Praktis dimakan kapan pun dan di mana pun.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Curved Bottom Transition - Similar to MapSection */}
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

    </section>
  );
}

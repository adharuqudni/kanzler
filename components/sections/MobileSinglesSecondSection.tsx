'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { BOUNCY_TRANSITION } from '@/lib/motion';

const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

export default function MobileSinglesSecondSection() {
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
          src="/assets/gradient-9x16.jpg"
          alt="Background Biru"
          fill
          className="object-cover"
          priority
        />
      </div>
      <svg
        height="120"
        viewBox="0 0 500 120"
        preserveAspectRatio="none"
        className="w-full absolute bottom-0"
      >
        <path
          d="M 0 120 Q 250 0 500 120 L 500 120 L 0 120 Z"
          fill="white"
          fillRule="evenodd"
        />
      </svg>
      {/* Main Content Container */}
      <div className="relative z-40 flex flex-col items-center justify-center min-h-[80vh] px-12 py-0 mt-16">
        {/* Header Text */}
        <div className="text-center mb-12">
          {/* Singles Logo */}
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image
              src="/assets/ASSET - SINGLES/2 ASSET - SINGLES/2 ASSET - SINGLES LOGO.png"
              alt="Singles"
              width={750}
              height={150}
              className="object-contain filter brightness-110  w-96"
            />
          </motion.div>

          {/* Indonesian Description */}
          <motion.div
            className="max-w-md mx-auto -mt-4"
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p
              className={`${poppins.className} text-white text-md sm:text-base leading-relaxed text-center`}
            >
              Produk sosis dan bakso sudah matang tinggal makan pertama di
              Indonesia. Praktis dimakan kapan pun dan di mana pun.
            </p>
          </motion.div>
          
        </div>
        
      </div>
    </section>
  );
}

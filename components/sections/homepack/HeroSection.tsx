'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ParallaxElement } from '@/components/animations/ScrollReveal'

export default function MainContent() {
  return (
    <section
      className="relative flex items-center justify-center h-screen overflow-hidden bg-cover bg-top"
      style={{
        backgroundImage:
          "url('/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK BACKGROUND.png')",
        backgroundColor: '#0e2a52', // fallback navy
      }}
    >
      {/* Crown kecil kiri atas */}
      <div className="absolute top-6 left-6 w-10 h-10 z-30">
        <Image
          src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK MAHKOTA.png"
          alt="Kanzler crown small"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>

      {/* Logo utama */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="flex flex-col items-center text-center z-20"
      >
        <Image
          src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK LOGO.png"
          alt="KANZLER Logo"
          width={900}
          height={900}
          priority
          className="object-contain drop-shadow-lg"
        />
      </motion.div>

      {/* Nugget kanan atas */}
      <ParallaxElement speed={0.3} className="absolute right-[15%] top-[10%]">
        <motion.div
          initial={{ opacity: 0, x: 300, y: -300 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          style={{ transform: 'rotate(-8deg)' }}
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK NUGGET KANAN ATAS.png"
              alt="nugget top right"
              width={220}
              height={220}
              className="drop-shadow-xl"
            />
          </motion.div>
        </motion.div>
      </ParallaxElement>

      {/* Nugget kiri atas */}
      <ParallaxElement speed={0.3} className="absolute left-[15%] top-[10%]">
        <motion.div
          initial={{ opacity: 0, x: -300, y: -300 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
          style={{ transform: 'rotate(8deg)' }}
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK NUGGET KIRI ATAS.png"
              alt="nugget top left"
              width={220}
              height={220}
              className="drop-shadow-xl"
            />
          </motion.div>
        </motion.div>
      </ParallaxElement>

      {/* Pack kiri bawah */}
      <ParallaxElement speed={0.4} className="absolute left-[6%] bottom-0">
        <motion.div
          initial={{ opacity: 0, x: -150, y: 400, rotate: 45 }}
          animate={{ opacity: 1, x: 0, y: 150, rotate: 45 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          whileHover={{ scale: 1.08 }}
        >
          <Image
            src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK CRISPY NUGGET MOCKUP.png"
            alt="package left"
            width={380}
            height={380}
            className="drop-shadow-2xl"
          />
        </motion.div>
      </ParallaxElement>

      {/* Pack kanan bawah */}
      <ParallaxElement speed={0.4} className="absolute right-[6%] bottom-0">
        <motion.div
          initial={{ opacity: 0, x: 150, y: 400, rotate: -45 }}
          animate={{ opacity: 1, x: 0, y: 150, rotate: -45 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          whileHover={{ scale: 1.08 }}
        >
          <Image
            src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK BEEF COCKTAIL MOCKUP.png"
            alt="package right"
            width={380}
            height={380}
            className="drop-shadow-2xl"
          />
        </motion.div>
      </ParallaxElement>
    </section>
  )
}

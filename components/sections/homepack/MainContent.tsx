'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function MainContent() {
  return (
    <section className="relative bg-white">
      {/* Lengkungan transition dari biru ke putih */}
      <div
        className="absolute top-0 left-0 right-0 h-32 bg-white"
        style={{
          borderRadius: '100px 100px 0 0',
          marginTop: '-2rem',
          transform: 'scaleX(1.5)',
        }}
      />

      {/* Konten utama */}
      <div className="container mx-auto pt-32 pb-20 relative z-10 text-center">
        {/* Logo Kanzler */}
        <div className="flex justify-center mb-6">
          <Image
            src="/assets/ASSET - HOMEPACK/2 ASSET - HOMEPACK/2 ASSET - HOMEPACK LOGO.png"
            alt="KANZLER Logo"
            width={350}
            height={150}
            className="object-contain"
          />
        </div>

        {/* Deskripsi */}
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Produk nugget dan sosis dari daging sapi dan ayam pilihan. <br />
          <span className="italic font-medium text-kanzler-navy">
            Extra Meaty, Extra Juicy
          </span>
          , dan mudah diolah menjadi menu lezat setiap hari.
        </p>

        {/* Produk images */}
        <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-8">
          {/* Left pack */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/assets/ASSET - HOMEPACK/2 ASSET - HOMEPACK/2 ASSET - HOMEPACK STICK NUGGET MOCKUP.png"
              alt="Crispy Nugget"
              width={280}
              height={350}
              className="object-contain drop-shadow-xl"
            />
          </motion.div>

          {/* Center pack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Image
              src="/assets/ASSET - HOMEPACK/2 ASSET - HOMEPACK/2 ASSET - HOMEPACK CRISPY NUGGET MOCKUP.png"
              alt="Crispy Chicken Nugget"
              width={320}
              height={380}
              className="object-contain drop-shadow-xl"
            />
          </motion.div>

          {/* Right pack */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Image
              src="/assets/ASSET - HOMEPACK/2 ASSET - HOMEPACK/2 ASSET - HOMEPACK BEEF COCKTAIL MOCKUP.png"
              alt="Beef Cocktail Sausage"
              width={280}
              height={350}
              className="object-contain drop-shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

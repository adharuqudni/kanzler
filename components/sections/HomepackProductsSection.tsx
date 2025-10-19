'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

export default function HomepackProductsSection() {
  return (
    <section className="relative bg-white">
      {/* Curved transition from blue to white */}
      <svg
        viewBox="0 0 500 120"
        preserveAspectRatio="none"
        className="w-full"
      >
        <path
          d="M 0 120 Q 253 10 500 120 L 500 0 L 0 0 Z"
          fill="#1c2652"
          fillRule="evenodd"
        />
      </svg>

      <div className="container mx-auto pb-12 relative z-10 -mt-24 text-center">
        {/* Logo */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/assets/ASSET - HOMEPACK/2 ASSET - HOMEPACK/2 ASSET - HOMEPACK LOGO.png"
            alt="KANZLER Logo"
            width={350}
            height={150}
            className="object-contain"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          className={`text-lg md:text-xl text-gray-700 mx-auto leading-relaxed text-center max-w-3xl mt-8 mb-16 ${poppins.className}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Produk nugget dan sosis dari daging sapi dan ayam pilihan.
          <br />
          <span className="italic">Extra Meaty, Extra Juicy</span>, dan mudah
          diolah menjadi menu lezat setiap hari.
        </motion.p>

        {/* MOBILE: Stack layout */}
        <motion.div
          className="mt-10 md:hidden flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Image
            src="/assets/ASSET - HOMEPACK/2 ASSET - HOMEPACK/2 ASSET - HOMEPACK STICK NUGGET MOCKUP.png"
            alt="Crispy Nugget Stick"
            width={320}
            height={380}
            className="object-contain drop-shadow-xl"
          />
          <Image
            src="/assets/ASSET - HOMEPACK/2 ASSET - HOMEPACK/2 ASSET - HOMEPACK CRISPY NUGGET MOCKUP.png"
            alt="Crispy Chicken Nugget"
            width={320}
            height={380}
            className="object-contain drop-shadow-xl"
          />
          <Image
            src="/assets/ASSET - HOMEPACK/2 ASSET - HOMEPACK/2 ASSET - HOMEPACK BEEF COCKTAIL MOCKUP.png"
            alt="Beef Cocktail Sausage"
            width={320}
            height={380}
            className="object-contain drop-shadow-xl"
          />
        </motion.div>

        {/* DESKTOP: Overlapping layout */}
        <div
          className="hidden md:block"
          style={{
            position: 'relative',
            height: 420, // lebih rapat
            maxWidth: 1200,
            margin: '2rem auto 0', // lebih rapat
          }}
        >
          {/* Left Product */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '14%',
              zIndex: 10,
            }}
          >
            <motion.div
              initial={{ opacity: 1, x: 120, y: 150, rotate: -8 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: -8 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              style={{ willChange: 'transform' }}
            >
              <Image
                src="/assets/ASSET - HOMEPACK/2 ASSET - HOMEPACK/2 ASSET - HOMEPACK STICK NUGGET MOCKUP.png"
                alt="Crispy Nugget Stick"
                width={360}
                height={420}
                className="object-contain drop-shadow-xl"
              />
            </motion.div>
          </div>

          {/* Right Product (behind center) */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: '14%',
              zIndex: 8,
            }}
          >
            <motion.div
              initial={{ opacity: 1, x: -120, y: 150, rotate: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 10 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              style={{ willChange: 'transform' }}
            >
              <Image
                src="/assets/ASSET - HOMEPACK/2 ASSET - HOMEPACK/2 ASSET - HOMEPACK BEEF COCKTAIL MOCKUP.png"
                alt="Beef Cocktail Sausage"
                width={290}
                height={290}
                className="object-contain drop-shadow-xl"
              />
            </motion.div>
          </div>

          {/* Center Product (front) */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 20,
            }}
          >
            <motion.div
              initial={{ opacity: 1, y: 150 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ willChange: 'transform' }}
            >
              <Image
                src="/assets/ASSET - HOMEPACK/2 ASSET - HOMEPACK/2 ASSET - HOMEPACK CRISPY NUGGET MOCKUP.png"
                alt="Crispy Chicken Nugget"
                width={400}
                height={400}
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>

          {/* Soft shadow below */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: -8,
              width: '60%',
              height: 22,
              borderRadius: 9999,
              background: 'rgba(0,0,0,0.10)',
              filter: 'blur(16px)',
            }}
          />
        </div>
      </div>
    </section>
  );
}

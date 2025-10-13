'use client';

import React from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });
import Image from 'next/image';
import { motion } from 'framer-motion';
import MotionWrapper from '@/components/animations/MotionWrapper';
import { BOUNCY_TRANSITION } from '@/lib/motion';

const MapSection = React.memo(function MapSection() {
  return (
    <section className={`min-h-screen bg-[#1C2652] relative overflow-hidden ${poppins.className}`}>
      {/* Top curved transition from white to navy */}
      <svg
          height="120"
          viewBox="0 0 500 120"
          preserveAspectRatio="none"
          className="w-full"
        >
          <path
            d="M0,120 Q250,40 500,120 L500,0 L0,0 Z"
            fill="white"
            fillRule="evenodd"
          />
        </svg>
      
      {/* Content Container */}
      <div id="map-section" className="relative z-10  mx-auto px-4 sm:px-6 md:px-8 pt-4 sm:pt-4 md:pt-4">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-8"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
        >
          <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
            Tersedia di
          </h2>
        </motion.div>

        {/* Map Section */}
        <div className="flex flex-col items-center w-full">
          <motion.div
          className='w-[70%]'
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 20,
              delay: 0.3,
              duration: 0.8,
            }}
          >
            <Image
              src="/assets/ASSET - HOME/5 ASSET - HOME/5 ASSET - HOME PETA.png"
              alt="Peta Indonesia - Kanzler Coverage"
              width={1000}
              height={700}
              className="w-full self-center object-contain brightness-90 contrast-110"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Statistics Section (below map, left aligned) */}
        <motion.div
          className="flex items-baseline justify-start gap-2 sm:gap-4 px-4 sm:px-6 md:px-8 ml-8"
          initial={{ opacity: 0, scale: 0.8, x: -50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 15,
            delay: 0.5,
          }}
        >
          <motion.span 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#AA7B32]"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10,
              delay: 0.7,
            }}
          >
            498+
          </motion.span>
          <motion.span
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#AA7B32]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: -15, x: -10 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 12,
              delay: 0.9,
            }}
          >
            kota & kabupaten di Indonesia
          </motion.span>
        </motion.div>

        {/* Contact Information Box */}
        <motion.div
          className="w-full mt-4 px-4 sm:px-6 md:px-8 mb-12"
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
            delay: 0.6,
          }}
        >
          <div className="w-full border-2 border-[#AA7B32] rounded-2xl sm:rounded-3xl px-6 py-6 md:px-8 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Left - Contact */}
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.8,
                duration: 0.6,
              }}
            >
              <h3 className="text-2xl md:text-[28px] font-bold text-white mb-3">
                Hubungi Kami
              </h3>
              <div className="text-white">
                <p className="text-sm md:text-base leading-relaxed mb-1">
                  Kantor Pusat Cimory, Jl. Komp. Rukan Taman Meruya No. N1-4,
                  RT.16/RW.7, Meruya Utara
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  Kec. Kembangan, Kota Jakarta Barat, Daerah Khusus Ibukota
                  Jakarta 11620 | (021) 587 4630
                </p>
              </div>
            </motion.div>

            {/* Right - Social */}
            <motion.div 
              className="flex flex-col items-center md:items-end"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 1,
                duration: 0.6,
              }}
            >
              <h4 className="text-xl md:text-[22px] font-semibold text-white mb-4">
                Ikuti Kami
              </h4>
              <div className="flex gap-6">
                {[
                  {
                    src: '/assets/ASSET - HOME/5 ASSET - HOME/5 ASSET - HOME IG.png',
                    alt: 'Instagram',
                    href: '#',
                  },
                  {
                    src: '/assets/ASSET - HOME/5 ASSET - HOME/5 ASSET - HOME TIKTOK.png',
                    alt: 'TikTok',
                    href: '#',
                  },
                ].map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.href}
                    className="group"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 1.2 + idx * 0.15,
                    }}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default MapSection;

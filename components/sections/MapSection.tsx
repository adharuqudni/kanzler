'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MotionWrapper from '@/components/animations/MotionWrapper';
import { BOUNCY_TRANSITION } from '@/lib/motion';

const MapSection = React.memo(function MapSection() {
  return (
    <section className="min-h-screen bg-[#1C2653] relative overflow-hidden">
      {/* Top curved transition from white to navy */}
      <div className="absolute top-0 left-0 w-full">
        <svg
          height="80"
          viewBox="0 0 500 80"
          preserveAspectRatio="none"
          className="w-full"
        >
          <path 
            d="M0,80 Q250,0 500,80 L500,0 L0,0 Z" 
            fill="white" 
            fillRule="evenodd" 
          />
        </svg>
      </div>
   
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 pt-12 sm:pt-16 md:pt-20">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <MotionWrapper variant="fadeInUp" delay={0.2} className="mb-4 sm:mb-6 md:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4">
              Tersedia di
            </h2>
          </MotionWrapper>
        </div>


        {/* Map Section with Statistics Overlay */}
        <div className="relative max-w-2xl sm:max-w-4xl md:max-w-6xl mx-auto">
          {/* Map Image - Centered */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              ...BOUNCY_TRANSITION,
              delay: 1.2,
              duration: 1.2,
            }}
          >
            <Image
              src="/assets/ASSET - HOME/5 ASSET - HOME/5 ASSET - HOME PETA.png"
              alt="Peta Indonesia - Kanzler Coverage"
              width={1000}
              height={600}
              className="w-full h-auto object-contain"
              loading="lazy"
            />

            {/* Statistics Overlay - Positioned on the left side of map */}
            <motion.div
              className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...BOUNCY_TRANSITION,
                delay: 1.6,
              }}
            >
              <div className="flex items-end gap-2 sm:gap-4">
                <motion.div
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-[#D4AF37]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    ...BOUNCY_TRANSITION,
                    delay: 1.8,
                    duration: 0.8,
                  }}
                >
                  498+
                </motion.div>
                <div className="text-left pb-1 sm:pb-2">
                  <motion.p
                    className="text-xs sm:text-sm md:text-lg lg:text-xl text-[#D4AF37] font-medium"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      ...BOUNCY_TRANSITION,
                      delay: 2.0,
                    }}
                  >
                    kota & kabupaten di Indonesia
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Contact Information Box - Bottom Center */}
        <MotionWrapper
          variant="fadeInUp"
          delay={0.2}
          className="max-w-sm sm:max-w-3xl md:max-w-5xl mx-auto mt-6 sm:mt-8 md:mt-12 mb-6 sm:mb-8 md:mb-12"
        >
          <div className="border-2 border-[#D4AF37] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-4">
                Hubungi Kami
              </h3>
              <div className="text-white/90">
                <p className="text-xs sm:text-sm md:text-base leading-relaxed mb-1 sm:mb-2">
                  Kantor Pusat Cimory, Jl. Komp. Rukan Taman Meruya No. N1-4,
                  RT.16/RW.7, Meruya Utara
                </p>
                <p className="text-xs sm:text-sm md:text-base leading-relaxed">
                  Kec. Kembangan, Kota Jakarta Barat, Daerah Khusus Ibukota
                  Jakarta 11620 | (021) 587 4630
                </p>
              </div>
            </div>

            {/* Social Media Section - Right side */}
            <div className="text-center md:text-right">
              <h4 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-4">
                Ikuti Kami
              </h4>
              <div className="flex gap-2 sm:gap-4 justify-center md:justify-end">
                <motion.a
                  href="#"
                  className="group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={BOUNCY_TRANSITION}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                    <Image
                      src="/assets/ASSET - HOME/5 ASSET - HOME/5 ASSET - HOME IG.png"
                      alt="Instagram"
                      width={150}
                      height={150}
                      className="object-contain w-6 h-6 sm:w-8 sm:h-8"
                    />
                  </div>
                </motion.a>
                <motion.a
                  href="#"
                  className="group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={BOUNCY_TRANSITION}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                    <Image
                      src="/assets/ASSET - HOME/5 ASSET - HOME/5 ASSET - HOME TIKTOK.png"
                      alt="TikTok"
                      width={150}
                      height={150}
                      className="object-contain w-6 h-6 sm:w-8 sm:h-8"
                    />
                  </div>
                </motion.a>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
});

export default MapSection;

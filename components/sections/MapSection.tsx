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
      <div className="relative z-10 container mx-auto px-8 pt-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <MotionWrapper variant="fadeInUp" delay={0.2} className="mb-8">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Tersedia di
            </h2>
          </MotionWrapper>
        </div>


        {/* Map Section with Statistics Overlay */}
        <div className="relative max-w-6xl mx-auto">
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
              className="absolute bottom-8 left-8 md:left-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...BOUNCY_TRANSITION,
                delay: 1.6,
              }}
            >
              <div className="flex items-end gap-4">
                <motion.div
                  className="text-6xl md:text-8xl font-bold text-[#D4AF37]"
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
                <div className="text-left pb-2">
                  <motion.p
                    className="text-lg md:text-xl text-[#D4AF37] font-medium"
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
          delay={2.2}
          className="max-w-5xl mx-auto mt-12 mb-12"
        >
          <div className="border-2 border-[#D4AF37] rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-4">
                Hubungi Kami
              </h3>
              <div className="text-white/90">
                <p className="text-sm md:text-base leading-relaxed mb-2">
                  Kantor Pusat Cimory, Jl. Komp. Rukan Taman Meruya No. N1-4,
                  RT.16/RW.7, Meruya Utara
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  Kec. Kembangan, Kota Jakarta Barat, Daerah Khusus Ibukota
                  Jakarta 11620 | (021) 587 4630
                </p>
              </div>
            </div>

            {/* Social Media Section - Right side */}
            <div className="text-center md:text-right">
              <h4 className="text-xl font-semibold text-white mb-4">
                Ikuti Kami
              </h4>
              <div className="flex gap-4">
                <motion.a
                  href="#"
                  className="group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={BOUNCY_TRANSITION}
                >
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                    <Image
                      src="/assets/ASSET - HOME/5 ASSET - HOME/5 ASSET - HOME IG.png"
                      alt="Instagram"
                      width={150}
                      height={150}
                      className="object-contain"
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
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                    <Image
                      src="/assets/ASSET - HOME/5 ASSET - HOME/5 ASSET - HOME TIKTOK.png"
                      alt="TikTok"
                      width={150}
                      height={150}
                      className="object-contain"
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

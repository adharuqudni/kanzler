"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import MotionWrapper from "@/components/animations/MotionWrapper";
import { BOUNCY_TRANSITION } from "@/lib/motion";

const MapSection = React.memo(function MapSection() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#34437A] to-[#1C2653] relative overflow-hidden">
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
        <div className="text-center mb-2 sm:mb-3 md:mb-4">
          <MotionWrapper
            variant="fadeInUp"
            delay={0.2}
            className="mb-1 sm:mb-2 md:mb-3"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#FFFFFF] mb-0 leading-snug">
              Tersedia di
            </h2>
          </MotionWrapper>
        </div>

        {/* Map Section with Statistics Overlay */}
        <div className="relative max-w-2xl sm:max-w-4xl md:max-w-6xl mx-auto">
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
            {/* Cropped Map */}
            <div className="overflow-hidden max-h-[400px] sm:max-h-[440px] md:max-h-[480px]">
              <Image
                src="/assets/ASSET - HOME/5 ASSET - HOME/5 ASSET - HOME PETA.png"
                alt="Peta Indonesia - Kanzler Coverage"
                width={1000}
                height={600}
                className="w-full h-auto object-cover object-[center_-70px] brightness-90 contrast-110 hue-rotate-200"
                loading="lazy"
              />
            </div>

            {/* Statistics Overlay */}
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
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-[#AA7B32]"
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
                    className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold text-[#AA7B32]"
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

        {/* Contact Information Box */}
        <MotionWrapper
          variant="fadeInUp"
          delay={0.2}
          className="w-full mt-8 mb-12 px-4 sm:px-6 md:px-8"
        >
          <div className="w-full border-2 border-[#AA7B32] rounded-2xl sm:rounded-3xl px-6 py-6 md:px-8 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Left - Contact */}
            <div className="flex-1">
              <h3 className="text-2xl md:text-[28px] font-bold text-[#FFFFFF] mb-3">
                Hubungi Kami
              </h3>
              <div className="text-[#FFFFFF]">
                <p className="text-sm md:text-base leading-relaxed mb-1">
                  Kantor Pusat Cimory, Jl. Komp. Rukan Taman Meruya No. N1-4,
                  RT.16/RW.7, Meruya Utara
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  Kec. Kembangan, Kota Jakarta Barat, Daerah Khusus Ibukota
                  Jakarta 11620 | (021) 587 4630
                </p>
              </div>
            </div>

            {/* Right - Social */}
            <div className="flex flex-col items-center md:items-end">
              <h4 className="text-xl md:text-[22px] font-semibold text-[#FFFFFF] mb-4">
                Ikuti Kami
              </h4>
              <div className="flex gap-6">
                {[
                  {
                    src: "/assets/ASSET - HOME/5 ASSET - HOME/5 ASSET - HOME IG.png",
                    alt: "Instagram",
                  },
                  {
                    src: "/assets/ASSET - HOME/5 ASSET - HOME/5 ASSET - HOME TIKTOK.png",
                    alt: "TikTok",
                  },
                ].map((item, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    className="group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={BOUNCY_TRANSITION}
                  >
                    <div className="w-16 h-16 sm:w-[68px] sm:h-[68px] bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center overflow-hidden group-hover:bg-white/20 transition-all duration-300">
                      <div className="relative w-[34px] h-[34px] sm:w-[48px] sm:h-[48px] scale-[2.5]">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
});

export default MapSection;

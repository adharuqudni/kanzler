"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import MotionWrapper from "@/components/animations/MotionWrapper";
import { BOUNCY_TRANSITION } from "@/lib/motion";

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
        <div className="text-center mb-8">
          <MotionWrapper variant="fadeInUp" delay={0.2}>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
              Tersedia di
            </h2>
          </MotionWrapper>
        </div>

        {/* Map Section */}
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
            <Image
              src="/assets/ASSET - HOME/5 ASSET - HOME/5 ASSET - HOME PETA.png"
              alt="Peta Indonesia - Kanzler Coverage"
              width={1200}
              height={700}
              className="w-full h-auto object-contain brightness-90 contrast-110"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Statistics Section (below map, left aligned) */}
        <motion.div
          className="flex items-baseline justify-start mt-6 sm:mt-8 md:mt-10 gap-2 sm:gap-4 px-4 sm:px-6 md:px-8 ml-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ...BOUNCY_TRANSITION,
            delay: 1.6,
          }}
        >
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#AA7B32]">
            498+
          </span>
          <motion.span
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#AA7B32]"
            initial={{ y: 0 }}
            animate={{ y: -15 , x: -10}} // Adjust the vertical movement for this text
            transition={{ duration: 0.4 }}
          >
            kota & kabupaten di Indonesia
          </motion.span>
        </motion.div>

        {/* Contact Information Box */}
        <MotionWrapper
          variant="fadeInUp"
          delay={0.2}
          className="w-full mt-8 mb-12 px-4 sm:px-6 md:px-8"
        >
          <div className="w-full border-2 border-[#AA7B32] rounded-2xl sm:rounded-3xl px-6 py-6 md:px-8 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Left - Contact */}
            <div className="flex-1">
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
            </div>

            {/* Right - Social */}
            <div className="flex flex-col items-center md:items-end">
              <h4 className="text-xl md:text-[22px] font-semibold text-white mb-4">
                Ikuti Kami
              </h4>
              <div className="flex gap-6">
                {[
                  {
                    src: "/assets/ASSET - HOME/5 ASSET - HOME/5 ASSET - HOME IG.png",
                    alt: "Instagram",
                    href: "#",
                  },
                  {
                    src: "/assets/ASSET - HOME/5 ASSET - HOME/5 ASSET - HOME TIKTOK.png",
                    alt: "TikTok",
                    href: "#",
                  },
                ].map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.href}
                    className="group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={BOUNCY_TRANSITION}
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
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
});

export default MapSection;

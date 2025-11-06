"use client";

import React from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
import Image from "next/image";
import { motion } from "framer-motion";
import MotionWrapper from "@/components/animations/MotionWrapper";
import CountUp from "@/components/animations/CountUp";
import { BOUNCY_TRANSITION } from "@/lib/motion";

const MobileMapSection = React.memo(function MobileMapSection() {
  return (
    <section
      className={`min-h-screen bg-[#1C2652] relative overflow-hidden ${poppins.className}`}
    >
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
      <div
        id="map-section"
        className="relative z-10 mx-auto px-4 pt-4 flex flex-col gap-12"
      >
        {/* Header Section */}
        <motion.div
          className="text-center mb-6"
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
          <h2 className="text-2xl font-bold text-white leading-tight">
            Tersedia di
          </h2>
        </motion.div>

        {/* Map Section */}
        <div className="flex flex-col items-center w-full">
          <motion.div
            className="w-[100%]"
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
              className="w-[140vw] self-center object-contain brightness-90 contrast-110"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Statistics Section - Mobile centered */}
        <motion.div
          className="flex flex-col items-center justify-center gap-2 px-4 mt-4"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 15,
            delay: 0.5,
          }}
        >
          <CountUp
            end={498}
            duration={2.5}
            className="text-5xl font-extrabold text-[#AA7B32] min-w-[140px] mr-0"
            suffix="+"
            delay={0.7}
          />
          <motion.span
            className="text-2xl font-bold text-[#AA7B32]  text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 12,
              delay: 0.9,
            }}
          >
            kota & kabupaten <br /> di Indonesia
          </motion.span>
        </motion.div>

        {/* Contact Information Box - Mobile optimized */}
        <motion.div
          className="w-full mt-6 px-3"
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
          <div className="w-full border-2 border-[#AA7B32] rounded-xl px-4 py-4 flex flex-col justify-center items-center gap-4">
            {/* Contact */}
            <motion.div
              className="flex-1 text-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.8,
                duration: 0.6,
              }}
            >
              <h3 className="text-lg font-bold text-white mb-3">
                Hubungi Kami
              </h3>
              <div className="text-white">
                <p className="text-sm leading-relaxed mb-2">
                  Kantor Pusat Cimory, Jl. Komp. Rukan Taman Meruya No. N1-4,
                  RT.16/RW.7, Meruya Utara
                </p>
                <p className="text-sm leading-relaxed">
                  Kec. Kembangan, Kota Jakarta Barat, DKI Jakarta 11620
                </p>
                <p className="text-sm leading-relaxed font-semibold mt-2">
                  (021) 587 4630
                </p>
              </div>
            </motion.div>

            {/* Social */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 1,
                duration: 0.6,
              }}
            >
              <h4 className="text-base font-semibold text-white mb-3">
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
                      width={36}
                      height={36}
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

export default MobileMapSection;

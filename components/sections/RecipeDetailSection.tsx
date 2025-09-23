"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface RecipeDetailProps {
  videoUrl: string;
  thumbnail: string;
  onBack: () => void;
}

const NAVY = "#1C2653";
const GOLD = "#AA7B32";

export default function RecipeDetailSection({
  videoUrl,
  thumbnail,
  onBack,
}: RecipeDetailProps) {
  return (
    <motion.div
      key="selected-recipe"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className="space-y-6 mb-16"
    >
      {/* Tombol Back */}
      <motion.button
        onClick={onBack}
        className="flex items-center gap-2 text-[15px] font-semibold"
        style={{ color: NAVY }}
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.96 }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Kembali
      </motion.button>

      {/* Kartu konten */}
      <div
        className="relative mx-auto max-w-5xl rounded-[32px] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.08)] overflow-visible"
        style={{
          borderColor: GOLD,
          borderWidth: 1.5,
          borderStyle: "solid",
        }}
      >
        <div className="grid grid-cols-12 gap-8 p-6 md:p-10 lg:p-12 items-center">
          {/* Left: Media */}
          <div className="col-span-12 md:col-span-4 flex justify-center self-center">
            <div
              className="rounded-[26px] overflow-hidden border bg-black/5"
              style={{ borderColor: `${NAVY}1A` }}
            >
              <div className="relative aspect-[9/16] w-[60vw] max-w-[240px]">
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Teks */}
          <div className="col-span-12 md:col-span-8 md:pl-4 lg:pl-8 self-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl leading-[1.1]" style={{ color: GOLD }}>
                Nugget
              </h1>
              <h2 className="text-5xl md:text-6xl leading-[1.1] mb-4 md:mb-6" style={{ color: NAVY }}>
                Spaghetti
              </h2>

              <p className="text-base md:text-lg mb-6 leading-relaxed" style={{ color: NAVY }}>
                Kombinasi pasta dan nugget yang praktis untuk lunch
              </p>

              <div className="space-y-3" style={{ color: NAVY }}>
                <p className="font-bold text-lg">Bahan:</p>
                <div className="space-y-2 text-[15px] md:text-base">
                  <p>Kanzler Crispy Chicken Nugget</p>
                  <p>1 genggam pasta</p>
                  <p>½ buah bawang Bombay</p>
                  <p>1 genggam jamur kancing</p>
                  <p>Lada dan garam secukupnya</p>
                  <p>1 sdt bawang putih bubuk</p>
                  <p>1 sdt Italian seasoning</p>
                  <p>½ sdt kaldu jamur</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail kecil kiri-bawah */}
        <div className="pointer-events-none absolute -left-6 -bottom-8 md:-left-8 md:-bottom-10">
          <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] transform -rotate-45 drop-shadow-2xl">
            <Image
              src={thumbnail}
              alt="Kanzler Product"
              fill
              className="object-contain"
              priority={false}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

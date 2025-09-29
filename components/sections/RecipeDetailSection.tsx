"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { DM_Serif_Display } from "next/font/google";

interface RecipeDetailProps {
  videoUrl: string;
  thumbnail: string;
  onBack: () => void;
}

const NAVY = "#1C2653";
const GOLD = "#AA7B32";
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400" });

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
      {/* Kartu konten */}
      <div
        className="relative mx-auto max-w-4xl h-[650px] rounded-[32px] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.08)] overflow-visible"
        style={{
          borderColor: GOLD,
          borderWidth: 1.5,
          borderStyle: "solid",
        }}
      >
        <div className="grid grid-cols-12 gap-8 p-6 md:p-10 lg:p-4 items-center">
          {/* Left: Media */}
          <div className="col-span-12 w-full md:col-span-4 flex justify-center self-center">
            <div
              className="rounded-[26px] overflow-hidden border bg-black/5"
              style={{ borderColor: `${NAVY}1A` }}
            >
              <div className="relative aspect-[9/12] w-[800] max-w-[460]">
                {" "}
                {/* Increased video width */}
                <video
                  src="assets/vid.mp4"
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
          <div className="col-span-12 md:col-span-8 md:pl-4 lg:pl-8 self-center text-left">
            {" "}
            {/* Left-aligned text */}
            <div className="max-w-2xl mt-12">
              <h1
                className={`text-4xl md:text-5xl leading-[1.1] ${dmSerif.className}`}
                style={{ color: GOLD }}
              >
                Nugget
              </h1>
              <h2
                className={`text-5xl md:text-6xl leading-[1.1] mb-4 md:mb-6 ${dmSerif.className}`}
                style={{ color: NAVY }}
              >
                Spaghetti
              </h2>

              <p
                className="text-base md:text-lg mb-6 leading-relaxed"
                style={{ color: NAVY }}
              >
                Kombinasi pasta dan nugget yang praktis <br />
                untuk lunch
              </p>
              <div className="" style={{ color: NAVY }}>
                {" "}
                {/* Reduced space between the sections */}
                <p className="font-bold text-lg">Bahan:</p>
                <div className=" text-[15px] md:text-base">
                  {" "}
                  {/* Reduced space between list items */}
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
          <motion.div
            className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] drop-shadow-2xl"
            initial={{ rotate: 0 }}
            animate={{ rotate: -10 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={thumbnail}
              alt="Kanzler Product"
              fill
              className="object-contain"
              priority={false}
            />
          </motion.div>
        </div>

        {/* Tombol Back inside the card */}
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-[15px] font-semibold absolute top-6 right-6"
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
      </div>
    </motion.div>
  );
}

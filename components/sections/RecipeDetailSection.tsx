"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { DM_Serif_Display, Poppins } from "next/font/google";

interface RecipeDetailProps {
  recipe: {
    Name: string;
    Description: string;
    Ingredient: string;
    Image: {
      url: string;
      formats?: {
        medium?: { url: string };
      };
    };
    Video?: Array<{
      url: string;
    }>;
    Product_IMG?: {
      url: string;
      formats?: {
        medium?: { url: string };
      };
    }; // <-- Perbaiki tipe jadi objek, bukan string
  } | null;
  loading: boolean;
  onBack: () => void;
}

const NAVY = "#1C2653";
const GOLD = "#AA7B32";
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function RecipeDetailSection({
  recipe,
  loading,
  onBack,
}: RecipeDetailProps) {
  const API_BASE_URL = "https://kznlr.qup.my.id";

  if (loading) {
    return (
      <motion.div
        key="loading-recipe"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center h-[650px]"
      >
        <div
          className="animate-spin rounded-full h-32 w-32 border-b-2"
          style={{ borderColor: GOLD }}
        ></div>
      </motion.div>
    );
  }

  if (!recipe) {
    return null;
  }

  const videoUrl = recipe.Video?.[0]?.url
    ? `${API_BASE_URL}${recipe.Video[0].url}`
    : null;
  const thumbnailUrl = `${API_BASE_URL}${
    recipe.Product_IMG?.formats?.medium?.url || recipe.Product_IMG?.url
  }`;

  // Parse ingredients - split by numbers or line breaks
  const ingredientsList = recipe.Ingredient.split(/\n\d+\n|\n/)
    .filter((item) => item.trim() && !item.match(/^\d+$/))
    .map((item) => item.trim());
  return (
    <motion.div
      key="selected-recipe"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className="space-y-6 mb-16"
      id="resep"
    >
      {/* Kartu konten */}
      <div
        className="relative mx-auto max-w-5xl min-h-[650px] rounded-[32px] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.08)] overflow-visible"
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
              {/* Video container */}
              <div className="relative w-full h-[600px]">
                {videoUrl ? (
                  <video
                    src={videoUrl}
                    controls
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <p className="text-gray-500">No video available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Teks */}
          <div className="col-span-12 md:col-span-8 md:pl-4 lg:pl-8 self-center text-left">
            <div className="max-w-2xl mt-12">
              <h1
                className={`text-3xl md:text-4xl leading-[1.1] ${dmSerif.className}`}
                style={{ color: GOLD }}
              >
                {recipe.Name.split(" ")[0]}
              </h1>
              <h2
                className={`text-4xl md:text-5xl leading-[1.1] mb-4 md:mb-6 ${dmSerif.className}`}
                style={{ color: NAVY }}
              >
                {recipe.Name.split(" ").slice(1).join(" ")}
              </h2>

              <p
                className={`${poppins.className} text-sm md:text-base mb-6 leading-relaxed`}
                style={{ color: NAVY }}
              >
                {recipe.Description}
              </p>
              <div style={{ color: NAVY }}>
                <p className={`${poppins.className} font text-base`}>Bahan:</p>
                <div className="text-[13px] md:text-sm space-y-2 ">
                  {ingredientsList.map((ingredient, index) => (
                    <p
                      key={index}
                      className={`${poppins.className} leading-relaxed text-sm`}
                    >
                      {ingredient}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail kecil kiri-bawah */}
        <div className="pointer-events-none absolute -left-8 -bottom-10 md:-left-56 md:-bottom-16">
          <motion.div
            className="relative w-[160px] h-[160px] md:w-[400px] md:h-[400px] drop-shadow-2xl"
            initial={{ rotate: 0 }}
            animate={{ rotate: -10 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={thumbnailUrl}
              alt={recipe.Name}
              fill
              className="object-contain"
              priority={false}
            />
          </motion.div>
        </div>

        {/* Tombol Back inside the card */}
        <motion.button
          onClick={onBack}
          className={`${poppins.className} flex items-center gap-2 text-sm font-semibold absolute top-6 right-6`}
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

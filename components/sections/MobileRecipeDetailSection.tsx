'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { DM_Serif_Display, Poppins } from 'next/font/google';

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
    };
  } | null;
  loading: boolean;
  onBack: () => void;
}

const NAVY = '#1C2653';
const GOLD = '#AA7B32';
const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: '400' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

export default function MobileRecipeDetailSection({
  recipe,
  loading,
  onBack,
}: RecipeDetailProps) {
  const API_BASE_URL = 'https://kznlr.qup.my.id';

  if (loading) {
    return (
      <motion.div
        key="loading-recipe"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div
          className="animate-spin rounded-full h-24 w-24 border-b-2"
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="space-y-4 mb-8 px-4"
      id="resep"
    >
      {/* Kartu konten */}
      <div
        className="relative mx-auto max-w-full min-h-[500px] rounded-2xl bg-white shadow-lg overflow-visible"
        style={{
          borderColor: GOLD,
          borderWidth: 1.5,
          borderStyle: 'solid',
        }}
      >
        <div className="flex flex-col p-4">
          {/* Back Button - Top Right */}
          <motion.button
            onClick={onBack}
            className={`${poppins.className} flex items-center gap-2 text-sm font-semibold absolute top-4 right-4 z-10`}
            style={{ color: NAVY }}
            whileTap={{ scale: 0.96 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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

          {/* Video Section - Top */}
          <div className="w-full mb-4 mt-12">
            <div
              className="rounded-xl overflow-hidden border bg-black/5"
              style={{ borderColor: `${NAVY}1A` }}
            >
              <div className="relative w-full aspect-video">
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
                    <p className="text-gray-500 text-sm">No video available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Section - Bottom */}
          <div className="w-full text-left">
            <div className="max-w-full">
              <h1
                className={`text-2xl leading-tight ${dmSerif.className}`}
                style={{ color: GOLD }}
              >
                {recipe.Name.split(' ')[0]}
              </h1>
              <h2
                className={`text-3xl leading-tight mb-3 ${dmSerif.className}`}
                style={{ color: NAVY }}
              >
                {recipe.Name.split(' ').slice(1).join(' ')}
              </h2>

              <p
                className={`${poppins.className} text-sm mb-4 leading-relaxed`}
                style={{ color: NAVY }}
              >
                {recipe.Description}
              </p>

              <div style={{ color: NAVY }}>
                <p className={`${poppins.className} font-semibold text-base mb-2`}>
                  Bahan:
                </p>
                <div className="text-sm space-y-1.5">
                  {ingredientsList.map((ingredient, index) => (
                    <p key={index} className={`${poppins.className} text-sm`}>
                      {ingredient}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail kecil kiri-bawah - Mobile optimized */}
          {/* {thumbnailUrl && (
            <div className="pointer-events-none absolute -left-4 -bottom-6">
              <motion.div
                className="relative w-24 h-24 sm:w-32 sm:h-32 drop-shadow-lg"
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
          )} */}
        </div>
      </div>
    </motion.div>
  );
}


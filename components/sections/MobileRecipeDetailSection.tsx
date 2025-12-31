"use client";

import React, { useCallback, useRef } from "react";
import { motion } from "framer-motion";
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
    Video?: Array<{ url: string }>;
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

const NAVY = "#1C2653";
const GOLD = "#AA7B32";

const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function MobileRecipeDetailSection({
  recipe,
  loading,
  onBack,
}: RecipeDetailProps) {
  const API_BASE_URL = "https://kznlr.qup.my.id";

  // ukuran frame video (9:16) — kamu bilang videonya sudah pas
  const FRAME_W = 180;
  const FRAME_H = 320;

  // ✅ turunkan konten card (judul/desc/ingredients)
  const CONTENT_TOP_PADDING_PX = 210; // makin besar = konten makin turun

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (v.paused || v.ended) await v.play();
      else v.pause();
    } catch {
      // ignore
    }
  }, []);

  if (loading) {
    return (
      <motion.div
        key="loading-recipe"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-[400px] px-4"
      >
        <div
          className="animate-spin rounded-full h-20 w-20 border-b-2"
          style={{ borderColor: GOLD }}
        />
      </motion.div>
    );
  }

  if (!recipe) return null;

  const videoUrl = recipe.Video?.[0]?.url
    ? `${API_BASE_URL}${recipe.Video[0].url}`
    : null;

  const ingredientsList = recipe.Ingredient.split(/\n\d+\n|\n/)
    .filter((item) => item.trim() && !item.match(/^\d+$/))
    .map((item) => item.trim());

  const words = recipe.Name.split(" ").filter(Boolean);
  const firstWord = words[0] || recipe.Name;
  const restWords = words.slice(1).join(" ");

  return (
    <motion.div
      key="selected-recipe"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="mb-10 px-4"
      id="resep"
    >
      <div className="relative mx-auto w-full max-w-[420px]">
        {/* OVERLAY VIDEO (tanpa image fallback) */}
        {videoUrl && (
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-36 z-20">
            {/* GOLD FRAME (NO PADDING) */}
            <div
              className="rounded-[22px] overflow-hidden bg-white"
              style={{
                width: FRAME_W,
                height: FRAME_H,
                border: `2px solid ${GOLD}`,
                padding: 0, // ✅ no gap
              }}
            >
              <div
                className="relative w-full h-full bg-white"
                onClick={togglePlay} // ✅ tetap bisa klik play/pause
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") togglePlay();
                }}
                style={{ cursor: "pointer" }}
              >
                <video
                  ref={videoRef}
                  src={videoUrl}
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain" // ✅ vertikal asli, no crop
                  controls={false} // ✅ tanpa UI play/pause bawaan
                />
              </div>
            </div>
          </div>
        )}

        {/* CARD */}
        <div
          className="relative mx-auto w-full rounded-[28px] bg-white shadow-lg"
          style={{
            border: `1.5px solid ${GOLD}`,
            marginTop: 150,
          }}
        >
          <div className="px-5 pb-10">
            {/* ✅ Konten diturunkan di sini */}
            <div className="text-center" style={{ paddingTop: CONTENT_TOP_PADDING_PX }}>
              <h1
                className={`${dmSerif.className} text-[34px] leading-[1.05]`}
                style={{ color: GOLD }}
              >
                {firstWord}
              </h1>
              <h2
                className={`${dmSerif.className} text-[34px] leading-[1.05]`}
                style={{ color: NAVY }}
              >
                {restWords || ""}
              </h2>

              <p
                className={`${poppins.className} mt-3 text-[12.5px] leading-relaxed px-3`}
                style={{ color: NAVY }}
              >
                {recipe.Description}
              </p>

              <div className="mt-5 text-center" style={{ color: NAVY }}>
                <p className={`${poppins.className} text-[13px] font-semibold`}>
                  Bahan:
                </p>
                <div className="mt-2 space-y-1 px-6">
                  {ingredientsList.map((ingredient, index) => (
                    <p
                      key={index}
                      className={`${poppins.className} text-[12px] leading-snug`}
                    >
                      {ingredient}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

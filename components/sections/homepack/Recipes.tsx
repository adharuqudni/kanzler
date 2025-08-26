"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type MotionProps } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/* =========================
   Types
   ========================= */
export type Category = "kanzler-sosis" | "kanzler-nugget";

export type Recipe = {
  id: number;
  docId?: string;
  title: string;
  description: string;
  ingredient?: string;
  category: Category;
  image: string;
  video?: string;
};

/* =========================
   Utils
   ========================= */
function isVideoUrlOrMime(url?: string, mime?: string): boolean {
  if (mime?.startsWith?.("video/")) return true;
  if (!url) return false;
  return /\.(mp4|webm|ogg|m3u8)$/i.test(url);
}
function splitIngredients(text?: string) {
  return (text || "")
    .split("\n")
    .map((s) => s.replace(/\t/g, " ").trim())
    .filter(Boolean);
}

/* =========================
   Framer helper (fix TS on type="button")
   ========================= */
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & MotionProps;
const MotionButton: React.FC<ButtonProps> = (props) => <motion.button {...props} />;

/* =========================
   Component
   ========================= */
export default function RecipesView({ items }: { items: Recipe[] }) {
  const [category, setCategory] = useState<Category>("kanzler-sosis");
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setActiveIndex(0);
    setSelectedRecipe(null);
  }, [category, query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (r) =>
        r.category === category &&
        (!q ||
          r.title?.toLowerCase().includes(q) ||
          r.description?.toLowerCase().includes(q))
    );
  }, [items, category, query]);

  const total = filtered.length;
  const VISIBLE = 3;

  const visibleItems = useMemo(() => {
    if (!total) return [];
    if (total <= VISIBLE) return filtered.slice(0, total);
    return Array.from(
      { length: VISIBLE },
      (_, k) => filtered[(activeIndex + k) % total]
    );
  }, [filtered, activeIndex, total]);

  const next = () => total > VISIBLE && setActiveIndex((i) => (i + 1) % total);
  const prev = () => total > VISIBLE && setActiveIndex((i) => (i - 1 + total) % total);

  if (!total) {
    return (
      <section className="py-20 text-center">
        <p className="text-gray-500">Resep tidak ditemukan.</p>
      </section>
    );
  }

  return (
    <div className="w-full">
      {/* Header + Cards (centered) */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-5 sm:px-8 grid grid-cols-1 xl:grid-cols-[1.35fr_2.1fr] gap-8 justify-items-center">
        {/* Left: Title + Filter */}
        <div className="flex flex-col justify-center text-center xl:text-left w-full">
          <h2 className="font-['DM_Serif_Display',serif] text-[#1D2A57] leading-[0.95] text-5xl sm:text-6xl lg:text-[64px]">
            Inspirasi <span className="block font-extrabold">Resep</span>
          </h2>

          <div className="mt-6 flex flex-wrap items-center justify-center xl:justify-start gap-3">
            <span className="rounded-full bg-[#B89E5C] text-white text-sm px-4 py-2">
              Kategori
            </span>

            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="appearance-none rounded-full border border-gray-200 bg-white/90 pl-4 pr-10 py-2 text-sm shadow-sm focus:outline-none"
              >
                <option value="kanzler-sosis">Kanzler Sosis</option>
                <option value="kanzler-nugget">Kanzler Nugget</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-2.5 text-gray-500">▾</span>
            </div>
          </div>
        </div>

        {/* Right: Cards */}
        <div className="flex flex-col justify-center w-full">
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <AnimatePresence initial={false} mode="popLayout">
                {visibleItems.map((r) => {
                  const isActive = selectedRecipe?.id === r.id;
                  return (
                    <MotionButton
                      type="button"
                      key={r.id}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.98 }}
                      transition={{ duration: 0.35 }}
                      onClick={() => setSelectedRecipe(r)}
                      aria-pressed={isActive}
                      className={`relative aspect-[9/16] rounded-[28px] overflow-hidden 
                        border-2 border-[#B89E5C] 
                        shadow-[0_25px_60px_rgba(18,38,63,.25)] bg-white cursor-pointer 
                        focus:outline-none focus:ring-4 focus:ring-[#B89E5C]/60
                        ${isActive ? "ring-4 ring-[#B89E5C]" : ""}`}
                      title={r.title}
                    >
                      <Image
                        src={r.image}
                        alt={r.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1280px) 28vw, 33vw"
                      />
                      <span className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/55 via-black/20 to-transparent text-white text-left">
                        <span className="font-semibold text-lg drop-shadow line-clamp-2">
                          {r.title}
                        </span>
                      </span>
                    </MotionButton>
                  );
                })}
              </AnimatePresence>
            </div>

            {total > VISIBLE && (
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={prev}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#B89E5C] text-white hover:opacity-90"
                  aria-label="Sebelumnya"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={next}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#B89E5C] text-white ring-2 ring-white/70 hover:opacity-90"
                  aria-label="Berikutnya"
                >
                  <ChevronRight />
                </button>
                <span className="text-sm text-[#435068]">
                  {(activeIndex % total) + 1} / {total}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DETAIL — media kiri (short 9:16), teks kanan; tidak terpotong */}
      {selectedRecipe && (
        <div ref={detailRef} className="w-full mt-8 px-5">
          <div className="relative z-50 w-full max-w-5xl mx-auto rounded-3xl bg-white shadow-xl p-6 border-2 border-[#B89E5C]">
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100"
              aria-label="Tutup"
              title="Tutup"
            >
              <X size={18} />
            </button>

            <div className="grid gap-6 md:grid-cols-[340px,1fr] items-start">
              {/* Media kiri: object-contain + bg gelap, tanpa overflow */}
              <div className="relative w-full md:w-[340px]">
                <div className="relative aspect-[9/16] bg-black/90 rounded-2xl">
                  {(() => {
                    const vUrl = selectedRecipe.video;
                    const isVid = isVideoUrlOrMime(vUrl, undefined);
                    if (vUrl && isVid) {
                      return (
                        <video
                          controls
                          className="absolute inset-0 w-full h-full rounded-2xl object-contain"
                          src={vUrl}
                        />
                      );
                    }
                    const mediaUrl = vUrl && !isVid ? vUrl : selectedRecipe.image;
                    return (
                      <Image
                        src={mediaUrl}
                        alt={selectedRecipe.title || "Resep"}
                        fill
                        className="rounded-2xl object-contain"
                        sizes="(max-width: 768px) 100vw, 340px"
                      />
                    );
                  })()}
                </div>
              </div>

              {/* Teks kanan */}
              <div className="min-w-0">
                <h3 className="text-2xl font-['DM_Serif_Display'] text-[#1D2A57] mb-2">
                  {selectedRecipe.title || "Resep"}
                </h3>

                {selectedRecipe.description && (
                  <p className="text-[#435068] mb-3 text-sm leading-relaxed">
                    {selectedRecipe.description}
                  </p>
                )}

                {selectedRecipe.ingredient && (
                  <div>
                    <h4 className="text-base font-semibold text-[#B89E5C] mb-2">Bahan:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-[#435068] text-sm leading-relaxed max-h-80 overflow-auto pr-2">
                      {splitIngredients(selectedRecipe.ingredient).map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

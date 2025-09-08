"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Search } from "lucide-react";
import { SMOOTH_BOUNCY } from "@/lib/motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { DM_Serif_Display } from "next/font/google";

const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400" });

// Brand palette
const NAVY = "#1C2653";
const GOLD = "#B38038";
const DUMMY_VIDEO_URL =
  "https://kznlr.qup.my.id/uploads/Sosis_Kanzler_shorts_youtubeshorts_foryou_viralvideo_fyp_viral_63f1d1186d.mp4";

// Dropdown categories
const productCategories = [
  "Produk Kanzler",
  "Kanzler Singles - Bakso",
  "Kanzler Singles - Sosis",
];

// Data (foto di halaman pertama + dummy video di detail)
const videoData = [
  {
    id: "video-1",
    title: "Creamy Pasta with Chicken Nuggets",
    thumbnail:
      "/assets/ASSET - HOMEPACK/4 ASSET - HOMEPACK/4 ASSET - HOMEPACK PRODUCTS/HOMEPACK/bockwurst/Bockwurst.png",
    category: "Kanzler Singles - Bakso",
    videoUrl: DUMMY_VIDEO_URL,
  },
  {
    id: "video-2",
    title: "Crispy Nugget Sambal Tempong",
    thumbnail:
      "/assets/ASSET - HOMEPACK/4 ASSET - HOMEPACK/4 ASSET - HOMEPACK PRODUCTS/HOMEPACK/bockwurst/Bockwurst.png",
    category: "Kanzler Singles - Bakso",
    videoUrl: DUMMY_VIDEO_URL,
  },
  {
    id: "video-3",
    title: "Chicken Nugget Wrap",
    thumbnail:
      "/assets/ASSET - HOMEPACK/4 ASSET - HOMEPACK/4 ASSET - HOMEPACK PRODUCTS/HOMEPACK/bockwurst/Bockwurst.png",
    category: "Kanzler Singles - Bakso",
    videoUrl: DUMMY_VIDEO_URL,
  },
  {
    id: "video-4",
    title: "Sosis Bakar Bumbu Kecap",
    thumbnail:
      "/assets/ASSET - HOMEPACK/4 ASSET - HOMEPACK/4 ASSET - HOMEPACK PRODUCTS/HOMEPACK/bockwurst/Bockwurst.png",
    category: "Kanzler Singles - Sosis",
    videoUrl: DUMMY_VIDEO_URL,
  },
  {
    id: "video-5",
    title: "Kari Sosis Santan",
    thumbnail:
      "/assets/ASSET - HOMEPACK/4 ASSET - HOMEPACK/4 ASSET - HOMEPACK PRODUCTS/HOMEPACK/bockwurst/Bockwurst.png",
    category: "Kanzler Singles - Sosis",
    videoUrl: DUMMY_VIDEO_URL,
  },
  {
    id: "video-6",
    title: "Sosis Roll Keju",
    thumbnail:
      "/assets/ASSET - HOMEPACK/4 ASSET - HOMEPACK/4 ASSET - HOMEPACK PRODUCTS/HOMEPACK/bockwurst/Bockwurst.png",
    category: "Kanzler Singles - Sosis",
    videoUrl: DUMMY_VIDEO_URL,
  },
  {
    id: "video-7",
    title: "Tumis Sayur Campur",
    thumbnail:
      "/assets/ASSET - HOMEPACK/4 ASSET - HOMEPACK/4 ASSET - HOMEPACK PRODUCTS/HOMEPACK/bockwurst/Bockwurst.png",
    category: "Produk Kanzler",
    videoUrl: DUMMY_VIDEO_URL,
  },
  {
    id: "video-8",
    title: "Sandwich Spesial",
    thumbnail:
      "/assets/ASSET - HOMEPACK/4 ASSET - HOMEPACK/4 ASSET - HOMEPACK PRODUCTS/HOMEPACK/bockwurst/Bockwurst.png",
    category: "Produk Kanzler",
    videoUrl: DUMMY_VIDEO_URL,
  },
  {
    id: "video-9",
    title: "Pizza Mini Homemade",
    thumbnail:
      "/assets/ASSET - HOMEPACK/4 ASSET - HOMEPACK/4 ASSET - HOMEPACK PRODUCTS/HOMEPACK/bockwurst/Bockwurst.png",
    category: "Produk Kanzler",
    videoUrl: DUMMY_VIDEO_URL,
  },
];

export default function RecipeInspirationSection() {
  const [selectedCategory, setSelectedCategory] = useState(
    productCategories[0]
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const currentVideos =
    selectedCategory === "Produk Kanzler"
      ? videoData
      : videoData.filter((v) => v.category === selectedCategory);

  const handleCardClick = (id: string) => setSelectedVideo(id);
  const handleBack = () => setSelectedVideo(null);

  const selectedVideoData = selectedVideo
    ? currentVideos.find((v) => v.id === selectedVideo)
    : null;

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...SMOOTH_BOUNCY, duration: 0.6 },
    },
  };

  return (
    <section className="relative bg-white overflow-visible">
      <div className="relative z-10 flex flex-col">
        <div className="container mx-auto px-8 py-16">
          <AnimatePresence mode="wait">
            {selectedVideo ? (
              // ============ DETAIL: CARD KECIL, CENTER ============
              <motion.div
                key="selected-recipe"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="space-y-6 mb-16"
              >
                {/* Back */}
                <motion.button
                  onClick={handleBack}
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
                        <div className="relative aspect-[9/16] w-[60vw] max-w-[200px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[260px]">
                          <video
                            src={selectedVideoData?.videoUrl || DUMMY_VIDEO_URL}
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
                        <h1
                          className={`${dmSerif.className} text-4xl md:text-5xl leading-[1.1]`}
                          style={{ color: GOLD, fontWeight: 400 }}
                        >
                          Nugget
                        </h1>
                        <h2
                          className={`${dmSerif.className} text-5xl md:text-6xl leading-[1.1] mb-4 md:mb-6`}
                          style={{ color: NAVY, fontWeight: 400 }}
                        >
                          Spaghetti
                        </h2>

                        <p
                          className="text-base md:text-lg mb-6 leading-relaxed"
                          style={{ color: NAVY }}
                        >
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
                        src={
                          selectedVideoData?.thumbnail ||
                          "/assets/placeholder.png"
                        }
                        alt="Kanzler Product"
                        fill
                        className="object-contain"
                        priority={false}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              // ============ HALAMAN PERTAMA ============
              <motion.div
                key="carousel"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-12 gap-8 items-center"
              >
                {/* Left: Title + Filter */}
                <div className="col-span-5 sticky top-16">
                  <motion.div
                    className="mb-12"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <p
                      className={`${dmSerif.className} text-[5.2rem] text-center font-normal leading-[1]`}
                      style={{ color: NAVY }}
                    >
                      Inspirasi
                    </p>
                    <p
                      className={`${dmSerif.className} text-[8rem] text-center font-normal -mt-8 leading-[0.95]`}
                      style={{ color: NAVY }}
                    >
                      Resep
                    </p>
                  </motion.div>

                  {/* Kategori pill */}
                  <motion.div
                    className="relative mb-8"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <div
                      className="flex items-center gap-4 px-4 py-3 rounded-full"
                      style={{ backgroundColor: GOLD }}
                    >
                      <p className="text-white font-semibold text-lg px-2">
                        Kategori
                      </p>

                      {/* Dropdown */}
                      <div className="relative w-full max-w-[360px]">
                        <motion.button
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="w-full bg-white rounded-xl px-6 py-4 text-left flex items-center justify-between font-semibold transition-all duration-300 shadow-md border-2"
                          style={{ color: NAVY, borderColor: GOLD }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-lg">{selectedCategory}</span>
                          <motion.div
                            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            <ChevronDown size={24} color={GOLD} />
                          </motion.div>
                        </motion.button>

                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.97 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.97 }}
                              transition={{ duration: 0.18 }}
                              className="absolute top-full left-0 right-0 bg-white rounded-b-xl shadow-xl z-20 overflow-hidden border-2 border-t-0"
                              style={{ borderColor: GOLD }}
                            >
                              {productCategories.map((category) => (
                                <motion.button
                                  key={category}
                                  onClick={() => {
                                    setSelectedCategory(category);
                                    setIsDropdownOpen(false);
                                  }}
                                  className="w-full px-6 py-4 text-left transition-colors duration-150 border-b last:border-b-0 font-semibold"
                                  style={{
                                    color:
                                      category === selectedCategory
                                        ? "white"
                                        : NAVY,
                                    backgroundColor:
                                      category === selectedCategory
                                        ? NAVY
                                        : "transparent",
                                    borderColor: "#eee",
                                  }}
                                  whileHover={{ x: 4 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  {category}
                                </motion.button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Search circle */}
                      <button
                        className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center ring-1 ring-white/40 shadow-md"
                        style={{ backgroundColor: GOLD }}
                        aria-label="Cari Resep"
                      >
                        <Search size={22} color="white" />
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Right: Carousel FOTO 9:16 */}
                <div className="col-span-7 pl-8">
                  <motion.div
                    variants={fadeInUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <Carousel className="w-full">
                      <CarouselContent className="-ml-4">
                        {currentVideos.map((item) => (
                          <CarouselItem
                            key={item.id}
                            className="pl-4 basis-1/3"
                          >
                            <button
                              className="relative aspect-[9/16] w-full rounded-[28px] overflow-hidden bg-gray-200 group"
                              onClick={() => handleCardClick(item.id)}
                              aria-label={item.title}
                            >
                              <Image
                                src={item.thumbnail}
                                alt={item.title}
                                fill
                                sizes="(min-width: 1024px) 30vw, 90vw"
                                className="object-cover"
                                priority={false}
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                            </button>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-4" />
                      <CarouselNext className="right-4" />
                    </Carousel>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

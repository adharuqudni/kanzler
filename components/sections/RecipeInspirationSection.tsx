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
import RecipeDetailSection from "./RecipeDetailSection";

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

// Data asli
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
            {selectedVideo && selectedVideoData ? (
              <RecipeDetailSection
                videoUrl={selectedVideoData.videoUrl}
                thumbnail={selectedVideoData.thumbnail}
                onBack={handleBack}
              />
            ) : (
              // ============ HALAMAN DEPAN ============
              <motion.div
                key="carousel"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-12 gap-6 items-start"
              >
                {/* Left: Title + Filter */}
                <div className="col-span-4 flex flex-col items-center">
                  <motion.div
                    className="mb-12"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <p
                      className={`${dmSerif.className} text-[5.6rem] text-center font-normal leading-tight`}
                      style={{ color: NAVY }}
                    >
                      Inspirasi
                    </p>
                    <p
                      className={`${dmSerif.className} text-[8.4rem] text-center font-normal leading-tight -mt-6`}
                      style={{ color: NAVY }}
                    >
                      Resep
                    </p>
                  </motion.div>

                  {/* Kategori pill (asli, tidak diubah) */}
                  <motion.div
                    className="relative mb-8"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <div
                      className="flex items-center gap-3 px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: GOLD }}
                    >
                      <p className="text-white font-semibold text-base px-2">
                        Kategori
                      </p>

                      <div className="relative w-full max-w-[300px]">
                        <motion.button
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="w-full bg-white rounded-xl px-4 py-1.5 text-left flex items-center justify-between font-semibold transition-all duration-300 border-2 text-base"
                          style={{ color: NAVY, borderColor: GOLD }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>{selectedCategory}</span>
                          <motion.div
                            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            <ChevronDown size={18} color={GOLD} />
                          </motion.div>
                        </motion.button>
                      </div>

                      {/* Search circle */}
                      <button
                        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center ring-1 ring-white/40"
                        style={{ backgroundColor: GOLD }}
                        aria-label="Cari Resep"
                      >
                        <Search size={14} color="white" />
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Right: Carousel FOTO 9:16 */}
                <div className="col-span-8 pl-6">
                  <motion.div
                    variants={fadeInUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
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

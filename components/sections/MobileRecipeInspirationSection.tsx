"use client";

import React, { useState, useRef, useEffect } from "react";
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
import { DM_Serif_Display, Poppins } from "next/font/google";
import MobileRecipeDetailSection from "./MobileRecipeDetailSection";

const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400" });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

// TypeScript interfaces for API data
interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

interface RecipeImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  url: string;
}

interface VideoFile {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Recipe {
  id: number;
  documentId: string;
  Name: string;
  Category: string;
  Product: string;
  Ingredient: string;
  Description: string;
  Image: RecipeImage;
  Product_IMG?: RecipeImage;
  Video?: VideoFile[];
}

interface ApiResponse {
  data: Recipe[];
}

// Brand palette
const NAVY = "#1C2653";
const GOLD = "#AA7B32";

// Category mapping from API to display names
const categoryMappingAll: Record<string, string> = {
  "singles-bakso": "Singles Bakso",
  "singles-sosis": "Singles Sosis",
  "kanzler-sosis": "Kanzler Sosis",
  "kanzler-nugget": "Kanzler Nugget",
};

// Dropdown categories per page
const PRODUCT_CATEGORIES = {
  homepack: ["Kanzler Sosis", "Kanzler Nugget"],
  singles: ["Singles Sosis", "Singles Bakso"],
  default: [
    "Kanzler Sosis",
    "Kanzler Nugget",
    "Singles Sosis",
    "Singles Bakso",
  ],
};

// API base URL
const API_BASE_URL = "https://kznlr.qup.my.id";

interface MobileRecipeInspirationSectionProps {
  page?: string;
}

export default function MobileRecipeInspirationSection({
  page = "home",
}: MobileRecipeInspirationSectionProps) {
  // choose categories based on page prop
  const productCategories =
    page === "singles"
      ? PRODUCT_CATEGORIES.singles
      : page === "homepack"
      ? PRODUCT_CATEGORIES.homepack
      : PRODUCT_CATEGORIES.default;

  // Active category mapping depending on page
  const categoryMapping: Record<string, string> =
    page === "homepack"
      ? {
          "kanzler-sosis": "Kanzler Sosis",
          "kanzler-nugget": "Kanzler Nugget",
        }
      : page === "singles"
      ? {
          "singles-bakso": "Singles Bakso",
          "singles-sosis": "Singles Sosis",
        }
      : categoryMappingAll;

  const [selectedCategory, setSelectedCategory] = useState<string>(
    productCategories[0]
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipeDetail, setSelectedRecipeDetail] =
    useState<Recipe | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch recipes from API with Image and Video data
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);

        // Fetch Image, Product_IMG, and Video
        const imageResponse = await fetch(
          `${API_BASE_URL}/api/recipes?populate=Image`
        );
        const imageData: ApiResponse = await imageResponse.json();

        const floatingImageResponse = await fetch(
          `${API_BASE_URL}/api/recipes?populate=Product_IMG`
        );
        const floatingImageData: ApiResponse =
          await floatingImageResponse.json();

        const videoResponse = await fetch(
          `${API_BASE_URL}/api/recipes?populate=Video`
        );
        const videoData: ApiResponse = await videoResponse.json();

        // Merge Product_IMG and Video into imageData
        const mergedRecipes = imageData.data.map((imageRecipe) => {
          const floatingRecipe = floatingImageData.data.find(
            (fr) => fr.documentId === imageRecipe.documentId
          );
          const videoRecipe = videoData.data.find(
            (vr) => vr.documentId === imageRecipe.documentId
          );
          return {
            ...imageRecipe,
            Product_IMG: floatingRecipe?.Product_IMG || null,
            Video: videoRecipe?.Video || null,
          };
        });

        setRecipes(mergedRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentVideos =
    selectedCategory === "Semua Produk"
      ? recipes
      : recipes.filter((recipe) => {
          const mappedCategory =
            categoryMapping[recipe.Category] || "Produk Kanzler";

          // normalize helper (lowercase, remove non-alphanum) to allow fuzzy matching
          const normalize = (s: string) =>
            s ? s.toLowerCase().replace(/[^a-z0-9]+/g, "") : "";

          const normMapped = normalize(mappedCategory);
          const normSelected = normalize(selectedCategory);

          // match if either contains the other
          return (
            normMapped.includes(normSelected) ||
            normSelected.includes(normMapped)
          );
        });

  const handleCardClick = (id: string) => {
    setSelectedVideo(id);
    // Find the recipe from existing data
    const recipe = recipes.find((r) => r.documentId === id);
    if (recipe) {
      setSelectedRecipeDetail(recipe);
    }
  };

  const handleBack = () => {
    setSelectedVideo(null);
    setSelectedRecipeDetail(null);
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...SMOOTH_BOUNCY, duration: 0.6 },
    },
  };

  // Animation variants for carousel items
  const carouselItemVariants = {
    hidden: {
      opacity: 0,
      x: 100,
      scale: 0.9,
    },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        ...SMOOTH_BOUNCY,
        duration: 0.8,
        delay: index * 0.1,
      },
    }),
  };

  // Container animation for the carousel
  const carouselContainerVariants = {
    hidden: {
      opacity: 1,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className="relative bg-white overflow-visible min-h-screen">
      <div className="relative z-10 flex flex-col px-4 py-8">
        <AnimatePresence mode="wait">
          {selectedVideo ? (
            <MobileRecipeDetailSection
              recipe={selectedRecipeDetail}
              loading={loadingDetail}
              onBack={handleBack}
            />
          ) : (
            // ============ MOBILE LAYOUT ============
            <motion.div
              key="carousel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col"
            >
              {/* Title Section */}
              <motion.div
                className="mb-6 text-center"
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <p
                  className={`${dmSerif.className} text-6xl sm:text-7xl text-center font-normal leading-tight`}
                  style={{ color: NAVY }}
                >
                  Inspirasi
                </p>
                <p
                  className={`${dmSerif.className} text-7xl sm:text-8xl text-center font-normal leading-tight -mt-2`}
                  style={{ color: NAVY }}
                >
                  Resep
                </p>
              </motion.div>

              {/* Category Filter */}
              <motion.div
                className="relative mb-6"
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full w-full"
                  style={{ backgroundColor: GOLD }}
                >
                  <p
                    className={`${poppins.className} text-white font-semibold text-sm px-2 whitespace-nowrap`}
                  >
                    Kategori
                  </p>

                  <div
                    ref={dropdownRef}
                    className="relative w-full max-w-[200px] min-w-[200px]"
                  >
                    <motion.button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`${poppins.className} w-full bg-white rounded-xl px-3 py-1.5 text-left flex items-center justify-between font-semibold transition-all duration-300 border-2 text-sm min-w-[200px]`}
                      style={{ color: NAVY, borderColor: GOLD }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="truncate">{selectedCategory}</span>
                      <motion.div
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDown size={16} color={GOLD} />
                      </motion.div>
                    </motion.button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border-2 shadow-lg z-50 overflow-hidden"
                          style={{ borderColor: GOLD }}
                        >
                          {productCategories.map((category) => (
                            <motion.button
                              key={category}
                              onClick={() => {
                                setSelectedCategory(category);
                                setIsDropdownOpen(false);
                              }}
                              className={`${
                                poppins.className
                              } w-full px-4 py-2.5 text-left text-sm font-semibold transition-all duration-200 focus:outline-none ${
                                selectedCategory === category
                                  ? "bg-[#1C2653] text-white"
                                  : "bg-white text-[#1C2653] active:bg-[#1C2653] active:text-white"
                              }`}
                              whileTap={{ scale: 0.98 }}
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
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center ring-1 ring-white/40"
                    style={{ backgroundColor: GOLD }}
                    aria-label="Cari Resep"
                  >
                    <Search size={12} color="white" />
                  </button>
                </div>
              </motion.div>

              {/* Carousel Section */}
              <Carousel className="w-full">
                <CarouselContent className="-ml-3">
                  {currentVideos.map((recipe, index) => (
                    <CarouselItem
                      key={`${selectedCategory}-${recipe.documentId}`}
                      className="pl-3 basis-[80%] sm:basis-[45%] md:basis-[33%]"
                    >
                      <motion.button
                        className="relative aspect-[9/16] w-full rounded-3xl overflow-hidden bg-gray-200 group shadow-lg"
                        onClick={() => handleCardClick(recipe.documentId)}
                        aria-label={recipe.Name}
                        variants={carouselItemVariants}
                        initial="hidden"
                        animate="visible"
                        custom={index}
                        whileTap={{
                          scale: 0.95,
                          transition: { duration: 0.1 },
                        }}
                      >
                        <Image
                          src={`${API_BASE_URL}${
                            recipe.Image.formats?.medium?.url ||
                            recipe.Image.url
                          }`}
                          alt={recipe.Name}
                          fill
                          sizes="(max-width: 640px) 80vw, 45vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-active:bg-black/20 transition-colors duration-300" />
                      </motion.button>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

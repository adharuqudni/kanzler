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
import RecipeDetailSection from "./RecipeDetailSection";
import { useResponsive } from "@/hooks/use-responsive";

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
  Product_IMG?: RecipeImage; // Tambahkan baris ini
  Video?: VideoFile[];
}

interface ApiResponse {
  data: Recipe[];
}

// Brand palette
const NAVY = "#1C2653";
const GOLD = "#AA7B32";
// (tidak perlu dummy video URL — gunakan data dari API)

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
  default: ["Kanzler Sosis", "Kanzler Nugget", "Singles Sosis", "Singles Bakso"],
};
 
// API base URL
const API_BASE_URL = "https://kznlr.qup.my.id";

// Transform API recipe to video format (pakai Video[0].url dari API jika tersedia)
const transformRecipeToVideo = (recipe: Recipe) => ({
  id: recipe.documentId,
  title: recipe.Name,
  thumbnail: `${API_BASE_URL}${recipe.Image.formats?.medium?.url || recipe.Image.url}`,
  category: categoryMappingAll[recipe.Category] || "Produk Kanzler",
  videoUrl: recipe.Video?.[0]?.url ? `${API_BASE_URL}${recipe.Video[0].url}` : null,
  description: recipe.Description,
  ingredient: recipe.Ingredient,
});

interface RecipeInspirationSectionProps {
  page?: string;
}

export default function RecipeInspirationSection({ page = "home" }: RecipeInspirationSectionProps) {
  // choose categories based on page prop
  const productCategories = page === "singles"
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

  const [selectedCategory, setSelectedCategory] = useState<string>(productCategories[0]);
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
   const [recipes, setRecipes] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
   const [selectedRecipeDetail, setSelectedRecipeDetail] = useState<Recipe | null>(null);
   const [loadingDetail, setLoadingDetail] = useState(false);
   const dropdownRef = useRef<HTMLDivElement>(null);
  // page prop is available here for conditional behavior if needed
  // e.g. use `page` to adjust filtering/fetching/UI for different pages

  // Add responsive hook
  const { 
    getResponsiveDimensions, 
    getResponsiveSpacing,
    getScale,
    screenSize 
  } = useResponsive();

  // Get responsive dimensions
  const buttonScale = getScale();
  const carouselItemSize = getResponsiveDimensions(400, 300);

  // Fetch recipes from API with Image and Video data
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);

        // Fetch Image, Product_IMG, and Video
        const imageResponse = await fetch(`${API_BASE_URL}/api/recipes?populate=Image`);
        const imageData: ApiResponse = await imageResponse.json();

        const floatingImageResponse = await fetch(`${API_BASE_URL}/api/recipes?populate=Product_IMG`);
        const floatingImageData: ApiResponse = await floatingImageResponse.json();

        const videoResponse = await fetch(`${API_BASE_URL}/api/recipes?populate=Video`);
        const videoData: ApiResponse = await videoResponse.json();

        // Merge Product_IMG and Video into imageData
        const mergedRecipes = imageData.data.map(imageRecipe => {
          const floatingRecipe = floatingImageData.data.find(fr => fr.documentId === imageRecipe.documentId);
          const videoRecipe = videoData.data.find(vr => vr.documentId === imageRecipe.documentId);
          return {
            ...imageRecipe,
            Product_IMG: floatingRecipe?.Product_IMG || null,
            Video: videoRecipe?.Video || null
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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
          const mappedCategory = categoryMapping[recipe.Category] || "Produk Kanzler";

          // normalize helper (lowercase, remove non-alphanum) to allow fuzzy matching
          const normalize = (s: string) =>
            s ? s.toLowerCase().replace(/[^a-z0-9]+/g, "") : "";

          const normMapped = normalize(mappedCategory);
          const normSelected = normalize(selectedCategory);

          // match if either contains the other
          return normMapped.includes(normSelected) || normSelected.includes(normMapped);
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

  // Animation variants for carousel items entering from right
  const carouselItemVariants = {
    hidden: { 
      opacity: 0, 
      x: 600, // Large off-screen distance
      scale: 0.9
    },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        ...SMOOTH_BOUNCY,
        duration: 1.0,
        delay: index * 0.15, // Staggered delay for each item
      },
    }),
  };

  // Container animation for the carousel
  const carouselContainerVariants = {
    hidden: { 
      opacity: 1 // Keep container visible so children can be detected
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section className="relative bg-white overflow-visible mt-responsive-16">
      <div className="relative z-10 flex flex-col">
        <div className="responsive-container py-responsive-16">
          <AnimatePresence mode="wait">
            {selectedVideo ? (
              <RecipeDetailSection
                recipe={selectedRecipeDetail}
                loading={loadingDetail}
                onBack={handleBack}
              />
            ) : (
              // ============ HALAMAN DEPAN ============
              <motion.div
                key="carousel"
                initial={{ opacity: 0, x: -50 * buttonScale }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 * buttonScale }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-12 gap-responsive-6 items-start"
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
                      <p className={`${poppins.className} text-white font-semibold text-base px-2`}>
                        Kategori
                      </p>

                      <div ref={dropdownRef} className="relative w-full max-w-[280px] min-w-[280px]">
                        <motion.button
                           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                           className={`${poppins.className} w-full bg-white rounded-xl px-4 py-1.5 text-left flex items-center justify-between font-semibold transition-all duration-300 border-2 text-base min-w-[280px]`}
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
                              {productCategories.map((category, index) => (
                                <motion.button
                                  key={category}
                                  onClick={() => {
                                    setSelectedCategory(category);
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`${poppins.className} w-full px-4 py-2.5 text-left text-base font-semibold transition-all duration-200 focus:outline-none ${
                                    selectedCategory === category
                                      ? "bg-[#1C2653] text-white" // selected = navy bg, white text
                                      : "bg-white text-[#1C2653] hover:bg-[#1C2653] hover:text-white" // default = white bg navy text, hover -> navy bg white text
                                  }`}
                                  whileHover={{ scale: 1.02 }}
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
                  {loading ? (
                    // Loading skeleton
                    <div className="flex gap-4">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="aspect-[9/16] w-1/3 rounded-[28px] bg-gray-200 animate-pulse"
                        />
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      key={selectedCategory} // Force re-animation when category changes
                      variants={carouselContainerVariants}
                      initial="hidden"
                      animate="visible"
                      viewport={{ margin: "0px 0px -200px 0px" }}
                    >
                      <Carousel className="w-full">
                        <CarouselContent className="-ml-4">
                          {currentVideos.map((recipe, index) => (
                          <CarouselItem
                            key={`${selectedCategory}-${recipe.documentId}`} // Unique key per category
                            className="pl-4 basis-1/3"
                          >
                            <motion.button
                              className="relative aspect-[9/16] w-full rounded-[28px] overflow-hidden bg-gray-200 group"
                              onClick={() => handleCardClick(recipe.documentId)}
                              aria-label={recipe.Name}
                              variants={carouselItemVariants}
                              initial="hidden"
                              animate="visible"
                              custom={index}
                              whileHover={{ 
                                scale: 1.05,
                                transition: { duration: 0.3, ease: "easeOut" }
                              }}
                              whileTap={{ 
                                scale: 0.95,
                                transition: { duration: 0.1 }
                              }}
                            >
                              <Image
                                src={`${API_BASE_URL}${recipe.Image.formats?.medium?.url || recipe.Image.url}`}
                                alt={recipe.Name}
                                fill
                                sizes="(min-width: 1024px) 30vw, 90vw"
                                className="object-cover"
                                priority={false}
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                            </motion.button>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                          <CarouselPrevious className="left-4" />
                          <CarouselNext className="right-4" />
                        </Carousel>
                      </motion.div>
                    )}
                  </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

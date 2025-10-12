"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SMOOTH_BOUNCY } from "@/lib/motion";
import { DM_Serif_Display, Poppins, Paytone_One } from "next/font/google";
import { useResponsive } from "@/hooks/use-responsive";
import { SafeHTML } from "@/lib/sanitize-html";

const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const paytoneOne = Paytone_One({
  subsets: ["latin"],
  weight: "400",
});

// API Product data type
interface ApiProduct {
  id: number;
  documentId: string;
  Name: string;
  Description: string;
  Category: string;
  Product: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Image: ApiImage[];
}

interface ApiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
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

interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

interface ApiResponse {
  data: ApiProduct[];
}

// Product data type for component
export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  secondImage?: string | null;
  details: string;
  type?: string;
}

export interface ProductData {
  [key: string]: Product[];
}

interface ProductCarouselSectionProps {
  backgroundImage?: string;
  title?: string;
  defaultCategory?: string;
  productType?: "singles" | "homepack"; // Add product type prop
}

export default function ProductCarouselSection({
  backgroundImage = "/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES SPLIT BACKGROUND.png",
  title = "Products",
  defaultCategory,
  productType = "singles", // Default to singles
}: ProductCarouselSectionProps) {
  const [productData, setProductData] = useState<ProductData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add responsive hook
  const { 
    getResponsiveDimensions, 
    getResponsiveSpacing,
    getScale,
    screenSize 
  } = useResponsive();

  // Get responsive dimensions for images and components
  const arrowSize = getResponsiveDimensions(64);
  const productImageSize = getResponsiveDimensions(300);
  const categoryTitleScale = getScale();

  const categories = Object.keys(productData);
  const initialCategory = defaultCategory || categories[0];

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<
    "left" | "right"
  >("right");

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Fetch products and images separately
        const [productsResponse, imagesResponse] = await Promise.all([
          fetch("https://kznlr.qup.my.id/api/products"),
          fetch("https://kznlr.qup.my.id/api/products?populate=Image"),
        ]);

        if (!productsResponse.ok || !imagesResponse.ok) {
          throw new Error("Failed to fetch products");
        }

        const productsData: ApiResponse = await productsResponse.json();
        const imagesData: ApiResponse = await imagesResponse.json();

        // Create a map of product ID to images
        const imageMap = new Map<number, ApiImage[]>();
        imagesData.data.forEach((product) => {
          imageMap.set(product.id, product.Image || []);
        });

        // Filter products by product type and transform data
        const filteredProducts = productsData.data.filter(
          (product) => product.Product === productType
        );

        // Group products by category and transform to component format
        const groupedProducts: ProductData = {};

        filteredProducts.forEach((apiProduct) => {
          // Extract category name (e.g., "singles-sosis" -> "sosis")
          const categoryName = apiProduct.Category.split("-")[1];

          if (!groupedProducts[categoryName]) {
            groupedProducts[categoryName] = [];
          }

          // Get images for this product from the image map
          const productImages = imageMap.get(apiProduct.id) || [];

          // Find the product image (not mockup) - usually the .png file
          const productImage = productImages.find(
            (img) =>
              img.name.includes(".png") ||
              (!img.name.includes("mockup") && !img.name.includes("thermopack"))
          );

          // Find the mockup/thermopack image
          const mockupImage = productImages.find(
            (img) =>
              img.name.includes("mockup") || img.name.includes("thermopack")
          );

          // Construct primary image URL - use the API base URL
          const imageUrl = productImage
            ? `https://kznlr.qup.my.id${productImage.url}`
            : `/assets/ASSET - ${productType.toUpperCase()}/3 ASSET - ${productType.toUpperCase()}/3 ASSET - ${productType.toUpperCase()} PRODUCTS/${productType.toUpperCase()} - ${categoryName.toUpperCase()}/${apiProduct.Name.toLowerCase().replace(
                /\s+/g,
                "-"
              )}.png`;

          // Construct secondary image URL (mockup/thermopack)
          const secondImageUrl = mockupImage
            ? `https://kznlr.qup.my.id${mockupImage.url}`
            : null;

          // Transform API product to component product format
          const transformedProduct: Product = {
            id: apiProduct.documentId,
            name: apiProduct.Name,
            description: apiProduct.Description,
            details: apiProduct.Description, // Using description as details
            image: imageUrl,
            secondImage: secondImageUrl,
            type: categoryName,
          };

          groupedProducts[categoryName].push(transformedProduct);
        });

        setProductData(groupedProducts);

        // Set initial category if not provided
        if (!defaultCategory && Object.keys(groupedProducts).length > 0) {
          setActiveCategory(Object.keys(groupedProducts)[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productType, defaultCategory]);

  // Update activeCategory when productData changes
  useEffect(() => {
    if (categories.length > 0 && !categories.includes(activeCategory)) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  const currentProducts = productData[activeCategory] || [];
  const currentProduct = currentProducts[currentIndex];

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentIndex(0); // Reset to first product when switching category
  };

  const handleNext = () => {
    setAnimationDirection("right");
    setCurrentIndex((prev) => (prev + 1) % currentProducts.length);
  };

  const handlePrev = () => {
    setAnimationDirection("left");
    setCurrentIndex(
      (prev) => (prev - 1 + currentProducts.length) % currentProducts.length
    );
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...SMOOTH_BOUNCY, duration: 0.6 },
    },
  };

  // Get category description based on product type and category
  const getCategoryDescription = (category: string) => {
    if (productType === "homepack") {
      if (category === "homepack-nugget") {
        return (
          <p className="text-center w-full max-w-xl text-xl">
            Nugget kualitas premium yang <br />
            <em className="italic">Extra Crispy, Extra Meaty</em> <br />
            <em className="italic">Extra Juicy</em>
          </p>
        );
      } else if (category === "sosis") {
        return (
          <p className="text-center w-full max-w-xl text-xl">
            Sosis dengan cita rasa otentik yang <br />
            lezat. Mudah diolah menjadi menu <br />
            masakan setiap hari.
          </p>
        );
      }
    } else if (productType === "singles") {
      if (category === "sosis") {
        return (
          <p className="text-center w-full max-w-xl text-xl">
            Sosis siap makan dengan berbagai varian <br />
            rasa. Praktis bisa dimakan di mana pun & <br />
            kapan pun.
          </p>
        );
      } else if (category === "bakso") {
        return (
          <p className="text-center w-full max-w-xl text-xl">
            Bakso siap makan dengan berbagai varian <br />
            rasa. Praktis dan bisa dimakan langsung
            <br />
            ataupun jadi topping mie.
          </p>
        );
      }
    }
    return null;
  };

  // Loading state
  if (loading) {
    return (
      <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
        <div className="text-white text-2xl">Loading products...</div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
        <div className="text-red-500 text-2xl">Error: {error}</div>
      </section>
    );
  }

  // No products state
  if (categories.length === 0) {
    return (
      <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
        <div className="text-white text-2xl">No products found</div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Split Background using actual assets */}
      <div className="absolute inset-0">
        {/* Main split background */}
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="responsive-container py-responsive-16">
          <div className="grid grid-cols-12 items-center">
            {/* Left Side - Category Toggle */}
            <div className="col-span-4">
              <div className="space-responsive-8 items-center justify-center text-center mx-20 mb-responsive-8">
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`flex items-center gap-4 text-left w-[500px] transition-all duration-300 justify-center mx-auto ${
                      activeCategory === category
                        ? "text-white"
                        : "text-white/60 hover:text-white/80"
                    }`}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y:
                          activeCategory === category
                            ? index === 0
                              ? 90 * categoryTitleScale
                              : 0
                            : index === 0
                            ? 0
                            : -80 * categoryTitleScale,
                        scale:
                          activeCategory === category
                            ? index === 0
                              ? 1.4 * categoryTitleScale
                              : 1.4 * categoryTitleScale
                            : index === 0
                            ? 0.8 * categoryTitleScale
                            : 0.8 * categoryTitleScale,
                        transition: { ...SMOOTH_BOUNCY, duration: 0.2 },
                      },
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="flex items-center ml-4 mr-8">
                      <h2
                        className={`${
                          defaultCategory === "nugget"
                            ? dmSerif.className
                            : paytoneOne.className
                        } text-responsive-6xl font-bold`}
                        style={{ fontSize: `${6 * categoryTitleScale}rem` }}
                      >
                        {category.toUpperCase()}
                      </h2>
                      <div className="w-12 h-12 relative mt-4">
                        <Image
                          src="/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES ARROW CIRCLE.png"
                          alt="Arrow Circle"
                          style={{
                            transform: `rotate(${
                              activeCategory === category ? "0" : "270"
                            }deg) scale(${categoryTitleScale})`,
                          }}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Category Description */}
              <motion.div
                className="mt-4 text-white/80 w-full flex justify-start ml-[15%]"
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {getCategoryDescription(activeCategory)}
              </motion.div>
            </div>

            {/* Center - Product Image Only (No Mockup) */}
            <div className="col-span-4 flex justify-center items-center relative mb-responsive-16">
              {/* Back Image (Most Background) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${currentIndex}-back`}
                  className="absolute flex justify-center items-center"
                  style={{
                    zIndex: 30,
                    width: `${125 * categoryTitleScale}px`,
                    height: `${400 * categoryTitleScale}px`,
                    left: '45%',
                    marginLeft: `${-50 * categoryTitleScale}px`,
                    top: '0px',
                    transformOrigin: 'left bottom',
                  }}
                  initial={{
                    opacity: 1,
                    scale: 0.85 * categoryTitleScale,
                    rotate: 5,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 0.95 * categoryTitleScale,
                    rotate: 15,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.85 * categoryTitleScale,
                    rotate: 20,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Image
                    src={currentProduct?.secondImage || ''}
                    alt="Back Product"
                    width={parseInt(productImageSize.width)}
                    height={parseInt(productImageSize.height)}
                    className="object-contain drop-shadow-lg"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Foreground Image (Current Product) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${currentIndex}-foreground`}
                  className="absolute flex justify-center items-center"
                  style={{
                    zIndex: 50,
                    width: `${400 * categoryTitleScale}px`,
                    height: `${400 * categoryTitleScale}px`,
                    left: '50%',
                    marginLeft: `${-200 * categoryTitleScale}px`,
                    top: `${-50 * categoryTitleScale}px`,
                  }}
                  initial={{
                    opacity: 1,
                    scale: 1 * categoryTitleScale,
                    rotate: -5,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1 * categoryTitleScale,
                    rotate: -5,
                  }}
                  transition={{ ...SMOOTH_BOUNCY, duration: 0.8 }}
                >
                  <Image
                    src={currentProduct?.image || ''}
                    alt={`${currentProduct?.name || 'Product'} Foreground`}
                    width={parseInt(productImageSize.width)}
                    height={parseInt(productImageSize.height)}
                    className={`object-contain drop-shadow-2xl mr-${24 * categoryTitleScale}`}
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side - Product Info */}
            <div className="col-span-4 flex flex-col justify-center items-center text-center">
              {/* Navigation Arrows with Product Name in between */}
              <div className="flex items-center justify-center mt-responsive-12 mb-responsive-8">
                {' '}
                {/* Reduced space-x-8 to space-x-4 */}
                <motion.button
                  onClick={handlePrev}
                  className="flex items-center justify-center transition-transform duration-300 hover:scale-110"
                  style={{
                    width: `${64 * categoryTitleScale}px`,
                    height: `${64 * categoryTitleScale}px`,
                  }}
                  whileHover={{ scale: 1.1 * categoryTitleScale }}
                  whileTap={{ scale: 0.95 * categoryTitleScale }}
                >
                  <Image
                    src="/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES ARROW NEXT.png"
                    alt="Previous"
                    width={parseInt(arrowSize.width)}
                    height={parseInt(arrowSize.height)}
                    className="object-contain rotate-180"
                  />
                </motion.button>
                {/* Product Name between arrows */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeCategory}-${currentIndex}-title`}
                    initial={{
                      opacity: 0,
                      x: animationDirection === "right" ? 50 * categoryTitleScale : -50 * categoryTitleScale,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      x: animationDirection === "right" ? -50 * categoryTitleScale : 50 * categoryTitleScale,
                    }}
                    transition={{ ...SMOOTH_BOUNCY, duration: 0.5 }}
                    className="text-center w-[300px] flex-shrink-0"
                  >
                    <h3
                      className={`${
                        defaultCategory !== "nugget"
                          ? paytoneOne.className
                          : dmSerif.className
                      } text-4xl font-bold text-[#1C2653] mb-2 whitespace-normal break-words leading-tight`}
                      title={currentProduct?.name}
                    >
                      {currentProduct?.name || "Product Name"}
                    </h3>
                  </motion.div>
                </AnimatePresence>
                <motion.button
                  onClick={handleNext}
                  className="flex items-center justify-center transition-transform duration-300 hover:scale-110"
                  style={{
                    width: `${64 * categoryTitleScale}px`,
                    height: `${64 * categoryTitleScale}px`,
                  }}
                  whileHover={{ scale: 1.1 * categoryTitleScale }}
                  whileTap={{ scale: 0.95 * categoryTitleScale }}
                >
                  <Image
                    src="/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES ARROW NEXT.png"
                    alt="Next"
                    width={parseInt(arrowSize.width)}
                    height={parseInt(arrowSize.height)}
                    className="object-contain"
                  />
                </motion.button>
              </div>

              {/* Product Info Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${currentIndex}-info`}
                 
                  className="space-y-6 max-w-sm"
                >
                  {/* Product Description */}
                  <motion.div
                    className={`leading-relaxed text-xl text-[#1C2653] text-center ${poppins.className} w-[400px] ml-[-10px] h-[25vh]`}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <SafeHTML 
                      html={currentProduct?.details || "Product details"}
                      className="w-full h-full"
                    />
                  </motion.div>

                  {/* Recipe Button */}
                  <motion.button
                    className="bg-[#AA7B32] hover:bg-[#8A6B2A] text-white px-10 py-3 rounded-full
             font-medium ring-1 ring-white/40
             shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_2px_6px_rgba(0,0,0,0.12)]
             transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] focus:outline-none"
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    whileHover={{}}
                    whileTap={{}}
                  >
                    Resep
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Top curved white overlay */}
      <div className="absolute top-0 left-0 w-full h-[20vw] overflow-hidden border-0">
        <div
          className="absolute top-0 left-0 w-full h-full border-0"
          style={{
            background: "#fff",
            clipPath: "ellipse(150% 100% at 50% 0%)",
            transform: "translateY(-80%)",
          }}
        />
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full scale-y-[-1]">
        <svg
          height="80"
          viewBox="0 0 500 80"
          preserveAspectRatio="none"
          className="w-full"
        >
          <path
            d="M0,80 Q250,0 500,80 L500,0 L0,0 Z"
            fill="white"
            fillRule="evenodd"
          />
        </svg>
      </div>
    </section>
  );
}

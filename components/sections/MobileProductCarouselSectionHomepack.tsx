'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { SMOOTH_BOUNCY } from '@/lib/motion';
import { DM_Serif_Display, Poppins, Paytone_One } from 'next/font/google';

const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: '400' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});
const paytoneOne = Paytone_One({
  subsets: ['latin'],
  weight: '400',
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
  productType?: 'singles' | 'homepack';
}

export default function MobileProductCarouselSection({
  backgroundImage = '/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES SPLIT BACKGROUND.png',
  title = 'Products',
  defaultCategory,
  productType = 'homepack',
}: ProductCarouselSectionProps) {
  const [productData, setProductData] = useState<ProductData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = Object.keys(productData);
  const initialCategory = defaultCategory || categories[0];

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<
    'left' | 'right'
  >('right');

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Fetch products and images separately
        const [productsResponse, imagesResponse] = await Promise.all([
          fetch('https://kznlr.qup.my.id/api/products'),
          fetch('https://kznlr.qup.my.id/api/products?populate=Image'),
        ]);

        if (!productsResponse.ok || !imagesResponse.ok) {
          throw new Error('Failed to fetch products');
        }

        const productsData: ApiResponse = await productsResponse.json();
        const imagesData: ApiResponse = await imagesResponse.json();

        // Create a map of product ID to images
        const imageMap = new Map<number, ApiImage[]>();
        imagesData.data.forEach((product) => {
          imageMap.set(product.id, product.Image || []);
        });

        // Filter products by product type and only include 'homepack' products
        const filteredProducts = productsData.data.filter(
          (product) => product.Product === productType
        );

        // Group products by category and transform to component format
        const groupedProducts: ProductData = {};

        filteredProducts.forEach((apiProduct) => {
          // Extract category name (e.g., "homepack-nugget" -> "nugget")
          const categoryName = apiProduct.Category.split('-')[1];

          if (!groupedProducts[categoryName]) {
            groupedProducts[categoryName] = [];
          }

          // Get images for this product from the image map
          const productImages = imageMap.get(apiProduct.id) || [];

          // Find the product image (not mockup) - usually the .png file
          const productImage = productImages.find(
            (img) =>
              img.name.includes('.png') ||
              (!img.name.includes('mockup') && !img.name.includes('thermopack'))
          );

          // Construct image URL - use the API base URL
          const imageUrl = productImage
            ? `https://kznlr.qup.my.id${productImage.url}`
            : `/assets/ASSET - ${productType.toUpperCase()}/3 ASSET - ${productType.toUpperCase()}/3 ASSET - ${productType.toUpperCase()} PRODUCTS/${productType.toUpperCase()} - ${categoryName.toUpperCase()}/${apiProduct.Name.toLowerCase().replace(
                /\s+/g,
                '-'
              )}.png`;

          // Transform API product to component product format
          const transformedProduct: Product = {
            id: apiProduct.documentId,
            name: apiProduct.Name,
            description: apiProduct.Description,
            details: apiProduct.Description,
            image: imageUrl,
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
        setError(err instanceof Error ? err.message : 'An error occurred');
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
    setCurrentIndex(0);
  };

  const handleNext = () => {
    setAnimationDirection('right');
    setCurrentIndex((prev) => (prev + 1) % currentProducts.length);
  };

  const handlePrev = () => {
    setAnimationDirection('left');
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
    if (productType === 'homepack') {
      if (category === 'nugget') {
        return (
          <p
            className={`text-center w-full max-w-sm text-base ${poppins.className}`}
          >
            Nugget kualitas premium yang <br />
            <em className="italic">Extra Crispy, Extra Meaty</em> <br />
            <em className="italic">Extra Juicy</em>
          </p>
        );
      } else if (category === 'sosis') {
        return (
          <p
            className={`text-center w-full max-w-sm text-base ${poppins.className}`}
          >
            Sosis dengan cita rasa otentik yang <br />
            lezat. Mudah diolah menjadi menu <br />
            masakan setiap hari.
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
    <section
      className="relative min-h-screen overflow-hidden "
      style={{ backgroundColor: '#C7C8CA' }}
    >
      {/* Split Background using actual assets */}
      <div className="absolute inset-0 h-[50vh]">
        <Image
          src="/assets/gradient-9x16.jpg"
          alt="Background Biru"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Main Content */}
      <div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12"
        id="produk"
      >
        {/* Category Toggle - Horizontal Scroll */}
        <div className="w-full mb-2">
          <div className="flex flex-col justify-center items-center overflow-x-auto pb-2 hide-scrollbar">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`flex items-center  gap-2 px-4 rounded-full transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category ? 'text-white' : 'text-white'
                }`}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: activeCategory === category
                      ? index === 0
                        ? 0
                        : 0
                      : index === 0
                      ? 0
                      : 0,
                    x: activeCategory === category ? 0 : 0,
                    scale: activeCategory === category
                      ? index === 0
                        ? 1.4
                        : 1.4
                      : index === 0
                      ? 0.8
                      : 0.8,
                    transition: { ...SMOOTH_BOUNCY, duration: 0.25 },
                  },
                }}
                initial="hidden"
                animate="visible"
                whileTap={{ scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="ml-4 flex items-center">
                  <h2
                    className={`${
                      defaultCategory === 'nugget'
                        ? dmSerif.className
                        : paytoneOne.className
                    } text-2xl sm:text-3xl font-bold`}
                  >
                    {category.toUpperCase()}
                  </h2>
                  <div className="w-6 h-6 relative ml-1 content-center">
                    <Image
                      src="/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES ARROW CIRCLE.png"
                      alt="Arrow Circle"
                      style={{
                        transform: `rotate(${
                          activeCategory === category ? '0' : '270'
                        }deg)`,
                      }}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Category Description */}
        <motion.div
          className="mb-6 text-white/80 w-full flex justify-center"
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {getCategoryDescription(activeCategory)}
        </motion.div>

        {/* Product Image - Simplified Single View */}
        <div className="flex-1 flex items-center justify-center relative w-full mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${currentIndex}`}
              className="flex justify-center items-center"
              initial={{
                opacity: 0,
                x: animationDirection === 'right' ? 50 : -50,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: animationDirection === 'right' ? -50 : 50,
                scale: 0.9,
              }}
              transition={{ ...SMOOTH_BOUNCY, duration: 0.5 }}
            >
              <Image
                src={currentProduct?.image || ''}
                alt={currentProduct?.name || 'Product'}
                width={250}
                height={250}
                className="object-contain drop-shadow-2xl"
                priority
                unoptimized
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Product Info */}
        <div className="w-full flex flex-col items-center">
          {/* Navigation Arrows with Product Name */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.button
              onClick={handlePrev}
              className="w-12 h-12 flex items-center justify-center transition-transform duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES ARROW NEXT.png"
                alt="Previous"
                width={48}
                height={48}
                className="object-contain rotate-180"
              />
            </motion.button>

            {/* Product Name */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${currentIndex}-title`}
                initial={{
                  opacity: 0,
                  x: animationDirection === 'right' ? 30 : -30,
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: animationDirection === 'right' ? -30 : 30,
                }}
                transition={{ ...SMOOTH_BOUNCY, duration: 0.4 }}
                className="text-center max-w-[200px]"
              >
                <h3
                  className={`${
                    defaultCategory !== 'nugget'
                      ? paytoneOne.className
                      : dmSerif.className
                  } text-2xl sm:text-3xl font-bold text-[#1C2653] mb-2 whitespace-normal break-words leading-tight`}
                  title={currentProduct?.name}
                >
                  {currentProduct?.name || 'Product Name'}
                </h3>
              </motion.div>
            </AnimatePresence>

            <motion.button
              onClick={handleNext}
              className="w-12 h-12 flex items-center justify-center transition-transform duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES ARROW NEXT.png"
                alt="Next"
                width={48}
                height={48}
                className="object-contain"
              />
            </motion.button>
          </div>

          {/* Product Description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${currentIndex}-info`}
              className="max-w-sm flex flex-col items-center"
            >
              <motion.p
                className={`leading-relaxed text-base text-[#1C2653] text-center ${poppins.className} mb-4 px-4`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {renderDetailsHtml(currentProduct?.details)}
              </motion.p>

              {/* Recipe Button - Always shown, matching desktop */}
              <motion.button
                className={`${poppins.className} bg-[#AA7B32] hover:bg-[#8A6B2A] text-white px-8 py-2.5 sm:px-10 sm:py-3 rounded-full font-medium ring-1 ring-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_2px_6px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] focus:outline-none mt-0`}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                Resep
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Top curved white overlay */}
      <div className="absolute top-0 left-0 w-full h-[15vw] overflow-hidden border-0">
        <svg viewBox="0 0 500 40" preserveAspectRatio="none" className="w-full">
          <path
            d="M 0 0 Q 263 40 500 0 L 500 0 L 0 0 Z"
            fill="white"
            fillRule="evenodd"
          />
        </svg>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full scale-y-[1]">
        <svg viewBox="0 0 500 30" preserveAspectRatio="none" className="w-full">
          <path
            d="M 0 0 Q 263 50 500 0 L 500 30 L 0 30 Z"
            fill="white"
            fillRule="evenodd"
          />
        </svg>
      </div>
    </section>
  );
}

// helper: render details with <em>...</em> -> italic React nodes
function renderDetailsHtml(text?: string) {
  if (!text) return 'Product details';
  // split keeping <em>...</em> chunks
  const parts = text.split(/(<em>.*?<\/em>)/g);
  return parts.map((part, idx) => {
    if (!part) return null;
    // use [\s\S] instead of /s flag to avoid parser issues
    const m = part.match(/^<em>([\s\S]*)<\/em>$/);
    if (m) {
      return (
        <em key={idx} className="italic not-italic:normal">
          {m[1]}
        </em>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

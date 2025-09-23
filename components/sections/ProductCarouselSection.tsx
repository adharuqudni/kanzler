'use client';

import React, { useState } from 'react';
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

// Product data type
export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  mockup: string;
  details: string;
}

export interface ProductData {
  [key: string]: Product[];
}

// Default Singles product data
const singlesProductData: ProductData = {
  bakso: [
    {
      id: 'bakso-ori',
      name: 'Bakso Original',
      description:
        'Bakso siap makan dengan berbagai varian rasa. Praktis bisa dimakan di mana pun & kapan pun.',
      image:
        '/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES PRODUCTS/SINGLES - BAKSO/kanzler singles bakso ori/bakso-ori.png',
      mockup:
        '/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES PRODUCTS/SINGLES - BAKSO/kanzler singles bakso ori/bakso-ori-thermopack-mockup.jpg',
      details:
        'Teksturnya renyah dan berdaging. Tersedia dalam kemasan 65 gr & 35 gr.',
    },
    {
      id: 'bakso-hot',
      name: 'Bakso Hot',
      description:
        'Bakso siap makan dengan berbagai varian rasa. Praktis bisa dimakan di mana pun & kapan pun.',
      image:
        '/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES PRODUCTS/SINGLES - BAKSO/kanzler singles bakso hot/bakso-hot.png',
      mockup:
        '/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES PRODUCTS/SINGLES - BAKSO/kanzler singles bakso hot/bakso-hot-thermopack-mockup.jpg',
      details:
        'Teksturnya renyah dan berdaging. Tersedia dalam kemasan 65 gr & 35 gr.',
    },
    {
      id: 'bakso-keju',
      name: 'Bakso Keju',
      description:
        'Bakso siap makan dengan berbagai varian rasa. Praktis bisa dimakan di mana pun & kapan pun.',
      image:
        '/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES PRODUCTS/SINGLES - BAKSO/kanzler singles bakso keju/bakso-keju.png',
      mockup:
        '/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES PRODUCTS/SINGLES - BAKSO/kanzler singles bakso keju/bakso-keju-thermopack-mockup.jpg',
      details:
        'Teksturnya renyah dan berdaging. Tersedia dalam kemasan 65 gr & 35 gr.',
    },
    {
      id: 'bakso-gochu',
      name: 'Bakso Gochujang',
      description:
        'Bakso siap makan dengan berbagai varian rasa. Praktis bisa dimakan di mana pun & kapan pun.',
      image:
        '/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES PRODUCTS/SINGLES - BAKSO/kanzler singles bakso gochujang/bakso-gochu.png',
      mockup:
        '/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES PRODUCTS/SINGLES - BAKSO/kanzler singles bakso gochujang/bakso-gochu-thermopack-mockup.jpg',
      details:
        'Teksturnya renyah dan berdaging. Tersedia dalam kemasan 65 gr & 35 gr.',
    },
  ],
  sosis: [
    {
      id: 'sosis-ori',
      name: 'Sosis Original',
      description:
        'Sosis daging ayam dan sapi siap makan. Teksturnya renyah dan berdaging. Tersedia dalam kemasan 65 gr & 35 gr.',
      image:
        '/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES PRODUCTS/SINGLES - SOSIS/kanzler singles sosis ori/sosis-ori.png',
      mockup:
        '/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES PRODUCTS/SINGLES - SOSIS/kanzler singles sosis ori/sosis-ori-thermopack-mockup.jpg',
      details:
        'Sosis daging ayam dan sapi siap makan. Teksturnya renyah dan berdaging. Tersedia dalam kemasan 65 gr & 35 gr.',
    },
    {
      id: 'sosis-hot',
      name: 'Sosis Hot',
      description:
        'Sosis daging ayam dan sapi siap makan. Teksturnya renyah dan berdaging. Tersedia dalam kemasan 65 gr & 35 gr.',
      image:
        '/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES PRODUCTS/SINGLES - SOSIS/kanzler singles sosis hot/sosis-hot.png',
      mockup:
        '/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES PRODUCTS/SINGLES - SOSIS/kanzler singles sosis hot/sosis-hot-thermopack-mockup.jpg',
      details:
        'Sosis daging ayam dan sapi siap makan. Teksturnya renyah dan berdaging. Tersedia dalam kemasan 65 gr & 35 gr.',
    },
    {
      id: 'sosis-keju',
      name: 'Sosis Keju',
      description:
        'Sosis daging ayam dan sapi siap makan. Teksturnya renyah dan berdaging. Tersedia dalam kemasan 65 gr & 35 gr.',
      image:
        '/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES PRODUCTS/SINGLES - SOSIS/kanzler singles sosis keju/sosis-keju-2x.png',
      mockup:
        '/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES PRODUCTS/SINGLES - SOSIS/kanzler singles sosis keju/sosis-keju2x-thermopack-mockup.jpg',
      details:
        'Sosis daging ayam dan sapi siap makan. Teksturnya renyah dan berdaging. Tersedia dalam kemasan 65 gr & 35 gr.',
    },
    {
      id: 'sosis-gochu',
      name: 'Sosis Gochujang',
      description:
        'Sosis daging ayam dan sapi siap makan. Teksturnya renyah dan berdaging. Tersedia dalam kemasan 65 gr & 35 gr.',
      image:
        '/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES PRODUCTS/SINGLES - SOSIS/kanzler singles sosis gochujang/sosis-gochu.png',
      mockup:
        '/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES PRODUCTS/SINGLES - SOSIS/kanzler singles sosis gochujang/sosis-gochu-thermopack-mockup.jpg',
      details:
        'Sosis daging ayam dan sapi siap makan. Teksturnya renyah dan berdaging. Tersedia dalam kemasan 65 gr & 35 gr.',
    },
    {
      id: 'sosis-mini',
      name: 'Sosis Mini',
      description:
        'Sosis daging ayam dan sapi siap makan. Teksturnya renyah dan berdaging. Tersedia dalam kemasan 65 gr & 35 gr.',
      image:
        '/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES PRODUCTS/SINGLES - SOSIS/kanzler singles sosis mini/sosis-mini.png',
      mockup:
        '/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES PRODUCTS/SINGLES - SOSIS/kanzler singles sosis mini/sosis-mini-thermopack-mockup.jpg',
      details:
        'Sosis daging ayam dan sapi siap makan. Teksturnya renyah dan berdaging. Tersedia dalam kemasan 65 gr & 35 gr.',
    },
  ],
};

interface ProductCarouselSectionProps {
  productData?: ProductData;
  backgroundImage?: string;
  title?: string;
  defaultCategory?: string;
}

export default function ProductCarouselSection({
  productData = singlesProductData,
  backgroundImage = '/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES SPLIT BACKGROUND.png',
  title = 'Products',
  defaultCategory,
}: ProductCarouselSectionProps) {
  const categories = Object.keys(productData);
  const initialCategory = defaultCategory || categories[0];

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<
    'left' | 'right'
  >('right');

  const currentProducts = productData[activeCategory];
  const currentProduct = currentProducts[currentIndex];

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentIndex(0); // Reset to first product when switching category
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
        <div className="container mx-auto px-8 py-16">
          <div className="grid grid-cols-12 gap-8 items-center">
            {/* Left Side - Category Toggle */}
            <div className="col-span-3">
              <div className="space-y-8">
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`flex items-center gap-4 text-left w-full transition-all duration-300 ${
                      activeCategory === category
                        ? 'text-white'
                        : 'text-white/60 hover:text-white/80'
                    }`}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y:
                          activeCategory === category
                            ? index === 0
                              ? 90
                              : 0
                            : index === 0
                            ? 0
                            : -90,
                        scale:
                          activeCategory === category
                            ? index === 0
                              ? 1
                              : 1
                            : index === 0
                            ? 0.8
                            : 0.8,
                        transition: { ...SMOOTH_BOUNCY, duration: 0.2 },
                      },
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="flex items-center gap-4">
                      <h2
                        className={`${
                          defaultCategory == 'nuggets'
                            ? dmSerif.className
                            : paytoneOne.className
                        } text-6xl font-bold`}
                      >
                        {category.toUpperCase()}
                      </h2>
                      <div className="w-12 h-12 relative">
                        <Image
                          src="/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES ARROW CIRCLE.png"
                          alt="Arrow Circle"
                          style={{
                            transform: `rotate(${
                              activeCategory === category ? '270' : '0'
                            }deg)`,
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
                className="mt-8 text-white/80"
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <p className={`${poppins.className} text-lg leading-relaxed`}>
                  {currentProduct?.description ||
                    'Produk berkualitas dengan berbagai varian rasa.'}
                </p>
              </motion.div>
            </div>

            {/* Center - Product Image & Mockup */}
            <div className="col-span-6 flex justify-center items-center space-x-8">
              <AnimatePresence mode="wait">
                {/* Product Image */}
                <motion.div
                  key={`${activeCategory}-${currentIndex}-product`}
                  className="relative"
                  initial={{ opacity: 1, scale: 0, x: 120, y: 0, rotate: -10 }}
                  animate={{
                    opacity: 1,
                    scale: defaultCategory === 'nuggets' ? activeCategory === 'nuggets' ? 1.2 : 0.7 : 1,
                    rotate: -10,
                    x: 120,
                    y: 0,
                    zIndex: 50,
                  }}
                  exit={{ opacity: 1, scale: 0, x: 120, y: 0 }}
                  transition={{ ...SMOOTH_BOUNCY, duration: 0.8 }}
                >
                  <Image
                    src={currentProduct.image}
                    alt={`${currentProduct.name} Product`}
                    width={defaultCategory === 'nuggets' ? 700 : 500}
                    height={800}
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>

                {/* Mockup Image */}
                <motion.div
                  key={`${activeCategory}-${currentIndex}-mockup`}
                  className="relative"
                  initial={{
                    opacity: 1,
                    scale: 0,
                    x: -120,
                    y: 80,
                    rotate: -10,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 0.4,
                    rotate: 10,
                    x: -120,
                    y: 80,
                  }}
                  exit={{ opacity: 1, scale: 0, x: -120, y: 80 }}
                  transition={{ ...SMOOTH_BOUNCY, duration: 0.8 }}
                >
                  <Image
                    src={currentProduct.mockup}
                    alt={`${currentProduct.name} Package`}
                    width={defaultCategory == 'nuggets' ? 700 : 500}
                    height={800}
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Right Side - Product Info */}
            <div className="col-span-3 flex flex-col justify-center items-center text-center">
              {/* Navigation Arrows with Product Name in between */}
              <div className="flex items-center justify-center space-x-8 mb-8">
                <motion.button
                  onClick={handlePrev}
                  className="w-16 h-16 flex items-center justify-center transition-transform duration-300 hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src="/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES ARROW NEXT.png"
                    alt="Previous"
                    width={64}
                    height={64}
                    className="object-contain rotate-180"
                  />
                </motion.button>

                {/* Product Name between arrows */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeCategory}-${currentIndex}-title`}
                    initial={{
                      opacity: 0,
                      x: animationDirection === 'right' ? 50 : -50,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      x: animationDirection === 'right' ? -50 : 50,
                    }}
                    transition={{ ...SMOOTH_BOUNCY, duration: 0.5 }}
                    className="text-center min-w-[200px] w-full  "
                    style={{ marginLeft: 0 }}
                  >
                    <h3
                      className={`${
                        defaultCategory != 'nuggets'
                          ? paytoneOne.className
                          : dmSerif.className
                      } text-4xl font-bold text-[#1C2653] mb-2`}
                    >
                      {currentProduct.name}
                    </h3>
                  </motion.div>
                </AnimatePresence>

                <motion.button
                  onClick={handleNext}
                  className="w-16 h-16 flex items-center justify-center transition-transform duration-300 hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ marginLeft: 0 }}
                >
                  <Image
                    src="/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES ARROW NEXT.png"
                    alt="Next"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </motion.button>
              </div>

              {/* Product Info Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${currentIndex}-info`}
                  initial={{
                    opacity: 0,
                    x: animationDirection === 'right' ? 50 : -50,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    x: animationDirection === 'right' ? -50 : 50,
                  }}
                  transition={{ ...SMOOTH_BOUNCY, duration: 0.4, delay: 0.1 }}
                  className="space-y-6 max-w-sm"
                >
                  {/* Product Description */}
                  <motion.p
                    className={`leading-relaxed text-xl text-[#1C2653] mb-12 ${poppins.className}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    {currentProduct.details}
                  </motion.p>

                  {/* Recipe Button */}
                  <motion.button
                    className="bg-[#AA7B32] hover:bg-[#8A6B2A] text-white px-10 py-3 rounded-full
             font-medium ring-1 ring-white/40
             shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_2px_6px_rgba(0,0,0,0.12)]
             transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] focus:outline-none"
                    initial={{ opacity: 0, y: 20 }}
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
            background: '#fff',
            clipPath: 'ellipse(150% 100% at 50% 0%)',
            transform: 'translateY(-80%)',
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

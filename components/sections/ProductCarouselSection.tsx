'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { SMOOTH_BOUNCY } from '@/lib/motion';

// Product data structure
const productData = {
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

export default function ProductCarouselSection() {
  const [activeCategory, setActiveCategory] = useState<'bakso' | 'sosis'>(
    'bakso'
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right'>('right');

  const currentProducts = productData[activeCategory];
  const currentProduct = currentProducts[currentIndex];

  const handleCategoryChange = (category: 'bakso' | 'sosis') => {
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
          src="/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES SPLIT BACKGROUND.png"
          alt="Split Background"
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
                <motion.button
                  onClick={() => handleCategoryChange('bakso')}
                  className={`flex items-center gap-4 text-left w-full transition-all duration-300 ${
                    activeCategory === 'bakso'
                      ? 'text-white'
                      : 'text-white/60 hover:text-white/80'
                  }`}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: activeCategory === 'bakso' ? 90 : 0,

                      transition: { ...SMOOTH_BOUNCY, duration: 0.2 },
                    },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4">
                    <h2 className="text-6xl font-bold">BAKSO</h2>
                    <div className="w-12 h-12 relative">
                      <Image
                        src="/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES ARROW CIRCLE.png"
                        alt="Arrow Circle"
                        style={{
                          transform: `rotate(${
                            activeCategory === 'bakso' ? '270' : '0'
                          }deg)`,
                        }}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </motion.button>

                <motion.button
                  onClick={() => handleCategoryChange('sosis')}
                  className={`flex items-center gap-4 text-left w-full transition-all duration-300 ${
                    activeCategory === 'sosis'
                      ? 'text-white '
                      : 'text-white/60 hover:text-white/80'
                  }`}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: activeCategory === 'bakso' ? -90 : 0,
                      transition: { ...SMOOTH_BOUNCY, duration: 0.2 },
                    },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-4">
                    <h2 className="text-6xl font-bold">SOSIS</h2>
                    <div className="w-12 h-12 relative">
                      <Image
                        src="/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES ARROW CIRCLE.png"
                        alt="Arrow Circle"
                        style={{
                          transform: `rotate(${
                            activeCategory === 'sosis' ? '270' : '0'
                          }deg)`,
                        }}
                        width={48}
                        height={48}
                      />
                    </div>
                  </div>
                </motion.button>
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
                <p className="text-lg leading-relaxed">
                  {activeCategory === 'bakso'
                    ? 'Bakso siap makan dengan berbagai varian rasa. Praktis bisa dimakan di mana pun & kapan pun.'
                    : 'Sosis siap makan dengan berbagai varian rasa. Praktis bisa dimakan di mana pun & kapan pun.'}
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
                    scale: 1,
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
                    width={300}
                    height={400}
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
                    width={300}
                    height={400}
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side - Product Info */}
            <div className="col-span-3 flex flex-col justify-center items-center text-center">
              {/* Navigation Arrows with Product Name in between */}
              <div className="flex items-center justify-center space-x-8 mb-12">
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
                      x: animationDirection === 'right' ? 50 : -50 
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ 
                      opacity: 0, 
                      x: animationDirection === 'right' ? -50 : 50 
                    }}
                    transition={{ ...SMOOTH_BOUNCY, duration: 0.5 }}
                    className="text-center min-w-[200px]"
                  >
                    <h3 className="text-5xl font-bold text-blue-900 mb-2">
                      {activeCategory === 'sosis' ? 'Sosis' : 'Bakso'}
                    </h3>
                    <h4 className="text-3xl font-bold text-blue-900">
                      {currentProduct.name.split(' ').slice(-1)[0]}
                    </h4>
                  </motion.div>
                </AnimatePresence>

                <motion.button
                  onClick={handleNext}
                  className="w-16 h-16 flex items-center justify-center transition-transform duration-300 hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
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
                    x: animationDirection === 'right' ? 50 : -50 
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ 
                    opacity: 0, 
                    x: animationDirection === 'right' ? -50 : 50 
                  }}
                  transition={{ ...SMOOTH_BOUNCY, duration: 0.4, delay: 0.1 }}
                  className="space-y-6 max-w-sm"
                >
                  {/* Product Description */}
                  <motion.p
                    className="text-blue-900 leading-relaxed text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    {currentProduct.details}
                  </motion.p>

                  {/* Recipe Button */}
                  <motion.button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Resep
                  </motion.button>
                </motion.div>
              </AnimatePresence>

              {/* Dot Indicators - Bottom */}
              <div className="flex space-x-3 mt-12">
                {currentProducts.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setAnimationDirection(index > currentIndex ? 'right' : 'left');
                      setCurrentIndex(index);
                    }}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-yellow-500 scale-125'
                        : 'bg-gray-400 hover:bg-gray-500'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
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

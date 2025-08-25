'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { SMOOTH_BOUNCY } from '@/lib/motion';

// Product categories for dropdown
const productCategories = [
  'Produk Kanzler',
  'Kanzler Singles - Bakso',
  'Kanzler Singles - Sosis'
];

// Recipe data structure
const recipeData = [
  {
    id: 'bakso-fried-rice',
    title: 'Nasi Goreng Bakso Kanzler',
    image: '/placeholder-recipe-1.jpg', // You can replace with actual recipe images
    category: 'Kanzler Singles - Bakso'
  },
  {
    id: 'bakso-soup',
    title: 'Sup Bakso Sayuran',
    image: '/placeholder-recipe-2.jpg',
    category: 'Kanzler Singles - Bakso'
  },
  {
    id: 'bakso-pasta',
    title: 'Pasta Bakso Saus Tomat',
    image: '/placeholder-recipe-3.jpg',
    category: 'Kanzler Singles - Bakso'
  },
  {
    id: 'sosis-grill',
    title: 'Sosis Bakar Bumbu Kecap',
    image: '/placeholder-recipe-4.jpg',
    category: 'Kanzler Singles - Sosis'
  },
  {
    id: 'sosis-curry',
    title: 'Kari Sosis Santan',
    image: '/placeholder-recipe-5.jpg',
    category: 'Kanzler Singles - Sosis'
  },
  {
    id: 'sosis-roll',
    title: 'Sosis Roll Keju',
    image: '/placeholder-recipe-6.jpg',
    category: 'Kanzler Singles - Sosis'
  }
];

export default function RecipeInspirationSection() {
  const [selectedCategory, setSelectedCategory] = useState(productCategories[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentRecipes = selectedCategory === 'Produk Kanzler' 
    ? recipeData 
    : recipeData.filter(recipe => recipe.category === selectedCategory);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { ...SMOOTH_BOUNCY, duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { ...SMOOTH_BOUNCY, duration: 0.5 }
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-white ">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/assets/ASSET - SINGLES/4 ASSET - SINGLES/4 ASSET - SINGLES BACKGROUND.png"
          alt="Recipe Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="container mx-auto px-8 py-16 flex-1">
          
          {/* Left Side - Title and Controls */}
          <div className="grid grid-cols-12 gap-8 h-full items-center">
            <div className="col-span-5 sticky top-16 ">
              
            

              {/* Main Title */}
              <motion.div
                className="mb-12"
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-7xl text-center font-bold text-blue-900 leading-tight">
                  Inspirasi
                  <br />
                  Resep
                </h1>
              </motion.div>

              {/* Category Dropdown */}
              <motion.div
                className="relative mb-8"
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-white bg-yellow-600 px-6 py-3 rounded-full font-semibold text-lg">
                    Kategori
                  </span>
                  
                
                </div>

                {/* Dropdown */}
                <div className="relative">
                  <motion.button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full max-w-sm bg-white border-2 border-yellow-600 rounded-xl px-6 py-4 text-left flex items-center justify-between font-semibold text-blue-900 hover:bg-gray-50 transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg">{selectedCategory}</span>
                    <motion.div
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={24} className="text-yellow-600" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 max-w-sm bg-white border-2 border-yellow-600 border-t-0 rounded-b-xl shadow-xl z-20 overflow-hidden"
                      >
                        {productCategories.map((category) => (
                          <motion.button
                            key={category}
                            onClick={() => {
                              setSelectedCategory(category);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-6 py-4 text-left hover:bg-yellow-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0 text-lg ${
                              category === selectedCategory 
                                ? 'bg-yellow-100 text-yellow-700 font-bold' 
                                : 'text-blue-900 font-semibold'
                            }`}
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                          >
                            {category}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Recipe Cards */}
            <div className="col-span-7 pl-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                >
                  {currentRecipes.map((recipe, index) => (
                    <motion.div
                      key={recipe.id}
                      variants={cardVariants}
                      className="group cursor-pointer"
                      whileHover={{ y: -8, scale: 1.03 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-4 border-yellow-400 hover:border-yellow-500">
                        {/* Recipe Image - Fixed Square Aspect Ratio */}
                        <div className="aspect-square relative overflow-hidden bg-gray-100">
                          <Image
                            src={recipe.image}
                            alt={recipe.title}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        
                        {/* Recipe Title */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-blue-900 text-center leading-tight group-hover:text-yellow-600 transition-colors duration-300 min-h-[3rem] flex items-center justify-center">
                            {recipe.title}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

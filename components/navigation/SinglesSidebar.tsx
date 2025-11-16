'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Info } from 'lucide-react';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { CrownToggle } from '@/app/page';

const poppins = Poppins({ subsets: ['latin'], weight: '400' });

interface SinglesSidebarProps {
  currentSection: number;
  scrollToSection: (index: number) => void;
  sections?: string[]; // Array of section IDs to determine active states
}

export default function SinglesSidebar({ 
  currentSection,
  scrollToSection: snapScrollToSection,
  sections = ['hero', 'second-section', 'produk', 'resep'] // Default for Singles page
}: SinglesSidebarProps) {
  // Get the current section name based on the index
  const currentSectionName = sections[currentSection] || '';
  
  // Determine active section for menu items
  const getActiveSection = () => {
    if (currentSectionName === 'produk') return 'produk';
    if (currentSectionName === 'resep') return 'resep';
    return ''; // Don't show menu buttons for other sections
  };

  const activeSection = getActiveSection();

  const scrollToSection = (sectionName: string) => {
    // Find the index of the section name in the sections array
    const sectionIndex = sections.findIndex(s => s === sectionName);
    if (sectionIndex !== -1) {
      snapScrollToSection(sectionIndex);
    }
  };

  const menuItems = [
    {
      icon: Package,
      label: 'Produk',
      targetId: 'produk',
      isActive: activeSection === 'produk',
    },
    {
      icon: Info,
      label: 'Resep',
      targetId: 'resep',
      isActive: activeSection === 'resep',
    },
  ];

  return (
    <>
      {/* Always visible sidebar - transparent with logo only */}
      <motion.div className="fixed left-0 top-0 h-full w-32 z-[9999999] overflow-hidden">
        {/* Sidebar Content */}
        <div className="mt-8 z-10 p-4 h-full flex flex-col">
          {/* Logo Section - Always visible */}
          <div className="flex flex-col items-center w-full h-[50px]">
            <Link href="/" className='w-full h-full'>
              <CrownToggle targetIds={[ "why-kanzler", "resep"]} style={{width: '100%', height: '100%'}} />
            </Link>
          </div>
          
          {/* Menu Buttons - Only visible when scrolled */}
          <AnimatePresence>
            {activeSection != '' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.targetId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.button
                      onClick={() => scrollToSection(item.targetId)}
                      className={`flex items-center justify-center px-0 py-1 rounded-full transition-all duration-300 group w-full ${
                        item.isActive
                          ? 'bg-[#AA7B32] text-white  shadow-lg scale-105'
                          : 'bg-transparent text-[#AA7B32]  hover:bg-yellow-400/20 hover:text-yellow-300'
                      }`}
                      whileHover={{ scale: item.isActive ? 1.05 : 1.08 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center gap-2">
                        <p
                          className={`${poppins.className} text-sm font-semibold transition-colors ${
                            item.isActive
                              ? 'text-white'
                              : 'text-yellow-AA7B32 group-hover:text-yellow-300'
                          }`}
                        >
                          {item.label}
                        </p>
                      </div>
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}

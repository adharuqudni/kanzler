'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Package, Info } from 'lucide-react';

export default function SinglesSidebar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100); // Show menu button after 100px scroll

      // Determine active section based on scroll position
      const produkSection = document.querySelector('#produk');
      const resepSection = document.querySelector('#resep');
      
      if (produkSection && resepSection) {
        const produkRect = produkSection.getBoundingClientRect();
        const resepRect = resepSection.getBoundingClientRect();
        
        // Check which section is more visible in the viewport
        if (produkRect.top <= window.innerHeight / 2 && produkRect.bottom >= window.innerHeight / 2) {
          setActiveSection('produk');
        } else if (resepRect.top <= window.innerHeight / 2 && resepRect.bottom >= window.innerHeight / 2) {
          setActiveSection('resep');
        } else if (produkRect.top > window.innerHeight / 2) {
          setActiveSection(''); // Before produk section
        } else if (resepRect.bottom < window.innerHeight / 2) {
          setActiveSection('resep'); // Past resep section, keep resep active
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`#${sectionId}`);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const menuItems = [
    { 
      icon: Package, 
      label: 'Produk', 
      targetId: 'produk',
      isActive: activeSection === 'produk'
    },
    { 
      icon: Info, 
      label: 'Resep', 
      targetId: 'resep',
      isActive: activeSection === 'resep'
    },
  ];

  return (
    <>
      {/* Always visible sidebar - transparent with logo only */}
      <motion.div className="fixed left-0 top-0 h-full w-32 z-[99999] overflow-hidden">
        {/* Sidebar Content */}
        <div className="relative z-10 p-4 h-full flex flex-col">
          {/* Logo Section - Always visible */}
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <Image
                src={
                  activeSection != ""
                    ? '/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES MAHKOTA.png'
                    : '/assets/ASSET - HOME/1 ASSET - HOME/Logo Mahkota.png'
                }
                alt="Kanzler Crown"
                width={60 }
                height={60 }
                className="object-contain filter brightness-110 drop-shadow-lg"
              />
            </div>
          </div>

          {/* Menu Buttons - Only visible when scrolled */}
          <AnimatePresence>
            {activeSection != "" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="mt-8 space-y-3"
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
                      className={`flex items-center justify-center px-3 py-2 rounded-full transition-all duration-300 group w-full ${
                        item.isActive
                          ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-white  shadow-lg scale-105'
                          : 'bg-transparent text-yellow-400  hover:bg-yellow-400/20 hover:text-yellow-300'
                      }`}
                      whileHover={{ scale: item.isActive ? 1.05 : 1.08 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon 
                          size={16} 
                          className={`transition-colors ${
                            item.isActive 
                              ? 'text-white' 
                              : 'text-yellow-400 group-hover:text-yellow-300'
                          }`} 
                        />
                        <p
                          className={`text-sm font-semibold transition-colors ${
                            item.isActive 
                              ? 'text-white' 
                              : 'text-yellow-400 group-hover:text-yellow-300'
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

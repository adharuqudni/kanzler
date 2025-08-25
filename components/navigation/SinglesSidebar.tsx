'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Package, Info } from 'lucide-react';

export default function SinglesSidebar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100); // Show menu button after 100px scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { icon: Package, label: 'Produk', href: '/produk', highlighted: true },
    { icon: Info, label: 'Resep', href: '/resep' },
  ];

  return (
    <>
      {/* Always visible sidebar - transparent with logo only */}
      <motion.div className="fixed left-0 top-0 h-full w-32 z-40 overflow-hidden">
        {/* Sidebar Content */}
        <div className="relative z-10 p-4 h-full flex flex-col">
          {/* Logo Section - Always visible */}
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <Image
                src={
                  isScrolled
                    ? '/assets/ASSET - SINGLES/3 ASSET - SINGLES/3 ASSET - SINGLES MAHKOTA.png'
                    : '/assets/ASSET - HOME/1 ASSET - HOME/Logo Mahkota.png'
                }
                alt="Kanzler Crown"
                width={60}
                height={60}
                className="object-contain filter brightness-110 drop-shadow-lg"
              />
            </div>
          </div>

          {/* Menu Buttons - Only visible when scrolled */}
          <AnimatePresence>
            {isScrolled && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="mt-8 space-y-3"
              >
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center justify-center px-3 py-2 rounded-lg transition-all duration-300 group ${'bg-gradient-to-r from-yellow-600/80 to-yellow-500/80 text-white border border-yellow-400/30'}`}
                    >
                      <p
                        className={`transition-colors ${'text-white/60 group-hover:text-white'}`}
                      >
                        {item.label}
                      </p>
                    </Link>
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

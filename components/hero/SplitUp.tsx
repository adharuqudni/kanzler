'use client';

import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BOUNCY_TRANSITION, SMOOTH_BOUNCY } from '@/lib/motion';
import Link from 'next/link';
import { Poppins } from 'next/font/google';

// include bold weight so we can use poppins bold
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

interface MobileSideProps {
  isHoveringUp: boolean;
  isHoveringDown: boolean;
  topSideHeight: number;
  topSideIndex: number;
}

const SplitUp = memo(function SplitUp({
  isHoveringUp,
  isHoveringDown,
  topSideHeight,
  topSideIndex,
}: MobileSideProps) {
  return (
    <motion.div
      className={`absolute top-0 left-0 right-0 flex items-center justify-center ${
        isHoveringUp
          ? "bg-[url('/assets/gradient-1x1.jpg')] bg-no-repeat bg-top bg-cover"
          : ""
      }`}
      initial={{ 
        height: '50%',
        clipPath: 'ellipse(150% 80% at 50% 0%)',
        zIndex: 107,
        display: "none"
      }}
      animate={{
        height: `${(isHoveringDown ? 15 : 0) + (isHoveringUp ? 60: 100)}%`,
        background: isHoveringUp ? "bg-[url('/assets/gradient-1x1.jpg')] bg-no-repeat bg-top bg-cover" : "",
        clipPath: isHoveringUp
          ? 'ellipse(150% 100% at 50% 0%)'
          : 'ellipse(150% 80% at 50% 0%)',
        zIndex: 107,
        display: isHoveringUp ? "flex" : "none",
        transition: {
          display: { duration: 0, delay: isHoveringDown ? 1.2 : 0 },
          zIndex: { duration: 0, delay: isHoveringDown ? 1.2 : 0 },
          height: { duration: 0 },
          clipPath: { duration: isHoveringUp ? 1.2 : 0 },
        }
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Content for top panel */}
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isHoveringUp ? 1 : 0, y: isHoveringUp ? 0 : 50 }}
          transition={{ duration: 0.8, delay: isHoveringUp ? 0.6 : 0 }}
        >
          {/* Product showcase */}
          <div className="flex flex-col items-center space-y-4 ">
            <motion.div
              className="absolute -left-4 -bottom-12"
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ 
                scale: isHoveringDown ? 1.1 : 0.8, 
                rotate: isHoveringDown ? 0 : 15
              }}
              transition={{ duration: 0.8, delay: isHoveringDown ? 0.8 : 0 }}
            >
              <Image
                src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME BEEF COCKTAIL.png"
                alt="Beef Cocktail"
                width={160}
                height={150}
                className="object-contain"
                loading="lazy"
              />
            </motion.div>
            
            <motion.div
              className="absolute -right-12 -bottom-16"
              initial={{ scale: 0.8, rotate: 10 }}
              animate={{ 
                scale: isHoveringDown ? 1.1 : 0.8, 
                rotate: isHoveringDown ? 0 : -15 
              }}
              transition={{ duration: 0.8, delay: isHoveringDown ? 1.0 : 0 }}
            >
              <Image
                src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME CRISPY NUGGET.png"
                alt="Crispy Nugget"
                width={220}
                height={150}
                className="object-contain"
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* Text content */}
          <div className="space-y-4">
            <h2 className={`text-2xl font-bold text-white ${poppins.className}`}>
              Produk Unggulan
            </h2>
            <p className={`text-white/90 text-sm max-w-xs ${poppins.className}`}>
              Nikmati cita rasa autentik dengan produk terbaik dari Kanzler
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHoveringUp ? 1 : 0, y: isHoveringUp ? 0 : 20 }}
              transition={{ duration: 0.6, delay: isHoveringUp ? 1.2 : 0 }}
            >
              <Button 
                asChild
                className="bg-[#AA7B32] hover:bg-[#AA7B32]/90 text-white"
              >
                <Link href="/homepack">
                  Lihat Produk
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

export default SplitUp;

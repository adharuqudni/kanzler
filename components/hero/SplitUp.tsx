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
        <AnimatePresence>
          {isHoveringUp && (
            <>
              {/* Split Logo Animation - Crown and Text */}
              <div className="flex flex-col items-center z-[110]">
                {/* Kanzler Text - animates separately */}
                <motion.div 
                  key="text"
                  className="-mt-4 mb-3 sm:mb-6"
                  initial={{ 
                    opacity: 1, 
                    scale: 3.5, 
                    x: 200, 
                    y: 120,
                  }}
                  animate={{ 
                    opacity: isHoveringUp ? 1 : 1, 
                    scale: isHoveringUp ? 1 : 3.5, 
                    x: isHoveringUp ? 0 : 200, 
                    y: isHoveringUp ? 0 : 120,
                    transition: {
                      x: { 
                        duration: isHoveringUp ? 1.0 : 0, 
                        delay: 0 
                      },
                      y: { 
                        duration: isHoveringUp ? 1.0 : 0, 
                        delay: 0 
                      },
                      scale: { 
                        duration: isHoveringUp ? 1.0 : 0, 
                        delay: 0 
                      },
                      opacity: { 
                        duration: isHoveringUp ? 1.0 : 0, 
                        delay: 0 
                      },
                    }
                  }}
                  exit={{}}
                >
                  <Image
                    src="/assets/all-white.svg"
                    alt="Kanzler"
                    width={270}
                    height={80}
                    className="object-contain   "
                    loading="lazy"
                  />
                </motion.div>
              </div>

              {/* Description and Button with pop-up animation */}
              <motion.div
                key="description"
                className="text-white text-center z-[110]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 180,
                  damping: 15,
                  delay: 0.7,
                }}
                exit={{}}
              >
                <p className={`${poppins.className} mb-4 sm:mb-6 max-w-xs sm:max-w-md text-[10px] sm:text-xs md:text-sm leading-relaxed`}>
                  Produk sosis dan nugget dari daging sapi dan ayam pilihan.
                  <br />
                  <span className="italic">Extra Meaty, Extra Juicy</span>, dan
                  mudah diolah menjadi menu <br />
                  lezat setiap hari.
                </p>
                <motion.div
                  key="button"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 12,
                    delay: 0.9,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  exit={{}}
                >
                  <Link href="/homepack">
                    <Button
                      className={`${poppins.className} bg-white py-1 text-kanzler-navy hover:bg-gray-100 rounded-full px-4 sm:px-6 text-xs sm:text-sm md:text-base font-bold leading-none h-6`}
                    >
                      Lihat semua produk ›
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Product showcase - positioned absolutely */}
        <motion.div
          className="absolute -left-16 top-28 z-[120]"
          initial={{ scale: 0.8, rotate: 0, x: -150, y: -150 }}
          animate={{ 
            scale: isHoveringUp ? 0.8 : 0.8, 
            rotate: isHoveringUp ? -25 : 0,
            x: isHoveringUp ? 0 : -150, 
            y: isHoveringUp ? 0 : 0 
          }}
          transition={{ duration: 0.6,  }}
        >
          <Image
            src="/assets/ASSET - HOME/2 ASSET - HOME/2 ASSET - HOME BEEF.png"
            alt="Beef"
            width={160}
            height={150}
            className="object-contain"
            loading="lazy"
          />
        </motion.div>
        
        <motion.div
          className="absolute -right-20 top-12 z-[120]"
          initial={{ scale: 0.8, rotate: 0 , x: 150, y: -150}}
          animate={{ 
            scale: isHoveringUp ? 0.5 : 0.4, 
            rotate: isHoveringUp ? -5 : 0, 
            x: isHoveringUp ? 0 : 150, 
            y: isHoveringUp ? 0 : 0 
          }}
          transition={{ duration: 0.8,  }}
        >
          <Image
            src="/assets/ASSET - HOME/2 ASSET - HOME/2 ASSET - HOME NUGGET.png"
            alt="Kanzler Nugget"
            width={220}
            height={150}
            className="object-contain"
            loading="lazy"
          />
        </motion.div>

        {/* Product showcase - positioned absolutely */}
        <motion.div
          className="absolute -left-4 -bottom-12 z-[120]"
          initial={{ scale: 0.8, rotate: 0, x: -150, y: -150 }}
          animate={{ 
            scale: isHoveringUp ? 0.9 : 0.8, 
            rotate: isHoveringUp ? 15 : 0,
            x: isHoveringUp ? 0 : -150, 
            y: isHoveringUp ? 0 : -350 
          }}
          transition={{ duration: 0.6,  }}
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
          className="absolute -right-12 -bottom-16 z-[120]"
          initial={{ scale: 0.8, rotate: 0 , x: 150, y: -150}}
          animate={{ 
            scale: isHoveringUp ? 0.9 : 0.8, 
            rotate: isHoveringUp ? -15 : 0, 
            x: isHoveringUp ? 0 : 150, 
            y: isHoveringUp ? 0 : -350 
          }}
          transition={{ duration: 0.8,  }}
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
    </motion.div>
  );
});

export default SplitUp;

'use client';

import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BOUNCY_TRANSITION, SMOOTH_BOUNCY } from '@/lib/motion';
import Link from 'next/link';
import { SideProps, ProductImage } from './Hero';
import { Poppins } from 'next/font/google';

// include bold weight so we can use poppins bold
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

const SplitLeft = memo(function SplitLeft({
  isHoveringLeft,
  isHoveringRight,
  leftSideWidth,
  leftSideIndex,
}: SideProps) {
  return (
    <motion.div
      className={`absolute top-0 bottom-0 left-0 flex items-center justify-center ${
        isHoveringLeft
          ? "bg-[url('/assets/gradient-1x1.jpg')] bg-no-repeat bg-left bg-cover"
          : ""
      }`}
      initial={{ 
        width: '50%',
        clipPath: 'ellipse(80% 150% at 0% 50%)',
        zIndex: 107,
        display: "none"
      }}
      animate={{
        width: `${(isHoveringRight ? 15 : 0) + (isHoveringLeft ? 60: 100)}%`,
        background: isHoveringLeft ? "bg-[url('/assets/gradient-1x1.jpg')] bg-no-repeat bg-left bg-cover" : "",
        clipPath: isHoveringLeft
          ? 'ellipse(100% 150% at 0% 50%)'
          : 'ellipse(80% 150% at 0% 50%)',
        zIndex: 107,
        display: isHoveringLeft ? "flex" : "none",
        transition: {
          display: { duration: 0, delay: isHoveringRight ? 1.2 : 0 },  // Instant, no delay
          zIndex: { duration: 0, delay: isHoveringRight ? 1.2 : 0 },    // Instant, no delay
          width: { duration: 0 },
          clipPath: { duration: isHoveringLeft ? 1.2 : 0 },
        }
      }}
    >

      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <AnimatePresence>
          {isHoveringLeft && (
            <>
              {/* Split Logo Animation - Crown and Text */}
              <div className="flex flex-col items-center z-[110]">
                {/* Crown - animates first */}
                <motion.div
                  key="crown"
                  className=""
                  initial={{ 
                    opacity: 1, 
                    scale: 2.5, 
                    x: 300, 
                    y: -30,
                  }}
                  animate={{ 
                    opacity: isHoveringLeft ? 1 : 1, 
                    scale: isHoveringLeft ? 1 : 2.5, 
                    x: isHoveringLeft ? 0 : 300, 
                    y: isHoveringLeft ? 0 : -30,
                    transition: {
                      // X position animation
                      x: { 
                        duration: isHoveringLeft ? 1.0 : 0, 
                        delay: 0 
                      },
                      // Y position animation
                      y: { 
                        duration: isHoveringLeft ? 1.0 : 0, 
                        delay: 0 
                      },
                      // Scale animation
                      scale: { 
                        duration: isHoveringLeft ? 1.0 : 0, 
                        delay: 0 
                      },
                      // Opacity animation
                      opacity: { 
                        duration: isHoveringLeft ? 1.0 : 0, 
                        delay: 0 
                      },
                    }
                  }}
                  exit={{}}
                >
                <Image
                  src="/assets/ASSET - HOME/1 ASSET - HOME/crown_white.svg"
                  alt="Kanzler Crown"
                  width={120}
                  height={120}
                  className="object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-[120px] md:h-[120px]"
                  loading="lazy"
                />
              </motion.div>

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
                    opacity: isHoveringLeft ? 1 : 1, 
                    scale: isHoveringLeft ? 1 : 3.5, 
                    x: isHoveringLeft ? 0 : 200, 
                    y: isHoveringLeft ? 0 : 120,
                    transition: {
                      // X position animation
                      x: { 
                        duration: isHoveringLeft ? 1.0 : 0, 
                        delay: 0 
                      },
                      // Y position animation
                      y: { 
                        duration: isHoveringLeft ? 1.0 : 0, 
                        delay: 0 
                      },
                      // Scale animation
                      scale: { 
                        duration: isHoveringLeft ? 1.0 : 0, 
                        delay: 0 
                      },
                      // Opacity animation
                      opacity: { 
                        duration: isHoveringLeft ? 1.0 : 0, 
                        delay: 0 
                      },
                    }
                  }}
                  exit={{}}
                >
                <Image
                  src="/assets/KNZLR R.png"
                  alt="Kanzler"
                  width={400}
                  height={80}
                  className="object-contain w-48 h-10 sm:w-64 sm:h-12 md:w-[400px] md:h-[80px] mb-2"
                  loading="lazy"
                />
              </motion.div>
            </div>

              {/* Tagline Image */}
              <motion.div
                key="tagline"
                className="-mt-12  z-[110]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  ...BOUNCY_TRANSITION,
                  delay: 0.5,
                }}
                exit={{}}
              >
              <Image
                src="/assets/ASSET - HOME/1 ASSET - HOME/Kanzler Quote.png"
                alt="Premium Quality Since 1999"
                width={400}
                height={60}
                className="object-contain w-60 h-7 sm:w-80 sm:h-9 md:w-[400px] md:h-[60px]"
                loading="lazy"
              />
            </motion.div>

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
                    className={`${poppins.className} bg-white text-kanzler-navy hover:bg-gray-100 rounded-full px-4 sm:px-6 text-xs sm:text-sm md:text-base mt-4 font-bold`}
                  >
                    Lihat semua produk ›
                  </Button>
                </Link>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Multiple beef product images */}
        <ProductImage
          src="/assets/ASSET - HOME/2 ASSET - HOME/2 ASSET - HOME BEEF.png"
          alt="Kanzler beef 1"
          className="absolute top-28 -rotate-45 -left-28 z-[110]"
          rotateOverride={320}
          isVisible={isHoveringLeft}
          animation="slideFromLeft"
        />

        {/* Nugget image */}
        <ProductImage
          src="/assets/ASSET - HOME/2 ASSET - HOME/2 ASSET - HOME NUGGET.png"
          alt="Kanzler nugget"
          className="absolute top-20 -right-20 z-[110]"
          isVisible={isHoveringLeft}
          animation="slideFromRight"
        />

        {/* Floating cocktail products */}
        <motion.div
          className="absolute -bottom-64 -rotate-45 left-96 w-[30vw]  z-[120]"
          initial={{ opacity: 1, rotate: -15, y: 0 }}
          animate={{
            // y: isHoveringLeft ? 70 : 0,
            // x: isHoveringLeft ? -450 : 0,
            // rotate: isHoveringLeft ? 15 : -15,
            // scale: isHoveringLeft ? 0.8 : 1,
            y: isHoveringLeft ? 70 : -10,
            x: isHoveringLeft ? -450 : -250,
            rotate: isHoveringLeft ? 15 : -15,
            scale: isHoveringLeft ? 0.8 : 0.65,
            display: isHoveringLeft ? 'block' : ' none',
          }}
          transition={BOUNCY_TRANSITION}
        >
          <Image
            src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME BEEF COCKTAIL.png"
            alt="Kanzler cocktail 1"
            width={15000}
            height={300}
            className="object-contain"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          className="absolute -bottom-64 -rotate-45 left-[30vw] w-[40vw]  z-[120]"
          initial={{ opacity: 1, rotate: -10, y: 0, x: 0 }}
          animate={{
            y: isHoveringLeft ? 75 : -20,
            x: isHoveringLeft ? 50 : -160,
            scale: isHoveringLeft ? 0.8 : 0.65,
            rotate: isHoveringLeft ? -15 : -10,
          
            display: isHoveringLeft ? 'block' : ' none',
          }}
          transition={BOUNCY_TRANSITION}
        >
          <Image
            src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME CRISPY NUGGET.png"
            alt="Kanzler crispy nugget"
            width={1500}
            height={300}
            className="object-contain"
            loading="lazy"
          />
        </motion.div>
      </div>
    </motion.div>
  );
});

export default SplitLeft;

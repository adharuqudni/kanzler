"use client";

import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BOUNCY_TRANSITION } from "@/lib/motion";
import Link from "next/link";
import { Poppins } from "next/font/google";

// include bold weight
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

interface MobileSideProps {
  isHoveringUp: boolean;
  isHoveringDown: boolean;
  topSideHeight: number;
  topSideIndex: number;
}

const SplitDown = memo(function SplitDown({
  isHoveringDown,
  isHoveringUp,
  topSideHeight,
  topSideIndex,
}: MobileSideProps) {
  return (
    <motion.div
      className={`absolute bottom-0 left-0 right-0 flex items-center justify-center overflow-hidden ${
        isHoveringDown
          ? "bg-[url('/assets/gradient-1x1.jpg')] bg-no-repeat bg-bottom bg-cover"
          : ""
      }`}
      initial={{ 
        height: "50%",
        clipPath: "ellipse(150% 80% at 50% 100%)",
        zIndex: 107,
        display: "none"
      }}
      animate={{
        height: `${(isHoveringUp ? 115 : 100) - (isHoveringDown ? 35 : 50)}%`,
        clipPath: isHoveringDown
          ? "ellipse(150% 100% at 50% 100%)"
          : "ellipse(150% 80% at 50% 100%)",
        zIndex: 107,
        display: isHoveringDown ? "flex" : "none",
        transition: {
          display: { duration: 0, delay:  0 },
          zIndex: { duration: 0, delay:  0 },
          height: { duration: 0 },
          clipPath: { duration: isHoveringDown ? 1.2 : 0 },
        }
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-start mt-28 p-4 sm:p-6 md:p-8">
        <AnimatePresence>
          {isHoveringDown && (
            <>
              {/* Split Logo Animation - Crown and Text */}
              <div className="flex flex-col items-center z-[110]">
                {/* Crown - animates first */}
                <motion.div
                  key="crown"
                  className="mb-2 sm:mb-0"
                  initial={{ 
                    opacity: 1, 
                    scale: 2.5, 
                    x: -260, 
                    y: 70,
                  }}
                  animate={{ 
                    opacity: isHoveringDown ? 1 : 1, 
                    scale: isHoveringDown ? 1 : 2.5, 
                    x: isHoveringDown ? 0 : -260, 
                    y: isHoveringDown ? 0 : 70,
                    transition: {
                      x: { 
                        duration: isHoveringDown ? 1.0 : 0, 
                        delay: 0 
                      },
                      y: { 
                        duration: isHoveringDown ? 1.0 : 0, 
                        delay: 0 
                      },
                      scale: { 
                        duration: isHoveringDown ? 1.0 : 0, 
                        delay: 0 
                      },
                      opacity: { 
                        duration: isHoveringDown ? 1.0 : 0, 
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
                    x: -230, 
                    y: 220,
                  }}
                  animate={{ 
                    opacity: isHoveringDown ? 1 : 1, 
                    scale: isHoveringDown ? 1 : 3.5, 
                    x: isHoveringDown ? 0 : -230, 
                    y: isHoveringDown ? 0 : 220,
                    transition: {
                      x: { 
                        duration: isHoveringDown ? 1.0 : 0, 
                        delay: 0 
                      },
                      y: { 
                        duration: isHoveringDown ? 1.0 : 0, 
                        delay: 0 
                      },
                      scale: { 
                        duration: isHoveringDown ? 1.0 : 0, 
                        delay: 0 
                      },
                      opacity: { 
                        duration: isHoveringDown ? 1.0 : 0, 
                        delay: 0 
                      },
                    }
                  }}
                  exit={{}}
                >
                  <Image
                    src="/assets/kanzler-no-r-white.svg"
                    alt="Kanzler"
                    width={400}
                    height={80}
                    className="object-contain w-48 h-10 sm:w-64 sm:h-12 md:w-[400px] md:h-[80px]"
                    loading="lazy"
                  />
                </motion.div>
              </div>

              {/* Singles Product Line */}
              <motion.div
                key="singles"
                className="-mt-4 z-[110]"
                initial={{ opacity: 0, y: 50, scale: 0 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 12,
                  delay: 0.5,
                }}
                exit={{}}
              >
                <Image
                  src="/assets/ASSET - HOME/1 ASSET - HOME/Singles.png"
                  alt="Singles"
                  width={300}
                  height={80}
                  className="object-contain"
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
                  type: "spring",
                  stiffness: 180,
                  damping: 15,
                  delay: 0.7,
                }}
                exit={{}}
              >
                <p
                  className={`${poppins.className} max-w-md sm:max-w-xl md:max-w-2xl text-[11px] sm:text-xs md:text-sm leading-relaxed`}
                >
                  Produk sosis dan bakso berkualitas yang terbuat dari daging{" "}
                  <br />
                  sapi dan ayam pilihan. Sudah matang, siap untuk langsung <br />
                  dimakan, atau diolah menjadi berbagai menu harian.
                </p>
                <motion.div
                  key="button"
                  className="mt-8"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 12,
                    delay: 0.9,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  exit={{}}
                >
                  <Link href="/singles">
                    <Button
                      className={`${poppins.className} bg-white text-kanzler-navy h-6 hover:bg-gray-100 rounded-full px-4 sm:px-6 py-0 text-xs sm:text-sm md:text-base font-bold`}
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
          className="absolute bottom-8 -left-44 z-[130]"
          initial={{ scale: 0.8, rotate: -20, x: 100, y: 350}}
          animate={{ 
            scale: isHoveringDown ? 0.5 : 0.5, 
            rotate: isHoveringDown ? 35 : 20,
            x: isHoveringDown ? 0 : 100, 
            y: isHoveringDown ? 0 : 350,
          }}
          transition={{ duration: 0.8, }}
        >
          <Image
            src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME BAKSO HOT.png"
            alt="Bakso Hot"
            width={400}
            height={300}
            className="object-contain"
            loading="lazy"
          />
        </motion.div>
        
        <motion.div
          className="absolute -top-8 -right-36 z-[130]"
          initial={{ scale: 0.8, rotate: 20 , x: -100, y: -150}}
          animate={{ 
            scale: isHoveringDown ? 0.6 : 0.6, 
            rotate: isHoveringDown ? 25 : -25,
            x: isHoveringDown ? 0 : -100, 
            y: isHoveringDown ? 0 : -150,
          }}
          transition={{ duration: 0.8, }}
        >
          <Image
            src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME SOSIS GOCHU.png"
            alt="Sosis Gochu"
            width={400}
            height={300}
            className="object-contain"
            loading="lazy"
          />
        </motion.div>
      </div>
    </motion.div>
  );
});

export default SplitDown;

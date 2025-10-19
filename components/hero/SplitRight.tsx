"use client";

import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BOUNCY_TRANSITION } from "@/lib/motion";
import Link from "next/link";
import { SideProps } from "./Hero";
import { Poppins } from "next/font/google";

// include bold weight
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

const SplitRight = memo(function SplitRight({
  isHoveringRight,
  isHoveringLeft,
  leftSideWidth,
  leftSideIndex,
}: SideProps) {
  console.log(isHoveringRight, "right")
  return (
    <motion.div
      className={`absolute top-0 bottom-0 right-0 flex items-center justify-center overflow-x-hidden ${
        isHoveringRight
          ? "bg-[url('/assets/gradient-1x1.jpg')] bg-no-repeat bg-right bg-cover"
          : ""
      }`}
      initial={{ 
        width: "50%",
        clipPath: "ellipse(80% 80% at 100% 50%)",
        zIndex: 107,
        display: "none"
      }}
      animate={{
        width: `${(isHoveringLeft ? 115 : 100) - (isHoveringRight ? 35 : 50)}%`,
        clipPath: isHoveringRight
          ? "ellipse(100% 150% at 100% 50%)"
          : "ellipse(80% 150% at 100% 50%)",
        zIndex: 107,
        display: isHoveringRight ? "flex" : "none",
        transition: {
          display: { duration: 0, delay:  0 },  // Instant, no delay
          zIndex: { duration: 0, delay:  0 },    // Instant, no delay
          width: { duration: isHoveringRight ? 1.2 : 0 },
          clipPath: { duration: isHoveringRight ? 1.2 : 0 },
        }
      }}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <AnimatePresence>
          {isHoveringRight && (
            <>
              {/* Split Logo Animation - Crown and Text */}
              <div className="flex flex-col items-center z-[110]">
                {/* Crown - animates first */}
                <motion.div
                  key="crown"
                  className="mb-2 sm:mb-4"
                  initial={{ 
                    opacity: 1, 
                    scale: 2.5, 
                    x: -260, 
                    y: 70,
                  }}
                  animate={{ 
                    opacity: isHoveringRight ? 1 : 1, 
                    scale: isHoveringRight ? 1 : 2.5, 
                    x: isHoveringRight ? 0 : -260, 
                    y: isHoveringRight ? 0 : 70,
                    transition: {
                      // X position animation
                      x: { 
                        duration: isHoveringRight ? 1.0 : 0, 
                        delay: 0 
                      },
                      // Y position animation
                      y: { 
                        duration: isHoveringRight ? 1.0 : 0, 
                        delay: 0 
                      },
                      // Scale animation
                      scale: { 
                        duration: isHoveringRight ? 1.0 : 0, 
                        delay: 0 
                      },
                      // Opacity animation
                      opacity: { 
                        duration: isHoveringRight ? 1.0 : 0, 
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
                    opacity: isHoveringRight ? 1 : 1, 
                    scale: isHoveringRight ? 1 : 3.5, 
                    x: isHoveringRight ? 0 : -230, 
                    y: isHoveringRight ? 0 : 220,
                    transition: {
                      // X position animation
                      x: { 
                        duration: isHoveringRight ? 1.0 : 0, 
                        delay: 0 
                      },
                      // Y position animation
                      y: { 
                        duration: isHoveringRight ? 1.0 : 0, 
                        delay: 0 
                      },
                      // Scale animation
                      scale: { 
                        duration: isHoveringRight ? 1.0 : 0, 
                        delay: 0 
                      },
                      // Opacity animation
                      opacity: { 
                        duration: isHoveringRight ? 1.0 : 0, 
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
                  className="object-contain w-48 h-10 sm:w-64 sm:h-12 md:w-[400px] md:h-[80px]"
                  loading="lazy"
                />
              </motion.div>
            </div>

              {/* Singles Product Line */}
              <motion.div
                key="singles"
                className="-mt-4 mb-4 z-[110]"
                initial={{ opacity: 0, y: 50 , scale: 0 }}
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
                width={600}
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
                className={`${poppins.className} max-w-md sm:max-w-xl md:max-w-2xl text-[10px] sm:text-xs md:text-sm leading-relaxed`}
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
                    className={`${poppins.className} bg-white text-kanzler-navy hover:bg-gray-100 rounded-full px-4 sm:px-6 py-0 text-xs sm:text-sm md:text-base font-bold`}
                  >
                    Lihat semua produk ›
                  </Button>
                </Link>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Left side floating products */}
        <motion.div
          className="absolute -bottom-80 rotate-45 -left-28 z-[130]"
          initial={{ opacity: 1, rotate: 40, x: -30 }}
          animate={{
            // y: isHoveringRight ? -350 : 0,
            // x: isHoveringRight ? -30 : 0,
            // rotate: 25, // 🔹 selalu 40°, tidak berubah

            y: isHoveringRight ? -420 : -80,
            x: isHoveringRight ?  -30 : 200,
            scale: isHoveringRight ? 1.2 : 0.7,
            rotate: isHoveringRight ? 25 : 20, // 🔹 selalu 40°, tidak berubah
            display: isHoveringRight ? "block" : " none",
          }}
          transition={BOUNCY_TRANSITION}
        >
          <Image
            src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME BAKSO HOT.png"
            alt="Kanzler bakso hot"
            width={400}
            height={300}
            className="object-contain"
            loading="lazy"
          />
        </motion.div>
           {/* Left side floating products */}
        <motion.div
          className="absolute bottom-16 right-80 z-[130]"
          initial={{ opacity: 1, rotate: -25, y: 0 }}
          animate={{
            y: isHoveringRight ? 0 : 350,
            x: isHoveringRight ? 500 : 0,
            scale: isHoveringRight ? 1 : 0.7,
            rotate: isHoveringRight ? -25 : 30, // selalu miring kiri 25°
            display: isHoveringRight ? "block" : " none",
          }}
          transition={BOUNCY_TRANSITION}
        >
          <Image
            src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME SOSIS GOCHU.png"
            alt="Kanzler sosis gochu"
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

export default SplitRight;

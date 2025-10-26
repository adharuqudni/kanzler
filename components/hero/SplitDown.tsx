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
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Content for bottom panel */}
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: isHoveringDown ? 1 : 0, y: isHoveringDown ? 0 : -50 }}
          transition={{ duration: 0.8, delay: isHoveringDown ? 0.6 : 0 }}
        >
          {/* Product showcase */}
          <div className="flex flex-col items-center space-y-4">
            <motion.div
              className="absolute -top-12 -left-20"
              initial={{ scale: 0.8, rotate: -20 }}
              animate={{ 
                scale: isHoveringUp ? 1.1 : 0.8, 
                rotate: isHoveringUp ? 0 : 25 
              }}
              transition={{ duration: 0.8, delay: isHoveringUp ? 0.8 : 0 }}
            >
              <Image
                src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME BAKSO HOT.png"
                alt="Bakso Hot"
                width={220}
                height={180}
                className="object-contain"
                loading="lazy"
              />
            </motion.div>
            
            <motion.div
              className="absolute bottom-0 -right-20"
              initial={{ scale: 0.8, rotate: 20 }}
              animate={{ 
                scale: isHoveringUp ? 1.1 : 0.8, 
                rotate: isHoveringUp ? 0 : 20 
              }}
              transition={{ duration: 0.8, delay: isHoveringUp ? 1.0 : 0 }}
            >
              <Image
                src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME SOSIS GOCHU.png"
                alt="Sosis Gochu"
                width={220}
                height={180}
                className="object-contain"
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* Text content */}
          <div className="space-y-4">
            <h2 className={`text-2xl font-bold text-white ${poppins.className}`}>
              Produk Spesial
            </h2>
            <p className={`text-white/90 text-sm max-w-xs ${poppins.className}`}>
              Temukan kelezatan istimewa dengan produk spesial Kanzler
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isHoveringDown ? 1 : 0, y: isHoveringDown ? 0 : -20 }}
              transition={{ duration: 0.6, delay: isHoveringDown ? 1.2 : 0 }}
            >
              <Button 
                asChild
                className="bg-[#AA7B32] hover:bg-[#AA7B32]/90 text-white"
              >
                <Link href="/singles">
                  Jelajahi Produk
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

export default SplitDown;

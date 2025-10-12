"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BOUNCY_TRANSITION } from "@/lib/motion";
import MotionWrapper from "@/components/animations/MotionWrapper";
import Link from "next/link";
import { SideProps } from "./Hero";

const SplitRight = memo(function SplitRight({
  isHoveringRight,
  isHoveringLeft,
  leftSideWidth,
  leftSideIndex,
}: SideProps) {
  return (
    <motion.div
      className={`absolute top-0 bottom-0 right-0 flex items-center justify-center overflow-x-hidden ${
        isHoveringRight
        ? "bg-[url('/assets/gradient-1x1.jpg')] bg-no-repeat bg-right bg-cover"
        : ""
      }`}
      initial={{ width: "50%" }}
      animate={{
        width: `${(isHoveringLeft ? 115 : 100) - leftSideWidth}%`,
        clipPath: isHoveringRight
          ? "ellipse(100% 150% at 100% 50%)"
          : "ellipse(100% 80% at 100% 50%)",
        zIndex: 110 - leftSideIndex,
      }}
      transition={BOUNCY_TRANSITION}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        {isHoveringRight && (
          <>
            {/* Split Logo Animation - Crown and Text */}
            <div className="flex flex-col items-center z-[110]">
              {/* Crown - animates first */}
              <MotionWrapper variant="scaleInBig" delay={0.1}>
                <Image
                  src="/assets/ASSET - HOME/1 ASSET - HOME/crown_white.svg"
                  alt="Kanzler Crown"
                  width={120}
                  height={120}
                  className="object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-[120px] md:h-[120px]"
                  loading="lazy"
                />
              </MotionWrapper>

              {/* Kanzler Text - animates second */}
              <MotionWrapper variant="fadeInUp" delay={0.3}>
                <Image
                  src="/assets/KNZLR R.png"
                  alt="Kanzler"
                  width={400}
                  height={80}
                  className="object-contain w-48 h-10 sm:w-64 sm:h-12 md:w-[400px] md:h-[80px]"
                  loading="lazy"
                />
              </MotionWrapper>
            </div>

            {/* Singles Product Line */}
            <MotionWrapper
              variant="fadeInUp"
              delay={0.5}
              className="z-[110]" // 🔹 hapus mb-3 sm:mb-6
            >
              <Image
                src="/assets/ASSET - HOME/1 ASSET - HOME/Singles.png"
                alt="Singles"
                width={600}
                height={80}
                className="object-contain"
                loading="lazy"
              />
            </MotionWrapper>

            {/* Description and Button with pop-up animation */}
            <motion.div
              className="text-white text-center z-[110]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 15,
                delay: 0.7,
              }}
            >
              <p className="max-w-md sm:max-w-xl md:max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed">
                Produk sosis dan bakso berkualitas yang terbuat dari daging{" "}
                <br />
                sapi dan ayam pilihan. Sudah matang, siap untuk langsung <br />
                dimakan, atau diolah menjadi berbagai menu harian.
              </p>
              <motion.div
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
              >
                <Link href="/singles">
                  <Button className="bg-white text-kanzler-navy font-bold hover:bg-gray-100 rounded-full px-4 sm:px-6 py-0 text-xs sm:text-sm md:text-base">
                    Lihat semua produk ›
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}

        {/* Right side floating products */}
        <motion.div
          className="absolute -bottom-80 rotate-45 -left-28 z-[130]"
          initial={{ opacity: 1, rotate: 40, x: -30 }}
          animate={{
            y: isHoveringRight ? -400 : 0,
            x: isHoveringRight ? -30 : 0,
            rotate: 25, // 🔹 selalu 40°, tidak berubah
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

        <motion.div
          className="absolute bottom-16 right-80 z-[130]"
          initial={{ opacity: 1, rotate: -25, y: 0 }}
          animate={{
            y: 0,
            x: isHoveringRight ? 500 : 0,
            rotate: isHoveringRight ? -25 : -25, // selalu miring kiri 25°
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

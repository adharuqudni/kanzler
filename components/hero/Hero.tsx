// hero.tsx
"use client";

import { useState, useEffect, useMemo, memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { BOUNCY_TRANSITION } from "@/lib/motion";
import MotionWrapper from "@/components/animations/MotionWrapper";
import SplitLeft from "./SplitLeft";
import SplitRight from "./SplitRight";

interface SplitHeroProps {
  className?: string;
}
export interface SideProps {
  isHoveringLeft: boolean;
  isHoveringRight: boolean;
  leftSideWidth: number;
  leftSideIndex: number;
}

function SplitHero({ className = "" }: SplitHeroProps) {
  const mousePosition = useMousePosition(32);
  const [leftSideWidth, setLeftSideWidth] = useState(50);
  const [leftSideIndex, setLeftSideIndex] = useState(5);
  const [isHoveringLeft, setIsHoveringLeft] = useState(false);
  const [isHoveringRight, setIsHoveringRight] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mouseCalculations = useMemo(() => {
    if (!mousePosition.x || !mousePosition.y) return null;
    if (isMobile || hasScrolled)
      return { isLeft: false, isRight: false, reset: true };

    const w = window.innerWidth;
    const x = mousePosition.x;
    const y = mousePosition.y;

    if (y < 100 || (x > w / 2 - 20 && x < w / 2 + 20)) {
      return { isLeft: false, isRight: false, reset: true };
    }

    const isLeft = x < w / 2 + 20;
    return {
      isLeft,
      isRight: !isLeft,
      reset: false,
      width: isLeft ? 60 : 40,
      index: isLeft ? 7 : 3,
    };
  }, [mousePosition.x, mousePosition.y, hasScrolled, isMobile]);

  useEffect(() => {
    if (!mouseCalculations || mouseCalculations.reset) {
      setIsHoveringLeft(false);
      setIsHoveringRight(false);
      setLeftSideWidth(50);
      setLeftSideIndex(5);
      return;
    }
    setIsHoveringLeft(mouseCalculations.isLeft);
    setIsHoveringRight(mouseCalculations.isRight);
    setLeftSideWidth(mouseCalculations.width || 50);
    setLeftSideIndex(mouseCalculations.index || 5);
  }, [mouseCalculations]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 50 && !hasScrolled) setHasScrolled(true);
      if (y <= 10 && hasScrolled) setHasScrolled(false);
      if (isHoveringLeft || isHoveringRight) {
        setIsHoveringLeft(false);
        setIsHoveringRight(false);
        setLeftSideWidth(50);
        setLeftSideIndex(5);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHoveringLeft, isHoveringRight, hasScrolled]);

  return (
    <main
      className={`min-h-[160vh] relative flex flex-col bg-[#1C2653] ${className}`}
    >
      {/* ===== Background Layers ===== */}
      <div className="absolute inset-0">
        {/* Base blue background */}
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME BACKGROUND.png"
          alt="Background Biru"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient (di bawah curve & di bawah logo) */}
        <div className="absolute inset-0 pointer-events-none z-[2]">
          <Image
            src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME GRADIENT BLENDING SCREEN.png"
            alt="Gradient Blending Screen"
            fill
            className="object-cover object-center mix-blend-screen opacity-80"
            priority
          />
        </div>

        {/* Wave putih transisi ke section berikutnya */}
        <svg
          className="absolute inset-x-0 bottom-[-1px] h-[140px] w-full pointer-events-none z-[3]"
          viewBox="0 0 1920 200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,0 C480,160 1440,160 1920,0 L1920,200 L0,200 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* ===== Split Panels (dibatasi tinggi 100vh) ===== */}
      <div className="relative h-screen w-full">
        <SplitLeft
          isHoveringLeft={isHoveringLeft}
          isHoveringRight={isHoveringRight}
          leftSideWidth={leftSideWidth}
          leftSideIndex={leftSideIndex}
        />
        <SplitRight
          isHoveringRight={isHoveringRight}
          isHoveringLeft={isHoveringLeft}
          leftSideWidth={leftSideWidth}
          leftSideIndex={leftSideIndex}
        />

        {/* Overlay gelap saat hover */}
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHoveringRight || isHoveringLeft ? 0.6 : 0 }}
          transition={BOUNCY_TRANSITION}
          style={{ zIndex: 6 }}
        />

        {/* ===== Logo di BELAKANG split (z-4) ===== */}
        <LogoOverlay />

        {/* Produk melayang (tetap paling atas konten) */}
        <FloatingProducts
          isHoveringLeft={isHoveringLeft}
          isHoveringRight={isHoveringRight}
        />
      </div>
    </main>
  );
}

const LogoOverlay = memo(function LogoOverlay() {
  return (
    <div
      className="absolute inset-0 h-full flex flex-col items-center justify-center z-[4] pointer-events-none"
      aria-hidden="true"
    >
      <MotionWrapper variant="scaleInBig" delay={0.2}>
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/crown_white.svg"
          alt="Kanzler Crown"
          width={300}
          height={200}
          className="object-contain mb-20 -mt-20"
          loading="lazy"
        />
      </MotionWrapper>

      <MotionWrapper variant="fadeInUp" delay={0.5} className="text-center">
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/Kanzler.svg"
          alt="Kanzler"
          width={1400}
          height={160}
          className="object-contain"
          loading="lazy"
        />
      </MotionWrapper>
    </div>
  );
});

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  isVisible: boolean;
  animation: "slideFromLeft" | "slideFromRight" | "slideUp";
}

export const ProductImage = memo(function ProductImage({
  src,
  alt,
  className = "",
  isVisible,
  animation,
}: ProductImageProps) {
  const getAnimationProps = () => {
    switch (animation) {
      case "slideFromLeft":
        return {
          initial: { x: -350, opacity: 0 },
          animate: {
            x: isVisible ? 50 : -350,
            opacity: isVisible ? 1 : 0,
            rotate: 25,
          },
        };
      case "slideFromRight":
        return {
          initial: { x: 350, opacity: 0 },
          animate: {
            x: isVisible ? -30 : 350,
            opacity: isVisible ? 1 : 0,
            rotate: -15,
          },
        };
      default:
        return {
          initial: { y: 350, opacity: 0 },
          animate: { y: isVisible ? 0 : 350, opacity: isVisible ? 1 : 0 },
        };
    }
  };

  const animationProps = getAnimationProps();

  return (
    <motion.div
      className={`-rotate-45 ${className}`}
      initial={animationProps.initial}
      animate={animationProps.animate}
      transition={BOUNCY_TRANSITION}
    >
      <Image
        src={src}
        alt={alt}
        width={250}
        height={200}
        className="object-contain"
        loading="lazy"
      />
    </motion.div>
  );
});
const FloatingProducts = memo(function FloatingProducts({
  isHoveringLeft,
  isHoveringRight,
}: {
  isHoveringLeft: boolean;
  isHoveringRight: boolean;
}) {
  return (
    <>
      <motion.div
        className="absolute top-1/2 -rotate-45 left-96 z-20"
        initial={{ opacity: 0, y: 350 }}
        animate={{
          opacity: 1,
          rotate: -15,
          y: 250, // turun dari 150 → 250
          scale: 0.9,
          x: 50,
          zIndex: isHoveringRight ? 5 : 20,
        }}
        transition={{ duration: 1, ease: "easeIn" }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME BEEF COCKTAIL.png"
          alt="Kanzler beef cocktail"
          width={300}
          height={200}
          className="object-contain"
          loading="lazy"
          style={{ display: !isHoveringLeft ? "block" : "none" }}
        />
      </motion.div>

      <motion.div
        className="absolute top-1/2 -rotate-45 left-96 z-20"
        initial={{ opacity: 0, y: 350 }}
        animate={{
          opacity: 1,
          rotate: -10,
          y: 220, // turun dari 120 → 220
          scale: 0.9,
          x: 120,
          zIndex: isHoveringRight ? 5 : 20,
        }}
        transition={{ duration: 1, ease: "easeIn" }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME CRISPY NUGGET.png"
          alt="Kanzler crispy nugget"
          width={400}
          height={200}
          className="object-contain"
          loading="lazy"
          style={{ display: !isHoveringLeft ? "block" : "none" }}
        />
      </motion.div>

      <motion.div
        className="absolute top-1/2 -rotate-45 left-[45%] z-30"
        initial={{ opacity: 0, y: 350 }}
        animate={{
          opacity: 1,
          rotate: 20,
          y: 100, // turun dari 0 → 100
          zIndex: isHoveringLeft ? 5 : 20,
        }}
        transition={{ duration: 1, ease: "easeIn" }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME BAKSO HOT.png"
          alt="Kanzler bakso hot default"
          width={300}
          height={300}
          className="object-contain"
          loading="lazy"
          style={{ display: !isHoveringRight ? "block" : "none" }}
        />
      </motion.div>

      <motion.div
        className="absolute top-1/2 -rotate-45 right-96 z-30"
        initial={{ opacity: 0, y: 350 }}
        animate={{
          opacity: 1,
          rotate: 35,
          y: 100, // turun dari 0 → 100
          zIndex: isHoveringLeft ? 5 : 20,
        }}
        transition={{ duration: 1, ease: "easeIn" }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME SOSIS GOCHU.png"
          alt="Kanzler sosis gochu default"
          width={300}
          height={300}
          className="object-contain"
          loading="lazy"
          style={{ display: !isHoveringRight ? "block" : "none" }}
        />
      </motion.div>
    </>
  );
});

export default memo(SplitHero);

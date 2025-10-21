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
  currentSection?: number;
  isScrolling?: boolean;
}
export interface SideProps {
  isHoveringLeft: boolean;
  isHoveringRight: boolean;
  leftSideWidth: number;
  leftSideIndex: number;
}

function SplitHero({ className = "", currentSection = 0, isScrolling = false }: SplitHeroProps) {
  const mousePosition = useMousePosition(32);
  const [leftSideWidth, setLeftSideWidth] = useState(250);
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
    // Only allow hover on hero section (currentSection === 0) and when not scrolling
    if (isMobile || currentSection > 0 || isScrolling)
      return { isLeft: false, isRight: false, reset: true };
    
    // Also check hasScrolled only when on hero section
    if (currentSection === 0 && hasScrolled)
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
  }, [mousePosition.x, mousePosition.y, hasScrolled, isMobile, currentSection, isScrolling]);

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
      // Immediate reset on any scroll
      setIsHoveringLeft(false);
      setIsHoveringRight(false);
      setLeftSideWidth(50);
      setLeftSideIndex(5);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasScrolled]);

  // Immediate reset when snap scrolling starts or section changes
  useEffect(() => {
    if (isScrolling || currentSection > 0) {
      setIsHoveringLeft(false);
      setIsHoveringRight(false);
      setLeftSideWidth(50);
      setLeftSideIndex(5);
      setHasScrolled(true); // Also set hasScrolled to prevent immediate re-hover
    }
  }, [isScrolling, currentSection]);

  // Reset hasScrolled when returning to hero section
  useEffect(() => {
    if (currentSection === 0) {
      setHasScrolled(false);
    }
  }, [currentSection]);

  // Add wheel event listener for immediate cancellation on scroll attempt
  useEffect(() => {
    const handleWheel = () => {
      if (isHoveringLeft || isHoveringRight) {
        setIsHoveringLeft(false);
        setIsHoveringRight(false);
        setLeftSideWidth(50);
        setLeftSideIndex(5);
      }
    };
    
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isHoveringLeft, isHoveringRight]);

  return (
    <main
      className={`min-h-[130vh] relative flex flex-col bg-[#1C2653] ${className}`}
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
        <div className="absolute inset-0 pointer-events-none z-[100] h-[170vh]">
          <Image
            src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME GRADIENT BLENDING SCREEN.png"
            alt="Gradient Blending Screen"
            fill
            className="object-cover object-center mix-blend-screen opacity-80"
            priority
          />
        </div>

        {/* Wave putih transisi ke section berikutnya */}
      
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
          animate={{ 
            opacity: isHoveringRight || isHoveringLeft ? 0.6 : 0,
            transition: {
              duration: isHoveringRight || isHoveringLeft ? 1.2 : 0,  // 1.2s IN, 0s OUT
              delay: isHoveringRight || isHoveringLeft ? 0.6 : 0
            },
            
          }}
          style={{ zIndex: 106 }}
        />

        {/* ===== Logo di BELAKANG split (z-104) ===== */}
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
      className="absolute inset-0 h-full flex flex-col items-center justify-center z-[104] pointer-events-none"
      aria-hidden="true"
    >
      <MotionWrapper variant="scaleInBig" delay={0.2}>
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/crown_white.svg"
          alt="Kanzler Crown"
          width={300}
          height={200}
          className="object-contain -mt-8"
          loading="lazy"
        />
      </MotionWrapper>

      <MotionWrapper variant="fadeInUp" delay={0.5} className="text-center">
        <Image
          src="/assets/KNZLR R.png"
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
  rotateOverride?: number;
}

export const ProductImage = memo(function ProductImage({
  src,
  alt,
  className = "",
  isVisible,
  animation,
  rotateOverride = 0,
}: ProductImageProps) {
  const getAnimationProps = () => {
    switch (animation) {
      case "slideFromLeft":
        return {
          initial: { x: -350, opacity: 0 },
          animate: {
            x: isVisible ? 50 : -350,
            opacity: isVisible ? 1 : 0,
            rotate: rotateOverride ? rotateOverride : 25,
            scale: rotateOverride ? 0.9 : 1,
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
        className="absolute top-1/2 -rotate-45 left-96 z-[120]"
        initial={{ opacity: 0, y: 350 }}
        animate={{
          opacity: 1,
          rotate: -15,
          y: 200, // turun dari 150 → 250
          scale: 0.9,
          x: -140,
          zIndex: isHoveringRight ? 105 : 120,
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
        className="absolute top-1/2 -rotate-45 left-96 z-[120]"
        initial={{ opacity: 0, y: 350 }}
        animate={{
          opacity: 1,
          rotate: -10,
          y: 150, // sedikit dinaikkan (lebih ke atas)
          scale: 0.9,
          x: -20, // digeser ke kiri sedikit dari 120 -> 80
          zIndex: isHoveringRight ? 105 : 120,
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
        className="absolute top-1/2 -rotate-45 left-[44%] z-[130]"
        initial={{ opacity: 0, y: 350 }}
        animate={{
          opacity: 1,
          rotate: 20,
          y: 0, // turun dari 0 → 100
          zIndex: isHoveringLeft ? 105 : 120,
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
        className="absolute top-1/2 -rotate-45 right-[30%] z-[130]"
        initial={{ opacity: 0, y: 350 }}
        animate={{
          opacity: 1,
          rotate: 35,
          y: 40, // turun dari 0 → 100
          x: 40,
          zIndex: isHoveringLeft ? 105 : 120,
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

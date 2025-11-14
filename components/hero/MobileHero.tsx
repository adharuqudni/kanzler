"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { DM_Serif_Display, Poppins } from "next/font/google";
import { BOUNCY_TRANSITION } from "@/lib/motion";
import MotionWrapper from "@/components/animations/MotionWrapper";
import SplitUp from "./SplitUp";
import SplitDown from "./SplitDown";

const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

interface MobileHeroProps {
  currentSection: number;
  isScrolling: boolean;
  onScrollToNext?: () => void;
  onPanelStateChange?: (isActive: boolean) => void;
}

interface MobileSideProps {
  isHoveringUp: boolean;
  isHoveringDown: boolean;
  topSideHeight: number;
  topSideIndex: number;
}

const MobileHero: React.FC<MobileHeroProps> = ({ currentSection, isScrolling, onScrollToNext, onPanelStateChange }) => {
  const [topSideHeight, setTopSideHeight] = useState(50);
  const [topSideIndex, setTopSideIndex] = useState(5);
  const [isHoveringUp, setIsHoveringUp] = useState(false);
  const [isHoveringDown, setIsHoveringDown] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isPanelActive, setIsPanelActive] = useState(false);

  // Touch detection with zone-based activation
  const handleTouchStart = (e: React.TouchEvent) => {
    // Only handle touches on hero section (currentSection === 0) and when not scrolling
    if (currentSection !== 0 || isScrolling || isPanelActive || hasScrolled) return;

    const touch = e.touches[0];
    const touchY = touch.clientY;
    const screenHeight = window.innerHeight;
    const isTopHalf = touchY < screenHeight / 2;
    
    // Immediately trigger panel based on touch zone
    setIsPanelActive(true);
    
    if (isTopHalf) {
      // Touch on top half - open SplitUp (top panel)
      setIsHoveringUp(true);
      setIsHoveringDown(false);
      setTopSideHeight(60);
      setTopSideIndex(7);
    } else {
      // Touch on bottom half - open SplitDown (bottom panel)
      setIsHoveringUp(false);
      setIsHoveringDown(true);
      setTopSideHeight(40);
      setTopSideIndex(3);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Simple touch move handler - no complex logic needed for zone-based activation
    // Just prevent default scrolling when panels are active
    if (isPanelActive && currentSection === 0) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // Simple touch end - no double-tap logic needed
  };

  // Handle click outside to close panels
  const handleClickOutside = (e: React.MouseEvent) => {
    if (isPanelActive && currentSection === 0) {
      // Close panels when clicking outside
      setIsHoveringUp(false);
      setIsHoveringDown(false);
      setTopSideHeight(50);
      setTopSideIndex(5);
      setIsPanelActive(false);
    }
  };

  // Handle overlay click to close panels
  const handleOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Close panels when clicking on overlay
    setIsHoveringUp(false);
    setIsHoveringDown(false);
    setTopSideHeight(50);
    setTopSideIndex(5);
    setIsPanelActive(false);
  };

  // Reset on scroll or section change
  useEffect(() => {
    if (isScrolling || currentSection > 0) {
      setIsHoveringUp(false);
      setIsHoveringDown(false);
      setTopSideHeight(50);
      setTopSideIndex(5);
      setIsPanelActive(false);
      setHasScrolled(true);
    }
  }, [isScrolling, currentSection]);

  // Reset hasScrolled when returning to hero section
  useEffect(() => {
    if (currentSection === 0) {
      setHasScrolled(false);
    }
  }, [currentSection]);

  // Reset panel active state when panels are closed
  useEffect(() => {
    if (!isHoveringUp && !isHoveringDown) {
      setIsPanelActive(false);
    }
  }, [isHoveringUp, isHoveringDown]);

  // Notify parent when panel state changes
  useEffect(() => {
    onPanelStateChange?.(isPanelActive);
  }, [isPanelActive, onPanelStateChange]);

  return (
    <main 
      className="min-h-screen relative flex flex-col bg-[#1C2653]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleClickOutside}
    >
      {/* ===== Background Layers ===== */}
      <div className="absolute inset-0">
        {/* Base blue background */}
        <Image
          src="/assets/gradient-9x16.jpg"
          alt="Background Biru"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient overlay
        <div className="absolute inset-0 pointer-events-none z-[100]">
          <Image
            src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME GRADIENT BLENDING SCREEN.png"
            alt="Gradient Blending Screen"
            fill
            className="object-cover object-center mix-blend-screen opacity-80"
            priority
          />
        </div> */}
      </div>

      {/* ===== Mobile Split Panels (Vertical) ===== */}
      <div className="relative h-screen w-full">
        <SplitUp
          isHoveringUp={isHoveringUp}
          isHoveringDown={isHoveringDown}
          topSideHeight={topSideHeight}
          topSideIndex={topSideIndex}
        />
        <SplitDown
          isHoveringDown={isHoveringDown}
          isHoveringUp={isHoveringUp}
          topSideHeight={topSideHeight}
          topSideIndex={topSideIndex}
        />

        {/* Overlay gelap saat hover */}
        <motion.div
          className="absolute inset-0 bg-black cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHoveringDown || isHoveringUp ? 0.6 : 0,
            transition: {
              duration: isHoveringDown || isHoveringUp ? 1.2 : 0,
              delay: isHoveringDown || isHoveringUp ? 0.6 : 0
            },
          }}
          style={{ zIndex: 106 }}
          onClick={handleOverlayClick}
        />

        {/* ===== Logo di BELAKANG split (z-104) ===== */}
        <LogoOverlay />

        {/* Swipe hint indicator */}
       


        {/* Produk melayang (tetap paling atas konten) */}
        <MobileFloatingProducts
          isHoveringUp={isHoveringUp}
          isHoveringDown={isHoveringDown}
        />
      </div>
    </main>
  );
};

const LogoOverlay = React.memo(function LogoOverlay() {
  return (
    <div
      className="absolute -inset-8 h-full flex flex-col items-center justify-center z-[104] pointer-events-none"
      aria-hidden="true"
    >
      <MotionWrapper variant="scaleInBig" delay={0.2}>
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/crown_white.svg"
          alt="Kanzler Crown"
          width={64}
          height={120}
          className="object-contain"
          loading="lazy"
        />
      </MotionWrapper>

      <MotionWrapper variant="fadeInUp" delay={0.5} className="text-center">
        <Image
          src="/assets/kanzler-white.svg"
          alt="Kanzler"
          width={365}
          height={60}
          className="object-contain mt-4"
          loading="lazy"
        />
      </MotionWrapper>
    </div>
  );
});

// Mobile-specific floating products component
const MobileFloatingProducts = React.memo(function MobileFloatingProducts({
  isHoveringUp,
  isHoveringDown,
}: {
  isHoveringUp: boolean;
  isHoveringDown: boolean;
}) {
  return (
    <>
      {/* Beef Cocktail - Top Left */}
      <motion.div
        className="absolute top-20 -left-20 z-[120]"
        initial={{ opacity: 1, y: -400, x: -400, rotate: 25 }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 25,
          scale: 0.8,
          zIndex: isHoveringDown ? 105 : 120,
        }}
        transition={{ duration: 0.8, ease: "easeIn", delay: 0.4 }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME BEEF COCKTAIL.png"
          alt="Kanzler beef cocktail"
          width={220}
          height={150}
          className="object-contain"
          loading="lazy"
          style={{ display: !isHoveringUp ? "block" : "none" }}
        />
      </motion.div>

      {/* Crispy Nugget - Top Right */}
      <motion.div
        className="absolute top-8 -right-28 z-[120]"
        initial={{ opacity: 1, y: -400, x: 400, rotate: -15 }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
          rotate: -15,
          scale: 0.8,
          zIndex: isHoveringDown ? 105 : 120,
        }}
        transition={{ duration: 0.8, ease: "easeIn", delay: 0.6 }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME CRISPY NUGGET.png"
          alt="Kanzler crispy nugget"
          width={260}
          height={150}
          className="object-contain"
          loading="lazy"
          style={{ display: !isHoveringUp ? "block" : "none" }}
        />
      </motion.div>

      {/* Bakso Hot - Bottom Left */}
      <motion.div
        className="absolute -bottom-8 -left-16 z-[120]"
        initial={{ opacity: 1, y: 400, x: -400, rotate: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          x: 0,
          rotate: 20,
          scale: 0.8,
          zIndex: isHoveringUp ? 105 : 120,
        }}
        transition={{ duration: 1, ease: "easeIn", delay: 0.8 }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME BAKSO HOT.png"
          alt="Kanzler bakso hot"
          width={240}
          height={180}
          className="object-contain"
          loading="lazy"
          style={{ display: !isHoveringDown ? "block" : "none" }}
        />
      </motion.div>

      {/* Sosis Gochu - Bottom Right */}
      <motion.div
        className="absolute -bottom-16 -right-20 z-[120]"
        initial={{ opacity: 1, y: 400, x: 400, rotate: -15 }}
        animate={{
          opacity: 1,
          y: 0,
          x: 0,
          rotate: -15,
          scale: 0.8,
          zIndex: isHoveringUp ? 105 : 120,
        }}
        transition={{ duration: 1, ease: "easeIn", delay: 1.0 }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME SOSIS GOCHU.png"
          alt="Kanzler sosis gochu"
          width={270}
          height={180}
          className="object-contain"
          loading="lazy"
          style={{ display: !isHoveringDown ? "block" : "none" }}
        />
      </motion.div>
    </>
  );
});

export default MobileHero;

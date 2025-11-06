'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '@/components/hero/Hero';
import MobileHero from '@/components/hero/MobileHero';
import CeritaKanzler from '@/components/sections/CeritaKanzler';
import MobileCeritaKanzler from '@/components/sections/MobileCeritaKanzler';
import MapSection from '@/components/sections/MapSection';
import MobileMapSection from '@/components/sections/MobileMapSection';
import {
  useSnapScroll,
  SectionIndicator,
  ScrollProgress,
} from '@/hooks/use-snap-scroll';

// CrownToggle: toggle putih <-> emas berdasarkan keberadaan
export function CrownToggle({
  targetIds,
  style,
  rootId,
  isHidden = false,
}: {
  targetIds: string[];
  style?: React.CSSProperties;
  rootId?: string;
  isHidden?: boolean;
}) {
  const [isGold, setIsGold] = useState(false);

  useEffect(() => {
    // pilih root: jika dikirim rootId gunakan itu, else cari elemen snap-scroll-container
    const rootEl =
      (rootId && document.getElementById(rootId)) ||
      document.querySelector('.snap-scroll-container');

    const options = rootEl
      ? { root: rootEl as Element, threshold: 0.15 }
      : { threshold: 0.15 };

    const elements = targetIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    const obs = new IntersectionObserver((entries) => {
      const anyVisible = entries.some((e) => e.isIntersecting);
      setIsGold(anyVisible);
    }, options);

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [targetIds, rootId]);

  const crownColor = isGold ? '#AA7B32' : '#ffffff';

  return (
    <AnimatePresence>
      {!isHidden && (
        <motion.div
          className="fixed top-4 left-4 z-50 pointer-events-none ml-4 z-[200]"
          style={style}
          aria-hidden="true"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 175.57814 109.33205"
            className="w-11 h-11 sm:w-12 sm:h-12 transition-colors duration-300"
            aria-label="Kanzler Crown"
          >
            <path
              fillRule="nonzero"
              fill={crownColor}
              fillOpacity="1"
              d="M 34.214839,109.33205 H 141.36719 v -6.27734 H 34.214839 Z m 0,0"
            />
            <path
              fillRule="nonzero"
              fill={crownColor}
              fillOpacity="1"
              d="m 45.589839,78.917991 1.1211,-2.25781 1.1289,2.25781 2.5,0.36719 -1.8164,1.75781 0.42578,2.49219 -2.23828,-1.17969 -2.25,1.17969 0.43359,-2.49219 -1.81641,-1.75781 z m 19.35547,-4 1.41797,-2.8711 1.41406,2.8711 3.17578,0.46484 -2.29296,2.23828 0.54687,3.14844 -2.84375,-1.49609 -2.83594,1.49609 0.54297,-3.14844 -2.29297,-2.23828 z m 21.10156,-4.02344 1.7461,-3.54297 1.75781,3.54297 3.90234,0.57422 -2.82421,2.75 0.65625,3.88672 -3.49219,-1.84375 -3.50781,1.84375 0.67578,-3.88672 -2.82032,-2.75 z m 21.761721,4.02344 1.41797,-2.8711 1.42188,2.8711 3.16015,0.46484 -2.29297,2.23828 0.55079,3.14844 -2.83985,-1.49609 -2.83203,1.49609 0.53516,-3.14844 -2.29297,-2.23828 z m 19.94922,4 1.09375,-2.25781 1.12891,2.25781 2.51953,0.36719 -1.8125,1.75781 0.41797,2.49219 -2.25391,-1.17969 -2.23047,1.17969 0.44141,-2.49219 -1.79688,-1.75781 z M 34.351559,94.695331 H 141.24219 c 0,-42.80469 34.33593,-60.05469 34.33593,-60.05469 -2.82031,-2.10937 -6.41015,-3.375 -10.30078,-3.375 -6.60547,0 -12.30078,3.61719 -14.9414,8.84375 l -0.1211,0.12891 c -1.84375,-3.59766 -8.86718,-6.06641 -13.40625,-6.06641 -0.8164,0 -2.17187,0.23438 -2.46093,0.29297 1.13671,2.42188 1.80078,5.13672 1.80078,7.9961 0,10.45312 -6.94532,17.39062 -17.42578,17.39062 -10.48047,0 -17.41407,-7.64062 -17.41407,-16.125 0,-8.46094 5.40625,-13.23828 6.04688,-13.84375 0.85937,-1.2539 1.35156,-2.73047 1.35156,-4.32031 0,-4.47656 -3.85156,-8.10156 -8.65234,-8.10156 -1.644531,0 -3.179691,0.42968 -4.480471,1.17187 0,0 3.86328,-7.75 -7.78125,-18.632810467607 C 75.937499,11.089861 80.019529,18.632831 80.019529,18.632831 c -1.31641,-0.74219 -2.84375,-1.17187 -4.48047,-1.17187 -4.80859,0 -8.66406,3.625 -8.66406,8.10156 0,1.96484 0.76172,3.78125 2.02734,5.17187 0.0586,0.0742 0.10938,0.14844 0.17578,0.21094 0.42579,0.44922 4.9961,3.92969 4.9961,12.78125 0,8.86719 -6.92969,16.125 -17.40235,16.125 -10.48046,0 -17.43359,-6.9375 -17.43359,-17.39062 0,-2.87891 0.67188,-5.58985 1.80469,-8.03516 -0.47656,-0.0781 -1.57031,-0.25391 -2.25391,-0.25391 -4.54297,0 -11.57422,2.46875 -13.41406,6.06641 l -0.11719,-0.12891 c -2.65234,-5.22656 -8.35156,-8.84375 -14.94531,-8.84375 -3.9023396,0 -7.4882796,1.26563 -10.31249964240114,3.375 0,0 34.35155964240114,17.25 34.35155964240114,60.05469"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Mobile-specific component
function MobileHome() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isPanelActive, setIsPanelActive] = useState(false);

  // Define section IDs for snap scrolling
  const sections = ['hero-section', 'cerita-kanzler', 'map-section'];

  // Initialize snap scroll
  const {
    containerRef,
    currentSection: snapCurrentSection,
    isScrolling,
    scrollToSection,
    scrollToNext,
    scrollToPrevious,
    totalSections,
  } = useSnapScroll({
    sections,
    onSectionChange: (index) => {
      setCurrentSection(index);
    },
  });

  return (
    <div ref={containerRef} className="snap-scroll-container overflow-x-hidden">
      {/* Crown toggle - white <-> gold based on scroll position */}
      <CrownToggle
        targetIds={['map-section']}
        rootId="snap-scroll-container"
        isHidden={isPanelActive}
      />

      {/* Hero Section */}
      <section id="hero-section" className="snap-scroll-section">
        <MobileHero
          currentSection={snapCurrentSection}
          isScrolling={isScrolling}
          onScrollToNext={scrollToNext}
          onPanelStateChange={setIsPanelActive}
        />
      </section>

      {/* Cerita Kanzler Section */}
      <section id="cerita-kanzler" className="snap-scroll-section h-full">
        <MobileCeritaKanzler />
      </section>

      {/* Map Section */}
      <section id="map-section" className="snap-scroll-section  ">
        <MobileMapSection />
      </section>
    </div>
  );
}

// Desktop/Tablet component (original)
function DesktopHome() {
  const [currentSection, setCurrentSection] = useState(0);

  // Define section IDs for snap scrolling
  const sections = ['hero-section', 'cerita-kanzler', 'map-section'];

  // Initialize snap scroll
  const {
    containerRef,
    currentSection: snapCurrentSection,
    isScrolling,
    scrollToSection,
    scrollToNext,
    scrollToPrevious,
    totalSections,
  } = useSnapScroll({
    sections,
    onSectionChange: (index) => {
      setCurrentSection(index);
    },
  });

  return (
    <div ref={containerRef} className="snap-scroll-container overflow-x-hidden">
      {/* Crown toggle - white <-> gold based on scroll position */}
      <CrownToggle targetIds={['map-section']} rootId="snap-scroll-container" />

      {/* Scroll Progress Indicator */}
      {/* <ScrollProgress currentSection={snapCurrentSection} totalSections={totalSections} /> */}

      {/* Section Indicator */}
      {/* <SectionIndicator
        currentSection={snapCurrentSection}
        totalSections={totalSections}
        onSectionClick={scrollToSection}
      /> */}

      {/* Hero Section */}
      <section id="hero-section" className="snap-scroll-section ">
        <Hero currentSection={snapCurrentSection} isScrolling={isScrolling} />
      </section>

      {/* Cerita Kanzler Section */}
      <section id="cerita-kanzler" className="snap-scroll-section h-full">
        <CeritaKanzler />
      </section>

      {/* Map Section */}
      <section id="map-section" className="snap-scroll-section ">
        <MapSection />
      </section>
    </div>
  );
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint (768px)
    };

    // Check on mount
    checkIsMobile();

    // Add event listener for resize
    window.addEventListener('resize', checkIsMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile ? <MobileHome /> : <DesktopHome />;
}

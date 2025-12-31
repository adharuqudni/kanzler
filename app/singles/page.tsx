'use client';

import React, { useState, useEffect } from 'react';

import SinglesHero from '@/components/sections/SinglesHero';
import MobileSinglesHero from '@/components/sections/MobileSinglesHero';

import SinglesSecondSection from '@/components/sections/SinglesSecondSection';
import MobileSinglesSecondSection from '@/components/sections/MobileSinglesSecondSection';

import ProductCarouselSectionSingles from '@/components/sections/ProductCarouselSectionSingles';
import MobileProductCarouselSectionSingles from '@/components/sections/MobileProductCarouselSectionSingles';

import RecipeInspirationSection from '@/components/sections/RecipeInspirationSection';
import MobileRecipeInspirationSection from '@/components/sections/MobileRecipeInspirationSection';

import FixedAnimatedProducts from '@/components/animations/FixedAnimatedProducts';
import MobileFixedAnimatedProducts from '@/components/animations/MobileFixedAnimatedProducts';

import SinglesSidebar from '@/components/navigation/SinglesSidebar';
import MobileSidebar from '@/components/navigation/MobileSidebar';

import { useSnapScroll } from '@/hooks/use-snap-scroll';

// Shared sections (biar konsisten desktop & mobile)
const SECTIONS = ['hero', 'second-section', 'produk', 'resep'] as const;

// Mobile-specific component
function MobileSinglesPage() {
  const [currentSection, setCurrentSection] = useState(0);

  const { containerRef, currentSection: snapCurrentSection, scrollToSection } =
    useSnapScroll({
      sections: [...SECTIONS],
      onSectionChange: (index) => setCurrentSection(index),
    });

  return (
    <>
      {/* ✅ Mobile Sidebar seperti Homepack */}
      <MobileSidebar
        currentSection={snapCurrentSection}
        scrollToSection={scrollToSection}
        sections={[...SECTIONS]}
      />

      <div ref={containerRef} className="snap-scroll-container overflow-x-hidden">
        <MobileFixedAnimatedProducts currentSection={currentSection} />

        {/* Hero */}
        <section id="hero" className="snap-scroll-section-overflow">
          <MobileSinglesHero />
        </section>

        {/* Second */}
        <section id="second-section" className="snap-scroll-section-overflow">
          <MobileSinglesSecondSection />
        </section>

        {/* Produk */}
        <section id="produk" className="snap-scroll-section-overflow">
          <MobileProductCarouselSectionSingles />
        </section>

        {/* Resep */}
        <section id="resep" className="snap-scroll-section-overflow">
          <MobileRecipeInspirationSection page="singles" />
        </section>
      </div>
    </>
  );
}

// Desktop/Tablet component
function DesktopSinglesPage() {
  const [currentSection, setCurrentSection] = useState(0);

  const { containerRef, currentSection: snapCurrentSection, scrollToSection } =
    useSnapScroll({
      sections: [...SECTIONS],
      onSectionChange: (index) => setCurrentSection(index),
    });

  return (
    <>
      <SinglesSidebar
        currentSection={snapCurrentSection}
        scrollToSection={scrollToSection}
        sections={[...SECTIONS]}
      />

      <div ref={containerRef} className="snap-scroll-container overflow-x-hidden">
        <FixedAnimatedProducts currentSection={currentSection} />

        {/* Hero */}
        <section id="hero" className="snap-scroll-section-overflow">
          <SinglesHero />
        </section>

        {/* Second */}
        <section id="second-section" className="snap-scroll-section-overflow">
          <SinglesSecondSection />
        </section>

        {/* Produk */}
        <section id="produk" className="snap-scroll-section-overflow">
          <ProductCarouselSectionSingles />
        </section>

        {/* Resep */}
        <section id="resep" className="snap-scroll-section-overflow">
          <RecipeInspirationSection page="singles" />
        </section>
      </div>
    </>
  );
}

export default function SinglesPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile ? <MobileSinglesPage /> : <DesktopSinglesPage />;
}

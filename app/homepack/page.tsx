'use client';

import HomepackHeroSection from '@/components/sections/HomepackHeroSection';
import MobileHomepackHeroSection from '@/components/sections/MobileHomepackHeroSection';
import HomepackProductsSection from '@/components/sections/HomepackProductsSection';
import MobileHomepackProductsSection from '@/components/sections/MobileHomepackProductsSection';
import WhyKanzler from '@/components/sections/WhyKanzler';
import MobileWhyKanzler from '@/components/sections/MobileWhyKanzler';
import ProductCarouselSectionHomepack from '@/components/sections/ProductCarouselSectionHomepack';
import React, { useState, useEffect } from 'react';
import RecipeInspirationSection from '@/components/sections/RecipeInspirationSection';
import {
  useSnapScroll,
  SectionIndicator,
  ScrollProgress,
} from '@/hooks/use-snap-scroll';
import SinglesSidebar from '@/components/navigation/SinglesSidebar';

// Mobile-specific component
function MobileHomepackPage() {
  const [currentSection, setCurrentSection] = useState(0);

  // Define section IDs for snap scrolling
  const sections = [
    'homepack-hero',
    'homepack-products',
    'why-kanzler',
    'produk',
    'resep',
  ];

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
    <div
      ref={containerRef}
      className="snap-scroll-container overflow-x-hidden"
    >
      {/* Homepack Hero Section - Can overflow into next section */}
      <section id="homepack-hero" className="snap-scroll-section-overflow">
        <MobileHomepackHeroSection currentSection={snapCurrentSection} />
      </section>

      {/* Homepack Products Section - Can overflow into next section */}
      <section
        id="homepack-products"
        className="snap-scroll-section-overflow"
      >
        <MobileHomepackProductsSection />
      </section>

      {/* Why Kanzler Section - Fixed height */}
      <section id="why-kanzler" className="snap-scroll-section">
        <MobileWhyKanzler />
      </section>

      {/* Products Carousel Section - Can overflow into next section */}
      <section id="produk" className="snap-scroll-section-overflow">
        <ProductCarouselSectionHomepack
          title="Homepack Products"
          defaultCategory="nugget"
        />
      </section>

      {/* Recipe Section - Can overflow (last section) */}
      <section id="resep" className="snap-scroll-section-overflow">
        <RecipeInspirationSection page="homepack" />
      </section>
    </div>
  );
}

// Desktop/Tablet component (original)
function DesktopHomepackPage() {
  const [currentSection, setCurrentSection] = useState(0);

  // Define section IDs for snap scrolling
  const sections = [
    'homepack-hero',
    'homepack-products',
    'why-kanzler',
    'produk',
    'resep',
  ];

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
    <>
      <SinglesSidebar
        currentSection={snapCurrentSection}
        scrollToSection={scrollToSection}
        sections={sections}
      />
      <div
        ref={containerRef}
        className="snap-scroll-container overflow-x-hidden"
      >
        {/* Homepack Hero Section - Can overflow into next section */}
        <section id="homepack-hero" className="snap-scroll-section-overflow">
          <HomepackHeroSection currentSection={snapCurrentSection} />
        </section>

        {/* Homepack Products Section - Can overflow into next section */}
        <section
          id="homepack-products"
          className="snap-scroll-section-overflow"
        >
          <HomepackProductsSection />
        </section>

        {/* Why Kanzler Section - Fixed height */}
        <section id="why-kanzler" className="snap-scroll-section">
          <WhyKanzler />
        </section>

        {/* Products Carousel Section - Can overflow into next section */}
        <section id="produk" className="snap-scroll-section-overflow">
          <ProductCarouselSectionHomepack
            title="Homepack Products"
            defaultCategory="nugget"
          />
        </section>

        {/* Recipe Section - Can overflow (last section) */}
        <section id="resep" className="snap-scroll-section-overflow">
          <RecipeInspirationSection page="homepack" />
        </section>
      </div>
    </>
  );
}

export default function HomepackPage() {
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

  return isMobile ? <MobileHomepackPage /> : <DesktopHomepackPage />;
}

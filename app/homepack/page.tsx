'use client';

import HomepackHeroSection from '@/components/sections/HomepackHeroSection';
import HomepackProductsSection from '@/components/sections/HomepackProductsSection';
import WhyKanzler from '@/components/sections/WhyKanzler';
import ProductCarouselSectionHomepack from '@/components/sections/ProductCarouselSectionHomepack';
import React, { useState } from 'react';
import RecipeInspirationSection from '@/components/sections/RecipeInspirationSection';
import {
  useSnapScroll,
  SectionIndicator,
  ScrollProgress,
} from '@/hooks/use-snap-scroll';
import SinglesSidebar from '@/components/navigation/SinglesSidebar';

export default function HomepackPage() {
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
          <HomepackHeroSection />
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

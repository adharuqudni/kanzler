"use client";

import HomepackHeroSection from "@/components/sections/HomepackHeroSection";
import HomepackProductsSection from "@/components/sections/HomepackProductsSection";
import WhyKanzler from "@/components/sections/WhyKanzler";
import ProductCarouselSectionHomepack from "@/components/sections/ProductCarouselSectionHomepack";
import React, { useState } from "react";
import RecipeInspirationSection from '@/components/sections/RecipeInspirationSection';
import { useSnapScroll, SectionIndicator, ScrollProgress } from '@/hooks/use-snap-scroll';

export default function HomepackPage() {
  const [currentSection, setCurrentSection] = useState(0);

  // Define section IDs for snap scrolling
  const sections = ['homepack-hero', 'homepack-products', 'why-kanzler', 'produk', 'resep'];

  // Initialize snap scroll
  const {
    containerRef,
    currentSection: snapCurrentSection,
    isScrolling,
    scrollToSection,
    scrollToNext,
    scrollToPrevious,
    totalSections
  } = useSnapScroll({
    sections,
    onSectionChange: (index) => {
      setCurrentSection(index);
    }
  });

  return (
    <div ref={containerRef} className="snap-scroll-container">
      {/* Scroll Progress Indicator */}
      {/* <ScrollProgress currentSection={snapCurrentSection} totalSections={totalSections} /> */}
      
      {/* Section Indicator */}
      {/* <SectionIndicator
        currentSection={snapCurrentSection}
        totalSections={totalSections}
        onSectionClick={scrollToSection}
      /> */}

      {/* Homepack Hero Section */}
      <section id="homepack-hero" className="snap-scroll-section">
        <HomepackHeroSection />
      </section>

      {/* Homepack Products Section */}
      <section id="homepack-products" className="snap-scroll-section">
        <HomepackProductsSection />
      </section>

      {/* Why Kanzler Section */}
      <section id="why-kanzler" className="snap-scroll-section">
        <WhyKanzler />
      </section>

      {/* Products Carousel Section */}
      <section id="produk" className="snap-scroll-section">
        <ProductCarouselSectionHomepack
          title="Homepack Products"
          defaultCategory="nugget"
        />
      </section>

      {/* Recipe Section */}
      <section id="resep" className="snap-scroll-section">
        <RecipeInspirationSection />
      </section>
    </div>
  );
}

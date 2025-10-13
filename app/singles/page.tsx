'use client';

import React, { useState } from 'react';
import SinglesHero from '@/components/sections/SinglesHero';
import SinglesSecondSection from '@/components/sections/SinglesSecondSection';
import ProductCarouselSectionSingles from '@/components/sections/ProductCarouselSectionSingles';
import RecipeInspirationSection from '@/components/sections/RecipeInspirationSection';
import FixedAnimatedProducts from '@/components/animations/FixedAnimatedProducts';
import SinglesSidebar from '@/components/navigation/SinglesSidebar';
import { useSnapScroll } from '@/hooks/use-snap-scroll';

export default function SinglesPage() {
  const [currentSection, setCurrentSection] = useState(0);

  // Define section IDs for snap scrolling
  const sections = ['hero', 'second-section', 'produk', 'resep'];

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
    <>
      {/* Sidebar with snap scroll integration */}
      <SinglesSidebar 
        currentSection={snapCurrentSection}
        scrollToSection={scrollToSection}
        sections={sections}
      />
      
      <div ref={containerRef} className="snap-scroll-container">
      <FixedAnimatedProducts currentSection={currentSection} />
      
      {/* Scroll Progress Indicator */}
      {/* <ScrollProgress currentSection={snapCurrentSection} totalSections={totalSections} /> */}
      
      {/* Section Indicator */}
      {/* <SectionIndicator
        currentSection={snapCurrentSection}
        totalSections={totalSections}
        onSectionClick={scrollToSection}
      /> */}

      {/* Hero Section - Can overflow */}
      <section id="hero" className="snap-scroll-section-overflow">
        <SinglesHero />
      </section>

      {/* Second Section - Can overflow */}
      <section id="second-section" className="snap-scroll-section-overflow">
        <SinglesSecondSection />
      </section>

      {/* Products Section - Can overflow */}
      <section id="produk" className="snap-scroll-section-overflow">
        <ProductCarouselSectionSingles />
      </section>

      {/* Recipe Section - Can overflow */}
      <section id="resep" className="snap-scroll-section-overflow">
        <RecipeInspirationSection page="singles" />
      </section>
      </div>
    </>
  );
}

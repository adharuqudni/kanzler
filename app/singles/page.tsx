'use client';

import React, { useEffect, useState } from 'react';
import SinglesHero from '@/components/sections/SinglesHero';
import SinglesSecondSection from '@/components/sections/SinglesSecondSection';
import ProductCarouselSectionSingles from '@/components/sections/ProductCarouselSectionSingles';
import RecipeInspirationSection from '@/components/sections/RecipeInspirationSection';
import FixedAnimatedProducts from '@/components/animations/FixedAnimatedProducts';
import { useScroll } from 'framer-motion';
import { useSnapScroll, SectionIndicator, ScrollProgress } from '@/hooks/use-snap-scroll';

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight * 0.6;

      // Determine which section we're in based on scroll position
      const sectionIndex = Math.floor(scrollPosition / windowHeight);
      setCurrentSection(sectionIndex);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // page variable untuk diteruskan ke komponen section
  const page = 'singles';

  return (
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
        <RecipeInspirationSection />
      </section>
    </div>
  );
}

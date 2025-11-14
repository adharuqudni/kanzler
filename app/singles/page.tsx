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
import { useSnapScroll } from '@/hooks/use-snap-scroll';

// Mobile-specific component
function MobileSinglesPage() {
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
    <div ref={containerRef} className="snap-scroll-container">
      <MobileFixedAnimatedProducts currentSection={currentSection} />
      
      {/* Hero Section - Can overflow */}
      <section id="hero" className="snap-scroll-section-overflow">
        <MobileSinglesHero />
      </section>

      {/* Second Section - Can overflow */}
      <section id="second-section" className="snap-scroll-section-overflow">
        <MobileSinglesSecondSection />
      </section>

      {/* Products Section - Can overflow */}
      <section id="produk" className="snap-scroll-section-overflow">
        <MobileProductCarouselSectionSingles />
      </section>

      {/* Recipe Section - Can overflow */}
      <section id="resep" className="snap-scroll-section-overflow">
        <MobileRecipeInspirationSection page="singles" />
      </section>
    </div>
  );
}

// Desktop/Tablet component (original)
function DesktopSinglesPage() {
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

export default function SinglesPage() {
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

  return isMobile ? <MobileSinglesPage /> : <DesktopSinglesPage />;
}

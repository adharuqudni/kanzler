'use client';

import React, { useState, useEffect } from 'react';

import HomepackHeroSection from '@/components/sections/HomepackHeroSection';
import MobileHomepackHeroSection from '@/components/sections/MobileHomepackHeroSection';

import HomepackProductsSection from '@/components/sections/HomepackProductsSection';
import MobileHomepackProductsSection from '@/components/sections/MobileHomepackProductsSection';

import WhyKanzler from '@/components/sections/WhyKanzler';
import MobileWhyKanzler from '@/components/sections/MobileWhyKanzler';

import ProductCarouselSectionHomepack from '@/components/sections/ProductCarouselSectionHomepack';
import MobileProductCarouselSectionHomepack from '@/components/sections/MobileProductCarouselSectionHomepack';

import RecipeInspirationSection from '@/components/sections/RecipeInspirationSection';
import MobileRecipeInspirationSection from '@/components/sections/MobileRecipeInspirationSection';

import { useSnapScroll } from '@/hooks/use-snap-scroll';
import SinglesSidebar from '@/components/navigation/SinglesSidebar';
import MobileSidebar from '@/components/navigation/MobileSidebar';

// Shared sections (biar tidak duplikatif)
const SECTIONS = ['homepack-hero', 'homepack-products', 'why-kanzler', 'produk', 'resep'] as const;

// Mobile-specific component
function MobileHomepackPage() {
  const [currentSection, setCurrentSection] = useState(0);

  const {
    containerRef,
    currentSection: snapCurrentSection,
    scrollToSection,
  } = useSnapScroll({
    sections: [...SECTIONS],
    onSectionChange: (index) => {
      setCurrentSection(index);
    },
  });

  return (
    <>
      {/* ✅ Render sidebar juga di mobile */}
      <MobileSidebar
        currentSection={snapCurrentSection}
        scrollToSection={scrollToSection}
        sections={[...SECTIONS]}
      />

      <div ref={containerRef} className="snap-scroll-container overflow-x-hidden">
        <section id="homepack-hero" className="snap-scroll-section-overflow">
          <MobileHomepackHeroSection currentSection={snapCurrentSection} />
        </section>

        <section id="homepack-products" className="snap-scroll-section-overflow">
          <MobileHomepackProductsSection />
        </section>

        <section id="why-kanzler" className="snap-scroll-section">
          <MobileWhyKanzler />
        </section>

        <section id="produk" className="snap-scroll-section-overflow">
          <MobileProductCarouselSectionHomepack title="Homepack Products" defaultCategory="nugget" />
        </section>

        <section id="resep" className="snap-scroll-section-overflow">
          <MobileRecipeInspirationSection page="homepack" />
        </section>
      </div>
    </>
  );
}

// Desktop/Tablet component
function DesktopHomepackPage() {
  const [currentSection, setCurrentSection] = useState(0);

  const {
    containerRef,
    currentSection: snapCurrentSection,
    scrollToSection,
  } = useSnapScroll({
    sections: [...SECTIONS],
    onSectionChange: (index) => {
      setCurrentSection(index);
    },
  });

  return (
    <>
      <SinglesSidebar
        currentSection={snapCurrentSection}
        scrollToSection={scrollToSection}
        sections={[...SECTIONS]}
      />

      <div ref={containerRef} className="snap-scroll-container overflow-x-hidden">
        <section id="homepack-hero" className="snap-scroll-section-overflow">
          <HomepackHeroSection currentSection={snapCurrentSection} />
        </section>

        <section id="homepack-products" className="snap-scroll-section-overflow">
          <HomepackProductsSection />
        </section>

        <section id="why-kanzler" className="snap-scroll-section">
          <WhyKanzler />
        </section>

        <section id="produk" className="snap-scroll-section-overflow">
          <ProductCarouselSectionHomepack title="Homepack Products" defaultCategory="nugget" />
        </section>

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

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile ? <MobileHomepackPage /> : <DesktopHomepackPage />;
}

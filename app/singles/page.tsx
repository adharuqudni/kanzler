'use client';

import React, { useEffect, useState } from 'react';
import SinglesHero from '@/components/sections/SinglesHero';
import SinglesSecondSection from '@/components/sections/SinglesSecondSection';
import ProductCarouselSection from '@/components/sections/ProductCarouselSection';
import RecipeInspirationSection from '@/components/sections/RecipeInspirationSection';
import FixedAnimatedProducts from '@/components/animations/FixedAnimatedProducts';
import { useScroll } from 'framer-motion';

export default function SinglesPage() {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight * 0.8;

      // Determine which section we're in based on scroll position
      const sectionIndex = Math.floor(scrollPosition / windowHeight);
      setCurrentSection(sectionIndex);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <FixedAnimatedProducts currentSection={currentSection} />
      <SinglesHero />
      <SinglesSecondSection />
      <ProductCarouselSection />
      <RecipeInspirationSection />
    </>
  );
}

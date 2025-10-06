'use client'

import React, { useState } from 'react'
import Hero from '@/components/hero/Hero'
import CeritaKanzler from '@/components/sections/CeritaKanzler'
import MapSection from '@/components/sections/MapSection'
import { useSnapScroll, SectionIndicator, ScrollProgress } from '@/hooks/use-snap-scroll'

export default function Home() {
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

      {/* Hero Section */}
      <section id="hero-section" className="snap-scroll-section">
        <Hero />
      </section>

      {/* Cerita Kanzler Section */}
      <section id="cerita-kanzler" className="snap-scroll-section">
        <CeritaKanzler />
      </section>

      {/* Map Section */}
      <section id="map-section" className="snap-scroll-section">
        <MapSection />
      </section>
    </div>
  )
}

'use client'

import React from 'react'
import Hero from '@/components/hero/Hero'
import CeritaKanzler from '@/components/sections/CeritaKanzler'
import MapSection from '@/components/sections/MapSection'

export default function Home() {
  return (
    <>
      <section id="HeroSection">
        <Hero />
      </section>

      <section id="CeritaKanzler">
        <CeritaKanzler />
      </section>

      <section id="MapSection">
        <MapSection />
      </section>
    </>
  )
}

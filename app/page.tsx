'use client'

import React from 'react'
import SplitHero from '@/components/hero/Hero'
import CeritaKanzler from '@/components/sections/CeritaKanzler'
import MapSection from '@/components/sections/MapSection'

export default function Home() {
  return (
    <>
      <SplitHero />
      <CeritaKanzler />
      <MapSection />
    </>
  )
}

'use client'

import React from 'react'
import Hero from '@/components/hero/Hero'
import CeritaKanzler from '@/components/sections/CeritaKanzler'
import MapSection from '@/components/sections/MapSection'

export default function Home() {
  return (
    <>
      <Hero />
      <CeritaKanzler />
      <MapSection />
    </>
  )
}

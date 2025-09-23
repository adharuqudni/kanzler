'use client'

import React from 'react'
import SplitHero from '@/components/hero/Hero'
import CeritaKanzler from '@/components/sections/CeritaKanzler'
import MapSection from '@/components/sections/MapSection'
import { BreadcrumbStructuredData } from '@/components/seo/StructuredData'

export default function Home() {
  return (
    <>
      <BreadcrumbStructuredData 
        items={[
          { name: "Home", url: "/" }
        ]} 
      />
      <SplitHero />
      <CeritaKanzler />
      <MapSection />
    </>
  )
}

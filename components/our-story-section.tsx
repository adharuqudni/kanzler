'use client'

import React from 'react'
import Image from 'next/image'
import MotionWrapper, { StaggerContainer } from '@/components/animations/MotionWrapper'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { getImageUrl } from '@/lib/utils'

export default function OurStorySection() {
  return (
    <ScrollReveal className="py-20 relative overflow-hidden bg-white">
      {/* Curved top shape */}
      <div
        className="absolute top-0 left-0 right-0 h-20 bg-kanzler-navy"
        style={{ borderRadius: "0 0 50% 50%/0 0 100% 100%", transform: "scaleX(1.5)" }}
      />

      <div className="container pt-16 relative z-10">
        <StaggerContainer className="flex flex-col items-center">
          
          <MotionWrapper variant="fadeInUp" className="text-center mb-16">
            <h2 className="inline-block text-kanzler-navy text-5xl md:text-6xl font-heading mb-2">
              OUR
            </h2>
            <div className="inline-block relative">
              <h2 className="text-5xl md:text-6xl font-heading font-bold bg-gold-gradient bg-clip-text text-transparent bg-[length:200%_auto] animate-shine">
                STORY
              </h2>
            </div>
          </MotionWrapper>

          <MotionWrapper
            variant="fadeInUp"
            delay={0.2}
            className="max-w-4xl mx-auto text-center text-gray-600 text-lg leading-relaxed"
          >
            <p className="mb-6">
              Didirikan pada tahun 1999, Kanzler lahir dari keinginan untuk menghadirkan Sosis Jerman yang enak dan
              lezat ke Indonesia.
            </p>
            <p>
              Kanzler memiliki 2 kategori produk yaitu Kanzler Homepack untuk konsumsi rumah tangga (Ready to Cook)
              yang terdiri dari: Sosis Frankfurter, Sosis Cocktail, Chicken Nugget, dan lain-lain serta Kanzler
              Singles untuk camilan (Ready to Eat) yang terdiri dari: Sosis Original, Mini, Keju, dan Hot, serta Bakso
              Original, dan Bakso Keju.
            </p>
          </MotionWrapper>

          <StaggerContainer 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            staggerDelay={0.1}
            delayChildren={0.4}
          >
            {[1, 2, 3, 4].map((item) => (
              <MotionWrapper
                key={item}
                variant="scaleIn"
                className="relative aspect-square overflow-hidden rounded-lg group"
              >
                <Image
                  src={getImageUrl(`/placeholder.svg?height=300&width=300`)}
                  alt={`Kanzler Product ${item}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </MotionWrapper>
            ))}
          </StaggerContainer>
          
        </StaggerContainer>
      </div>
    </ScrollReveal>
  )
}

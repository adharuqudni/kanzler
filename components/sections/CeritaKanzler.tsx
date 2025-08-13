'use client'

import React from 'react'
import Image from 'next/image'
import MotionWrapper from '@/components/animations/MotionWrapper'

const CeritaKanzler = React.memo(function CeritaKanzler() {
  return (
    <section className="min-h-screen relative overflow-hidden bg-white">
      {/* Blue curve background from SplitHero */}
      <div className="absolute top-0 left-0 w-full h-[20vw] overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: '#1C2653',
            clipPath: 'ellipse(150% 100% at 50% 0%)',
            transform: 'translateY(-50%)'
          }}
        />
      </div>

    
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 pt-32">

        {/* CERITA Header */}
        <MotionWrapper
          variant="fadeInUp"
          delay={0.2}
          className="text-center mb-4"
        >
          <h1 className="text-6xl md:text-8xl font-serif text-[#C9A961] tracking-wider">
            CERITA
          </h1>
        </MotionWrapper>

        {/* KANZLER Header */}
        <MotionWrapper
          variant="fadeInUp"
          delay={0.4}
          className="text-center mb-12"
        >
          <h2 className="text-6xl md:text-8xl font-serif text-[#1C2653] tracking-wider">
            KANZLER
          </h2>
        </MotionWrapper>

        {/* First Paragraph */}
        <MotionWrapper
          variant="fadeInUp"
          delay={0.6}
          className="text-center mb-8 max-w-4xl"
        >
          <p className="text-lg md:text-xl text-[#1C2653] leading-relaxed">
            Didirikan pada 1999, Kanzler hadir untuk menghadirkan cita rasa otentik 
            sosis Jerman ke Indonesia.
          </p>
        </MotionWrapper>

        {/* Second Paragraph */}
        <MotionWrapper
          variant="fadeInUp"
          delay={0.8}
          className="text-center max-w-5xl"
        >
          <p className="text-lg md:text-xl text-[#1C2653] leading-relaxed">
            Sebagai brand premium, Kanzler konsisten mengawarkaan produk daging olahan berkualitas tinggi 
            melalui proses modern dan higienis, menjadikannya pilihan terpercaya keluarga Indonesia.
          </p>
        </MotionWrapper>

      </div>
    </section>
  )
})

export default CeritaKanzler

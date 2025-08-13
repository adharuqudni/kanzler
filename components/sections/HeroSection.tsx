'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import MotionWrapper from '@/components/animations/MotionWrapper'
import ScrollReveal, { ParallaxElement } from '@/components/animations/ScrollReveal'
import { BOUNCY_TRANSITION } from '@/lib/motion'

interface HeroSectionProps {
  title?: string
  subtitle?: string
  backgroundImage?: string
  showScrollIndicator?: boolean
  height?: 'screen' | 'half' | 'auto'
  className?: string
}

export default function HeroSection({
  title = "KANZLER",
  subtitle = "HOMEPACK",
  backgroundImage,
  showScrollIndicator = true,
  height = 'screen',
  className = ''
}: HeroSectionProps) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const headerTop = useTransform(scrollYProgress, [0, 0.05], [0, 400])
  const headerScale = useTransform(scrollYProgress, [0, 0.05], [1, 0.7])
  const homeTop = useTransform(scrollYProgress, [0.03, 0.05], ['75%', '50%'])
  const homeOpacity = useTransform(scrollYProgress, [0.03, 0.05], [0, 1])
  const scrollDown = useTransform(scrollYProgress, [0, 0.1], ['45%', '100%'])

  const heightClass = height === 'screen' ? 'h-[200vh]' : height === 'half' ? 'h-[100vh]' : 'min-h-screen'

  return (
    <motion.div
      ref={heroRef}
      className={`flex items-center justify-center bg-gold-gradient pointer-events-none ${heightClass} ${className}`}
    >
      <div className="relative w-full h-full z-30">
        {/* Crown logo */}
        <MotionWrapper 
          variant="fadeInDown" 
          delay={0.2}
          className="absolute top-10 left-10 w-12 h-12"
        >
          <CrownIcon />
        </MotionWrapper>

        {/* Main title */}
        <motion.div
          className="absolute top-[10%] w-full flex items-center justify-center"
          style={{
            y: headerTop,
            scale: headerScale,
            textShadow: '0px -10px 50px rgba(0, 0, 0, 0), 0px 8px 15px rgba(255, 255, 255, 0.94)'
          }}
        >
          <h1 className="text-7xl md:text-[18em] font-heading font-bold text-gold">
            {title}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          className="absolute w-full flex items-center justify-center"
          style={{
            top: homeTop,
            opacity: homeOpacity,
            textShadow: '0px -10px 50px rgba(255, 255, 255, 0.94), 0px 8px 15px rgba(255, 255, 255, 0.94)'
          }}
        >
          <motion.h1 
            className="text-7xl md:text-[15em] font-heading font-bold text-white/80"
            animate={{
              textShadow: [
                '0px -10px 50px rgba(255, 255, 255, 0.94), 0px 8px 15px rgba(255, 255, 255, 0.94)',
                '0px 10px 60px rgba(255, 255, 255, 0.94) -8px 15px rgba(0, 0, 255, 0.6)',
                '0px -10px 50px rgba(255, 255, 255, 0.94), 0px 8px 15px rgba(255, 255, 255, 0.94)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'mirror',
            }}
          >
            {subtitle}
          </motion.h1>
        </motion.div>

        {/* Product images */}
        <ProductImages homeOpacity={homeOpacity} />

        {/* Scroll indicator */}
        {showScrollIndicator && (
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center"
            style={{ top: scrollDown }}
          >
            <span className="mb-2 text-sm">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowDown className="h-6 w-6" />
            </motion.div>
          </motion.div>
        )}

        {/* Bottom curve */}
        <div
          className="absolute bottom-[0%] left-0 right-0 h-32 bg-white"
          style={{
            borderRadius: '100px 100px 0 0',
            marginTop: '-10px',
            transform: 'scaleX(1.5)',
          }}
        />
      </div>
    </motion.div>
  )
}

function CrownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <path d="M12 1L15.5 8.5H8.5L12 1Z" fill="white" />
      <path d="M12 1L8.5 8.5H1L12 1Z" fill="white" />
      <path d="M12 1L15.5 8.5H23L12 1Z" fill="white" />
      <path d="M8.5 8.5H15.5L12 16L8.5 8.5Z" fill="white" />
      <path d="M1 8.5H8.5L4.75 16L1 8.5Z" fill="white" />
      <path d="M15.5 8.5H23L19.25 16L15.5 8.5Z" fill="white" />
      <path d="M4.75 16L8.5 23H1L4.75 16Z" fill="white" />
      <path d="M12 16L15.5 23H8.5L12 16Z" fill="white" />
      <path d="M19.25 16L23 23H15.5L19.25 16Z" fill="white" />
    </svg>
  )
}

interface ProductImagesProps {
  homeOpacity: any
}

function ProductImages({ homeOpacity }: ProductImagesProps) {
  return (
    <>
      {/* Right top product */}
      <ParallaxElement speed={0.3} className="absolute w-32 h-32 md:w-48 md:h-48 right-[20%] top-[30%]">
        <motion.div style={{ opacity: homeOpacity }}>
          <Image
            src="/assets/kanzler/lepasan/nugget stick/nugget stick 2.png"
            alt="Kanzler nugget stick"
            width={200}
            height={200}
            className="object-contain"
            style={{ maxWidth: "250%" }}
          />
        </motion.div>
      </ParallaxElement>

      {/* Right bottom product */}
      <ParallaxElement speed={0.5} className="absolute w-32 h-32 md:w-48 md:h-48 right-[20%] bottom-[30%]">
        <Image
          src="/assets/kanzler/lepasan/nugget crispy/nugget crispy 1.png"
          alt="Kanzler crispy nugget"
          width={200}
          height={200}
          className="object-contain"
        />
      </ParallaxElement>

      {/* Left bottom product */}
      <ParallaxElement speed={0.4} className="absolute w-32 h-32 md:w-48 md:h-48 left-[20%] bottom-[30%]">
        <Image
          src="/assets/kanzler/lepasan/nugget crispy/nugget crispy 2.png"
          alt="Kanzler crispy nugget 2"
          width={200}
          height={200}
          className="object-contain"
        />
      </ParallaxElement>

      {/* Package products */}
      <ParallaxElement speed={0.6} className="absolute w-32 h-32 md:w-48 md:h-48 left-[10%] bottom-[20%]">
        <Image
          src="/assets/kanzler/nugget/crispy/crispy-nugget-mockup.png"
          alt="Kanzler package"
          width={750}
          height={750}
          className="object-contain rotate-12"
          style={{ maxWidth: '300%' }}
        />
      </ParallaxElement>

      <ParallaxElement speed={0.7} className="absolute w-32 h-32 md:w-48 md:h-48 right-[10%] bottom-[20%]">
        <Image
          src="/assets/kanzler/nugget/crispy/crispy-nugget-mockup.png"
          alt="Kanzler package 2"
          width={750}
          height={750}
          className="object-contain -rotate-12"
          style={{ maxWidth: '300%' }}
        />
      </ParallaxElement>
    </>
  )
}

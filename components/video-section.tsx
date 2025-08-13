'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import MotionWrapper from '@/components/animations/MotionWrapper'
import ScrollReveal from '@/components/animations/ScrollReveal'

interface VideoSectionProps {
  title?: string
  description?: string
  buttonText?: string
  videoSrc?: string
  className?: string
}

export default function VideoSection({
  title = "Quality in Every Bite",
  description = "Experience the premium quality and exceptional taste that goes into every Kanzler product.",
  buttonText = "Our Quality Promise",
  videoSrc = "/placeholder.mp4",
  className = ''
}: VideoSectionProps) {
  return (
    <section className={`relative h-screen overflow-hidden ${className}`}>
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover"
          aria-label="Background video showing Kanzler quality process"
        >
          <source src={videoSrc} type="video/mp4" />
          <div className="w-full h-full bg-gradient-to-r from-kanzler-navy to-kanzler-gold" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="container relative z-10 h-full flex flex-col justify-center items-center text-white">
        <ScrollReveal 
          direction="scale"
          threshold={[0.2, 0.8]}
          className="text-center max-w-3xl"
        >
          <MotionWrapper variant="fadeInUp" className="space-y-6">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold">
              {title}
            </h2>
            
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              {description}
            </p>
            
            <div className="pt-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Button 
                  size="lg" 
                  className="bg-kanzler-gold text-kanzler-dark hover:bg-kanzler-gold/90 transition-colors"
                >
                  {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </MotionWrapper>
        </ScrollReveal>
      </div>
    </section>
  )
}

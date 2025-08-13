'use client'

import React from 'react'
import ScrollReveal from '@/components/animations/ScrollReveal'

interface ScrollSectionProps {
  children: React.ReactNode
  index?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
  className?: string
}

export default function ScrollSection({ 
  children, 
  index = 0, 
  direction = 'up',
  className = '' 
}: ScrollSectionProps) {
  // Create staggered animation based on index
  const delay = index * 0.1
  const threshold: [number, number] = [0.1 + index * 0.05, 0.2 + index * 0.05]

  return (
    <ScrollReveal
      direction={direction}
      threshold={threshold}
      className={`relative ${className}`}
      as="section"
    >
      {children}
    </ScrollReveal>
  )
}

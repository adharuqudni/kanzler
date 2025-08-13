'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, type HTMLMotionProps } from 'framer-motion'
import { BOUNCY_TRANSITION } from '@/lib/motion'

interface ScrollRevealProps extends Omit<HTMLMotionProps<'div'>, 'style'> {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
  distance?: number
  className?: string
  threshold?: [number, number]
  as?: keyof typeof motion
}

export default function ScrollReveal({
  children,
  direction = 'up',
  distance = 50,
  className = '',
  threshold = [0, 0.3],
  as = 'div',
  ...props
}: ScrollRevealProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const MotionComponent = motion[as] as any

  // Create transforms based on direction
  const getTransforms = () => {
    switch (direction) {
      case 'up':
        return {
          opacity: useTransform(scrollYProgress, threshold, [0, 1]),
          y: useTransform(scrollYProgress, threshold, [distance, 0]),
        }
      case 'down':
        return {
          opacity: useTransform(scrollYProgress, threshold, [0, 1]),
          y: useTransform(scrollYProgress, threshold, [-distance, 0]),
        }
      case 'left':
        return {
          opacity: useTransform(scrollYProgress, threshold, [0, 1]),
          x: useTransform(scrollYProgress, threshold, [distance, 0]),
        }
      case 'right':
        return {
          opacity: useTransform(scrollYProgress, threshold, [0, 1]),
          x: useTransform(scrollYProgress, threshold, [-distance, 0]),
        }
      case 'scale':
        return {
          opacity: useTransform(scrollYProgress, threshold, [0, 1]),
          scale: useTransform(scrollYProgress, threshold, [0.8, 1]),
        }
      default:
        return {
          opacity: useTransform(scrollYProgress, threshold, [0, 1]),
          y: useTransform(scrollYProgress, threshold, [distance, 0]),
        }
    }
  }

  const transforms = getTransforms()

  return (
    <MotionComponent
      ref={ref}
      style={transforms}
      transition={BOUNCY_TRANSITION}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}

// Specialized component for parallax effects
interface ParallaxProps extends Omit<HTMLMotionProps<'div'>, 'style'> {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function ParallaxElement({
  children,
  speed = 0.5,
  className = '',
  ...props
}: ParallaxProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-50 * speed, 50 * speed])

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

'use client'

import { useRef } from 'react'
import { useScroll, useTransform, type MotionValue } from 'framer-motion'

interface UseScrollAnimationsOptions {
  offset?: ["start end", "end start"]
  threshold?: [number, number]
}

interface ScrollAnimationValues {
  ref: React.RefObject<HTMLElement | null>
  scrollYProgress: MotionValue<number>
  opacity: MotionValue<number>
  y: MotionValue<number>
  scale: MotionValue<number>
  x: MotionValue<number>
}

export function useScrollAnimations(
  options: UseScrollAnimationsOptions = {}
): ScrollAnimationValues {
  const { offset = ['start end', 'end start'], threshold = [0, 0.3] } = options
  const ref = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  })

  // Common scroll-based transforms
  const opacity = useTransform(scrollYProgress, threshold, [0, 1])
  const y = useTransform(scrollYProgress, threshold, [50, 0])
  const scale = useTransform(scrollYProgress, threshold, [0.9, 1])
  const x = useTransform(scrollYProgress, threshold, [50, 0])

  return {
    ref,
    scrollYProgress,
    opacity,
    y,
    scale,
    x,
  }
}

// Hook for parallax effects
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-50 * speed, 50 * speed])
  const x = useTransform(scrollYProgress, [0, 1], [-30 * speed, 30 * speed])

  return { ref, y, x, scrollYProgress }
}

// Hook for staggered reveal animations
export function useStaggerReveal(itemCount: number, delay: number = 0.1) {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  // Create staggered delays for each item
  const createItemAnimation = (index: number) => {
    const startDelay = index * delay
    const endDelay = startDelay + 0.2
    
    return {
      opacity: useTransform(
        scrollYProgress,
        [startDelay, endDelay],
        [0, 1]
      ),
      y: useTransform(
        scrollYProgress,
        [startDelay, endDelay],
        [30, 0]
      ),
    }
  }

  return {
    containerRef,
    opacity,
    createItemAnimation,
  }
}

// Hook for mouse-following animations
export function useMouseFollow() {
  const ref = useRef<HTMLElement>(null)
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
    
    ref.current.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`
  }

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    }
  }

  return {
    ref,
    handleMouseMove,
    handleMouseLeave,
  }
}

// Hook for advanced scroll-triggered animations
interface UseAdvancedScrollOptions {
  triggerPosition?: number
  endPosition?: number
  easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut'
}

export function useAdvancedScroll(options: UseAdvancedScrollOptions = {}) {
  const {
    triggerPosition = 0.1,
    endPosition = 0.8,
    easing = 'easeOut'
  } = options

  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Create easing functions
  const getEasingFunction = (progress: number): number => {
    switch (easing) {
      case 'easeIn':
        return progress * progress
      case 'easeOut':
        return 1 - Math.pow(1 - progress, 2)
      case 'easeInOut':
        return progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2
      default:
        return progress
    }
  }

  // Advanced transforms with custom easing
  const createEasedTransform = (
    inputRange: number[],
    outputRange: number[]
  ) => {
    return useTransform(
      scrollYProgress,
      inputRange,
      outputRange.map(getEasingFunction)
    )
  }

  const opacity = createEasedTransform([triggerPosition, endPosition], [0, 1])
  const y = createEasedTransform([triggerPosition, endPosition], [100, 0])
  const scale = createEasedTransform([triggerPosition, endPosition], [0.8, 1])

  return {
    ref,
    scrollYProgress,
    opacity,
    y,
    scale,
    createEasedTransform,
  }
}

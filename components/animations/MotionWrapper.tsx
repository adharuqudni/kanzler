'use client'

import React from 'react'
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion'
import { motionVariants } from '@/lib/motion'

interface MotionWrapperProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  children: React.ReactNode
  variant?: keyof typeof motionVariants
  customVariants?: Variants
  delay?: number
  duration?: number
  className?: string
  as?: keyof typeof motion
}

export default function MotionWrapper({
  children,
  variant = 'fadeInUp',
  customVariants,
  delay = 0,
  duration,
  className = '',
  as = 'div',
  ...props
}: MotionWrapperProps) {
  const MotionComponent = motion[as] as any

  const variants = customVariants || motionVariants[variant]
  
  // Apply custom delay and duration if provided
  const modifiedVariants = duration || delay ? {
    ...variants,
    visible: {
      ...variants.visible,
      transition: {
        ...(variants.visible as any)?.transition,
        ...(delay && { delay }),
        ...(duration && { duration }),
      },
    },
  } : variants

  return (
    <MotionComponent
      variants={modifiedVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}

// Specialized wrapper for containers with staggered children
interface StaggerContainerProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  children: React.ReactNode
  staggerDelay?: number
  delayChildren?: number
  className?: string
  fast?: boolean
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  delayChildren = 0.1,
  className = '',
  fast = false,
  ...props
}: StaggerContainerProps) {
  const variant = fast ? 'staggerContainerFast' : 'staggerContainer'
  
  const customVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  }

  return (
    <motion.div
      variants={customVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

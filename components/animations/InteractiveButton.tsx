'use client'

import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { motionVariants } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface InteractiveButtonProps extends Omit<HTMLMotionProps<'button'>, 'whileHover' | 'whileTap'> {
  children: React.ReactNode
  variant?: 'default' | 'lift' | 'scale'
  className?: string
  disabled?: boolean
}

export default function InteractiveButton({
  children,
  variant = 'default',
  className = '',
  disabled = false,
  ...props
}: InteractiveButtonProps) {
  const getVariants = () => {
    switch (variant) {
      case 'lift':
        return motionVariants.hoverLift
      case 'scale':
        return motionVariants.hover
      default:
        return motionVariants.buttonPress
    }
  }

  return (
    <motion.button
      variants={getVariants()}
      initial="rest"
      whileHover={!disabled ? "hover" : "rest"}
      whileTap={!disabled ? "tap" : "rest"}
      className={cn(
        "transition-colors",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  )
}

// Specialized interactive card component
interface InteractiveCardProps extends Omit<HTMLMotionProps<'div'>, 'whileHover'> {
  children: React.ReactNode
  className?: string
  hoverEffect?: 'lift' | 'scale' | 'tilt'
  onClick?: () => void
}

export function InteractiveCard({
  children,
  className = '',
  hoverEffect = 'lift',
  onClick,
  ...props
}: InteractiveCardProps) {
  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case 'scale':
        return { scale: 1.02 }
      case 'tilt':
        return { scale: 1.01, rotateY: 2 }
      default:
        return { scale: 1.01, y: -5 }
    }
  }

  return (
    <motion.div
      whileHover={getHoverAnimation()}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      className={cn(
        "cursor-pointer transition-shadow",
        onClick && "hover:shadow-lg",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  )
}

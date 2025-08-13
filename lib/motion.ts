import type { Transition, Variants } from 'framer-motion'

// Default bouncy transition
export const BOUNCY_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
  mass: 1,
}

// Quick bouncy transition for faster animations
export const QUICK_BOUNCY: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
  mass: 0.8,
}

// Smooth bouncy transition for slower animations
export const SMOOTH_BOUNCY: Transition = {
  type: 'spring',
  stiffness: 60,
  damping: 15,
  mass: 1.2,
}

// Common animation variants with bouncy defaults
export const motionVariants = {
  // Fade animations
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: BOUNCY_TRANSITION,
    },
  } as Variants,

  fadeInUp: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: BOUNCY_TRANSITION,
    },
  } as Variants,

  fadeInDown: {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: BOUNCY_TRANSITION,
    },
  } as Variants,

  fadeInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: BOUNCY_TRANSITION,
    },
  } as Variants,

  fadeInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: BOUNCY_TRANSITION,
    },
  } as Variants,

  // Scale animations
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: BOUNCY_TRANSITION,
    },
  } as Variants,

  scaleInBig: {
    hidden: { opacity: 0, scale: 0.3 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: SMOOTH_BOUNCY,
    },
  } as Variants,

  // Container animations for staggered children
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ...BOUNCY_TRANSITION,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  } as Variants,

  staggerContainerFast: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ...QUICK_BOUNCY,
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
  } as Variants,

  // Hover animations
  hover: {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: QUICK_BOUNCY,
    },
  } as Variants,

  hoverLift: {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.02,
      y: -5,
      transition: QUICK_BOUNCY,
    },
  } as Variants,

  // Button animations
  buttonPress: {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: QUICK_BOUNCY },
    tap: { scale: 0.95, transition: { ...QUICK_BOUNCY, duration: 0.1 } },
  } as Variants,

  // Slide animations
  slideInFromBottom: {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: BOUNCY_TRANSITION,
    },
  } as Variants,

  slideInFromTop: {
    hidden: { y: '-100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: BOUNCY_TRANSITION,
    },
  } as Variants,
}

// Preset delay configurations
export const staggerDelays = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.2,
  extraSlow: 0.3,
}

// Utility function to create custom stagger variants
export const createStaggerVariant = (
  baseVariant: Variants,
  staggerDelay: number = staggerDelays.normal,
  delayChildren: number = 0.1
): Variants => ({
  hidden: baseVariant.hidden,
  visible: {
    ...baseVariant.visible,
    transition: {
      ...BOUNCY_TRANSITION,
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
})

// Utility function to create custom bounce transition
export const createBounceTransition = (
  stiffness: number = 100,
  damping: number = 20,
  mass: number = 1
): Transition => ({
  type: 'spring',
  stiffness,
  damping,
  mass,
})

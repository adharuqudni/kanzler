"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ScrollSectionProps {
  children: React.ReactNode
  index: number
}

export default function ScrollSection({ children, index }: ScrollSectionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Calculate the start and end points for the animation based on the section index
  // This creates a staggered effect as you scroll down
  const startPoint = 0.1 + index * 0.05
  const endPoint = startPoint + 0.1

  const opacity = useTransform(scrollYProgress, [startPoint, endPoint], [0, 1])
  const y = useTransform(scrollYProgress, [startPoint, endPoint], [100, 0])

  return (
    <motion.section
      ref={ref}
      style={{
        opacity,
        y,
      }}
      className="relative"
    >
      {children}
    </motion.section>
  )
}

'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import MotionWrapper from '@/components/animations/MotionWrapper'
import { cn } from '@/lib/utils'

interface NavbarProps {
  variant?: 'default' | 'transparent' | 'solid'
  showOnScroll?: boolean
  className?: string
}

export default function Navbar({ 
  variant = 'default',
  showOnScroll = true,
  className = '' 
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollYProgress } = useScroll()

  // Scroll-based navbar visibility
  const navbarOpacity = useTransform(
    scrollYProgress, 
    [0.15, 0.20], 
    showOnScroll ? [0, 1] : [1, 1]
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getNavbarStyles = () => {
    switch (variant) {
      case 'transparent':
        return 'bg-transparent'
      case 'solid':
        return 'bg-kanzler-navy'
      default:
        return isScrolled
          ? 'bg-kanzler-navy/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
    }
  }

  return (
    <motion.nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        getNavbarStyles(),
        className
      )}
      style={{ opacity: navbarOpacity }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          <MotionWrapper variant="fadeInLeft" delay={0.1}>
            <Link href="/" className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src="/assets/ASSET - HOME/1 ASSET - HOME/crown_white.svg"
                  alt="Kanzler Mahkota Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </motion.div>
            </Link>
          </MotionWrapper>
        </div>
      </div>
    </motion.nav>
  )
}
'use client'

import { useState, useEffect, useCallback, useMemo, memo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMousePosition } from '@/hooks/use-mouse-position'
import { BOUNCY_TRANSITION, motionVariants } from '@/lib/motion'
import MotionWrapper from '@/components/animations/MotionWrapper'
import InteractiveButton from '@/components/animations/InteractiveButton'

interface SplitHeroProps {
  className?: string
}

function SplitHero({ className = '' }: SplitHeroProps) {
  // Use throttled mouse position to reduce re-renders
  const mousePosition = useMousePosition(32) // 32ms throttle for 30fps
  const [leftSideWidth, setLeftSideWidth] = useState(50)
  const [leftSideIndex, setLeftSideIndex] = useState(5)
  const [isHoveringLeft, setIsHoveringLeft] = useState(false)
  const [isHoveringRight, setIsHoveringRight] = useState(false)

  // Memoize calculations to prevent unnecessary computations
  const mouseCalculations = useMemo(() => {
    if (!mousePosition.x || !mousePosition.y) return null
    
    const windowWidth = window.innerWidth
    const mouseX = mousePosition.x
    const mouseY = mousePosition.y
    
    // Check if mouse is in dead zone
    if (
      mouseY < 100 ||
      (mouseX > windowWidth / 2 - 20 && mouseX < windowWidth / 2 + 20)
    ) {
      return { isLeft: false, isRight: false, reset: true }
    }
    
    const isLeft = mouseX < windowWidth / 2 + 20
    return { 
      isLeft, 
      isRight: !isLeft, 
      reset: false,
      width: isLeft ? 60 : 40,
      index: isLeft ? 7 : 3
    }
  }, [mousePosition.x, mousePosition.y])

  // Update state based on calculations
  useEffect(() => {
    if (!mouseCalculations) {
      setIsHoveringLeft(false)
      setIsHoveringRight(false)
      setLeftSideWidth(50)
      setLeftSideIndex(5)
      return
    }

    if (mouseCalculations.reset) {
      setIsHoveringLeft(false)
      setIsHoveringRight(false)
      setLeftSideWidth(50)
      setLeftSideIndex(5)
      return
    }

    setIsHoveringLeft(mouseCalculations.isLeft)
    setIsHoveringRight(mouseCalculations.isRight)
    setLeftSideWidth(mouseCalculations.width || 50)
    setLeftSideIndex(mouseCalculations.index || 5)
  }, [mouseCalculations])

  return (
    <main className={`h-screen overflow-hidden relative flex flex-col ${className}`} style={{
      background: `radial-gradient(circle at center, rgba(75, 85, 130, 0.6) 0%, rgba(45, 55, 95, 0.8) 40%, #1C2653 80%)`
    }}>
      {/* Left Side - Premium Quality */}
      <LeftSide
        isHoveringLeft={isHoveringLeft}
        isHoveringRight={isHoveringRight}
        leftSideWidth={leftSideWidth}
        leftSideIndex={leftSideIndex}
      />

      {/* Right Side - Products */}
      <RightSide
        isHoveringRight={isHoveringRight}
        isHoveringLeft={isHoveringLeft}
        leftSideWidth={leftSideWidth}
        leftSideIndex={leftSideIndex}
      />

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHoveringRight || isHoveringLeft ? 0.6 : 0 }}
        transition={BOUNCY_TRANSITION}
        style={{ zIndex: 6 }}
      />

      {/* Logo overlay */}
      <LogoOverlay />

      {/* Floating Products */}
      <FloatingProducts
        isHoveringLeft={isHoveringLeft}
        isHoveringRight={isHoveringRight}
      />
    </main>
  )
}

interface SideProps {
  isHoveringLeft: boolean
  isHoveringRight: boolean
  leftSideWidth: number
  leftSideIndex: number
}

const LeftSide = memo(function LeftSide({ isHoveringLeft, isHoveringRight, leftSideWidth, leftSideIndex }: SideProps) {
  return (
    <motion.div
      className={`absolute top-0 bottom-0 left-0 flex items-center justify-center ${
        isHoveringLeft ? "bg-[url('/assets/ASSET%20-%20HOME%2F2%20ASSET%20-%20HOME%2F2%20ASSET%20-%20HOME%20SPACE%20SPLIT%201.png')] bg-inherit bg-left" : ""
      }`}
      initial={{ width: '50%' }}
      animate={{
        width: `${(isHoveringRight ? 15 : 0) + leftSideWidth}%`,
        clipPath: isHoveringLeft
          ? 'ellipse(100% 100% at 0% 50%)'
          : 'ellipse(100% 80% at 0% 50%)',
        zIndex: leftSideIndex,
      }}
      transition={BOUNCY_TRANSITION}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
        {isHoveringLeft && (
          <>
            <MotionWrapper
              variant="scaleInBig"
              className="text-white items-center justify-items-center z-10"
            >
              <Image
                src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME MAIN LOGO.png"
                alt="Kanzler packaging"
                width={1600}
                height={200}
                className="object-contain"
                loading="lazy"
              />
            </MotionWrapper>

            <MotionWrapper
              variant="fadeInUp"
              delay={0.3}
              className="text-white text-center z-10"
            >
              <Crown className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-4xl font-bold mb-4">Premium Quality</h2>
              <p className="mb-6 max-w-md">
                Kanzler has been delivering exceptional meat products since
                1999, with a commitment to quality in every bite.
              </p>
              <InteractiveButton variant="scale">
                <Button className="bg-white text-amber-600 hover:bg-amber-100">
                  Our Story
                </Button>
              </InteractiveButton>
            </MotionWrapper>
          </>
        )}
        
        {/* Multiple beef product images */}
        <ProductImage
          src="/assets/ASSET - HOME/2 ASSET - HOME/2 ASSET - HOME BEEF.png"
          alt="Kanzler beef 1"
          className="absolute top-28 -rotate-45 -left-24 z-10"
          isVisible={isHoveringLeft}
          animation="slideFromLeft"
        />
        
        <ProductImage
          src="/assets/ASSET - HOME/2 ASSET - HOME/2 ASSET - HOME BEEF.png"
          alt="Kanzler beef 2"
          className="absolute top-28 -rotate-45 -left-24 z-10"
          isVisible={isHoveringLeft}
          animation="slideFromLeft"
        />

        {/* Floating cocktail products */}
        <motion.div
          className="absolute -bottom-64 -rotate-45 left-96 w-1/2 max-w-md z-20"
          initial={{ opacity: 1, rotate: -15, y: 0 }}
          animate={{
            y: isHoveringLeft ? 70: 0,
            x: isHoveringLeft ? -450 : 0,
            rotate: isHoveringLeft ? 15 : -15,
            scale: isHoveringLeft? 0.8:1,
            display: isHoveringLeft ? 'block' : ' none',
          }}
          transition={BOUNCY_TRANSITION}
        >
          <Image
            src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME BEEF COCKTAIL.png"
            alt="Kanzler cocktail 1"
            width={400}
            height={300}
            className="object-contain"
            loading="lazy"
          />
        </motion.div>
        
        <motion.div
          className="absolute -bottom-64 -rotate-45 left-96 w-1/2 max-w-md z-20"
          initial={{ opacity: 1, rotate: -10, y: 0, x:0 }}
          animate={{
            y: isHoveringLeft ? 50: -150,
            x:  isHoveringLeft? 75 : 50,
            scale : isHoveringLeft? 0.8: 1,
            rotate:  isHoveringLeft ? -5 :-15,
            display: isHoveringLeft ? 'block' : ' none',
          }}
          transition={BOUNCY_TRANSITION}
        >
          <Image
            src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME CRISPY NUGGET.png"
            alt="Kanzler crispy nugget"
            width={1000}
            height={300}
            className="object-contain"
            loading="lazy"
          />
        </motion.div>
      </div>
    </motion.div>
  )
})

const RightSide = memo(function RightSide({ isHoveringRight, isHoveringLeft, leftSideWidth, leftSideIndex }: SideProps) {
  return (
    <motion.div
      className={`absolute top-0 bottom-0 right-0 flex items-center justify-center ${
        isHoveringRight ? "bg-[url('/assets/ASSET%20-%20HOME/3%20ASSET%20-%20HOME/3%20ASSET%20-%20HOME%20SPACE%20SPLIT%202.png')] bg-inherit bg-right" : ""
      }`}
      initial={{ width: '50%' }}
      animate={{
        width: `${(isHoveringLeft ? 115 : 100) - leftSideWidth}%`,
        clipPath: isHoveringRight
          ? 'ellipse(100% 100% at 100% 50%)'
          : 'ellipse(100% 80% at 100% 50%)',
        zIndex: 10 - leftSideIndex,
      }}
      transition={BOUNCY_TRANSITION}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
        {isHoveringRight && (
          <>
            <MotionWrapper
              variant="scaleInBig"
              className="text-white items-center justify-items-center z-10"
            >
              <Image
                src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME MAIN LOGO.png"
                alt="Kanzler packaging"
                width={1600}
                height={200}
                className="object-contain"
                loading="lazy"
              />
            </MotionWrapper>

            <MotionWrapper
              variant="fadeInUp"
              delay={0.3}
              className="text-white text-center z-10"
            >
              <h2 className="text-4xl font-bold mb-4">
                KANZLER<span className="text-sm align-top">®</span>
              </h2>
              <p className="mb-6 max-w-md">
                Discover our range of premium sausages and meat products,
                crafted with the finest ingredients.
              </p>
              <InteractiveButton variant="scale">
                <Button className="bg-white text-navy hover:bg-blue-100">
                  Products
                </Button>
              </InteractiveButton>
            </MotionWrapper>
          </>
        )}

        {/* Right side floating products */}
        <motion.div
          className="absolute -bottom-56 -rotate-45 -left-12 z-30"
          initial={{ opacity: 1, rotate: 15, x: -30 }}
          animate={{
            y: isHoveringRight ? -420 : 0,
            x: isHoveringRight ? -30 : 0,
            display: isHoveringRight ? 'block' : ' none',
          }}
          transition={BOUNCY_TRANSITION}
        >
          <Image
            src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME BAKSO HOT.png"
            alt="Kanzler bakso hot"
            width={400}
            height={300}
            className="object-contain"
            loading="lazy"
          />
        </motion.div>
        
        <motion.div
          className="absolute -bottom-60 -rotate-45 right-96 z-30"
          initial={{ opacity: 1, rotate: 35, y: 0 }}
          animate={{
            y: 0,
            x: isHoveringRight ? 500 : 0,
            rotate: isHoveringRight ? -15 : 35,
            display: isHoveringRight ? 'block' : ' none',
          }}
          transition={BOUNCY_TRANSITION}
        >
          <Image
            src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME SOSIS GOCHU.png"
            alt="Kanzler sosis gochu"
            width={400}
            height={300}
            className="object-contain"
            loading="lazy"
          />
        </motion.div>
      </div>
    </motion.div>
  )
})

const LogoOverlay = memo(function LogoOverlay() {
  return (
    <div className="z-30">
      <MotionWrapper
        variant="fadeInDown"
        delay={0.5}
        className="text-white"
      >
        <Crown className="w-12 h-12 mx-12 mt-4" />
      </MotionWrapper>
    </div>
  )
})

interface ProductImageProps {
  src: string
  alt: string
  className?: string
  isVisible: boolean
  animation: 'slideFromLeft' | 'slideFromRight' | 'slideUp'
}

const ProductImage = memo(function ProductImage({ src, alt, className = '', isVisible, animation }: ProductImageProps) {
  const getAnimationProps = () => {
    switch (animation) {
      case 'slideFromLeft':
        return {
          initial: { x: -350, opacity: 0 },
          animate: {
            x: isVisible ? 50 : -350,
            opacity: isVisible ? 1 : 0,
            rotate: 25,
          },
        }
      case 'slideFromRight':
        return {
          initial: { x: 350, opacity: 0 },
          animate: {
            x: isVisible ? -30 : 350,
            opacity: isVisible ? 1 : 0,
            rotate: -15,
          },
        }
      default:
        return {
          initial: { y: 350, opacity: 0 },
          animate: {
            y: isVisible ? 0 : 350,
            opacity: isVisible ? 1 : 0,
          },
        }
    }
  }

  const animationProps = getAnimationProps()

  return (
    <motion.div
      className={`-rotate-45 ${className}`}
      initial={animationProps.initial}
      animate={animationProps.animate}
      transition={BOUNCY_TRANSITION}
    >
      <Image
        src={src}
        alt={alt}
        width={250}
        height={200}
        className="object-contain"
        loading="lazy"
      />
    </motion.div>
  )
})

const FloatingProducts = memo(function FloatingProducts({ isHoveringLeft, isHoveringRight }: { 
  isHoveringLeft: boolean
  isHoveringRight: boolean 
}) {
  return (
    <>
      {/* Central logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: 1,
          zIndex: isHoveringLeft || isHoveringRight ? 5 : 10,
        }}
        transition={{ duration: 0.8, ease: 'easeIn' }}
        className="text-white items-center justify-items-center z-10 -mt-12"
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME MAIN LOGO.png"
          alt="Kanzler main logo"
          width={1600}
          height={200}
          className="object-contain"
          loading="lazy"
        />
      </motion.div>

      {/* Default floating products - visible when not hovering */}
      <motion.div
        className="absolute -bottom-80 -rotate-45 left-96 w-1/2 max-w-md z-20"
        initial={{ opacity: 0, y: 350 }}
        animate={{
          opacity: 1,
          rotate: -15,
          y: 15,
          scale: 0.9,
          x: -80,
          zIndex: isHoveringRight ? 5 : 20,
        }}
        transition={{ duration: 1, ease: 'easeIn', delay: 1 }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME BEEF COCKTAIL.png"
          alt="Kanzler beef cocktail"
          width={800}
          height={200}
          className="object-contain"
          loading="lazy"
          style={{ display: !isHoveringLeft ? 'block' : 'none' }}
        />
      </motion.div>

      <motion.div
        className="absolute -bottom-80 -rotate-45 left-96 w-1/2 max-w-md z-20"
        initial={{ opacity: 0, y: 350 }}
        animate={{
          opacity: 1,
          rotate: -10,
          y: -150,
          scale: 0.9,
          zIndex: isHoveringRight ? 5 : 20,
        }}
        transition={{ duration: 1, ease: 'easeIn', delay: 1 }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME CRISPY NUGGET.png"
          alt="Kanzler crispy nugget"
          width={1000}
          height={200}
          className="object-contain"
          loading="lazy"
          style={{ display: !isHoveringLeft ? 'block' : 'none' }}
        />
      </motion.div>

      <motion.div
        className="absolute -bottom-56 -rotate-45 left-[40%] z-30"
        initial={{ opacity: 0, y: 350 }}
        animate={{
          opacity: 1,
          rotate: 20,
          y: 0,
          zIndex: isHoveringLeft ? 5 : 20,
        }}
        transition={{ duration: 1, ease: 'easeIn', delay: 0.9 }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME BAKSO HOT.png"
          alt="Kanzler bakso hot default"
          width={350}
          height={300}
          className="object-contain"
          loading="lazy"
          style={{ display: !isHoveringRight ? 'block' : 'none' }}
        />
      </motion.div>

      <motion.div
        className="absolute -bottom-60 -rotate-45 right-96 z-30"
        initial={{ opacity: 0, y: 350 }}
        animate={{
          opacity: 1,
          rotate: 35,
          y: 0,
          zIndex: isHoveringLeft ? 5 : 20,
        }}
        transition={{ duration: 1, ease: 'easeIn', delay: 0.8 }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME SOSIS GOCHU.png"
          alt="Kanzler sosis gochu default"
          width={350}
          height={300}
          className="object-contain"
          loading="lazy"
          style={{ display: !isHoveringRight ? 'block' : 'none' }}
        />
      </motion.div>
    </>
  )
})

// Export memoized component
export default memo(SplitHero)

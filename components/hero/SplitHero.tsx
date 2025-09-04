'use client';

import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMousePosition } from '@/hooks/use-mouse-position';
import { BOUNCY_TRANSITION, motionVariants } from '@/lib/motion';
import MotionWrapper from '@/components/animations/MotionWrapper';
import InteractiveButton from '@/components/animations/InteractiveButton';
import Link from 'next/link';

interface SplitHeroProps {
  className?: string;
}

function SplitHero({ className = '' }: SplitHeroProps) {
  // Use throttled mouse position to reduce re-renders
  const mousePosition = useMousePosition(32); // 32ms throttle for 30fps
  const [leftSideWidth, setLeftSideWidth] = useState(50);
  const [leftSideIndex, setLeftSideIndex] = useState(5);
  const [isHoveringLeft, setIsHoveringLeft] = useState(false);
  const [isHoveringRight, setIsHoveringRight] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Memoize calculations to prevent unnecessary computations
  const mouseCalculations = useMemo(() => {
    if (!mousePosition.x || !mousePosition.y) return null;

    // Disable hover interactions on mobile devices
    if (isMobile) {
      return { isLeft: false, isRight: false, reset: true };
    }

    // Disable hover interactions when user has scrolled
    if (hasScrolled) {
      return { isLeft: false, isRight: false, reset: true };
    }

    const windowWidth = window.innerWidth;
    const mouseX = mousePosition.x;
    const mouseY = mousePosition.y;

    // Check if mouse is in dead zone
    if (
      mouseY < 100 ||
      (mouseX > windowWidth / 2 - 20 && mouseX < windowWidth / 2 + 20)
    ) {
      return { isLeft: false, isRight: false, reset: true };
    }

    const isLeft = mouseX < windowWidth / 2 + 20;
    return {
      isLeft,
      isRight: !isLeft,
      reset: false,
      width: isLeft ? 60 : 40,
      index: isLeft ? 7 : 3,
    };
  }, [mousePosition.x, mousePosition.y, hasScrolled, isMobile]);

  // Update state based on calculations
  useEffect(() => {
    if (!mouseCalculations) {
      setIsHoveringLeft(false);
      setIsHoveringRight(false);
      setLeftSideWidth(50);
      setLeftSideIndex(5);
      return;
    }

    if (mouseCalculations.reset) {
      setIsHoveringLeft(false);
      setIsHoveringRight(false);
      setLeftSideWidth(50);
      setLeftSideIndex(5);
      return;
    }

    setIsHoveringLeft(mouseCalculations.isLeft);
    setIsHoveringRight(mouseCalculations.isRight);
    setLeftSideWidth(mouseCalculations.width || 50);
    setLeftSideIndex(mouseCalculations.index || 5);
  }, [mouseCalculations]);

  // Handle scroll events - track scroll position and disable hover when scrolled
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Mark as scrolled if user scrolled down more than 50px
      if (scrollY > 50 && !hasScrolled) {
        setHasScrolled(true);
      }

      // Reset to not scrolled if back at top
      if (scrollY <= 10 && hasScrolled) {
        setHasScrolled(false);
      }

      // Reset hover states when scrolling
      if (isHoveringLeft || isHoveringRight) {
        setIsHoveringLeft(false);
        setIsHoveringRight(false);
        setLeftSideWidth(50);
        setLeftSideIndex(5);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHoveringLeft, isHoveringRight, hasScrolled]);

  // Show scroll indicator when not hovering either side
  const showScrollIndicator = !isHoveringLeft && !isHoveringRight;

  return (
    <main
      className={`min-h-screen relative flex flex-col bg-[#1C2653] ${className}`}
    >
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
  );
}

interface SideProps {
  isHoveringLeft: boolean;
  isHoveringRight: boolean;
  leftSideWidth: number;
  leftSideIndex: number;
}

const LeftSide = memo(function LeftSide({
  isHoveringLeft,
  isHoveringRight,
  leftSideWidth,
  leftSideIndex,
}: SideProps) {
  return (
    <motion.div
      className={`absolute top-0 bottom-0 left-0 flex items-center justify-center ${
        isHoveringLeft
          ? "bg-[url('/assets/ASSET%20-%20HOME%2F2%20ASSET%20-%20HOME%2F2%20ASSET%20-%20HOME%20SPACE%20SPLIT%201.png')] bg-inherit bg-left"
          : ''
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
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        {isHoveringLeft && (
          <>
            {/* Split Logo Animation - Crown and Text */}
            <div className="flex flex-col items-center z-10">
              {/* Crown - animates first */}
              <MotionWrapper variant="scaleInBig" delay={0.1} className="mb-2 sm:mb-4">
                <Image
                  src="/assets/ASSET - HOME/1 ASSET - HOME/Logo Mahkota.png"
                  alt="Kanzler Crown"
                  width={120}
                  height={120}
                  className="object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-[120px] md:h-[120px]"
                  loading="lazy"
                />
              </MotionWrapper>

              {/* Kanzler Text - animates second */}
              <MotionWrapper variant="fadeInUp" delay={0.3} className="mb-3 sm:mb-6">
                <Image
                  src="/assets/ASSET - HOME/1 ASSET - HOME/Kanzler R.png"
                  alt="Kanzler"
                  width={400}
                  height={80}
                  className="object-contain w-48 h-10 sm:w-64 sm:h-12 md:w-[400px] md:h-[80px]"
                  loading="lazy"
                />
              </MotionWrapper>
            </div>

            {/* Tagline Image */}
            <MotionWrapper variant="fadeInUp" delay={0.5} className="mb-3 sm:mb-6 z-10">
              <Image
                src="/assets/ASSET - HOME/1 ASSET - HOME/Kanzler Quote.png"
                alt="Premium Quality Since 1999"
                width={500}
                height={60}
                className="object-contain w-60 h-7 sm:w-80 sm:h-9 md:w-[500px] md:h-[60px]"
                loading="lazy"
              />
            </MotionWrapper>

            {/* Description and Button */}
            <MotionWrapper
              variant="fadeInUp"
              delay={0.7}
              className="text-white text-center z-10"
            >
              <p className="mb-4 sm:mb-6 max-w-xs sm:max-w-md text-xs sm:text-sm md:text-base leading-relaxed">
                Produk sosis dan nugget dari daging sapi dan ayam pilihan.
                <span className="italic">Extra Meaty, Extra Juicy</span>, dan
                mudah diolah menjadi menu lezat setiap hari.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Link href="/homepack">
                  <Button className="bg-white text-kanzler-navy hover:bg-gray-100 rounded-full px-4 sm:px-6 text-xs sm:text-sm md:text-base">
                    Lihat semua produk ›
                  </Button>
                </Link>
              </motion.div>
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

        {/* Nugget image from remote version */}
        <ProductImage
          src="/assets/ASSET - HOME/2 ASSET - HOME/2 ASSET - HOME NUGGET.png"
          alt="Kanzler nugget"
          className="absolute top-20 -right-4 z-10"
          isVisible={isHoveringLeft}
          animation="slideFromRight"
        />

        {/* Floating cocktail products */}
        <motion.div
          className="absolute -bottom-64 -rotate-45 left-96 w-1/2 max-w-md z-20"
          initial={{ opacity: 1, rotate: -15, y: 0 }}
          animate={{
            y: isHoveringLeft ? 70 : 0,
            x: isHoveringLeft ? -450 : 0,
            rotate: isHoveringLeft ? 15 : -15,
            scale: isHoveringLeft ? 0.8 : 1,
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
          initial={{ opacity: 1, rotate: -10, y: 0, x: 0 }}
          animate={{
            y: isHoveringLeft ? 50 : -150,
            x: isHoveringLeft ? 75 : 50,
            scale: isHoveringLeft ? 0.8 : 1,
            rotate: isHoveringLeft ? -5 : -15,
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
  );
});

const RightSide = memo(function RightSide({
  isHoveringRight,
  isHoveringLeft,
  leftSideWidth,
  leftSideIndex,
}: SideProps) {
  return (
    <motion.div
      className={`absolute top-0 bottom-0 right-0 flex items-center justify-center ${
        isHoveringRight
          ? "bg-[url('/assets/ASSET%20-%20HOME/3%20ASSET%20-%20HOME/3%20ASSET%20-%20HOME%20SPACE%20SPLIT%202.png')] bg-inherit bg-right"
          : ''
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
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        {isHoveringRight && (
          <>
            {/* Split Logo Animation - Crown and Text */}
            <div className="flex flex-col items-center z-10">
              {/* Crown - animates first */}
              <MotionWrapper variant="scaleInBig" delay={0.1} className="mb-2 sm:mb-4">
                <Image
                  src="/assets/ASSET - HOME/1 ASSET - HOME/Logo Mahkota.png"
                  alt="Kanzler Crown"
                  width={120}
                  height={120}
                  className="object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-[120px] md:h-[120px]"
                  loading="lazy"
                />
              </MotionWrapper>

              {/* Kanzler Text - animates second */}
              <MotionWrapper variant="fadeInUp" delay={0.3} className="mb-3 sm:mb-6">
                <Image
                  src="/assets/ASSET - HOME/1 ASSET - HOME/Kanzler R.png"
                  alt="Kanzler"
                  width={400}
                  height={80}
                  className="object-contain w-48 h-10 sm:w-64 sm:h-12 md:w-[400px] md:h-[80px]"
                  loading="lazy"
                />
              </MotionWrapper>
            </div>

            {/* Singles Product Line */}
            <MotionWrapper variant="fadeInUp" delay={0.5} className="mb-3 sm:mb-6 z-10">
              <Image
                src="/assets/ASSET - HOME/1 ASSET - HOME/Singles.png"
                alt="Singles"
                width={400}
                height={80}
                className="object-contain w-48 h-10 sm:w-64 sm:h-12 md:w-[400px] md:h-[80px]"
                loading="lazy"
              />
            </MotionWrapper>

            {/* Description and Button */}
            <MotionWrapper
              variant="fadeInUp"
              delay={0.7}
              className="text-white text-center z-10"
            >
              <p className="mb-4 sm:mb-6 max-w-xs sm:max-w-md text-xs sm:text-sm md:text-base leading-relaxed">
                Produk sosis dan bakso berkualitas yang terbuat dari daging sapi
                dan ayam pilihan. Sudah matang, siap untuk langsung dimakan,
                atau diolah menjadi berbagai menu harian.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Link href="/singles">
                  <Button className="bg-white text-kanzler-navy hover:bg-gray-100 rounded-full px-4 sm:px-6 text-xs sm:text-sm md:text-base">
                    Lihat semua produk ›
                  </Button>
                </Link>
              </motion.div>
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
          className="absolute -bottom-60 -rotate-45 right-96  z-30"
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
  );
});

const LogoOverlay = memo(function LogoOverlay() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none">
      {/* Crown - animates first */}
      <MotionWrapper variant="scaleInBig" delay={0.2} className="mb-4 sm:mb-8">
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/Logo Mahkota.png"
          alt="Kanzler Crown"
          width={200}
          height={200}
          className="object-contain w-24 h-24 sm:w-32 sm:h-32 md:w-[200px] md:h-[200px]"
          loading="lazy"
        />
      </MotionWrapper>

      {/* Kanzler Text - animates second */}
      <MotionWrapper variant="fadeInUp" delay={0.5} className="text-center">
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/Kanzler R.png"
          alt="Kanzler"
          width={800}
          height={160}
          className="object-contain w-64 h-12 sm:w-96 sm:h-20 md:w-[800px] md:h-[160px]"
          loading="lazy"
        />
      </MotionWrapper>
    </div>
  );
});

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  isVisible: boolean;
  animation: 'slideFromLeft' | 'slideFromRight' | 'slideUp';
}

const ProductImage = memo(function ProductImage({
  src,
  alt,
  className = '',
  isVisible,
  animation,
}: ProductImageProps) {
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
        };
      case 'slideFromRight':
        return {
          initial: { x: 350, opacity: 0 },
          animate: {
            x: isVisible ? -30 : 350,
            opacity: isVisible ? 1 : 0,
            rotate: -15,
          },
        };
      default:
        return {
          initial: { y: 350, opacity: 0 },
          animate: {
            y: isVisible ? 0 : 350,
            opacity: isVisible ? 1 : 0,
          },
        };
    }
  };

  const animationProps = getAnimationProps();

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
  );
});

const FloatingProducts = memo(function FloatingProducts({
  isHoveringLeft,
  isHoveringRight,
}: {
  isHoveringLeft: boolean;
  isHoveringRight: boolean;
}) {
  return (
    <>
      {/* Default floating products - visible when not hovering */}
      <motion.div
        className="absolute top-1/2 -rotate-45 left-96 z-20"
        initial={{ opacity: 0, y: 350 }}
        animate={{
          opacity: 1,
          rotate: -15,
          y: 150,
          scale: 0.9,
          x: 50,
          zIndex: isHoveringRight ? 5 : 20,
        }}
        transition={{ duration: 1, ease: 'easeIn', }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME BEEF COCKTAIL.png"
          alt="Kanzler beef cocktail"
          width={300}
          height={200}
          className="object-contain"
          loading="lazy"
          style={{ display: !isHoveringLeft ? 'block' : 'none' }}
        />
      </motion.div>

      <motion.div
        className="absolute top-1/2 -rotate-45 left-96 z-20"
        initial={{ opacity: 0, y: 350 }}
        animate={{
          opacity: 1,
          rotate: -10,
          y: 120,
          scale: 0.9,
          x: 120,
          zIndex: isHoveringRight ? 5 : 20,
        }}
        transition={{ duration: 1, ease: 'easeIn',  }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME CRISPY NUGGET.png"
          alt="Kanzler crispy nugget"
          width={400}
          height={200}
          className="object-contain"
          loading="lazy"
          style={{ display: !isHoveringLeft ? 'block' : 'none' }}
        />
      </motion.div>

      <motion.div
        className="absolute top-1/2 -rotate-45 left-[45%] z-30"
        initial={{ opacity: 0, y: 350 }}
        animate={{
          opacity: 1,
          rotate: 20,
          y: 0,
          zIndex: isHoveringLeft ? 5 : 20,
        }}
        transition={{ duration: 1, ease: 'easeIn',  }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME BAKSO HOT.png"
          alt="Kanzler bakso hot default"
          width={300}
          height={300}
          className="object-contain"
          loading="lazy"
          style={{ display: !isHoveringRight ? 'block' : 'none' }}
        />
      </motion.div>

      <motion.div
        className="absolute top-1/2 -rotate-45 right-96 z-30"
        initial={{ opacity: 0, y: 350 }}
        animate={{
          opacity: 1,
          rotate: 35,
          y: 0,
          zIndex: isHoveringLeft ? 5 : 20,
        }}
        transition={{ duration: 1, ease: 'easeIn',  }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME SOSIS GOCHU.png"
          alt="Kanzler sosis gochu default"
          width={300}
          height={300}
          className="object-contain"
          loading="lazy"
          style={{ display: !isHoveringRight ? 'block' : 'none' }}
        />
      </motion.div>
    </>
  );
});

// Export memoized component
export default memo(SplitHero);

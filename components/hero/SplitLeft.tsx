'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BOUNCY_TRANSITION } from '@/lib/motion';
import MotionWrapper from '@/components/animations/MotionWrapper';
import Link from 'next/link';
import { SideProps, ProductImage } from './Hero';

const SplitLeft = memo(function SplitLeft({
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
        
        {/* 🔰 Logo Crown di kiri atas */}
        <div className="absolute top-8 left-8 z-20">
          <Image
            src="/assets/ASSET - HOME/1 ASSET - HOME/crown_white.svg"
            alt="Kanzler Crown Top Left"
            width={20}
            height={20}
            className="object-contain w-8 h-8 sm:w-12 sm:h-12 md:w-[40px] md:h-[40px]"
            priority
          />
        </div>

        {isHoveringLeft && (
          <>
            {/* Split Logo Animation - Crown and Text */}
            <div className="flex flex-col items-center z-10">
              {/* Crown - animates first */}
              <MotionWrapper variant="scaleInBig" delay={0.1} className="mb-2 sm:mb-4">
                <Image
                  src="/assets/ASSET - HOME/1 ASSET - HOME/crown_white.svg"
                  alt="Kanzler Crown"
                  width={120}
                  height={120}
                  className="object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-[120px] md:h-[120px]"
                  loading="lazy"
                />
              </MotionWrapper>

              {/* Kanzler Text - animates second */}
              <MotionWrapper variant="fadeInUp" delay={0.3} className="-mt-8 mb-3 sm:mb-6">
                <Image
                  src="/assets/ASSET - HOME/1 ASSET - HOME/Kanzler.svg"
                  alt="Kanzler"
                  width={400}
                  height={80}
                  className="object-contain w-48 h-10 sm:w-64 sm:h-12 md:w-[400px] md:h-[80px]"
                  loading="lazy"
                />
              </MotionWrapper>
            </div>

            {/* Tagline Image */}
            <MotionWrapper variant="fadeInUp" delay={0.5} className=" -mt-8 mb-3 sm:mb-6 z-10">
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
                  <Button className="bg-white text-kanzler-navy hover:bg-gray-100 rounded-full px-4 sm:px-6 text-xs font-extrabold sm:text-sm md:text-base ">
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
          className="absolute top-28 -rotate-45 -left-28 z-10"
          rotateOverride={320}
          isVisible={isHoveringLeft}
          animation="slideFromLeft"
        />

        {/* Nugget image */}
        <ProductImage
          src="/assets/ASSET - HOME/2 ASSET - HOME/2 ASSET - HOME NUGGET.png"
          alt="Kanzler nugget"
          className="absolute top-20 -right-20 z-10"
          isVisible={isHoveringLeft}
          animation="slideFromRight"
        />

        {/* Floating cocktail products */}
        <motion.div
          className="absolute -bottom-64 -rotate-45 left-96 w-[30vw] max-w-[90vw] z-20"
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
            width={15000}
            height={300}
            className="object-contain"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          className="absolute -bottom-64 -rotate-45 left-96 w-[40vw] max-w-[90vw] z-20"
          initial={{ opacity: 1, rotate: -10, y: 0, x: 0 }}
          animate={{
            y: isHoveringLeft ? 75 : -150,
            x: isHoveringLeft ? 50 : 50,
            scale: isHoveringLeft ? 0.8 : 1,
            rotate: isHoveringLeft ? -15 : -15,
            display: isHoveringLeft ? 'block' : ' none',
          }}
          transition={BOUNCY_TRANSITION}
        >
          <Image
            src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME CRISPY NUGGET.png"
            alt="Kanzler crispy nugget"
            width={1500}
            height={300}
            className="object-contain"
            loading="lazy"
          />
        </motion.div>
      </div>
    </motion.div>
  );
});

export default SplitLeft;

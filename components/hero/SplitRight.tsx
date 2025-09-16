'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BOUNCY_TRANSITION } from '@/lib/motion';
import MotionWrapper from '@/components/animations/MotionWrapper';
import Link from 'next/link';
import { SideProps } from './Hero';

const SplitRight = memo(function SplitRight({
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
                width={500}
                height={80}
                className="object-contain "
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
                  <Button className="bg-white text-kanzler-navy font-bold hover:bg-gray-100 rounded-full px-4 sm:px-6  py-0 text-xs sm:text-sm md:text-base">
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

export default SplitRight;
'use client';

import React from 'react';
import MotionWrapper from '@/components/animations/MotionWrapper';
import { DM_Serif_Display, Poppins } from 'next/font/google';

const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: '400' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

const MobileCeritaKanzler = React.memo(function MobileCeritaKanzler() {
  return (
    <section className={`${poppins.className} relative bg-white h-full`}>
      <div className="relative z-10 flex flex-col items-center pb-16 ">
        {/* CERITA */}
        <svg
          viewBox="0 0 500 200"
          preserveAspectRatio="none"
          className="w-full -mt-1"
        >
          <path
            d="M 0 120 Q 254 200 500 120 L 500 0 L 0 0 ZZ"
            fill="#1c2652"
            fillRule="evenodd"
          />
        </svg>
        
        <div className='flex flex-col items-center h-[60vh] justify-center' id="cerita-kanzler">
          {/* CERITA Title */}
          <MotionWrapper
            variant="fadeInUp"
            delay={0.2}
            className="text-center mb-2 -mt-12"
          >
            <h1
              className={`${dmSerif.className} uppercase leading-none tracking-[0.08em] text-[clamp(40px,7vw,90px)] text-[#AA7B32]`}
            >
              CERITA
            </h1>
          </MotionWrapper>

          {/* KANZLER Title */}
          <MotionWrapper
            variant="fadeInUp"
            delay={0.35}
            className="text-center mb-6"
          >
            <h2
              className={`${dmSerif.className} leading-[0.9] tracking-[0.03em] text-[clamp(78px,16vw,190px)] text-[#1B2653]`}
            >
              KANZLER
            </h2>
          </MotionWrapper>

          {/* Paragraph 1 - Mobile optimized */}
          <MotionWrapper
            variant="fadeInUp"
            delay={0.5}
            className="text-center mb-4 max-w-[320px]"
          >
            <p className="text-[clamp(13px,1.1vw,16px)] leading-relaxed text-[#1C2652]">
              Didirikan pada 1999, Kanzler hadir untuk menghadirkan cita rasa
              otentik sosis Jerman ke Indonesia.
            </p>
          </MotionWrapper>

          {/* Paragraph 2 - Mobile optimized */}
          <MotionWrapper
            variant="fadeInUp"
            delay={0.65}
            className="text-center max-w-[360px]"
          >
            <p className="text-[clamp(13px,1.1vw,16px)] leading-relaxed text-[#1C2652]">
              Sebagai brand premium, Kanzler konsisten menawarkan produk daging
              olahan berkualitas tinggi melalui proses modern dan higienis, 
              menjadikannya pilihan terpercaya keluarga Indonesia.
            </p>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
});

export default MobileCeritaKanzler;

'use client';

import React from 'react';
import MotionWrapper from '@/components/animations/MotionWrapper';
import { DM_Serif_Display, Poppins } from 'next/font/google';

const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: '400' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

const CeritaKanzler = React.memo(function CeritaKanzler() {
  return (
    // HAPUS overflow-hidden supaya lengkung dari hero tidak kepotong
    <section className={`${poppins.className} relative bg-white h-full`}>
      {/* overflownya di hero saja, di sini bersih */}

      <div className="relative z-10 flex flex-col items-center   pb-24">
        {/* CERITA */}
        <svg
          viewBox="0 0 500 120"
          preserveAspectRatio="none"
          className="w-full -mt-1"
        >
          <path
            d="M 0 40 Q 254 120 500 40 L 500 0 L 0 0 ZZ"
            fill="#1c2652"
            fillRule="evenodd"
          />
        </svg>
        <div className='flex flex-col items-center' id="cerita-kanzler">
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

          {/* KANZLER */}
          <MotionWrapper
            variant="fadeInUp"
            delay={0.35}
            className="text-center mb-8 sm:mb-10 md:mb-4"
          >
            <h2
              className={`${dmSerif.className} leading-[0.9] tracking-[0.03em] text-[clamp(78px,16vw,190px)] text-[#1B2653]`}
            >
              KANZLER
            </h2>
          </MotionWrapper>

          {/* Paragraf 1 – lebih sempit */}
          <MotionWrapper
            variant="fadeInUp"
            delay={0.5}
            className="text-center mb-1 sm:mb-4 md:mb-4 max-w-[640px]"
          >
            <p className="text-[clamp(13px,1.1vw,16px)] leading-relaxed text-[#1C2652]">
              Didirikan pada 1999, Kanzler hadir untuk menghadirkan cita rasa
              otentik
              <br />
              sosis Jerman ke Indonesia.
            </p>
          </MotionWrapper>

          {/* Paragraf 2 – lebih lebar dari paragraf 1 */}
          <MotionWrapper
            variant="fadeInUp"
            delay={0.65}
            className="text-center max-w-[940px]"
          >
            <p className="text-[clamp(13px,1.1vw,16px)] leading-relaxed text-[#1C2652]">
              Sebagai brand premium, Kanzler konsisten menawarkan produk daging
              olahan berkualitas tinggi <br />
              melalui proses modern dan higienis, menjadikannya pilihan
              terpercaya keluarga Indonesia.
            </p>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
});

export default CeritaKanzler;

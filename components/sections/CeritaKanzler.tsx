'use client'

import React from 'react'
import Image from 'next/image'
import MotionWrapper from '@/components/animations/MotionWrapper'
import { DM_Serif_Display, Poppins } from 'next/font/google'

const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: '400' })
const poppins = Poppins({ subsets: ['latin'], weight: ['400'] })

const CeritaKanzler = React.memo(function CeritaKanzler() {
  return (
    <section className={`${poppins.className} relative overflow-hidden bg-white`}>
      {/* Blue curve background */}
      {/* <div className="absolute top-0 left-0 w-full h-[166px] md:h-[20vw] overflow-hidden">
        <div
          className="w-full h-full"
          style={{
            background:
              'radial-gradient(120% 100% at 50% 12%, #2c3a74 0%, #213061 40%, #1C2652 75%)',
            clipPath: 'ellipse(160% 100% at 50% 0%)',
            transform: 'translateY(-38%)',
          }}
        />
      </div> */}
      {/* overflownya di hero aja mase jangan disini soalnya ada gradient */}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 md:px-8 pt-40 md:pt-48 lg:pt-56 pb-24">
        {/* CERITA */}
        <MotionWrapper variant="fadeInUp" delay={0.2} className="text-center mb-2">
          <h1
            className={`${dmSerif.className} uppercase leading-none tracking-[0.08em] text-[clamp(40px,7vw,90px)] text-[#AA7832]`}
          >
            CERITA
          </h1>
        </MotionWrapper>

        {/* KANZLER */}
        <MotionWrapper variant="fadeInUp" delay={0.35} className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2
            className={`${dmSerif.className} leading-[0.9] tracking-[0.03em] text-[clamp(78px,16vw,190px)] text-[#1C2652]`}
          >
            KANZLER
          </h2>
        </MotionWrapper>

        {/* Paragraf 1 – lebih sempit */}
        <MotionWrapper
          variant="fadeInUp"
          delay={0.5}
          className="text-center mb-5 sm:mb-7 md:mb-8 max-w-[640px]"
        >
          <p className="text-[clamp(13px,1.1vw,16px)] leading-relaxed text-[#1C2652]">
            Didirikan pada 1999, Kanzler hadir untuk menghadirkan cita rasa otentik 
            <br></br>
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
            Sebagai brand premium, Kanzler konsisten menawarkan produk daging olahan
            berkualitas tinggi <br />
            melalui proses modern dan higienis, menjadikannya
            pilihan terpercaya keluarga Indonesia.
          </p>
        </MotionWrapper>
      </div>
    </section>
  )
})

export default CeritaKanzler

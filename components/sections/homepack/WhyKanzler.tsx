'use client'

import React from 'react'
import Image from 'next/image'
import { DM_Serif_Display } from 'next/font/google'

const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: '400' })

function OutlineBox({
  side,
  children,
}: { side: 'left' | 'right'; children: React.ReactNode }) {
  const W = 500
  const H = 220
  const R = 24
  const cut = 120 // panjang sisi dalam yang terbuka

  // bikin path manual
  const pathLeft = `
    M${R},0 H${W - cut} 
    M${W},${R} V${H - R} 
    M${W - cut},${H} H${R} 
    M0,${H - R} V${R} 
    Z
  `
  const pathRight = `
    M${cut},0 H${W - R} 
    M${W},${R} V${H - R} 
    M${W - R},${H} H${cut} 
    M0,${H - R} V${R} 
    Z
  `

  return (
    <div className="relative w-full max-w-lg flex items-center justify-center">
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full">
        <path
          d={side === 'left' ? pathLeft : pathRight}
          stroke="#B89E5C"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <rect
          x="2" y="2" width={W - 4} height={H - 4}
          rx={R} ry={R}
          fill="none"
          stroke="transparent"
        />
      </svg>
      <div className="absolute inset-0 px-8 py-6 flex items-center z-10">
        {children}
      </div>
    </div>
  )
}

export default function WhyKanzler() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-8 md:gap-16">
        
        {/* Left box */}
        <OutlineBox side="left">
          <div className="flex items-center gap-4">
            <Image
              src="/assets/ASSET - HOMEPACK/3 ASSET - HOMEPACK/3 ASSET - HOMEPACK EXTRA JUICY.png"
              alt="Extra Juicy"
              width={64}
              height={64}
            />
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#1E2756]">Extra Juicy</h3>
              <p className="text-gray-600 text-sm md:text-base mt-2 max-w-[280px] leading-relaxed">
                Setiap gigitan menghadirkan sensasi <em>juicy</em> di dalam dan garing di luar.
              </p>
            </div>
          </div>
        </OutlineBox>

        {/* Title */}
        <div className="text-center">
          <h2
            className={`${dmSerif.className} text-[#1E2756] leading-[0.95]
                        text-3xl sm:text-5xl md:text-6xl`}
          >
            KENAPA <br /> KANZLER?
          </h2>
        </div>

        {/* Right box */}
        <OutlineBox side="right">
          <div className="flex items-center gap-4 flex-row-reverse">
            <Image
              src="/assets/ASSET - HOMEPACK/3 ASSET - HOMEPACK/3 ASSET - HOMEPACK EXTRA MEATY.png"
              alt="Extra Meaty"
              width={64}
              height={64}
            />
            <div className="text-right">
              <h3 className="text-xl md:text-2xl font-bold text-[#1E2756]">Extra Meaty</h3>
              <p className="text-gray-600 text-sm md:text-base mt-2 max-w-[280px] leading-relaxed">
                Memiliki kandungan daging yang lebih banyak dibandingkan produk sejenis.
              </p>
            </div>
          </div>
        </OutlineBox>

      </div>
    </section>
  )
}

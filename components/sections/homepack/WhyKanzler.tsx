"use client";

import type React from "react";
import Image from "next/image";
import { DM_Serif_Display } from "next/font/google";

const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400" });
const ICON = 64; // <<< perbesar ikon di sini (mis. 72 untuk lebih besar)

function OutlineBox({
  side,
  children,
}: {
  side: "left" | "right";
  children: React.ReactNode;
}) {
  const W = 320;
  const H = 180;
  const R = 24;
  const cut = 96;

  const leftPath = [
    `M ${R},0 H ${W - cut}`,
    `M ${R},0 A ${R} ${R} 0 0 0 0,${R} V ${H - R} A ${R} ${R} 0 0 0 ${R},${H}`,
    `M ${R},${H} H ${W - cut}`,
  ].join(" ");

  const rightPath = [
    `M ${cut},0 H ${W - R}`,
    `M ${W - R},0 A ${R} ${R} 0 0 1 ${W},${R} V ${H - R} A ${R} ${R} 0 0 1 ${W - R},${H}`,
    `M ${cut},${H} H ${W - R}`,
  ].join(" ");

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: W, height: H }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ filter: "drop-shadow(0 2px 8px rgba(184,158,92,0.25))" }}
        aria-hidden
      >
        <path
          d={side === "left" ? leftPath : rightPath}
          stroke="#B89E5C"
          strokeWidth={2.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="absolute inset-0 px-6 py-4 flex items-center z-10">
        {children}
      </div>
    </div>
  );
}

export default function WhyKanzler() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-6xl mx-auto">
          {/* Left box */}
          <div className="order-2 lg:order-1">
            <OutlineBox side="left">
              <div className="flex items-center gap-4">
                <Image
                  src="/assets/ASSET - HOMEPACK/3 ASSET - HOMEPACK/3 ASSET - HOMEPACK EXTRA JUICY.png"
                  alt="Juicy icon"
                  width={ICON}
                  height={ICON}
                  priority
                />
                <div>
                  <h3 className="text-lg font-bold text-[#1E2756] mb-1 leading-tight">
                    Extra
                    <br />
                    Juicy
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed max-w-[180px]">
                    Setiap gigitan menghadirkan sensasi juicy di dalam dan
                    garing di luar.
                  </p>
                </div>
              </div>
            </OutlineBox>
          </div>

          {/* Title */}
          <div className="text-center relative order-1 lg:order-2">
            <h2
              className={`${dmSerif.className} text-[#1E2756] leading-[0.85] text-5xl lg:text-6xl font-normal whitespace-nowrap`}
            >
              KENAPA
              <br />
              KANZLER?
            </h2>
          </div>

          {/* Right box */}
          <div className="order-3">
            <OutlineBox side="right">
              <div className="flex items-center gap-4 flex-row-reverse">
                <Image
                  src="/assets/ASSET - HOMEPACK/3 ASSET - HOMEPACK/3 ASSET - HOMEPACK EXTRA MEATY.png"
                  alt="Meaty icon"
                  width={ICON}
                  height={ICON}
                  priority
                />
                <div className="text-right">
                  <h3 className="text-lg font-bold text-[#1E2756] mb-1 leading-tight">
                    Extra
                    <br />
                    Meaty
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed max-w-[180px]">
                    Memiliki kandungan daging yang lebih banyak dibandingkan
                    produk sejenis.
                  </p>
                </div>
              </div>
            </OutlineBox>
          </div>
        </div>
      </div>
    </section>
  );
}

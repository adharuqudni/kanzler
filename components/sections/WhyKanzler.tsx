'use client';

import type React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { DM_Serif_Display } from "next/font/google";
import { BOUNCY_TRANSITION } from "@/lib/motion";

const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400" });

// Outline dimensions (sudah pas)
const W = 340;
const H = 220;
const R = 28;
const CUT = 110;

function OutlineBox({
  side,
  children,
}: {
  side: "left" | "right";
  children: React.ReactNode;
}) {
  const leftPath = [
    `M ${R},0 H ${W - CUT}`,
    `M ${R},0 A ${R} ${R} 0 0 0 0,${R} V ${H - R} A ${R} ${R} 0 0 0 ${R},${H}`,
    `M ${R},${H} H ${W - CUT}`,
  ].join(" ");

  const rightPath = [
    `M ${CUT},0 H ${W - R}`,
    `M ${W - R},0 A ${R} ${R} 0 0 1 ${W},${R} V ${H - R} A ${R} ${R} 0 0 1 ${W - R},${H}`,
    `M ${CUT},${H} H ${W - R}`,
  ].join(" ");

  const inner =
    side === "left"
      ? "pl-6 pr-14 justify-start"
      : "pl-14 pr-6 justify-end";

  return (
    <div className="relative flex items-center justify-center" style={{ width: W, height: H }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
        <path
          d={side === "left" ? leftPath : rightPath}
          stroke="#B89E5C"
          strokeWidth={1.8}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className={`absolute inset-0 ${inner} py-6 flex items-center z-10 w-full`}>
        {children}
      </div>
    </div>
  );
}

export default function WhyKanzler() {
  return (
    <section className="bg-white py-12 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto gap-8">
          {/* LEFT CARD — icon kiri, heading kanan, deskripsi DI BAWAH IKON (span kolom) */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ ...BOUNCY_TRANSITION, duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <OutlineBox side="left">
              <div className="grid grid-cols-[auto_1fr] gap-x-4 items-start text-left">
                {/* Row 1 */}
                <Image
                  src="/assets/ASSET - HOMEPACK/3 ASSET - HOMEPACK/3 ASSET - HOMEPACK EXTRA JUICY.png"
                  alt="Juicy icon"
                  width={76}
                  height={76}
                  priority
                  className="row-start-1 col-start-1"
                />
                <h3 className="row-start-1 col-start-2 text-2xl font-extrabold text-[#1E2756] leading-[1.0]">
                  Extra
                  <br />
                  Juicy
                </h3>
                {/* Row 2: span kedua kolom → tepat di bawah ikon */}
                <p className="col-span-2 mt-2 text-gray-600 text-[15px] leading-7 max-w-[260px]">
                  Setiap gigitan menghadirkan sensasi <em>juicy</em> di dalam dan garing di luar.
                </p>
              </div>
            </OutlineBox>
          </motion.div>

          {/* CENTER TITLE */}
          <motion.div
            className="text-center relative order-1 lg:order-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...BOUNCY_TRANSITION, duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2
              className={`${dmSerif.className} text-[#1E2756] leading-[0.85] tracking-tight text-6xl lg:text-8xl font-normal whitespace-nowrap`}
            >
              KENAPA
              <br />
              KANZLER?
            </h2>
          </motion.div>

          {/* RIGHT CARD — icon kanan, heading kiri, deskripsi RATa KANAN (span kolom) */}
          <motion.div
            className="order-3"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ ...BOUNCY_TRANSITION, duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <OutlineBox side="right">
              <div className="grid grid-cols-[1fr_auto] gap-x-4 items-start w-full max-w-[280px]">
                {/* Row 1 */}
                <h3 className="row-start-1 col-start-1 text-2xl font-extrabold text-[#1E2756] leading-[1.0] text-right">
                  Extra
                  <br />
                  Meaty
                </h3>
                <Image
                  src="/assets/ASSET - HOMEPACK/3 ASSET - HOMEPACK/3 ASSET - HOMEPACK EXTRA MEATY.png"
                  alt="Meaty icon"
                  width={90}
                  height={90}
                  priority
                  className="row-start-1 col-start-2 justify-self-end"
                />
                {/* Row 2: span kedua kolom, RATA KANAN */}
                <p className="col-span-2 mt-3 text-gray-600 text-[15px] leading-7 text-right">
                  Memiliki kandungan daging yang lebih banyak dibandingkan produk sejenis.
                </p>
              </div>
            </OutlineBox>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

'use client';

import type React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { DM_Serif_Display } from "next/font/google";
import { BOUNCY_TRANSITION } from "@/lib/motion";

const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400" });
const ICON = 96; // ukuran ikon

function OutlineBox({
  side,
  children,
}: {
  side: "left" | "right";
  children: React.ReactNode;
}) {
  const W = 320;
  const H = 240;
  const R = 32;
  const cut = 120;

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
      <div className="absolute inset-0 px-8 py-6 flex items-center z-10">
        {children}
      </div>
    </div>
  );
}

export default function WhyKanzler() {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...BOUNCY_TRANSITION, duration: 0.8 },
    },
  };

  const slideInLeftVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { ...BOUNCY_TRANSITION, duration: 1 },
    },
  };

  const slideInRightVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { ...BOUNCY_TRANSITION, duration: 1 },
    },
  };

  return (
    <section className="bg-white py-12 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto">
          {/* Left box */}
          <motion.div
            className="order-2 lg:order-1"
            variants={{
              ...slideInLeftVariants,
              visible: {
                ...slideInLeftVariants.visible,
                transition: {
                  ...BOUNCY_TRANSITION,
                  duration: 1,
                  delay: 0.2,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <OutlineBox side="left">
              <div className="flex items-center gap-6">
                <Image
                  src="/assets/ASSET - HOMEPACK/3 ASSET - HOMEPACK/3 ASSET - HOMEPACK EXTRA JUICY.png"
                  alt="Juicy icon"
                  width={ICON}
                  height={ICON}
                  priority
                />
                <div>
                  <h3 className="text-xl font-bold text-[#1E2756] mb-2 leading-tight">
                    Extra
                    <br />
                    Juicy
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-[220px]">
                    Setiap gigitan menghadirkan sensasi juicy di dalam dan garing di luar.
                  </p>
                </div>
              </div>
            </OutlineBox>
          </motion.div>

          {/* Title */}
          <motion.div
            className="text-center relative order-1 lg:order-2"
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2
              className={`${dmSerif.className} text-[#1E2756] leading-[0.85] text-5xl lg:text-9xl font-normal whitespace-nowrap`}
            >
              KENAPA
              <br />
              KANZLER?
            </h2>
          </motion.div>

          {/* Right box */}
          <motion.div
            className="order-3"
            variants={{
              ...slideInRightVariants,
              visible: {
                ...slideInRightVariants.visible,
                transition: {
                  ...BOUNCY_TRANSITION,
                  duration: 1,
                  delay: 0.4,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <OutlineBox side="right">
              <div className="flex items-center gap-6 flex-row-reverse">
                <Image
                  src="/assets/ASSET - HOMEPACK/3 ASSET - HOMEPACK/3 ASSET - HOMEPACK EXTRA MEATY.png"
                  alt="Meaty icon"
                  width={ICON}
                  height={ICON}
                  priority
                />
                <div className="text-right">
                  <h3 className="text-xl font-bold text-[#1E2756] mb-2 leading-tight">
                    Extra
                    <br />
                    Meaty
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-[220px]">
                    Memiliki kandungan daging yang lebih banyak dibandingkan produk sejenis.
                  </p>
                </div>
              </div>
            </OutlineBox>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

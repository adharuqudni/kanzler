'use client';

import type React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { DM_Serif_Display, Poppins } from "next/font/google";
import { BOUNCY_TRANSITION } from "@/lib/motion";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400" });

// Mobile outline dimensions (smaller)
const W = 180;
const H = 240;
const R = 20;
const CUT = 0;

function MobileOutlineBox({
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
      ? "px-0  justify-center"
      : "px-0  justify-center";

  return (
    <div className="relative flex items-center justify-center" style={{ width: W, height: H }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute justify-center inset-0 w-full h-full pointer-events-none rotate-90" aria-hidden>
        <path
          d={side === "left" ? leftPath : rightPath}
          stroke="#AA7B32"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className={`absolute inset-0 ${inner} py-4 flex items-center z-10 w-full`}>
        {children}
      </div>
    </div>
  );
}

export default function MobileWhyKanzler() {
  return (
    <section className="bg-white pb-8 flex items-center justify-center ">
      <div className="w-full px-4 min-h-[80vh]" id="why-kanzler">
        <div className="flex flex-col items-center justify-center gap-0">
        
          {/* LEFT CARD — Extra Juicy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...BOUNCY_TRANSITION, duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <MobileOutlineBox side="left">
              <div className="grid grid-cols-[auto_1fr] items-start text-center gap-x-2">
                {/* Row 1 */}
                <Image
                  src="/assets/ASSET - HOMEPACK/3 ASSET - HOMEPACK/3 ASSET - HOMEPACK EXTRA JUICY.png"
                  alt="Juicy icon"
                  width={90}
                  height={60}
                  priority
                  className="row-start-1 col-start-1"
                />
                <h3 className={`${poppins.className} row-start-1 col-start-2 text-xl font-extrabold text-[#1E2756] leading-tight`}>
                  Extra
                  <br />
                  Juicy
                </h3>
                {/* Row 2: span kedua kolom → tepat di bawah ikon */}
                <p className={`${poppins.className} col-span-2 mt-2 text-gray-600 text-sm leading-tight`}>
                  Setiap gigitan <br />menghadirkan sensasi <br /><em>juicy</em> di dalam dan <br /> garing di luar.
                </p>
              </div>
            </MobileOutlineBox>
          </motion.div>
  {/* CENTER TITLE - First on mobile */}
  <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...BOUNCY_TRANSITION, duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2
              className={`${dmSerif.className} text-[#1E2756] leading-[0.85] tracking-tight text-5xl sm:text-6xl font-normal`}
            >
              KENAPA
              <br />
              KANZLER?
            </h2>
          </motion.div>

          {/* RIGHT CARD — Extra Meaty */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...BOUNCY_TRANSITION, duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <MobileOutlineBox side="right">
              <div className="grid grid-cols-[1fr_auto] gap-x-2 items-start w-full">
                {/* Row 1 */}
                <h3 className={`${poppins.className} row-start-1 col-start-1 text-xl font-extrabold text-[#1E2756] leading-tight text-center`}>
                  Extra
                  <br />
                  Meaty
                </h3>
                <Image
                  src="/assets/ASSET - HOMEPACK/3 ASSET - HOMEPACK/3 ASSET - HOMEPACK EXTRA MEATY.png"
                  alt="Meaty icon"
                  width={90}
                  height={65}
                  priority
                  className="row-start-1 col-start-2 justify-self-end"
                />
                {/* Row 2: span kedua kolom, RATA KANAN */}
                <p className={`${poppins.className} col-span-2 mt-2 text-gray-600 text-sm leading-tight text-center`}>
                  Memiliki kandungan <br />daging yang lebih <br /> banyak dibandingkan <br /> produk sejenis.
                </p>
              </div>
            </MobileOutlineBox>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


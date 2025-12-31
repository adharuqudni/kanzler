"use client";

import type React from "react";
import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { DM_Serif_Display, Poppins } from "next/font/google";
import MotionWrapper from "@/components/animations/MotionWrapper";
import { BOUNCY_TRANSITION } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700", "800"] });
const MotionLink = motion(Link);

interface SplitHeroMobileProps {
  currentSection: number;
  isScrolling: boolean;
  onScrollToNext?: () => void;
  onPanelStateChange?: (isActive: boolean) => void;
}

const SplitHeroMobile: React.FC<SplitHeroMobileProps> = ({
  onScrollToNext,
  onPanelStateChange,
}) => {
  useEffect(() => {
    onPanelStateChange?.(false);
  }, [onPanelStateChange]);

  const handleCta = () => onScrollToNext?.();

  return (
    <main className="min-h-screen w-full bg-[#1C2653]">
      <div className="relative h-screen w-full overflow-hidden flex flex-col">
        {/* ===================== BLOK ATAS (BLUE) ===================== */}
        <section className="relative w-full flex-[1.05] bg-[#1C2653] overflow-hidden">
          {/* background */}
          <div className="absolute inset-0">
            <Image
              src="/assets/gradient-9x16.jpg"
              alt="Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/5" />
          </div>

          {/* crown kecil kiri atas */}
          <div className="absolute z-30 left-5 top-6">
            <Image
              src="/assets/ASSET - HOME/1 ASSET - HOME/crown_white.svg"
              alt="Crown small"
              width={22}
              height={22}
              className="object-contain"
              priority
            />
          </div>

          {/* content */}
          <div className="relative z-20 h-full w-full flex flex-col items-center text-center px-6 pt-10">
            <MotionWrapper variant="scaleInBig" delay={0.1}>
              <Image
                src="/assets/ASSET - HOME/1 ASSET - HOME/crown_white.svg"
                alt="Kanzler Crown"
                width={44}
                height={44}
                className="object-contain"
                priority
              />
            </MotionWrapper>

            <MotionWrapper variant="fadeInUp" delay={0.18} className="mt-2">
              <Image
                src="/assets/kanzler-white.svg"
                alt="Kanzler"
                width={270}
                height={54}
                className="object-contain"
                priority
              />
            </MotionWrapper>

            <MotionWrapper variant="fadeInUp" delay={0.18} className="mt-2">
              <Image
                src="/assets/ASSET - HOME/1 ASSET - HOME/Kanzler Quote.png"
                alt="Kanzler Quote"
                width={270}
                height={54}
                className="object-contain"
                priority
              />
            </MotionWrapper>

            <motion.p
              className={`${poppins.className} mt-4 text-[12px] leading-5 text-white/90 max-w-[320px]`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
            >
              Produk sosis dan nugget dari daging <br /> sapi dan ayam pilihan.{" "}
              <i>Ekstra Meaty</i>, <br /> Ekstra <i>Juicy</i>, dan mudah <br />{" "}
              diolah menjadi menu lezat setiap hari.
            </motion.p>

            <Link href="/homepack">
              <Button
                className={`${poppins.className} bg-white text-kanzler-navy hover:bg-gray-100 rounded-full px-3 py-1.5 text-[11px] font-bold mt-4 leading-none h-auto`}
              >
                Lihat semua produk <span className="ml-1 text-[12px]">›</span>
              </Button>
            </Link>

            <div className="flex-1" />
          </div>

          {/* Produk di blok atas */}
          <TopPacks />

          {/* DIVIDER CURVE */}
          <CurveDivider />
        </section>

        {/* ===================== BLOK BAWAH (WHITE) ===================== */}
        <section className="relative w-full flex-[0.95] bg-white overflow-hidden">
          {/* seam cover biar tidak ada garis tipis */}
          <div className="absolute left-0 right-0 top-[-3px] h-[4px] bg-white z-10" />

          <div className="relative z-20 h-full w-full flex flex-col items-center text-center px-6 pt-16 pb-8">
            <Image
              src="/assets/Kanzler Biru.png"
              alt="Kanzler"
              width={160}
              height={20}
              priority
            />

            <Image
              src="/assets/Singles Gold.png"
              alt="Singles"
              width={200}
              height={20}
              priority
            />

            <p
              className={`${poppins.className} mt-3 text-[12px] leading-5 text-[#1C2653]/70 max-w-[320px]`}
            >
              Produk sosis dan bakso berkualitas yang <br /> terbuat dari daging
              sapi dan ayam pilihan. <br /> Sudah matang, siap untuk langsung
              dimakan, <br /> atau diolah menjadi berbagai menu harian.
            </p>

            <MotionLink
              href="/singles"
              onClick={handleCta}
              className={`${poppins.className} mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#C8A15A] px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm leading-none`}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.01 }}
              transition={BOUNCY_TRANSITION}
            >
              Lihat semua produk{" "}
              <span className="ml-0.5 text-[12px] leading-none">›</span>
            </MotionLink>
            <div className="flex-1" />
          </div>

          <BottomDecor />
        </section>
      </div>
    </main>
  );
};

/**
 * CURVE:
 * - tambah shadow di curve atas (drop-shadow via filter)
 * - hilangkan "batas putih bawah" => jangan gambar area bawah, cukup gambar area putih yang menutup bawah blok atas
 *   (area lainnya transparan)
 */
function CurveDivider() {
  return (
    <div className="absolute left-0 right-0 bottom-[-1px] z-40 pointer-events-none">
      <svg
        viewBox="0 0 500 190"
        preserveAspectRatio="none"
        className="block w-full h-[220px]"
        aria-hidden="true"
      >
        <defs>
          {/* blur untuk shadow lembut */}
          <filter id="curveBlur" x="-30%" y="-60%" width="160%" height="260%">
            <feGaussianBlur stdDeviation="6" />
          </filter>

          {/* mask: shadow hanya muncul di bagian ATAS curve (area biru), bukan ke bawah (area putih) */}
          <mask id="maskTopOnly">
            <rect x="0" y="0" width="500" height="130" fill="white" />
            <rect x="0" y="130" width="500" height="90" fill="black" />
          </mask>
        </defs>

        {/* FILL PUTIH: benar-benar sampai bawah viewBox (220), jadi tidak ada strip sisa */}
        <path
          d="M 0 120 Q 250 200 500 120 L 500 220 L 0 220 Z"
          fill="#ffffff"
        />

        {/* SHADOW: stroke curve + blur, di-mask agar hanya terlihat ke atas */}
        <g mask="url(#maskTopOnly)">
          <path
            d="M 0 120 Q 250 200 500 120"
            fill="none"
            stroke="rgba(0,0,0,0.22)"
            strokeWidth="14"
            strokeLinecap="round"
            filter="url(#curveBlur)"
          />
        </g>
      </svg>
    </div>
  );
}

function TopPacks() {
  return (
    <>
      {/* Left pack */}
      <motion.div
        className="absolute z-25 left-0 bottom-[-10px]"
        initial={{ opacity: 0, y: 28, x: -10, rotate: -10 }}
        animate={{ opacity: 1, y: 0, x: 0, rotate: 15 }}
        transition={{ duration: 0.75, ease: "easeOut", delay: 0.25 }}
        style={{
          filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.28))",
        }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME BEEF COCKTAIL.png"
          alt="Beef Cocktail"
          width={110}
          height={140}
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Right pack */}
      <motion.div
        className="absolute z-25 -right-6 bottom-[-25px]"
        initial={{ opacity: 0, y: 28, x: 10, rotate: 10 }}
        animate={{ opacity: 1, y: 0, x: 0, rotate: -15 }}
        transition={{ duration: 0.75, ease: "easeOut", delay: 0.32 }}
        style={{
          filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.28))",
        }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME CRISPY NUGGET.png"
          alt="Crispy Nugget"
          width={160}
          height={150}
          className="object-contain"
          priority
        />
      </motion.div>
    </>
  );
}

function BottomDecor() {
  return (
    <>
      {/* kiri */}
      <motion.div
        className="absolute z-20 -left-6 top-[-20px]"
        initial={{ opacity: 0, y: 22, x: -10, rotate: 14 }}
        animate={{ opacity: 1, y: 0, x: 0, rotate: 20 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
        style={{
          filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.22))",
        }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME BAKSO HOT.png"
          alt="Left decor"
          width={120}
          height={160}
          className="object-contain"
          priority
        />
      </motion.div>

      {/* kanan */}
      <motion.div
        className="absolute z-20 -right-6 -bottom-6"
        initial={{ opacity: 0, y: 22, x: 10, rotate: -12 }}
        animate={{ opacity: 1, y: 0, x: 0, rotate: 20 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.32 }}
        style={{
          filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.22))",
        }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME SOSIS GOCHU.png"
          alt="Right decor"
          width={100}
          height={175}
          className="object-contain"
          priority
        />
      </motion.div>
    </>
  );
}

export default SplitHeroMobile;

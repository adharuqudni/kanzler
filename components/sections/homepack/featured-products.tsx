"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type StrapiMedia = {
  url: string;
  formats?: {
    medium?: { url: string };
    small?: { url: string };
    thumbnail?: { url: string };
  };
};
type StrapiProduct = {
  id: number;
  Name: string;
  Description: string;
  Category: "kanzler-sosis" | "kanzler-nugget" | string;
  Product: string;
  Image?: StrapiMedia[];
};
type Product = {
  id: number;
  name: string;
  description: string;
  category: "kanzler-sosis" | "kanzler-nugget";
  product: string;
  image: string;
};

const STRAPI = "http://localhost:1337";

const BG_SPLIT =
  "/assets/ASSET - HOMEPACK/4 ASSET - HOMEPACK/4 ASSET - HOMEPACK SPLIT BACKGROUND.png";
const BG_TOP =
  "/assets/ASSET - HOMEPACK/4 ASSET - HOMEPACK/4 ASSET - HOMEPACK BACKGROUND ATAS.png";
const BG_BOTTOM =
  "/assets/ASSET - HOMEPACK/4 ASSET - HOMEPACK/4 ASSET - HOMEPACK BACKGROUND BAWAH.png";
const CROWN =
  "/assets/ASSET - HOMEPACK/4 ASSET - HOMEPACK/4 ASSET - HOMEPACK MAHKOTA.png";
const ARROW_CIRCLE =
  "/assets/ASSET - HOMEPACK/4 ASSET - HOMEPACK/4 ASSET - HOMEPACK ARROW CIRCLE.png";

function getMediaUrl(m?: StrapiMedia[]): string {
  if (!m || !m.length) return "/fallback.png";
  const f = m[0];
  const url =
    f.formats?.medium?.url ||
    f.formats?.small?.url ||
    f.formats?.thumbnail?.url ||
    f.url;
  return url.startsWith("http") ? url : `${STRAPI}${url}`;
}

export default function FeaturedProducts() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] =
    useState<"kanzler-sosis" | "kanzler-nugget">("kanzler-sosis");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${STRAPI}/api/products?populate=Image`);
        const json = await res.json();
        const mapped: Product[] = (json.data as StrapiProduct[])
          .map((p) => ({
            id: p.id,
            name: p.Name,
            description: p.Description,
            category:
              (p.Category as "kanzler-sosis" | "kanzler-nugget") ||
              "kanzler-sosis",
            product: p.Product,
            image: getMediaUrl(p.Image),
          }))
          .filter(
            (p) =>
              p.category === "kanzler-sosis" || p.category === "kanzler-nugget"
          );
        setItems(mapped);
      } catch (e) {
        console.error("Fetch products failed", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  const filtered = useMemo(
    () => items.filter((p) => p.category === activeCategory),
    [items, activeCategory]
  );
  const current = filtered[activeIndex];

  if (loading) {
    return (
      <section className="py-20 text-center">
        <p className="text-gray-500">Loading products…</p>
      </section>
    );
  }
  if (!current) return null;

  const next = () => setActiveIndex((i) => (i + 1) % filtered.length);
  const prev = () =>
    setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);

  const labelMap: Record<"kanzler-sosis" | "kanzler-nugget", string> = {
    "kanzler-sosis": "SOSIS",
    "kanzler-nugget": "NUGGET",
  };
  const otherCat =
    activeCategory === "kanzler-sosis" ? "kanzler-nugget" : "kanzler-sosis";

  return (
    <div className="relative w-full h-[560px] flex items-center justify-center overflow-hidden">
      {/* BG_SPLIT — widen & pull up for bigger left area */}
      <div
        className="absolute inset-0 z-0 origin-top will-change-transform"
        style={{ transform: "translateY(-16%) scaleY(2) scaleX(1.12)" }}
      >
        <Image
          src={BG_SPLIT}
          alt="Background Split"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "40% top" }} // geser seam ke kanan → kiri lebih luas
        />
      </div>

      {/* Curved decorations */}
      <div
        className="absolute top-0 left-0 w-full z-10 pointer-events-none h-24 md:h-28 lg:h-36"
        style={{
          backgroundImage: `url("${BG_TOP}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-full z-10 pointer-events-none h-24 md:h-28 lg:h-36"
        style={{
          backgroundImage: `url("${BG_BOTTOM}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      />

      {/* Crown + nav */}
      <div className="absolute top-6 left-8 z-20">
        <Image src={CROWN} alt="Crown" width={44} height={44} className="mb-3" />
        <div className="space-y-2 text-sm">
          <span className="inline-block bg-[#B89E5C] text-white px-4 py-1 rounded-full">
            Produk
          </span>
          <span className="block text-[#B89E5C]">Resep</span>
        </div>
      </div>

      {/* Main grid — left wider like ref image */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr_1.15fr] w-full max-w-7xl px-8 gap-4">
        {/* LEFT */}
        <div className="flex flex-col justify-center text-white select-none">
          <motion.div layout className="flex flex-col gap-3">
            <button
              onClick={() => setActiveCategory(otherCat)}
              className="w-fit text-left uppercase tracking-[0.2em] text-white/90 hover:text-white transition"
            >
              <motion.span
                layout
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-heading text-2xl md:text-3xl"
              >
                {labelMap[otherCat]}
              </motion.span>
            </button>

            <motion.div
              layout
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="flex items-center gap-3"
            >
              <motion.h1
                layout
                initial={{ opacity: 0.85, y: 10, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="font-heading font-bold leading-none text-[46px] md:text-[76px] lg:text-[88px]"
                style={{ letterSpacing: "-0.01em" }}
              >
                {labelMap[activeCategory]}
              </motion.h1>
              <Image src={ARROW_CIRCLE} alt="Toggle" width={38} height={38} className="mt-1" />
            </motion.div>

            <AnimatePresence mode="wait">
              {activeCategory === "kanzler-nugget" ? (
                <motion.div
                  key="desc-nugget"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-1 md:mt-2 text-center lg:text-left"
                >
                  <p className="text-white/90 md:text-[18px]">Nugget kualitas premium yang</p>
                  <p className="italic text-white/90 md:text-[18px]">Extra Crispy, Extra Meaty</p>
                  <p className="italic text-white/90 md:text-[18px]">dan Extra Juicy</p>
                </motion.div>
              ) : (
                <motion.div
                  key="desc-sosis"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-1 md:mt-2 text-center lg:text-left"
                >
                  <p className="text-white/90 md:text-[18px]">Sosis kualitas premium dengan</p>
                  <p className="italic text-white/90 md:text-[18px]">
                    sensasi juicy di dalam dan garing di luar
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* CENTER (product) */}
        <div className="flex items-center justify-center">
          <Image
            src={current.image}
            alt={current.name}
            width={360}
            height={360}
            className="object-contain drop-shadow-2xl"
          />
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center text-left px-6">
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-[#1E2756] mb-3 flex items-center gap-2">
            <span className="text-[#B89E5C] cursor-pointer select-none" onClick={prev}>‹</span>
            {current.name}
            <span className="text-[#B89E5C] cursor-pointer select-none" onClick={next}>›</span>
          </h3>
          <p className="text-[#435068] leading-relaxed mb-4">{current.description}</p>
          {activeCategory === "kanzler-nugget" && (
            <p className="text-[#435068] italic">
              Nugget kualitas premium yang <b>Extra Crispy</b>, <b>Extra Meaty</b> dan{" "}
              <b>Extra Juicy</b>
            </p>
          )}
          <button className="mt-6 w-fit rounded-full bg-[#B89E5C] px-6 py-2 text-white text-sm font-medium hover:opacity-90 transition">
            Resep
          </button>

          {filtered.length > 1 && (
            <div className="mt-4 flex items-center gap-3 text-[#435068]">
              <button
                onClick={prev}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#B89E5C] text-white hover:opacity-90"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={next}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#B89E5C] text-white hover:opacity-90"
              >
                <ChevronRight />
              </button>
              <span className="text-sm">{activeIndex + 1} / {filtered.length}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

export type Category = "kanzler-sosis" | "kanzler-nugget";

export type Product = {
  id: number;
  name: string;
  description: string;
  category: Category;
  product: string;
  image: string;
};

export default function ProductsView({
  items,
  onGoToRecipes,
}: {
  items: Product[];
  onGoToRecipes?: () => void;
}) {
  const [activeCategory, setActiveCategory] = useState<Category>("kanzler-sosis");
  const [activeIndex, setActiveIndex] = useState(0);

  // responsive detection
  const [vw, setVw] = useState<number>(typeof window === "undefined" ? 1200 : window.innerWidth);
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const md = vw >= 768;
  const lg = vw >= 1024;

  useEffect(() => setActiveIndex(0), [activeCategory]);

  const filtered = useMemo(
    () => items.filter((p) => p.category === activeCategory),
    [items, activeCategory]
  );
  const current = filtered[activeIndex];

  const otherCat: Category =
    activeCategory === "kanzler-sosis" ? "kanzler-nugget" : "kanzler-sosis";

  const next = () => filtered.length && setActiveIndex((i) => (i + 1) % filtered.length);
  const prev = () =>
    filtered.length && setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);

  if (!current) {
    return (
      <section style={{ padding: "80px 0", textAlign: "center" }}>
        <p style={{ color: "#6B7280" }}>Produk tidak ditemukan.</p>
      </section>
    );
  }

  // ---- Styles (inline) ----
  const containerStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 20,
    display: "grid",
    gridTemplateColumns: lg ? "1.35fr 1fr 1.15fr" : "1fr",
    width: "100%",
    maxWidth: 1280,
    margin: "0 auto",
    paddingLeft: 32,
    paddingRight: 32,
    gap: 16,
  };

  const leftWrap: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "#ffffff",
    userSelect: "none",
  };

  const toggleBtn: React.CSSProperties = {
    width: "fit-content",
    textAlign: "left",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: "rgba(255,255,255,0.9)",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
  };

  const toggleText: React.CSSProperties = {
    fontFamily: "inherit",
    fontWeight: 700,
    fontSize: md ? 24 : 20,
    lineHeight: 1.1,
  };

  const rowTitleWrap: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 12,
  };

  const bigTitle: React.CSSProperties = {
    fontFamily: "inherit",
    fontWeight: 700,
    lineHeight: 1,
    fontSize: lg ? 88 : md ? 76 : 46,
    letterSpacing: "-0.01em",
    color: "#ffffff",
    margin: 0,
  };

  const circleWrap: React.CSSProperties = {
    width: 38,
    height: 38,
    flex: "0 0 38px",
    borderRadius: "50%",
    border: "2px solid rgba(255,255,255,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const descWrap: React.CSSProperties = {
    marginTop: md ? 8 : 4,
    textAlign: lg ? "left" : "center",
  };

  const descLine: React.CSSProperties = {
    color: "rgba(255,255,255,0.9)",
    fontSize: md ? 18 : 16,
    margin: 0,
  };

  const descLineItalic: React.CSSProperties = {
    ...descLine,
    fontStyle: "italic",
  };

  const centerWrap: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const centerImgStyle: React.CSSProperties = {
    objectFit: "contain",
    filter: "drop-shadow(0px 20px 40px rgba(18,38,63,0.35))",
  };

  const rightWrap: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "left",
    paddingLeft: 24,
    paddingRight: 24,
  };

  const rightTitleRow: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  };

  const rightTitleText: React.CSSProperties = {
    fontSize: md ? 32 : 28,
    fontWeight: 700,
    color: "#1E2756",
    margin: 0,
    fontFamily: "inherit",
    lineHeight: 1.2,
  };

  const arrowTextBtn: React.CSSProperties = {
    color: "#B89E5C",
    cursor: "pointer",
    userSelect: "none",
    background: "none",
    border: "none",
    padding: 0,
    fontSize: md ? 28 : 24,
    lineHeight: 1,
  };

  const paragraph: React.CSSProperties = {
    color: "#435068",
    lineHeight: 1.7,
    margin: "0 0 16px",
  };

  const italicNote: React.CSSProperties = {
    ...paragraph,
    fontStyle: "italic",
  };

  const recipesBtn: React.CSSProperties = {
    marginTop: 24,
    width: "fit-content",
    borderRadius: 999,
    background: "#B89E5C",
    padding: "10px 24px",
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
  };

  const pagerRow: React.CSSProperties = {
    marginTop: 16,
    display: "flex",
    alignItems: "center",
    gap: 12,
    color: "#435068",
  };

  const roundBtn: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: 999,
    background: "#B89E5C",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  };

  const pageText: React.CSSProperties = {
    fontSize: 14,
  };

  return (
    <div style={containerStyle}>
      {/* LEFT */}
      <div style={leftWrap}>
        <motion.div layout style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button
            onClick={() => setActiveCategory(otherCat)}
            style={toggleBtn}
            aria-label="Ganti kategori"
          >
            <motion.span
              layout
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              style={toggleText}
            >
              {otherCat === "kanzler-sosis" ? "SOSIS" : "NUGGET"}
            </motion.span>
          </button>

          <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            style={rowTitleWrap}
          >
            <motion.h1
              layout
              initial={{ opacity: 0.85, y: 10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              style={bigTitle}
            >
              {activeCategory === "kanzler-sosis" ? "SOSIS" : "NUGGET"}
            </motion.h1>

            {/* Circle arrow bulat tidak stretch */}
            <div style={circleWrap}>
              <ChevronDown size={20} color="white" />
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeCategory === "kanzler-nugget" ? (
              <motion.div
                key="desc-nugget"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                style={descWrap}
              >
                <p style={descLine}>Nugget kualitas premium yang</p>
                <p style={descLineItalic}>Extra Crispy, Extra Meaty</p>
                <p style={descLineItalic}>dan Extra Juicy</p>
              </motion.div>
            ) : (
              <motion.div
                key="desc-sosis"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                style={descWrap}
              >
                <p style={descLine}>Sosis kualitas premium dengan</p>
                <p style={descLineItalic}>sensasi juicy di dalam dan garing di luar</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* CENTER */}
      <div style={centerWrap}>
        <Image
          src={current.image}
          alt={current.name}
          width={360}
          height={360}
          style={centerImgStyle}
        />
      </div>

      {/* RIGHT */}
      <div style={rightWrap}>
        <div style={rightTitleRow}>
          <button onClick={prev} aria-label="Sebelumnya" style={arrowTextBtn}>
            ‹
          </button>
          <h3 style={rightTitleText}>{current.name}</h3>
          <button onClick={next} aria-label="Berikutnya" style={arrowTextBtn}>
            ›
          </button>
        </div>

        <p style={paragraph}>{current.description}</p>

        {activeCategory === "kanzler-nugget" && (
          <p style={italicNote}>
            Nugget kualitas premium yang <b>Extra Crispy</b>, <b>Extra Meaty</b> dan{" "}
            <b>Extra Juicy</b>
          </p>
        )}

        <button onClick={onGoToRecipes} style={recipesBtn}>
          Resep
        </button>

        {filtered.length > 1 && (
          <div style={pagerRow}>
            <button onClick={prev} style={roundBtn} aria-label="Sebelumnya">
              <ChevronLeft />
            </button>
            <button onClick={next} style={roundBtn} aria-label="Berikutnya">
              <ChevronRight />
            </button>
            <span style={pageText}>
              {activeIndex + 1} / {filtered.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

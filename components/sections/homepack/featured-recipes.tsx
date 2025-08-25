"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* =========================
   Types
   ========================= */
type StrapiMediaFormats = {
  large?: { url: string };
  medium?: { url: string };
  small?: { url: string };
  thumbnail?: { url: string };
};

type StrapiMedia = {
  url: string;
  formats?: StrapiMediaFormats;
  mime?: string; // <— penting untuk cek video/image
};

type MaybeArray<T> = T | T[];

type StrapiRecipeBase = {
  id: number;
  documentId?: string;
  Name?: string;
  Title?: string;
  Description?: string;
  Ingredient?: string;
  Category?: string;
  Product?: string;
};

// Bentuk response untuk API image
type StrapiRecipeWithImage = StrapiRecipeBase & {
  Image?: MaybeArray<StrapiMedia>;
};

// Bentuk response untuk API video
type StrapiRecipeWithVideo = StrapiRecipeBase & {
  Video?: MaybeArray<StrapiMedia>;
};

type Recipe = {
  id: number;
  docId?: string;
  title: string;
  description: string;
  ingredient?: string;
  category: "produk-kanzler" | "kanzler-sosis" | "kanzler-nugget";
  image: string; // final image url
  video?: string; // final video url (bisa juga gambar kalau memang gambarnya disimpan di "Video")
};

const STRAPI = "http://localhost:1337";

// ====== Ganti sesuai endpoint kamu ======
const IMG_API = `${STRAPI}/api/recipes?populate=Image`; // contoh: koleksi yang mengandung Image
const VID_API = `${STRAPI}/api/recipes?populate=Video`; // contoh: koleksi/endpoint lain yang mengandung Video
// Jika videonya dari collection lain, mis: `${STRAPI}/api/recipe-videos?populate=Video` — tinggal ubah VID_API.

/* =========================
   Assets
   ========================= */
const BG_SPLIT =
  "/assets/ASSET - HOMEPACK/5 ASSET - HOMEPACK/5 ASSET - HOMEPACK BACKGROUND.png";
const BG_TOP =
  "/assets/ASSET - HOMEPACK/4 ASSET - HOMEPACK/4 ASSET - HOMEPACK BACKGROUND ATAS.png";
const BG_BOTTOM =
  "/assets/ASSET - HOMEPACK/4 ASSET - HOMEPACK/4 ASSET - HOMEPACK BACKGROUND BAWAH.png";
const CROWN =
  "/assets/ASSET - HOMEPACK/4 ASSET - HOMEPACK/4 ASSET - HOMEPACK MAHKOTA.png";

/* =========================
   Helpers
   ========================= */
function asArray<T>(v?: MaybeArray<T>): T[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

function absoluteUrl(u?: string): string {
  if (!u) return "/fallback.png";
  return u.startsWith("http") ? u : `${STRAPI}${u}`;
}

function pickBestFormat(m: StrapiMedia): string {
  // pilih format terbesar yang tersedia, fallback ke url
  const f =
    m.formats?.large?.url ||
    m.formats?.medium?.url ||
    m.formats?.small?.url ||
    m.formats?.thumbnail?.url ||
    m.url;
  return absoluteUrl(f);
}

function getFirstMediaUrl(m?: MaybeArray<StrapiMedia>): string {
  const first = asArray(m)[0];
  if (!first) return "/fallback.png";
  return pickBestFormat(first);
}

function isVideoUrlOrMime(url?: string, mime?: string): boolean {
  if (mime?.startsWith("video/")) return true;
  if (!url) return false;
  return /\.(mp4|webm|ogg|m3u8)$/i.test(url);
}

function normalizeCategory(input?: string): Recipe["category"] {
  const c = (input || "").toLowerCase();
  if (c.includes("sosis")) return "kanzler-sosis";
  if (c.includes("nugget") || c.includes("nuget")) return "kanzler-nugget";
  return "produk-kanzler";
}

function splitIngredients(text?: string) {
  return (text || "")
    .split("\n")
    .map((s) => s.replace(/\t/g, " ").trim())
    .filter(Boolean);
}

/* =========================
   Component
   ========================= */
export default function FeaturedRecipes() {
  const [items, setItems] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] =
    useState<Recipe["category"]>("produk-kanzler");
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);

  // === Fetch terpisah lalu merge ===
  useEffect(() => {
    (async () => {
      try {
        const [imgRes, vidRes] = await Promise.all([fetch(IMG_API), fetch(VID_API)]);
        const imgJson = await imgRes.json();
        const vidJson = await vidRes.json();

        const imgArr: StrapiRecipeWithImage[] = Array.isArray(imgJson?.data)
          ? imgJson.data
          : [];
        const vidArr: StrapiRecipeWithVideo[] = Array.isArray(vidJson?.data)
          ? vidJson.data
          : [];

        // Map video lookup by docId (prefer) → fallback id
        const videoMap = new Map<string, string>(); // key = docId|id, value = videoUrl
        for (const r of vidArr) {
          const docKey = r.documentId || String(r.id);
          const first = asArray(r.Video)[0];
          const vUrl = first ? pickBestFormat(first) : "";
          if (vUrl) videoMap.set(docKey, vUrl);
        }

        // Bangun daftar final dari source images (agar selalu ada image)
        const merged: Recipe[] = imgArr.map((r) => {
          const docKey = r.documentId || String(r.id);
          const title = (r.Title || r.Name || "").toString();
          const description = (r.Description || "").toString();
          const category = normalizeCategory(r.Category);
          const image = getFirstMediaUrl(r.Image);

          const vCandidate = videoMap.get(docKey);
          return {
            id: r.id,
            docId: r.documentId,
            title,
            description,
            ingredient: r.Ingredient,
            category,
            image,
            video: vCandidate, // bisa kosong kalau tidak ada di video API
          };
        });

        // Tambahkan entri yang hanya ada di video API (tidak ada di images)
        for (const r of vidArr) {
          const docKey = r.documentId || String(r.id);
          const already = merged.find(
            (x) => (x.docId || String(x.id)) === docKey
          );
          if (!already) {
            const first = asArray(r.Video)[0];
            const mediaUrl = first ? pickBestFormat(first) : "/fallback.png";
            const title = (r.Title || r.Name || "").toString();
            const description = (r.Description || "").toString();
            const cat = normalizeCategory(r.Category);

            // Kalau "Video" ternyata gambar, taruh ke image; kalau beneran video, taruh ke video.
            const mime = first?.mime;
            const isVideo = isVideoUrlOrMime(mediaUrl, mime);

            merged.push({
              id: r.id,
              docId: r.documentId,
              title,
              description,
              ingredient: r.Ingredient,
              category: cat,
              image: isVideo ? "/fallback.png" : mediaUrl,
              video: isVideo ? mediaUrl : undefined,
            });
          }
        }

        setItems(merged);
      } catch (e) {
        console.error("Fetch/merge recipes failed", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // reset saat filter berubah
  useEffect(() => {
    setActiveIndex(0);
    setSelectedRecipe(null);
  }, [category, query]);

  // scroll ke detail ketika memilih resep
  useEffect(() => {
    if (selectedRecipe && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedRecipe]);

  const labelMap: Record<Recipe["category"], string> = {
    "kanzler-sosis": "Kanzler Sosis",
    "kanzler-nugget": "Kanzler Nugget",
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (r) =>
        r.category === category &&
        (!q ||
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q))
    );
  }, [items, category, query]);

  const total = filtered.length;
  const VISIBLE = 3;

  const visibleItems = useMemo(() => {
    if (!total) return [];
    if (total <= VISIBLE) return filtered.slice(0, total); // ≤3: tampil apa adanya
    // >3: tampil 3 dan bisa carousel
    return Array.from(
      { length: VISIBLE },
      (_, k) => filtered[(activeIndex + k) % total]
    );
  }, [filtered, activeIndex, total]);

  const next = () => {
    if (total > VISIBLE) setActiveIndex((i) => (i + 1) % total);
  };
  const prev = () => {
    if (total > VISIBLE) setActiveIndex((i) => (i - 1 + total) % total);
  };

  if (loading) {
    return (
      <section className="py-20 text-center">
        <p className="text-gray-500">Loading recipes…</p>
      </section>
    );
  }
  if (!total) {
    return (
      <section className="py-20 text-center">
        <p className="text-gray-500">Resep tidak ditemukan.</p>
      </section>
    );
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-center overflow-hidden">
      {/* ===================== HERO / CAROUSEL ===================== */}
      <div className="w-full h-[620px] flex items-center justify-center relative">
        {/* BG split */}
        <div
          className="absolute inset-0 z-0 origin-top will-change-transform"
          style={{ transform: "translateY(-16%) scaleY(2) scaleX(1.1)" }}
        >
          <Image
            src={BG_SPLIT}
            alt="Background Split"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "42% top" }}
          />
        </div>

        {/* BG top & bottom */}
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

        {/* Crown */}
        <div className="absolute top-6 left-8 z-20">
          <Image
            src={CROWN}
            alt="Crown"
            width={44}
            height={44}
            className="mb-3"
          />
          <div className="space-y-2 text-sm">
            <span className="block text-[#B89E5C]">Produk</span>
            <span className="inline-block bg-[#B89E5C] text-white px-4 py-1 rounded-full">
              Resep
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-20 grid grid-cols-1 xl:grid-cols-[1.35fr_2.1fr] w-full max-w-7xl px-6 sm:px-8 gap-8">
          {/* Left: Title + Filter */}
          <div className="flex flex-col justify-center text-left">
            <h2 className="font-['DM_Serif_Display',serif] text-[#1D2A57] text-5xl sm:text-6xl lg:text-7xl leading-none">
              Inspirasi <span className="block font-extrabold">Resep</span>
            </h2>

            <div className="mt-8 flex items-center gap-3">
              <span className="rounded-full bg-[#B89E5C] text-white text-sm px-4 py-2">
                Kategori
              </span>

              <div className="relative">
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as Recipe["category"])
                  }
                  className="appearance-none rounded-full border border-gray-200 bg-white/90 pl-4 pr-10 py-2 text-sm shadow-sm focus:outline-none"
                >
                  <option value="kanzler-sosis">
                    {labelMap["kanzler-sosis"]}
                  </option>
                  <option value="kanzler-nugget">
                    {labelMap["kanzler-nugget"]}
                  </option>
                </select>
                <span className="pointer-events-none absolute right-3 top-2.5 text-gray-500">
                  ▾
                </span>
              </div>
            </div>
          </div>

          {/* Right: Recipe Cards */}
          <div className="flex flex-col justify-center">
            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                <AnimatePresence initial={false} mode="popLayout">
                  {visibleItems.map((r, i) => {
                    const isActive = selectedRecipe?.id === r.id;
                    return (
                      <motion.div
                        key={`${r.id}-${i}`}
                        layout
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.98 }}
                        transition={{ duration: 0.35 }}
                        onClick={() => setSelectedRecipe(r)}
                        className={`relative aspect-[9/16] rounded-[28px] overflow-hidden 
                          border-2 border-[#B89E5C] 
                          shadow-[0_25px_60px_rgba(18,38,63,.25)] bg-white cursor-pointer 
                          ${isActive ? "ring-4 ring-[#B89E5C]" : ""}`}
                      >
                        <Image
                          src={r.image}
                          alt={r.title}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1280px) 28vw, 33vw"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/55 via-black/20 to-transparent text-white">
                          <h4 className="font-semibold text-lg drop-shadow line-clamp-2">
                            {r.title}
                          </h4>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Controls (muncul hanya jika total > 3) */}
              {total > VISIBLE && (
                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={prev}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#B89E5C] text-white hover:opacity-90"
                    aria-label="Sebelumnya"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    onClick={next}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#B89E5C] text-white ring-2 ring-white/70"
                    aria-label="Berikutnya"
                  >
                    <ChevronRight />
                  </button>
                  <span className="text-sm text-[#435068]">
                    {(activeIndex % total) + 1} / {total}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===================== DETAIL SECTION ===================== */}
      {selectedRecipe && (
        <div ref={detailRef} className="w-full max-w-5xl mt-12 px-6">
          <div
            className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-start
             rounded-3xl bg-white shadow-xl p-8
             border-2 border-[#B89E5C]"
          >
            {/* Video / Image */}
            <div className="relative w-full h-[340px] md:h-[380px] rounded-2xl overflow-hidden">
              {(() => {
                const vUrl = selectedRecipe.video;
                const isVid = isVideoUrlOrMime(vUrl, undefined);
                if (vUrl && isVid) {
                  return (
                    <video
                      controls
                      className="w-full h-full object-cover"
                      src={vUrl}
                    />
                  );
                }
                const mediaUrl = vUrl && !isVid ? vUrl : selectedRecipe.image;
                return (
                  <Image
                    src={mediaUrl}
                    alt={selectedRecipe.title}
                    fill
                    className="object-cover"
                  />
                );
              })()}
            </div>

            {/* Text Detail */}
            <div>
              <h3 className="text-3xl font-['DM_Serif_Display'] text-[#1D2A57] mb-2">
                {selectedRecipe.title}
              </h3>
              <p className="text-[#435068] mb-4">
                {selectedRecipe.description}
              </p>

              {selectedRecipe.ingredient && (
                <div>
                  <h4 className="text-lg font-semibold text-[#B89E5C] mb-2">
                    Bahan:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-[#435068] text-sm leading-relaxed">
                    {splitIngredients(selectedRecipe.ingredient).map(
                      (line, idx) => (
                        <li key={idx}>{line}</li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

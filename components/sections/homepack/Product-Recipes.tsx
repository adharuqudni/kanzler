"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProductsView, { Product, Category as PCategory } from "./Product";
import RecipesView, { Recipe, Category as RCategory } from "./Recipes";

/* =========================
   Config & Assets
   ========================= */
const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;
const PRODUCTS_API = `${STRAPI}/api/products?populate=Image`;
const IMG_API = `${STRAPI}/api/recipes?populate=Image`;
const VID_API = `${STRAPI}/api/recipes?populate=Video`;

const BG_TOP =
  "/assets/ASSET - HOMEPACK/4 ASSET - HOMEPACK/4 ASSET - HOMEPACK BACKGROUND ATAS.png";
const BG_BOTTOM =
  "/assets/ASSET - HOMEPACK/4 ASSET - HOMEPACK/4 ASSET - HOMEPACK BACKGROUND BAWAH.png";

const BG_SPLIT_PRODUCT =
  "/assets/ASSET - HOMEPACK/4 ASSET - HOMEPACK/4 ASSET - HOMEPACK SPLIT BACKGROUND.png";
const BG_SPLIT_RECIPE =
  "/assets/ASSET - HOMEPACK/5 ASSET - HOMEPACK/5 ASSET - HOMEPACK BACKGROUND.png";

const CROWN =
  "/assets/ASSET - HOMEPACK/4 ASSET - HOMEPACK/4 ASSET - HOMEPACK MAHKOTA.png";

/* =========================
   Helpers (hanya untuk mapping fetch)
   ========================= */
type MaybeArray<T> = T | T[];

type StrapiMediaFormats = {
  large?: { url: string };
  medium?: { url: string };
  small?: { url: string };
  thumbnail?: { url: string };
};
type StrapiMedia = { url: string; formats?: StrapiMediaFormats; mime?: string };

type StrapiProduct = {
  id: number;
  Name: string;
  Description: string;
  Category: string;
  Product: string;
  Image?: StrapiMedia[];
};

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
type StrapiRecipeWithImage = StrapiRecipeBase & { Image?: MaybeArray<StrapiMedia> };
type StrapiRecipeWithVideo = StrapiRecipeBase & { Video?: MaybeArray<StrapiMedia> };

function asArray<T>(v?: MaybeArray<T>): T[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}
function absoluteUrl(u?: string): string {
  if (!u) return "/fallback.png";
  return u.startsWith("http") ? u : `${STRAPI}${u}`;
}
function pickBestFormat(m: StrapiMedia): string {
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
function normalizeCategory(input?: string): PCategory & RCategory {
  const c = (input || "").toLowerCase();
  if (c.includes("nugget") || c.includes("nuget")) return "kanzler-nugget";
  return "kanzler-sosis";
}
function isVideoUrlOrMime(url?: string, mime?: string): boolean {
  if (mime?.startsWith?.("video/")) return true;
  if (!url) return false;
  return /\.(mp4|webm|ogg|m3u8)$/i.test(url);
}

/* =========================
   MAIN: Toggle Produk/Resep + Fetch data
   ========================= */
export default function FeaturedShowcase() {
  const [mode, setMode] = useState<"produk" | "resep">("produk");
  const [products, setProducts] = useState<Product[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [pRes, imgRes, vidRes] = await Promise.all([
          fetch(PRODUCTS_API),
          fetch(IMG_API),
          fetch(VID_API),
        ]);

        // PRODUCTS
        const pJson = await pRes.json();
        const pArr: StrapiProduct[] = Array.isArray(pJson?.data) ? pJson.data : [];
        const mappedProducts: Product[] = pArr
          .map((p) => ({
            id: p.id,
            name: p.Name,
            description: p.Description,
            category: normalizeCategory(p.Category),
            product: p.Product,
            image: getFirstMediaUrl(p.Image),
          }))
          .filter((p) => p.category === "kanzler-sosis" || p.category === "kanzler-nugget");

        // RECIPES (merge image + video)
        const imgJson = await imgRes.json();
        const vidJson = await vidRes.json();

        const imgArr: StrapiRecipeWithImage[] = Array.isArray(imgJson?.data) ? imgJson.data : [];
        const vidArr: StrapiRecipeWithVideo[] = Array.isArray(vidJson?.data) ? vidJson.data : [];

        const videoMap = new Map<string, string>(); // key = docId|id
        for (const r of vidArr) {
          const docKey = r.documentId || String(r.id);
          const first = asArray(r.Video)[0];
          const vUrl = first ? pickBestFormat(first) : "";
          if (vUrl) videoMap.set(docKey, vUrl);
        }

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
            video: vCandidate,
          };
        });

        for (const r of vidArr) {
          const docKey = r.documentId || String(r.id);
          const already = merged.find((x) => (x.docId || String(x.id)) === docKey);
          if (!already) {
            const first = asArray(r.Video)[0];
            const mediaUrl = first ? pickBestFormat(first) : "/fallback.png";
            const title = (r.Title || r.Name || "").toString();
            const description = (r.Description || "").toString();
            const cat = normalizeCategory(r.Category);
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

        setProducts(mappedProducts);
        setRecipes(merged);
      } catch (e) {
        console.error("Fetch showcase failed", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const isProduk = mode === "produk";

  return (
    <div className="relative w-full flex flex-col items-center justify-center overflow-hidden">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 z-0 origin-top will-change-transform"
        style={{
          transform: isProduk
            ? "translateY(-16%) scaleY(2) scaleX(1.12)"
            : "translateY(-16%) scaleY(2) scaleX(1.1)",
        }}
      >
        <Image
          src={isProduk ? BG_SPLIT_PRODUCT : BG_SPLIT_RECIPE}
          alt="Background Split"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: isProduk ? "40% top" : "42% top" }}
        />
      </div>

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

      {/* NAV (TOP-LEFT) */}
      <div className="absolute top-6 left-8 z-20">
        <Image src={CROWN} alt="Crown" width={44} height={44} className="mb-3" />
        <div className="space-y-2 text-sm">
          <button
            onClick={() => setMode("produk")}
            aria-pressed={isProduk}
            className={`px-4 py-1 rounded-full transition ${
              isProduk ? "bg-[#B89E5C] text-white" : "text-[#B89E5C] hover:text-[#8c773f]"
            }`}
          >
            Produk
          </button>
          <br />
          <button
            onClick={() => setMode("resep")}
            aria-pressed={!isProduk}
            className={`px-4 py-1 rounded-full transition ${
              !isProduk ? "bg-[#B89E5C] text-white" : "text-[#B89E5C] hover:text-[#8c773f]"
            }`}
          >
            Resep
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div
        className={
          isProduk
            ? "w-full h-[560px] flex items-center justify-center relative"
            : "w-full min-h-[620px] relative flex flex-col items-center justify-start"
        }
      >
        {loading ? (
          <section className="py-20 text-center">
            <p className="text-gray-500">Loading…</p>
          </section>
        ) : isProduk ? (
          <ProductsView items={products} onGoToRecipes={() => setMode("resep")} />
        ) : (
          <RecipesView items={recipes} />
        )}
      </div>
    </div>
  );
}

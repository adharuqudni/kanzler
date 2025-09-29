"use client";

import HomepackHeroSection from "@/components/sections/HomepackHeroSection";
import HomepackProductsSection from "@/components/sections/HomepackProductsSection";
import WhyKanzler from "@/components/sections/WhyKanzler";
import ProductCarouselSectionHomepack from "@/components/sections/ProductCarouselSectionHomepack";
import React from "react";
import RecipeInspirationSection from '@/components/sections/RecipeInspirationSection';

export default function HomepackPage() {
  return (
    <>
      <HomepackHeroSection />
      <HomepackProductsSection />
      <WhyKanzler />
      <section id="produk">
        <ProductCarouselSectionHomepack
          // productData={homepackProductData}
          title="Homepack Products"
          defaultCategory="nugget"
        />
      </section>
      <section id="resep">
        <RecipeInspirationSection />
      </section>
    </>
  );
}

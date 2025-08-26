"use client";

import React from "react";
import HeroSection from "@/components/sections/homepack/HeroSection";
import WhyKanzler from "@/components/sections/homepack/WhyKanzler";
import ProductRecipes from "@/components/sections/homepack/Product-Recipes";

export default function Homepack() {
  return (
    <>
      <main>
        <HeroSection />
        <WhyKanzler />
        <ProductRecipes />
      </main>
    </>
  );
}

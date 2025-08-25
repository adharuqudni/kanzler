"use client";

import React from "react";
import HeroSection from "@/components/sections/homepack/HeroSection";
import MainContent from "@/components/sections/homepack/MainContent";
import WhyKanzler from "@/components/sections/homepack/WhyKanzler";
import FeaturedProducts from "@/components/sections/homepack/featured-products";
import FeaturedRecipes from "@/components/sections/homepack/featured-recipes";

export default function Homepack() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      {/* Main content */}
      <main className="relative z-10 bg-white pt-16 md:pt-24">
        <MainContent />
        <WhyKanzler />

        <FeaturedProducts />
        <FeaturedRecipes />
      </main>
    </>
  );
}

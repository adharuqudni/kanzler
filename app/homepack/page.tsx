'use client';

import HomepackHeroSection from '@/components/sections/HomepackHeroSection';
import HomepackProductsSection from '@/components/sections/HomepackProductsSection';
import WhyKanzler from '@/components/sections/WhyKanzler';
import ProductCarouselSection from '@/components/sections/ProductCarouselSection';
import { homepackProductData } from '@/lib/homepack-products';
import React from 'react';
import RecipeInspirationSection from '@/components/sections/RecipeInspirationSection';
import { BreadcrumbStructuredData } from '@/components/seo/StructuredData';

export default function HomepackPage() {
  return (
    <>
      <BreadcrumbStructuredData 
        items={[
          { name: "Home", url: "/" },
          { name: "Homepack", url: "/homepack" }
        ]} 
      />
      <HomepackHeroSection />
      <HomepackProductsSection />
      <WhyKanzler />
      <section id="produk">
        <ProductCarouselSection
          productData={homepackProductData}
          title="Homepack Products"
          defaultCategory="nuggets"
        />
      </section>
      <section id="resep">
        <RecipeInspirationSection />
      </section>
    </>
  );
}

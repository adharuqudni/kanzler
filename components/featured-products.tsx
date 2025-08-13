'use client'

import React from 'react'
import ProductGrid, { type Product } from '@/components/sections/ProductGrid'

const products: Product[] = [
  {
    id: 1,
    name: "Premium Beef Sausage",
    price: 45000,
    image: "/placeholder.svg?height=600&width=480",
    category: "Sausages",
    isNew: false,
    isBestseller: true,
    description: "Premium quality beef sausage made with the finest ingredients"
  },
  {
    id: 2,
    name: "Cheese Bratwurst",
    price: 52000,
    image: "/placeholder.svg?height=600&width=480",
    category: "Sausages",
    isNew: true,
    isBestseller: false,
    description: "Delicious bratwurst with melted cheese filling"
  },
  {
    id: 3,
    name: "Chicken Cocktail Sausage",
    price: 38000,
    image: "/placeholder.svg?height=600&width=480",
    category: "Sausages",
    isNew: false,
    isBestseller: false,
    description: "Perfect bite-sized chicken sausages for any occasion"
  },
  {
    id: 4,
    name: "Smoked Beef Sausage",
    price: 48000,
    image: "/placeholder.svg?height=600&width=480",
    category: "Sausages",
    isNew: false,
    isBestseller: true,
    description: "Smoky flavored beef sausage with authentic taste"
  },
]

export default function FeaturedProducts() {
  return (
    <ProductGrid
      products={products}
      title="Featured Products"
      description="Discover our selection of premium sausages and meat products made with the finest ingredients."
      showViewAll={true}
      viewAllHref="/products"
    />
  )
}

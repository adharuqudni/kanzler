'use client'

import React from 'react'
import { CategoryGrid } from '@/components/sections/ProductGrid'

const categories = [
  {
    id: 1,
    name: "Breakfast",
    description: "Quick and easy breakfast ideas",
    image: "/placeholder.svg?height=600&width=400",
  },
  {
    id: 2,
    name: "Lunch",
    description: "Delicious lunch recipes",
    image: "/placeholder.svg?height=600&width=400",
  },
  {
    id: 3,
    name: "Dinner",
    description: "Hearty dinner meals",
    image: "/placeholder.svg?height=600&width=400",
  },
  {
    id: 4,
    name: "Snacks",
    description: "Perfect for any time of day",
    image: "/placeholder.svg?height=600&width=400",
  },
  {
    id: 5,
    name: "Party Food",
    description: "Impress your guests",
    image: "/placeholder.svg?height=600&width=400",
  },
]

export default function CategoryHighlights() {
  return (
    <CategoryGrid
      categories={categories}
      title="Meal Ideas"
      description="Explore delicious meal ideas for any time of day featuring Kanzler premium sausages."
    />
  )
}

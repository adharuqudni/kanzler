'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import MotionWrapper, { StaggerContainer } from '@/components/animations/MotionWrapper'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { InteractiveCard } from '@/components/animations/InteractiveButton'
import { formatPrice, getImageUrl } from '@/lib/utils'

export interface Product {
  id: number
  name: string
  price: number
  image?: string
  category: string
  isNew?: boolean
  isBestseller?: boolean
  description?: string
}

interface ProductGridProps {
  products: Product[]
  title?: string
  description?: string
  showViewAll?: boolean
  viewAllHref?: string
  className?: string
}

export default function ProductGrid({
  products,
  title = "Featured Products",
  description = "Discover our selection of premium sausages and meat products made with the finest ingredients.",
  showViewAll = true,
  viewAllHref = "/products",
  className = ''
}: ProductGridProps) {
  return (
    <ScrollReveal className={`py-20 ${className}`}>
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <MotionWrapper variant="fadeInLeft">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading mb-4">{title}</h2>
              <p className="text-muted-foreground max-w-md">{description}</p>
            </div>
          </MotionWrapper>
          
          {showViewAll && (
            <MotionWrapper variant="fadeInRight" delay={0.2}>
              <Link 
                href={viewAllHref}
                className="mt-4 md:mt-0 inline-flex items-center text-kanzler-dark hover:text-kanzler-gold transition-colors hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md"
              >
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </MotionWrapper>
          )}
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </StaggerContainer>
      </div>
    </ScrollReveal>
  )
}

interface ProductCardProps {
  product: Product
  index: number
}

function ProductCard({ product, index }: ProductCardProps) {
  return (
    <MotionWrapper variant="fadeInUp" delay={index * 0.1}>
      <InteractiveCard hoverEffect="lift" className="group">
        <Link href={`/products/${product.id}`}>
          <Card className="border-0 overflow-hidden transition-all duration-300">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={getImageUrl(product.image)}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              
              {/* Product badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-kanzler-gold text-kanzler-dark">
                    New
                  </Badge>
                )}
                {product.isBestseller && (
                  <Badge variant="outline" className="bg-white">
                    Bestseller
                  </Badge>
                )}
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <CardContent className="pt-4">
              <div className="text-sm text-muted-foreground mb-1">
                {product.category}
              </div>
              <h3 className="font-medium text-lg mb-1 line-clamp-2">
                {product.name}
              </h3>
              {product.description && (
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {product.description}
                </p>
              )}
              <div className="font-medium text-kanzler-gold">
                {formatPrice(product.price)}
              </div>
            </CardContent>
          </Card>
        </Link>
      </InteractiveCard>
    </MotionWrapper>
  )
}

// Specialized grid for category highlights
export function CategoryGrid({ 
  categories,
  title = "Meal Ideas",
  description = "Explore delicious meal ideas for any time of day featuring Kanzler premium sausages.",
  className = ''
}: {
  categories: Array<{
    id: number
    name: string
    description: string
    image: string
  }>
  title?: string
  description?: string
  className?: string
}) {
  return (
    <ScrollReveal className={`py-20 bg-kanzler-light ${className}`}>
      <div className="container">
        <MotionWrapper variant="fadeInUp" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </MotionWrapper>

        <StaggerContainer>
          <div className="flex overflow-x-auto space-x-6 pb-6">
            {categories.map((category, index) => (
              <MotionWrapper 
                key={category.id} 
                variant="fadeInUp" 
                delay={index * 0.1}
                className="w-[280px] flex-shrink-0"
              >
                <InteractiveCard hoverEffect="scale">
                  <Link href={`/recipes/${category.id}`}>
                    <Card className="overflow-hidden transition-all duration-300">
                      <div className="relative h-[320px] overflow-hidden">
                        <Image
                          src={getImageUrl(category.image)}
                          alt={category.name}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                          sizes="280px"
                        />
                      </div>
                      <CardContent className="p-6 text-center">
                        <h3 className="text-xl font-medium mb-1">{category.name}</h3>
                        <p className="text-muted-foreground text-sm text-center">
                          {category.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </InteractiveCard>
              </MotionWrapper>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </ScrollReveal>
  )
}

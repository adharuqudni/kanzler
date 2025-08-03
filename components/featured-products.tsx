"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ScrollSection from "./scroll-section"

const products = [
  {
    id: 1,
    name: "Premium Beef Sausage",
    price: "Rp 45.000",
    image: "/placeholder.svg?height=600&width=480",
    category: "Sausages",
    isNew: false,
    isBestseller: true,
  },
  {
    id: 2,
    name: "Cheese Bratwurst",
    price: "Rp 52.000",
    image: "/placeholder.svg?height=600&width=480",
    category: "Sausages",
    isNew: true,
    isBestseller: false,
  },
  {
    id: 3,
    name: "Chicken Cocktail Sausage",
    price: "Rp 38.000",
    image: "/placeholder.svg?height=600&width=480",
    category: "Sausages",
    isNew: false,
    isBestseller: false,
  },
  {
    id: 4,
    name: "Smoked Beef Sausage",
    price: "Rp 48.000",
    image: "/placeholder.svg?height=600&width=480",
    category: "Sausages",
    isNew: false,
    isBestseller: true,
  },
]

export default function FeaturedProducts() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [0, 1, 1])
  const y = useTransform(scrollYProgress, [0, 0.3], [100, 0])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  }

  return (
    <ScrollSection index={0}>
      <section className="py-20" ref={ref}>
        <div className="container">
          <motion.div
            style={{ opacity, y }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-heading mb-4">Featured Products</h2>
              <p className="text-muted-foreground max-w-md">
                Discover our selection of premium sausages and meat products made with the finest ingredients.
              </p>
            </div>
            <Button variant="ghost" className="mt-4 md:mt-0 text-kanzler-dark hover:text-kanzler-gold">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {products.map((product, i) => (
              <motion.div key={product.id} custom={i} variants={itemVariants} className="group">
                <Link href={`/products/${product.id}`}>
                  <Card className="border-0 overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.isNew && <Badge className="bg-kanzler-gold text-kanzler-dark">New</Badge>}
                        {product.isBestseller && (
                          <Badge variant="outline" className="bg-white">
                            Bestseller
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
                      <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                      <div className="font-medium">{product.price}</div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </ScrollSection>
  )
}

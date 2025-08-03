"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Clock, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const recipes = [
  {
    id: 1,
    title: "Sausage Pasta Bake",
    description: "A hearty pasta dish with Kanzler sausages, cheese, and tomato sauce",
    image: "/placeholder.svg?height=800&width=600",
    prepTime: "30 min",
    servings: "4",
  },
  {
    id: 2,
    title: "Breakfast Sausage Wrap",
    description: "Quick and delicious breakfast wrap with scrambled eggs and sausage",
    image: "/placeholder.svg?height=800&width=600",
    prepTime: "15 min",
    servings: "2",
  },
  {
    id: 3,
    title: "Sausage Skewers",
    description: "Grilled sausage and vegetable skewers perfect for parties",
    image: "/placeholder.svg?height=800&width=600",
    prepTime: "25 min",
    servings: "6",
  },
]

export default function RecipeSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={ref} className="py-20 overflow-hidden">
      <div className="container">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading mb-4">Delicious Recipes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover creative and tasty ways to enjoy Kanzler products with these easy-to-follow recipes.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div style={{ y: y1 }} className="relative h-[600px] rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=1200&width=800" alt="Featured Recipe" fill className="object-cover" />
          </motion.div>

          <div className="space-y-6">
            <motion.div style={{ opacity }} className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-heading">Cook with Kanzler</h3>
              <p className="text-muted-foreground">
                Our premium sausages are versatile ingredients that can elevate any meal. From quick breakfasts to
                impressive dinner spreads, Kanzler products help you create delicious dishes with minimal effort.
              </p>
              <p className="text-muted-foreground">
                Each recipe has been carefully tested to ensure perfect results every time. Whether you're cooking for
                yourself or entertaining guests, these recipes will help you make the most of our products.
              </p>
              <Button className="mt-4 bg-kanzler-gold text-kanzler-dark hover:bg-kanzler-gold/90">
                Browse All Recipes <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Link href={`/recipes/${recipe.id}`}>
                  <Card className="overflow-hidden border-0 hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-medium mb-2">{recipe.title}</h3>
                      <p className="text-muted-foreground">{recipe.description}</p>
                    </CardContent>
                    <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        {recipe.prepTime}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="mr-1 h-4 w-4" />
                        {recipe.servings} servings
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

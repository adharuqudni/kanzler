"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"

import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import ScrollSection from "./scroll-section"

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
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <ScrollSection index={1}>
      <section className="py-20 bg-kanzler-light" ref={ref}>
        <div className="container">
          <motion.div className="text-center mb-12" style={{ opacity, y }}>
            <h2 className="text-3xl md:text-4xl font-heading mb-4">Meal Ideas</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore delicious meal ideas for any time of day featuring Kanzler premium sausages.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <ScrollArea className="w-full whitespace-nowrap pb-6">
              <div className="flex space-x-6">
                {categories.map((category) => (
                  <motion.div key={category.id} variants={itemVariants} className="w-[280px] flex-shrink-0">
                    <Link href={`/recipes/${category.id}`}>
                      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                        <div className="relative h-[320px] overflow-hidden">
                          <Image
                            src={category.image || "/placeholder.svg"}
                            alt={category.name}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-6 text-center">
                          <h3 className="text-xl font-medium mb-1">{category.name}</h3>
                          <p className="text-muted-foreground text-sm">{category.description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </motion.div>
        </div>
      </section>
    </ScrollSection>
  )
}

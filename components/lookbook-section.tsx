"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const lookbookItems = [
  {
    id: 1,
    title: "Urban Sophistication",
    description: "Modern silhouettes for the city gentleman",
    image: "/placeholder.svg?height=800&width=600",
  },
  {
    id: 2,
    title: "Weekend Retreat",
    description: "Casual elegance for your downtime",
    image: "/placeholder.svg?height=800&width=600",
  },
  {
    id: 3,
    title: "Evening Affairs",
    description: "Refined styles for special occasions",
    image: "/placeholder.svg?height=800&width=600",
  },
]

export default function LookbookSection() {
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
            <h2 className="text-3xl md:text-4xl font-heading mb-4">Seasonal Lookbook</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our latest collection through curated looks for every occasion.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div style={{ y: y1 }} className="relative h-[600px] rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=1200&width=800" alt="Lookbook Hero" fill className="object-cover" />
          </motion.div>

          <div className="space-y-6">
            <motion.div style={{ opacity }} className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-heading">The Art of Dressing Well</h3>
              <p className="text-muted-foreground">
                At Kanzler, we believe that style is a form of self-expression. Our collections are designed to help you
                tell your story through timeless pieces that blend traditional craftsmanship with contemporary design.
              </p>
              <p className="text-muted-foreground">
                Each season, we curate looks that reflect the modern gentleman's lifestyle—from boardroom meetings to
                weekend getaways and evening events.
              </p>
              <Button className="mt-4">
                View Full Lookbook <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lookbookItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Link href={`/lookbook/${item.id}`}>
                  <Card className="overflow-hidden border-0 hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
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

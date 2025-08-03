"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Kanzler Premium Sausages"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <div className="container relative z-10 h-full flex flex-col justify-center items-start text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-xl"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-4">
            Premium Quality Sausages
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-md">
            Discover the finest meat products crafted with premium ingredients for delicious meals every day.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              className="bg-gold-gradient bg-[length:200%_auto] animate-shine text-kanzler-dark hover:opacity-90 border-0"
            >
              Explore Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              View Recipes
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

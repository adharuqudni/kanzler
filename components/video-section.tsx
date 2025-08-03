"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function VideoSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/placeholder.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container relative z-10 h-full flex flex-col justify-center items-center text-white">
        <motion.div style={{ opacity, y }} className="text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">Quality in Every Bite</h2>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Experience the premium quality and exceptional taste that goes into every Kanzler product.
          </p>
          <Button size="lg" className="bg-kanzler-gold text-kanzler-dark hover:bg-kanzler-gold/90">
            Our Quality Promise <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import ScrollSection from "./scroll-section"

export default function OurStorySection() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  }

  return (
    <ScrollSection index={2}>
      <section className="py-20 relative overflow-hidden bg-white" ref={ref}>
        {/* Curved top shape */}
        <div
          className="absolute top-0 left-0 right-0 h-20 bg-kanzler-navy"
          style={{ borderRadius: "0 0 50% 50%/0 0 100% 100%", transform: "scaleX(1.5)" }}
        ></div>

        <div className="container pt-16 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center"
            style={{ opacity, y }}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="inline-block text-kanzler-navy text-5xl md:text-6xl font-heading mb-2">OUR</h2>
              <div className="inline-block relative">
                <h2 className="text-5xl md:text-6xl font-heading font-bold bg-gold-gradient bg-clip-text text-transparent bg-[length:200%_auto] animate-shine">
                  STORY
                </h2>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="max-w-4xl mx-auto text-center text-gray-600 text-lg leading-relaxed"
            >
              <p className="mb-6">
                Didirikan pada tahun 1999, Kanzler lahir dari keinginan untuk menghadirkan Sosis Jerman yang enak dan
                lezat ke Indonesia.
              </p>
              <p>
                Kanzler memiliki 2 kategori produk yaitu Kanzler Homepack untuk konsumsi rumah tangga (Ready to Cook)
                yang terdiri dari: Sosis Frankfurter, Sosis Cocktail, Chicken Nugget, dan lain-lain serta Kanzler
                Singles untuk camilan (Ready to Eat) yang terdiri dari: Sosis Original, Mini, Keju, dan Hot, serta Bakso
                Original, dan Bakso Keju.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {[1, 2, 3, 4].map((item) => (
                <motion.div
                  key={item}
                  variants={itemVariants}
                  className="relative aspect-square overflow-hidden rounded-lg"
                >
                  <Image
                    src={`/placeholder.svg?height=300&width=300`}
                    alt={`Kanzler Product ${item}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </ScrollSection>
  )
}

"use client";

import React from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ParallaxElement } from "@/components/animations/ScrollReveal";

/* -------------------------- HERO -------------------------- */
function Hero() {
  // biar tidak merah di useInView: jangan kunci generic type
  const heroRef = React.useRef<HTMLElement>(null);
  const inView = useInView(heroRef as React.RefObject<Element>, {
    amount: 0.5,
    margin: "0px 0px -20% 0px",
  });

  return (
    <section
      ref={heroRef}
      className="relative flex items-center justify-center min-h-screen bg-white overflow-visible"
    >
      {/* Background curve hanya di hero */}
      <Image
        src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK BACKGROUND.png"
        alt="Background curve"
        width={1920}
        height={1080}
        priority
        className="absolute z-10 bottom-0 left-1/2 -translate-x-1/2 w-[140%] h-auto pointer-events-none select-none"
      />

      {/* Crown kiri atas (statis) */}
      <div className="absolute top-6 left-6 w-10 h-10 z-40">
        <Image
          src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK MAHKOTA.png"
          alt="Kanzler crown small"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>

      {/* Logo utama */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 30,
          willChange: "transform",
        }}
      >
        <Image
          src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK LOGO.png"
          alt="KANZLER Logo"
          width={900}
          height={900}
          priority
          className="object-contain drop-shadow-lg"
        />
      </motion.div>

      {/* Nugget kanan atas */}
      <ParallaxElement
        speed={0.3}
        className="absolute right-[15%] top-[10%] z-30"
      >
        <motion.div
          initial={{ opacity: 0, x: 300, y: -300 }}
          animate={
            inView
              ? { opacity: 1, x: 0, y: 0 }
              : { opacity: 0, x: 300, y: -300 }
          }
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          style={{ transform: "rotate(-8deg)", willChange: "transform" }}
        >
          <motion.div
            animate={inView ? { y: [0, -15, 0] } : { y: 0 }}
            transition={
              inView
                ? { duration: 3, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.3 }
            }
          >
            <Image
              src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK NUGGET KANAN ATAS.png"
              alt="nugget top right"
              width={220}
              height={220}
              className="drop-shadow-xl"
            />
          </motion.div>
        </motion.div>
      </ParallaxElement>

      {/* Nugget kiri atas */}
      <ParallaxElement
        speed={0.3}
        className="absolute left-[15%] top-[10%] z-30"
      >
        <motion.div
          initial={{ opacity: 0, x: -300, y: -300 }}
          animate={
            inView
              ? { opacity: 1, x: 0, y: 0 }
              : { opacity: 0, x: -300, y: -300 }
          }
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          style={{ transform: "rotate(8deg)", willChange: "transform" }}
        >
          <motion.div
            animate={inView ? { y: [0, 15, 0] } : { y: 0 }}
            transition={
              inView
                ? { duration: 3, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.3 }
            }
          >
            <Image
              src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK NUGGET KIRI ATAS.png"
              alt="nugget top left"
              width={220}
              height={220}
              className="drop-shadow-xl"
            />
          </motion.div>
        </motion.div>
      </ParallaxElement>

      {/* Nugget kiri bawah */}
      <ParallaxElement
        speed={0.4}
        className="absolute left-[18%] bottom-[18%] z-40"
      >
        <motion.div
          initial={{ opacity: 0, x: -150, y: 300, rotate: 45 }}
          animate={
            inView
              ? { opacity: 1, x: 0, y: 0, rotate: 45 }
              : { opacity: 0, x: -150, y: 300, rotate: 45 }
          }
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          style={{ willChange: "transform" }}
        >
          <Image
            src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK NUGGET PACKAGING.png"
            alt="nugget bottom left"
            width={220}
            height={220}
            className="drop-shadow-2xl"
          />
        </motion.div>
      </ParallaxElement>

      {/* Pack kiri bawah – overlap mulus */}
      <ParallaxElement
        speed={0.4}
        className="absolute left-[6%] bottom-0 z-[60] pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, x: -150, y: 400, rotate: 45 }}
          animate={
            inView
              ? { opacity: 1, x: 0, y: 210, rotate: 45 }
              : { opacity: 0, x: -150, y: 400, rotate: 45 }
          }
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          style={{ willChange: "transform" }}
        >
          <Image
            src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK CRISPY NUGGET MOCKUP.png"
            alt="package left"
            width={380}
            height={380}
            className="drop-shadow-2xl"
          />
        </motion.div>
      </ParallaxElement>

      {/* Pack kanan bawah */}
      <ParallaxElement
        speed={0.4}
        className="absolute right-[6%] bottom-0 z-[60] pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, x: 150, y: 400, rotate: -45 }}
          animate={
            inView
              ? { opacity: 1, x: 0, y: 210, rotate: -45 }
              : { opacity: 0, x: 150, y: 400, rotate: -45 }
          }
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          style={{ willChange: "transform" }}
        >
          <Image
            src="/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK BEEF COCKTAIL MOCKUP.png"
            alt="package right"
            width={350}
            height={350}
            className="drop-shadow-2xl"
          />
        </motion.div>
      </ParallaxElement>
    </section>
  );
}

/* -------------------------- WHY KANZLER (UKURAN SAMA & LEBIH RAPAT) -------------------------- */
function AboutUs() {
  return (
    <section className="relative bg-white">
      {/* Lengkungan transition dari biru ke putih */}
      <div
        className="absolute top-0 left-0 right-0 h-32 bg-white z-0"
        style={{
          borderRadius: "100px 100px 0 0",
          marginTop: "-2rem",
          transform: "scaleX(1.5)",
        }}
      />

      <div className="container mx-auto pt-32 pb-24 relative z-10 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/assets/ASSET - HOMEPACK/2 ASSET - HOMEPACK/2 ASSET - HOMEPACK LOGO.png"
            alt="KANZLER Logo"
            width={350}
            height={150}
            className="object-contain"
          />
        </div>

        {/* Deskripsi */}
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Produk nugget dan sosis dari daging sapi dan ayam pilihan. <br />
          <span className="italic font-medium text-kanzler-navy">
            Extra Meaty, Extra Juicy
          </span>
          , dan mudah diolah menjadi menu lezat setiap hari.
        </p>

        {/* MOBILE: stack */}
        <div className="mt-10 md:hidden flex flex-col items-center gap-6">
          <Image
            src="/assets/ASSET - HOMEPACK/2 ASSET - HOMEPACK/2 ASSET - HOMEPACK STICK NUGGET MOCKUP.png"
            alt="Crispy Nugget Stick"
            width={320}
            height={380}
            className="object-contain drop-shadow-xl"
          />
          <Image
            src="/assets/ASSET - HOMEPACK/2 ASSET - HOMEPACK/2 ASSET - HOMEPACK CRISPY NUGGET MOCKUP.png"
            alt="Crispy Chicken Nugget"
            width={320}
            height={380}
            className="object-contain drop-shadow-xl"
          />
          <Image
            src="/assets/ASSET - HOMEPACK/2 ASSET - HOMEPACK/2 ASSET - HOMEPACK BEEF COCKTAIL MOCKUP.png"
            alt="Beef Cocktail Sausage"
            width={320}
            height={380}
            className="object-contain drop-shadow-xl"
          />
        </div>

        {/* DESKTOP: overlap rapi, ukuran sama */}
        <div
          className="hidden md:block"
          style={{
            position: "relative",
            height: 480,
            maxWidth: 1200,
            margin: "3rem auto 0",
          }}
        >
          {/* Left */}
          <div
            style={{ position: "absolute", bottom: 0, left: "14%", zIndex: 10 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -60, y: 20, rotate: -8 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: -8 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ willChange: "transform" }}
            >
              <Image
                src="/assets/ASSET - HOMEPACK/2 ASSET - HOMEPACK/2 ASSET - HOMEPACK STICK NUGGET MOCKUP.png"
                alt="Crispy Nugget Stick"
                width={360}
                height={420}
                className="object-contain drop-shadow-xl"
              />
            </motion.div>
          </div>

          {/* Right (di belakang center) */}
          <div
            style={{ position: "absolute", bottom: 0, right: "14%", zIndex: 8 }}
          >
            <motion.div
              initial={{ opacity: 0, x: 60, y: 20, rotate: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 10 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              style={{ willChange: "transform" }}
            >
              <Image
                src="/assets/ASSET - HOMEPACK/2 ASSET - HOMEPACK/2 ASSET - HOMEPACK BEEF COCKTAIL MOCKUP.png"
                alt="Beef Cocktail Sausage"
                width={290}
                height={290}
                className="object-contain drop-shadow-xl"
              />
            </motion.div>
          </div>

          {/* Center (paling depan) */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 20,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              style={{ willChange: "transform" }}
            >
              <Image
                src="/assets/ASSET - HOMEPACK/2 ASSET - HOMEPACK/2 ASSET - HOMEPACK CRISPY NUGGET MOCKUP.png"
                alt="Crispy Chicken Nugget"
                width={400}
                height={400}
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>

          {/* Shadow lembut di bawah */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: -8,
              width: "60%",
              height: 22,
              borderRadius: 9999,
              background: "rgba(0,0,0,0.10)",
              filter: "blur(16px)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* -------------------------- EXPORT -------------------------- */
export default function MainContent() {
  return (
    <>
      <Hero />
      <AboutUs />
    </>
  );
}

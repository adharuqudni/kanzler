"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMousePosition } from "@/hooks/use-mouse-position";

export default function Home() {
  const mousePosition = useMousePosition();
  const [leftSideWidth, setLeftSideWidth] = useState(50);
  const [leftSideIndex, setLeftSideIndex] = useState(5);
  const [isHoveringLeft, setIsHoveringLeft] = useState(false);
  const [isHoveringRight, setIsHoveringRight] = useState(false);

  useEffect(() => {
    console.log(mousePosition);
    const windowWidth = window.innerWidth;

    if (
      (mousePosition.y && mousePosition.y < 100) ||
      (mousePosition.x &&
        mousePosition.x < windowWidth / 2 + 20 &&
        mousePosition.x > windowWidth / 2 - 20) ||
      mousePosition.y == null ||
      mousePosition.x == null
    ) {
      // Reset to default when mouse is outside
      setIsHoveringLeft(false);
      setIsHoveringRight(false);
      setLeftSideWidth(50); // default

      return;
    }

    const mouseX = mousePosition.x || 0;
    console.log(mouseX, windowWidth);
    const isLeft = mouseX < windowWidth / 2 + 20;
    setIsHoveringLeft(isLeft);
    setIsHoveringRight(!isLeft);

    const targetWidth = isLeft ? 60 : 40;
    const targetIndex = isLeft ? 7 : 3;
    setLeftSideWidth(targetWidth);
    setLeftSideIndex(targetIndex);
  }, [mousePosition]);

  return (
    <main
      className={"h-screen overflow-hidden relative flex flex-col bg-[#1C2653]"}
    >
      {/* Left Side - Amber */}
      <motion.div
        className={
          "absolute top-0 bottom-0 left-0   bg-inherit bg-left flex items-center justify-center " +
          (isHoveringLeft
            ? "bg-[url('/assets/ASSET%20-%20HOME%2F2%20ASSET%20-%20HOME%2F2%20ASSET%20-%20HOME%20SPACE%20SPLIT%201.png')] "
            : " bg-[#1C2653]")
        }
        initial={{ width: "50%" }}
        animate={{
          width: `${(isHoveringRight ? 15 : 0) + leftSideWidth}%`,
          clipPath: isHoveringLeft
            ? "ellipse(100% 100% at 0% 50%)"
            : "ellipse(100% 80% at 0% 50%)",
          zIndex: leftSideIndex,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          velocity: 10,
        }}
      >
        <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
          {isHoveringLeft && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 1.8, x: 300, y: 145 }}
                animate={{
                  opacity: 1,
                  scale: 0.8,
                  x: 0,
                  y: -75,
                  zIndex: isHoveringLeft || isHoveringRight ? 5 : 10,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-white items-center justify-items-center  z-10 "
              >
                <Image
                  src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME MAIN LOGO.png"
                  alt="Kanzler packaging"
                  width={1600}
                  height={50}
                  className="object-contain  "
                  loading="lazy"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -250, scale: 0 }}
                animate={{
                  opacity: isHoveringLeft ? 1 : 0.7,
                  y: -250,
                  scale: 1,
                }}
                transition={{
                  delay: 0.8,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
                className="text-white text-center z-10"
              >
                {/* <Crown className="w-12 h-12 mx-auto mb-4" /> */}
                {/* <h2 className="text-4xl font-bold mb-4">Premium Quality</h2> */}
                <p className="max-w-md">
                  Kanzler has been delivering exceptional meat products since
                  1999, with a commitment to quality in every bite.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -250, scale: 0 }}
                animate={{
                  opacity: isHoveringLeft ? 1 : 0.7,
                  y: -250,
                  scale: 1,
                }}
                transition={{
                  delay: 1,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
                className="text-white text-center z-10"
              >
                <Button className="bg-white text-amber-600 hover:bg-amber-100">
                  Lihat Semua Produk
                </Button>
              </motion.div>
            </>
          )}
          <motion.div
            className="absolute top-44 -rotate-45 -left-24  z-10 "
            initial={{ x: -350, scaleX: -1, opacity: 0 }}
            animate={{
              rotate: 25,
              x: isHoveringLeft ? 50 : -350,
              opacity: isHoveringLeft ? 1 : 0,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src="/assets/ASSET - HOME/2 ASSET - HOME/2 ASSET - HOME BEEF.png"
              alt="Kanzler packaging"
              width={250}
              height={200}
              className="object-contain"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            className="absolute top-20  -right-4  z-10 "
            initial={{ x: -350, opacity: 0 }}
            animate={{
              rotate: -15,
              x: isHoveringLeft ? 0 : 450,
              opacity: isHoveringLeft ? 1 : 0,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src="/assets/ASSET - HOME/2 ASSET - HOME/2 ASSET - HOME NUGGET.png"
              alt="Kanzler packaging"
              width={250}
              height={200}
              className="object-contain"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            className="absolute -bottom-64 -rotate-45 left-96 w-1/2 max-w-md z-20"
            initial={{ opacity: 1, rotate: -15, y: 0 }}
            animate={{
              y: isHoveringLeft ? 70 : 0,
              x: isHoveringLeft ? -450 : 0,
              rotate: isHoveringLeft ? 15 : -15,
              scale: isHoveringLeft ? 0.8 : 1,
              display: isHoveringLeft ? "block" : " none",
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME BEEF COCKTAIL.png"
              alt="Kanzler packaging"
              width={400}
              height={300}
              className="object-contain"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            className="absolute -bottom-64 -rotate-45 left-96 w-1/2 max-w-md z-20"
            initial={{ opacity: 1, rotate: -10, y: 0, x: 0 }}
            animate={{
              y: isHoveringLeft ? 50 : -150,
              x: isHoveringLeft ? 75 : 50,
              scale: isHoveringLeft ? 0.8 : 1,
              rotate: isHoveringLeft ? -5 : -15,
              display: isHoveringLeft ? "block" : " none",
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME CRISPY NUGGET.png"
              alt="Kanzler packaging"
              width={1000}
              height={300}
              className="object-contain"
              loading="lazy"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Navy */}
      <motion.div
        className={
          "absolute top-0 bottom-0 right-0 bg-inherit bg-right flex items-center justify-center " +
          (isHoveringRight
            ? "bg-[url('/assets/ASSET%20-%20HOME/3%20ASSET%20-%20HOME/3%20ASSET%20-%20HOME%20SPACE%20SPLIT%202.png')]"
            : "")
        }
        initial={{ width: "50%" }}
        animate={{
          width: `${(isHoveringLeft ? 115 : 100) - leftSideWidth}%`,
          clipPath: isHoveringRight
            ? "ellipse(100% 100% at 100% 50%)"
            : "ellipse(100% 80% at 100% 50%)",

          zIndex: 10 - leftSideIndex,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
          {isHoveringRight && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 1.8, x: -300, y: 145 }}
                animate={{
                  opacity: 1,
                  scale: 0.5,
                  x: 0,
                  y: -120,
                  zIndex: isHoveringLeft || isHoveringRight ? 5 : 10,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-white items-center justify-items-center  z-10 "
              >
                <Image
                  src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME MAIN LOGO.png"
                  alt="Kanzler packaging"
                  width={1600}
                  height={200}
                  className="object-contain "
                  loading="lazy"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -150, scale: 0 }}
                animate={{
                  opacity: isHoveringRight ? 1 : 0.7,
                  y: -150,
                  scale: 1,
                }}
                transition={{
                  delay: 0.8,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
                className="text-white text-center z-10"
              >
                <p className="mb-6 max-w-md">
                  Discover our range of premium sausages and meat products,
                  crafted with the finest ingredients.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -150, scale: 0 }}
                animate={{
                  opacity: isHoveringRight ? 1 : 0.7,
                  y: -150,
                  scale: 1,
                }}
                transition={{
                  delay: 1,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
                className="text-white text-center z-10"
              >
                <Button className="bg-white text-black hover:bg-blue-100">
                  Products
                </Button>
              </motion.div>
            </>
          )}

          <motion.div
            className="absolute -bottom-56 -rotate-45 -left-12   z-30"
            initial={{ opacity: 1, rotate: 15, x: -30 }}
            animate={{
              y: isHoveringRight ? -420 : 0,
              x: isHoveringRight ? -30 : 0,
              display: isHoveringRight ? "block" : " none",
            }}
            transition={{ duration: 0.6, ease: "easeIn" }}
          >
            <Image
              src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME BAKSO HOT.png"
              alt="Kanzler packaging"
              width={400}
              height={300}
              className="object-contain"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            className="absolute -bottom-60 -rotate-45 right-96   z-30"
            initial={{ opacity: 1, rotate: 35, y: 0 }}
            animate={{
              y: 0,
              x: isHoveringRight ? 500 : 0,
              rotate: isHoveringRight ? -15 : 35,
              display: isHoveringRight ? "block" : " none",
            }}
            transition={{ duration: 0.6, ease: "easeIn" }}
          >
            <Image
              src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME SOSIS GOCHU.png"
              alt="Kanzler packaging"
              width={400}
              height={300}
              className="object-contain"
              loading="lazy"
            />
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-black "
        initial={{ opacity: 0 }}
        animate={{ opacity: isHoveringRight || isHoveringLeft ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ zIndex: 6 }}
      />

      {/* Logo overlay */}
      <div className=" z-30">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-white "
        >
          <Crown className="w-12 h-12  mx-12 mt-4" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: 1,
          zIndex: isHoveringLeft || isHoveringRight ? 5 : 10,
        }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 20,
          velocity: 10,
        }}
        className="text-white items-center justify-items-center  z-10 -mt-12"
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME MAIN LOGO.png"
          alt="Kanzler packaging"
          width={1600}
          height={200}
          className="object-contain "
          loading="lazy"
        />
      </motion.div>

      <motion.div
        className="absolute -bottom-80 -rotate-45 left-96 w-1/2 max-w-md z-20"
        initial={{ opacity: 0, y: 350 }}
        animate={{
          opacity: 1,
          rotate: -15,
          y: 15,
          scale: 0.9,
          x: -80,
          zIndex: isHoveringRight ? 5 : 20,
        }}
        transition={{ duration: 1, ease: "easeIn", delay: 1 }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME BEEF COCKTAIL.png"
          alt="Kanzler packaging"
          width={800}
          height={200}
          className="object-contain"
          loading="lazy"
          style={{ display: !isHoveringLeft ? "block" : " none" }}
        />
      </motion.div>
      <motion.div
        className="absolute -bottom-80 -rotate-45 left-96 w-1/2 max-w-md z-20"
        initial={{ opacity: 0, y: 350 }}
        animate={{
          opacity: 1,
          rotate: -10,
          y: -150,
          scale: 0.9,
          zIndex: isHoveringRight ? 5 : 20,
        }}
        transition={{ duration: 1, ease: "easeIn", delay: 1 }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME CRISPY NUGGET.png"
          alt="Kanzler packaging"
          width={1000}
          height={200}
          className="object-contain"
          loading="lazy"
          style={{ display: !isHoveringLeft ? "block" : " none" }}
        />
      </motion.div>
      <motion.div
        className="absolute -bottom-56 -rotate-45 left-[40%]   z-30"
        initial={{ opacity: 0, y: 350 }}
        animate={{
          opacity: 1,
          rotate: 20,
          y: 0,
          zIndex: isHoveringLeft ? 5 : 20,
        }}
        transition={{ duration: 1, ease: "easeIn", delay: 0.9 }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME BAKSO HOT.png"
          alt="Kanzler packaging"
          width={350}
          height={300}
          className="object-contain"
          loading="lazy"
          style={{ display: !isHoveringRight ? "block" : " none" }}
        />
      </motion.div>
      <motion.div
        className="absolute -bottom-60 -rotate-45 right-[36rem]   z-30"
        initial={{ opacity: 0, y: 350 }}
        animate={{
          opacity: 1,
          rotate: 35,
          y: 0,
          zIndex: isHoveringLeft ? 5 : 20,
        }}
        transition={{ duration: 1, ease: "easeIn", delay: 0.8 }}
      >
        <Image
          src="/assets/ASSET - HOME/1 ASSET - HOME/1 ASSET - HOME SOSIS GOCHU.png"
          alt="Kanzler packaging"
          width={350}
          height={300}
          className="object-contain"
          loading="lazy"
          style={{ display: !isHoveringRight ? "block" : " none" }}
        />
      </motion.div>
    </main>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

export default function MobileHomepackProductsSection() {
  return (
    <section className="relative bg-white">
      {/* Curved transition from blue to white */}
      <svg
        height="80"
        viewBox="0 0 500 80"
        preserveAspectRatio="none"
        className="w-full"
      >
        <path
          d="M 0 80 Q 250 20 500 80 L 500 0 L 0 0 Z"
          fill="#1c2652"
          fillRule="evenodd"
        />
      </svg>

      <div className="container mx-auto pb-8 px-12 relative z-10 mt-14 text-center">
        {/* Logo */}
        <motion.div
          className="flex justify-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/assets/ASSET - HOMEPACK/2 ASSET - HOMEPACK/2 ASSET - HOMEPACK LOGO.png"
            alt="KANZLER Logo"
            width={280}
            height={120}
            className="object-contain w-96 "
          />
        </motion.div>

        {/* Description */}
        <motion.p
          className={`text-sm sm:text-base text-gray-700 mx-auto leading-relaxed text-center max-w-md mt-4 mb-8 ${poppins.className}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Produk nugget dan sosis dari daging sapi dan ayam pilihan. Extra
          Meaty, Extra Juicy, dan mudah diolah menjadi menu lezat setiap hari
        </motion.p>

        {/* Product Images - Stack layout for mobile */}
        <motion.div
          className="relative mt-6 flex flex-col items-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Crispy Chicken Nugget */}
          <motion.div
            className="absolute  top-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0, rotate: 5, scale: 1.1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Image
              src="/assets/ASSET - HOMEPACK/2 ASSET - HOMEPACK/2 ASSET - HOMEPACK CRISPY NUGGET MOCKUP.png"
              alt="Crispy Chicken Nugget"
              width={240}
              height={280}
              className="object-contain drop-shadow-xl w-48 sm:w-56"
            />
          </motion.div>

          {/* Crispy Nugget Stick */}
          <motion.div
            className="absolute left-0 top-36"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0, rotate: -10, scale: 1.1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Image
              src="/assets/ASSET - HOMEPACK/2 ASSET - HOMEPACK/2 ASSET - HOMEPACK STICK NUGGET MOCKUP.png"
              alt="Crispy Nugget Stick"
              width={240}
              height={280}
              className="object-contain drop-shadow-xl w-48 sm:w-56"
            />
          </motion.div>

          {/* Beef Cocktail Sausage */}
          <motion.div
            className="absolute right-0 top-32"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0, rotate: 10, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Image
              src="/assets/ASSET - HOMEPACK/2 ASSET - HOMEPACK/2 ASSET - HOMEPACK BEEF COCKTAIL MOCKUP.png"
              alt="Beef Cocktail Sausage"
              width={240}
              height={280}
              className="object-contain drop-shadow-xl w-48 sm:w-56"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

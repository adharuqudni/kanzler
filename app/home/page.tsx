'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

import ScrollNavbar from '@/components/scroll-navbar';
import FeaturedProducts from '@/components/featured-products';
import CategoryHighlights from '@/components/category-highlights';
import OurStorySection from '@/components/our-story-section';
import VideoSection from '@/components/video-section';
import RecipeSection from '@/components/recipe-section';
import StoreLocator from '@/components/store-locator';
import ContactForm from '@/components/contact-form';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // For the initial hero animation
  const heroOpacity = useTransform(scrollYProgress, [0.1, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);
  const nuggetRight = useTransform(scrollYProgress, [0.05, 0.06], ['-20%', '10%']);
  const nuggetTop = useTransform(scrollYProgress, [0.05, 0.06], ['30%', '35%']);
  const headerTop = useTransform(scrollYProgress, [0, 0.05], [0, 400]);
  const headerScale = useTransform(scrollYProgress, [0, 0.05], [1, 0.7]);
  const scrollDown = useTransform(scrollYProgress, [0, 0.1], ['45%', '100%']);
  const nuggetLeft = useTransform(scrollYProgress, [0.05, 0.06], ['0%', '10%']);
  const nuggetBottom = useTransform(scrollYProgress, [0.05, 0.06], ['85%', '55%']);
  const nuggetPackLeft = useTransform(scrollYProgress, [0, 0.05], ['-40%', '-5%']);
  const nuggetPackRight = useTransform(scrollYProgress, [0, 0.05], ['-40%', '15%']);
  const nuggetPackBottom = useTransform(scrollYProgress, [0, 0.05], ['85%', '65%']);


  const homeTop = useTransform(scrollYProgress, [0.03, 0.05], ['75%', '50%']);
  const homeOpacity = useTransform(scrollYProgress, [0.03, 0.05], [0, 1]);


  // For the navbar animation
  const navbarOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);

  // For the main content animation
  const mainOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const mainY = useTransform(scrollYProgress, [0.1, 0.2], [100, 0]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.1) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      {/* Initial full-screen hero with just KANZLER text */}
      <motion.div
        ref={heroRef}
        className="flex items-center justify-center bg-gold-gradient pointer-events-none h-[200vh] "
        style={{
          // opacity: heroOpacity,
          // scale: heroScale,
        }}
      >
        <div className="relative w-full h-full z-30">
          {/* Crown logo */}
          <div className="absolute top-10 left-10 w-12 h-12">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path d="M12 1L15.5 8.5H8.5L12 1Z" fill="white" />
              <path d="M12 1L8.5 8.5H1L12 1Z" fill="white" />
              <path d="M12 1L15.5 8.5H23L12 1Z" fill="white" />
              <path d="M8.5 8.5H15.5L12 16L8.5 8.5Z" fill="white" />
              <path d="M1 8.5H8.5L4.75 16L1 8.5Z" fill="white" />
              <path d="M15.5 8.5H23L19.25 16L15.5 8.5Z" fill="white" />
              <path d="M4.75 16L8.5 23H1L4.75 16Z" fill="white" />
              <path d="M12 16L15.5 23H8.5L12 16Z" fill="white" />
              <path d="M19.25 16L23 23H15.5L19.25 16Z" fill="white" />
            </svg>
          </div>

          {/* Kanzler text */}
          <motion.div
            className="absolute top-[10%]  w-full flex items-center justify-center"
            style={{
              y: headerTop,
              scale: headerScale,
              textShadow: '0px -10px 50px rgba(0, 0, 0, 0), 0px 8px 15px rgba(255, 255, 255, 0.94)'

            }}
          >
            <h1 className="text-7xl md:text-[18em] font-heading font-bold text-gold">
              KANZLER
            </h1>
          </motion.div>
          <motion.div
            className="absolute   w-full flex items-center justify-center"
            initial={{ textShadow: '0px -10px 50px rgba(255, 255, 255, 0.94), 0px 8px 15px rgba(255, 255, 255, 0.94)' }}
            animate={{
              textShadow: [
                '0px -10px 50px rgba(255, 255, 255, 0.94), 0px 8px 15px rgba(255, 255, 255, 0.94)',
                '0px 10px 60px rgba(255, 255, 255, 0.94) -8px 15px rgba(0, 0, 255, 0.6)',
                '0px -10px 50px rgba(255, 255, 255, 0.94), 0px 8px 15px rgba(255, 255, 255, 0.94)',
              ],
              transition: {
                duration: 2,
                repeatType: 'mirror'
              },
            }}
      
            style={{
              top: homeTop,
              opacity: homeOpacity,
              textShadow: '0px -10px 50px rgba(255, 255, 255, 0.94), 0px 8px 15px rgba(255, 255, 255, 0.94)'
            }}
          >
            <h1 className="text-7xl md:text-[15em] font-heading font-bold text-white/80 ">
              HOMEPACK
            </h1>
          </motion.div>

          {/* Product images */}
          <motion.div
            className="absolute   w-32 h-32 md:w-48 md:h-48"
            style={{
              right: nuggetRight,
              top: nuggetTop,
              opacity: homeOpacity
            }}
          >
            <Image
              src="/assets/kanzler/lepasan/nugget stick/nugget stick 2.png?height=200&width=200"
              alt="Kanzler product"
              width={200}
              height={200}
              style={{maxWidth:"250%"}}
              className="object-contain"
            />
          </motion.div>
          <motion.div
            className="absolute   w-32 h-32 md:w-48 md:h-48"
            style={{
              right: nuggetRight,
              top: nuggetBottom,
            }}
          >
            <Image
              src="/assets/kanzler/lepasan/nugget crispy/nugget crispy 1.png?height=200&width=200"
              alt="Kanzler product"
              width={200}
              height={200}
              className="object-contain"
            />
          </motion.div>
          <motion.div className="absolute  w-32 h-32 md:w-48 md:h-48"
           style={{
            left: nuggetLeft,
            top: nuggetBottom,
          }}>
            <Image
              src="/assets/kanzler/lepasan/nugget crispy/nugget crispy 2.png?height=200&width=200"
              alt="Kanzler product"
              width={200}
              height={200}
              className="object-contain"
            />
          </motion.div>
          <motion.div className="absolute  w-32 h-32 md:w-48 md:h-48"
           style={{
            left: nuggetPackLeft,
            top: nuggetPackBottom,
          }}>
            <Image
              src="/assets/kanzler/nugget/crispy/crispy-nugget-mockup.png?height=750&width=750"
              alt="Kanzler product"
              width={750}
              height={750}
              className="object-contain rotate-12"
              style={{
                maxWidth: '300%',
              }}
            />
          </motion.div>
          <motion.div className="absolute  w-32 h-32 md:w-48 md:h-48"
           style={{
            right: nuggetPackRight,
            top: nuggetPackBottom,
          }}>
            <Image
              src="/assets/kanzler/nugget/crispy/crispy-nugget-mockup.png?height=750&width=750"
              alt="Kanzler product"
              width={750}
              height={750}
              className="object-contain -rotate-12 "
              style={{
                maxWidth: '300%',
              }}
            />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute  left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center"
            style={{
              top: scrollDown,
            }}
          >
            <span className="mb-2 text-sm">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            >
              <ArrowDown className="h-6 w-6" />
            </motion.div>
          </motion.div>

        <div
            className="absolute bottom-[0%] left-0 right-0 h-32 bg-white"
            style={{
              borderRadius: '100px 100px 0 0  ',
              marginTop: '-10px',
              transform: 'scaleX(1.5)',
            }}
          ></div>
        </div>

      </motion.div>

      {/* Main content that appears after scrolling */}
      <motion.main
        ref={mainRef}
        className="relative z-10 "
        style={{
          // opacity: mainOpacity,
          // y: mainY,
        }}
      >
        <div className="bg-white relative">
          {/* Curved top section */}
         

          <div className="container mx-auto pt-40 pb-20 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-heading text-kanzler-navy mb-2">
                Kanzler
              </h2>
              <h3 className="text-3xl md:text-5xl font-heading text-blue-600 mb-8">
                Homepack
              </h3>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Kami berkomitmen untuk menghasilkan produk daging olahan dengan
                kualitas terbaik untuk konsumen
              </p>
            </div>

            <div className="flex justify-center mt-10 mb-20">
              <Image
                src="/placeholder.svg?height=400&width=1200"
                alt="Kanzler products"
                width={1200}
                height={400}
                className="object-contain"
              />
            </div>
          </div>

          <FeaturedProducts />
          <CategoryHighlights />
          <OurStorySection />
          <VideoSection />
          <RecipeSection />

          <section className="py-20 bg-kanzler-light">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <StoreLocator />
                <ContactForm />
              </div>
            </div>
          </section>
        </div>
      </motion.main>
    </>
  );
}

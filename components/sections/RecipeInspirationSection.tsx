'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown, Play } from 'lucide-react';
import { SMOOTH_BOUNCY } from '@/lib/motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Product categories for dropdown
const productCategories = [
  'Produk Kanzler',
  'Kanzler Singles - Bakso',
  'Kanzler Singles - Sosis',
];

// Video data structure
const videoData = [
  {
    id: 'video-1',
    title: 'Creamy Pasta with Chicken Nuggets',
    thumbnail: '/placeholder.jpg',
    videoUrl:
      'https://kznlr.qup.my.id/uploads/Sosis_Kanzler_shorts_youtubeshorts_foryou_viralvideo_fyp_viral_ea920741c0.mp4',
    category: 'Kanzler Singles - Bakso',
  },
  {
    id: 'video-2',
    title: 'Crispy Nugget Sambal Tempong',
    thumbnail: '/placeholder.jpg',
    videoUrl:
      'https://kznlr.qup.my.id/uploads/Sosis_Kanzler_shorts_youtubeshorts_foryou_viralvideo_fyp_viral_ea920741c0.mp4',
    category: 'Kanzler Singles - Bakso',
  },
  {
    id: 'video-3',
    title: 'Chicken Nugget Wrap',
    thumbnail: '/placeholder.jpg',
    videoUrl:
      'https://kznlr.qup.my.id/uploads/Sosis_Kanzler_shorts_youtubeshorts_foryou_viralvideo_fyp_viral_ea920741c0.mp4',
    category: 'Kanzler Singles - Bakso',
  },
  {
    id: 'video-4',
    title: 'Sosis Bakar Bumbu Kecap',
    thumbnail: '/placeholder.jpg',
    videoUrl:
      'https://kznlr.qup.my.id/uploads/Sosis_Kanzler_shorts_youtubeshorts_foryou_viralvideo_fyp_viral_ea920741c0.mp4',
    category: 'Kanzler Singles - Sosis',
  },
  {
    id: 'video-5',
    title: 'Kari Sosis Santan',
    thumbnail: '/placeholder.jpg',
    videoUrl:
      'https://kznlr.qup.my.id/uploads/Sosis_Kanzler_shorts_youtubeshorts_foryou_viralvideo_fyp_viral_ea920741c0.mp4',
    category: 'Kanzler Singles - Sosis',
  },
  {
    id: 'video-6',
    title: 'Sosis Roll Keju',
    thumbnail: '/placeholder.jpg',
    videoUrl:
      'https://kznlr.qup.my.id/uploads/Sosis_Kanzler_shorts_youtubeshorts_foryou_viralvideo_fyp_viral_ea920741c0.mp4',
    category: 'Kanzler Singles - Sosis',
  },
  {
    id: 'video-7',
    title: 'Tumis Sayur Campur',
    thumbnail: '/placeholder.jpg',
    videoUrl:
      'https://kznlr.qup.my.id/uploads/Sosis_Kanzler_shorts_youtubeshorts_foryou_viralvideo_fyp_viral_ea920741c0.mp4',
    category: 'Produk Kanzler',
  },
  {
    id: 'video-8',
    title: 'Sandwich Spesial',
    thumbnail: '/placeholder.jpg',
    videoUrl:
      'https://kznlr.qup.my.id/uploads/Sosis_Kanzler_shorts_youtubeshorts_foryou_viralvideo_fyp_viral_ea920741c0.mp4',
    category: 'Produk Kanzler',
  },
  {
    id: 'video-9',
    title: 'Pizza Mini Homemade',
    thumbnail: '/placeholder.jpg',
    videoUrl:
      'https://kznlr.qup.my.id/uploads/Sosis_Kanzler_shorts_youtubeshorts_foryou_viralvideo_fyp_viral_ea920741c0.mp4',
    category: 'Produk Kanzler',
  },
];

export default function RecipeInspirationSection() {
  const [selectedCategory, setSelectedCategory] = useState(
    productCategories[0]
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [visibleVideos, setVisibleVideos] = useState<Set<string>>(new Set());
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const currentVideos =
    selectedCategory === 'Produk Kanzler'
      ? videoData
      : videoData.filter((video) => video.category === selectedCategory);

  const handleVideoClick = (videoId: string) => {
    setSelectedVideo(videoId);
    setPlayingVideo(videoId);
  };

  const handleBackToCarousel = () => {
    setSelectedVideo(null);
    setPlayingVideo(null);
  };

  const selectedVideoData = selectedVideo ? currentVideos.find(v => v.id === selectedVideo) : null;

  // Auto-play visible videos
  useEffect(() => {
    visibleVideos.forEach((videoId) => {
      const videoElement = videoRefs.current[videoId];
      if (videoElement && playingVideo !== videoId) {
        videoElement.play().catch(() => {
          // Handle autoplay restrictions
        });
      }
    });
  }, [visibleVideos, playingVideo]);

  // Intersection Observer to detect visible videos
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    Object.keys(videoRefs.current).forEach((videoId) => {
      const videoElement = videoRefs.current[videoId];
      if (videoElement) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleVideos((prev) => new Set([...prev, videoId]));
            } else {
              setVisibleVideos((prev) => {
                const newSet = new Set(prev);
                newSet.delete(videoId);
                return newSet;
              });
              // Pause video when not visible
              if (playingVideo !== videoId) {
                videoElement.pause();
              }
            }
          },
          { threshold: 0.5 }
        );
        observer.observe(videoElement);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [currentVideos, playingVideo]);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...SMOOTH_BOUNCY, duration: 0.6 },
    },
  };

  return (
    <section className="relative h-screen overflow-hidden bg-white">
      {/* Main Content */}
      <div className="relative z-10 min-h-[100vh] flex flex-col">
        <div className="container mx-auto px-8 py-16 flex-1 content-center">
          <AnimatePresence mode="wait">
            {selectedVideo ? (
              // Selected Video Layout (like the image you provided)
              <motion.div
                key="selected-video"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-12 gap-8 h-full items-center"
              >
                {/* Left Side - Video Display */}
                <div className="col-span-7">
                  <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-black shadow-2xl">
                    <video
                      src={selectedVideoData?.videoUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                      onEnded={() => setPlayingVideo(null)}
                    />
                  </div>
                </div>

                {/* Right Side - Recipe Details */}
                <div className="col-span-5 pl-8">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    {/* Back Button */}
                    <motion.button
                      onClick={handleBackToCarousel}
                      className="mb-6 flex items-center gap-2 text-blue-900 hover:text-yellow-600 transition-colors duration-300"
                      whileHover={{ x: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="font-semibold">Kembali</span>
                    </motion.button>

                  

                    {/* Recipe Title */}
                    <h1 className="text-4xl font-bold text-yellow-600 mb-2">
                      Nugget
                    </h1>
                    <h2 className="text-6xl font-bold text-blue-900 mb-6 leading-tight">
                      Spaghetti
                    </h2>

                    {/* Recipe Description */}
                    <p className="text-blue-900 text-lg mb-6 leading-relaxed">
                      Kombinasi pasta dan nugget yang praktis untuk lunch
                    </p>

                    {/* Ingredients */}
                    <div className="space-y-3 text-blue-900">
                      <h3 className="font-bold text-lg mb-4">Bahan:</h3>
                      <div className="space-y-2 text-base">
                        <p>Kanzler Crispy Chicken Nugget</p>
                        <p>1 genggam pasta</p>
                        <p>½ buah bawang Bombay</p>
                        <p>1 genggam jamur kancing</p>
                        <p>Lada dan garam secukupnya</p>
                        <p>1 sdt bawang putih bubuk</p>
                        <p>1 sdt Italian seasoning</p>
                        <p>½ sdt kaldu jamur</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              // Original Carousel Layout
              <motion.div
                key="carousel"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-12 gap-8 h-full items-center"
              >
                <div className="col-span-5 sticky top-16">
                  {/* Main Title */}
                  <motion.div
                    className="mb-12"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-[5rem] text-center font-bold text-blue-900 leading-tight">
                      Inspirasi
                    </p>
                    <p className="text-[8rem] text-center font-bold text-blue-900 -mt-12 leading-tight">
                      Resep
                    </p>
                  </motion.div>

                  {/* Category Dropdown */}
                  <motion.div
                    className="relative mb-8"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center justify-between gap-4 mb-4 bg-yellow-600 px-6 py-3 rounded-full">
                      <p className="text-white font-semibold text-lg">Kategori</p>
                      {/* Dropdown */}
                      <div className="relative w-full">
                        <motion.button
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="w-full max-w-sm bg-white border-2 border-yellow-600 rounded-xl px-6 py-4 text-left flex items-center justify-between font-semibold text-blue-900 hover:bg-gray-50 transition-all duration-300 shadow-lg"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-lg">{selectedCategory}</span>
                          <motion.div
                            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown size={24} className="text-yellow-600" />
                          </motion.div>
                        </motion.button>

                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-full left-0 right-0 max-w-sm bg-white border-2 border-yellow-600 border-t-0 rounded-b-xl shadow-xl z-20 overflow-hidden"
                            >
                              {productCategories.map((category) => (
                                <motion.button
                                  key={category}
                                  onClick={() => {
                                    setSelectedCategory(category);
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`w-full px-6 py-4 text-left hover:bg-yellow-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0 text-lg ${
                                    category === selectedCategory
                                      ? 'bg-yellow-100 text-yellow-700 font-bold'
                                      : 'text-blue-900 font-semibold'
                                  }`}
                                  whileHover={{ x: 4 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {category}
                                </motion.button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="w-24 h-24 content-center">
                        <Image
                          src="/assets/ASSET - HOMEPACK/5 ASSET - HOMEPACK/5 ASSET - HOMEPACK SEARCH.png"
                          alt="Recipe Background"
                          width={76}
                          height={76}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right Side - Video Carousel */}
                <div className="col-span-7 pl-8">
                  <motion.div
                    variants={fadeInUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <Carousel className="w-full">
                      <CarouselContent className="-ml-4">
                        {currentVideos.map((video, index) => (
                          <CarouselItem key={video.id} className="pl-4 basis-1/3">
                            <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black">
                              <div
                                className="relative w-full h-full cursor-pointer group"
                                onClick={() => handleVideoClick(video.id)}
                              >
                                <video
                                  ref={(el) => {
                                    if (el) videoRefs.current[video.id] = el;
                                  }}
                                  src={video.videoUrl}
                                  className="w-full h-full object-cover"
                                  muted
                                  loop
                                  playsInline
                                  preload="metadata"
                                  onLoadedMetadata={(e) => {
                                    e.currentTarget.currentTime = 0;
                                  }}
                                />
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
                                  <Play className="text-white w-12 h-12 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                              </div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-4" />
                      <CarouselNext className="right-4" />
                    </Carousel>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

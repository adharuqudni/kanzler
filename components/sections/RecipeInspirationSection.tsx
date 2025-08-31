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
} from "@/components/ui/carousel";

// Product categories for dropdown
const productCategories = [
  'Produk Kanzler',
  'Kanzler Singles - Bakso',
  'Kanzler Singles - Sosis'
];

// Video data structure
const videoData = [
  {
    id: 'video-1',
    title: 'Creamy Pasta with Chicken Nuggets',
    thumbnail: '/placeholder.jpg',
    videoUrl: 'https://kznlr.qup.my.id/uploads/Sosis_Kanzler_shorts_youtubeshorts_foryou_viralvideo_fyp_viral_ea920741c0.mp4',
    category: 'Kanzler Singles - Bakso'
  },
  {
    id: 'video-2',
    title: 'Crispy Nugget Sambal Tempong',
    thumbnail: '/placeholder.jpg',
    videoUrl: 'https://kznlr.qup.my.id/uploads/Sosis_Kanzler_shorts_youtubeshorts_foryou_viralvideo_fyp_viral_ea920741c0.mp4',
    category: 'Kanzler Singles - Bakso'
  },
  {
    id: 'video-3',
    title: 'Chicken Nugget Wrap',
    thumbnail: '/placeholder.jpg',
    videoUrl: 'https://kznlr.qup.my.id/uploads/Sosis_Kanzler_shorts_youtubeshorts_foryou_viralvideo_fyp_viral_ea920741c0.mp4',
    category: 'Kanzler Singles - Bakso'
  },
  {
    id: 'video-4',
    title: 'Sosis Bakar Bumbu Kecap',
    thumbnail: '/placeholder.jpg',
    videoUrl: 'https://kznlr.qup.my.id/uploads/Sosis_Kanzler_shorts_youtubeshorts_foryou_viralvideo_fyp_viral_ea920741c0.mp4',
    category: 'Kanzler Singles - Sosis'
  },
  {
    id: 'video-5',
    title: 'Kari Sosis Santan',
    thumbnail: '/placeholder.jpg',
    videoUrl: 'https://kznlr.qup.my.id/uploads/Sosis_Kanzler_shorts_youtubeshorts_foryou_viralvideo_fyp_viral_ea920741c0.mp4',
    category: 'Kanzler Singles - Sosis'
  },
  {
    id: 'video-6',
    title: 'Sosis Roll Keju',
    thumbnail: '/placeholder.jpg',
    videoUrl: 'https://kznlr.qup.my.id/uploads/Sosis_Kanzler_shorts_youtubeshorts_foryou_viralvideo_fyp_viral_ea920741c0.mp4',
    category: 'Kanzler Singles - Sosis'
  },
  {
    id: 'video-7',
    title: 'Tumis Sayur Campur',
    thumbnail: '/placeholder.jpg',
    videoUrl: 'https://kznlr.qup.my.id/uploads/Sosis_Kanzler_shorts_youtubeshorts_foryou_viralvideo_fyp_viral_ea920741c0.mp4',
    category: 'Produk Kanzler'
  },
  {
    id: 'video-8',
    title: 'Sandwich Spesial',
    thumbnail: '/placeholder.jpg',
    videoUrl: 'https://kznlr.qup.my.id/uploads/Sosis_Kanzler_shorts_youtubeshorts_foryou_viralvideo_fyp_viral_ea920741c0.mp4',
    category: 'Produk Kanzler'
  },
  {
    id: 'video-9',
    title: 'Pizza Mini Homemade',
    thumbnail: '/placeholder.jpg',
    videoUrl: 'https://kznlr.qup.my.id/uploads/Sosis_Kanzler_shorts_youtubeshorts_foryou_viralvideo_fyp_viral_ea920741c0.mp4',
    category: 'Produk Kanzler'
  }
];

export default function RecipeInspirationSection() {
  const [selectedCategory, setSelectedCategory] = useState(productCategories[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [visibleVideos, setVisibleVideos] = useState<Set<string>>(new Set());
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const currentVideos = selectedCategory === 'Produk Kanzler' 
    ? videoData 
    : videoData.filter(video => video.category === selectedCategory);

  const handleVideoClick = (videoId: string) => {
    setPlayingVideo(playingVideo === videoId ? null : videoId);
  };

  // Auto-play visible videos
  useEffect(() => {
    visibleVideos.forEach(videoId => {
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
    
    Object.keys(videoRefs.current).forEach(videoId => {
      const videoElement = videoRefs.current[videoId];
      if (videoElement) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleVideos(prev => new Set([...prev, videoId]));
            } else {
              setVisibleVideos(prev => {
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
      observers.forEach(observer => observer.disconnect());
    };
  }, [currentVideos, playingVideo]);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { ...SMOOTH_BOUNCY, duration: 0.6 }
    }
  };



  return (
    <section className="relative h-screen overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/assets/ASSET - SINGLES/4 ASSET - SINGLES/4 ASSET - SINGLES BACKGROUND.png"
          alt="Recipe Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-[100vh] flex flex-col">
        <div className="container mx-auto px-8 py-16 flex-1 ">
          
          {/* Left Side - Title and Controls */}
          <div className="grid grid-cols-12 gap-8 h-full items-center">
            <div className="col-span-5 sticky top-16 ">
              
            

              {/* Main Title */}
              <motion.div
                className="mb-12"
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-7xl text-center font-bold text-blue-900 leading-tight">
                  Inspirasi
                  <br />
                  Resep
                </h1>
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
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-white bg-yellow-600 px-6 py-3 rounded-full font-semibold text-lg">
                    Kategori
                  </span>
                  
                
                </div>

                {/* Dropdown */}
                <div className="relative">
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
                                                    {playingVideo === video.id ? (
                            <video
                              src={video.videoUrl}
                              controls
                              autoPlay
                              className="w-full h-full object-cover"
                              onEnded={() => setPlayingVideo(null)}
                            />
                          ) : (
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
                                  // Set video to beginning for autoplay
                                  e.currentTarget.currentTime = 0;
                                }}
                              />
                               
                               {/* Play Button Overlay */}
                               <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
                                
                               </div>
                            </div>
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </Carousel>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

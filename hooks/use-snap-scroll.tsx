"use client";

import React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';

export interface SnapScrollOptions {
  threshold?: number; // Scroll threshold to trigger snap (0-1)
  springDuration?: number; // Duration of spring animation in ms
  sections?: string[]; // Section IDs to snap to
  onSectionChange?: (sectionIndex: number) => void;
}

export function useSnapScroll(options: SnapScrollOptions = {}) {
  const {
    threshold = 0.5,
    springDuration = 800,
    sections = [],
    onSectionChange
  } = options;

  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to specific section with instant snap
  const scrollToSection = useCallback((sectionIndex: number) => {
    if (!containerRef.current || sectionIndex < 0 || sectionIndex >= sections.length) return;

    const targetSection = document.getElementById(sections[sectionIndex]);
    
    if (targetSection) {
      setIsScrolling(true);
      
      // Use instant scroll for true stickiness
      targetSection.scrollIntoView({
        behavior: 'auto', // Instant scroll, no animation
        block: 'start',
        inline: 'nearest'
      });

      // Reset scrolling state immediately
      setTimeout(() => {
        setIsScrolling(false);
        setCurrentSection(sectionIndex);
        onSectionChange?.(sectionIndex);
      }, 50); // Very short timeout just to let the scroll complete
    }
  }, [sections, onSectionChange]);

  // Navigate to next section
  const scrollToNext = useCallback(() => {
    const nextSection = Math.min(currentSection + 1, sections.length - 1);
    if (nextSection !== currentSection) {
      scrollToSection(nextSection);
    }
  }, [currentSection, sections.length, scrollToSection]);

  // Navigate to previous section
  const scrollToPrevious = useCallback(() => {
    const prevSection = Math.max(currentSection - 1, 0);
    if (prevSection !== currentSection) {
      scrollToSection(prevSection);
    }
  }, [currentSection, scrollToSection]);

  // Handle wheel events for custom snap behavior
  const handleWheel = useCallback((event: WheelEvent) => {
    if (isScrolling) {
      event.preventDefault();
      return;
    }

    const { deltaY } = event;
    const scrollThreshold = 30; // Lower threshold for more responsive snapping

    // Clear previous timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Shorter debounce for more immediate response
    scrollTimeoutRef.current = setTimeout(() => {
      if (Math.abs(deltaY) > scrollThreshold) {
        if (deltaY > 0) {
          // Scrolling down
          scrollToNext();
        } else {
          // Scrolling up
          scrollToPrevious();
        }
      }
    }, 50); // Reduced from 100ms to 50ms
  }, [isScrolling, scrollToNext, scrollToPrevious]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (isScrolling) return;

    switch (event.key) {
      case 'ArrowDown':
      case 'PageDown':
      case ' ': // Space key
        event.preventDefault();
        scrollToNext();
        break;
      case 'ArrowUp':
      case 'PageUp':
        event.preventDefault();
        scrollToPrevious();
        break;
      case 'Home':
        event.preventDefault();
        scrollToSection(0);
        break;
      case 'End':
        event.preventDefault();
        scrollToSection(sections.length - 1);
        break;
    }
  }, [isScrolling, scrollToNext, scrollToPrevious, scrollToSection, sections.length]);

  // Observe section intersections to update current section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((sectionId, index) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
              setCurrentSection(index);
              onSectionChange?.(index);
            }
          },
          {
            threshold: threshold,
            rootMargin: '-10% 0px -10% 0px'
          }
        );

        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [sections, threshold, onSectionChange]);

  // Set up event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add wheel event listener
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleWheel, handleKeyDown]);

  return {
    containerRef,
    currentSection,
    isScrolling,
    scrollToSection,
    scrollToNext,
    scrollToPrevious,
    totalSections: sections.length
  };
}

// Spring animation variants for Framer Motion
export const snapScrollVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8
    }
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.95,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  }
};

// Scroll progress indicator component
export function ScrollProgress({ currentSection, totalSections }: { currentSection: number; totalSections: number }) {
  const progress = totalSections > 0 ? (currentSection + 1) / totalSections : 0;
  
  return (
    <div 
      className="scroll-progress"
      style={{
        transform: `scaleX(${progress})`,
      }}
    />
  );
}

// Section indicator component
export interface SectionIndicatorProps {
  currentSection: number;
  totalSections: number;
  onSectionClick: (index: number) => void;
  className?: string;
}

export function SectionIndicator({ 
  currentSection, 
  totalSections, 
  onSectionClick, 
  className = "" 
}: SectionIndicatorProps) {
  return (
    <div className={`fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4 ${className}`}>
      {Array.from({ length: totalSections }, (_, index) => (
        <button
          key={index}
          onClick={() => onSectionClick(index)}
          className={`section-indicator-dot block w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 ${
            index === currentSection
              ? 'bg-[#AA7B32] active scale-125 shadow-lg'
              : 'bg-white/40 hover:bg-white/60 backdrop-blur-sm border border-white/20'
          }`}
          aria-label={`Go to section ${index + 1}`}
          style={{
            boxShadow: index === currentSection 
              ? '0 0 20px rgba(170, 123, 50, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
              : '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
        />
      ))}
    </div>
  );
}

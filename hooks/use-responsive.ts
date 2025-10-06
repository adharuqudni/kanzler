"use client";

import { useState, useEffect } from 'react';

// Breakpoints for different screen resolutions
export const BREAKPOINTS = {
  laptop: 1024,
  laptopL: 1440,
  desktop2K: 1920,
  desktop4K: 2560,
} as const;

export type ScreenSize = 'laptop' | 'laptopL' | 'desktop2K' | 'desktop4K';

// Get responsive values based on screen size
export interface ResponsiveValues<T> {
  laptop: T;
  laptopL: T;
  desktop2K: T;
  desktop4K: T;
}

export function useResponsive() {
  const [screenSize, setScreenSize] = useState<ScreenSize>('laptop');
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateSize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setWindowSize({ width, height });

      if (width >= BREAKPOINTS.desktop4K) {
        setScreenSize('desktop4K');
      } else if (width >= BREAKPOINTS.desktop2K) {
        setScreenSize('desktop2K');
      } else if (width >= BREAKPOINTS.laptopL) {
        setScreenSize('laptopL');
      } else {
        setScreenSize('laptop');
      }
    }

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Get responsive value based on current screen size
  const getResponsiveValue = <T>(values: ResponsiveValues<T>): T => {
    return values[screenSize];
  };

  // Get scale factor for current screen size
  const getScale = (): number => {
    switch (screenSize) {
      case 'laptop': return 1;
      case 'laptopL': return 1.1;
      case 'desktop2K': return 1.3;
      case 'desktop4K': return 1.6;
      default: return 1;
    }
  };

  // Get text scale factor
  const getTextScale = (): number => {
    switch (screenSize) {
      case 'laptop': return 1;
      case 'laptopL': return 1.1;
      case 'desktop2K': return 1.3;
      case 'desktop4K': return 1.6;
      default: return 1;
    }
  };

  // Get spacing scale factor
  const getSpacingScale = (): number => {
    switch (screenSize) {
      case 'laptop': return 1;
      case 'laptopL': return 1.2;
      case 'desktop2K': return 1.4;
      case 'desktop4K': return 1.8;
      default: return 1;
    }
  };

  // Get container padding
  const getContainerPadding = (): string => {
    switch (screenSize) {
      case 'laptop': return '2rem';
      case 'laptopL': return '3rem';
      case 'desktop2K': return '4rem';
      case 'desktop4K': return '6rem';
      default: return '2rem';
    }
  };

  // Get responsive font size
  const getResponsiveFontSize = (baseSize: number): string => {
    const scale = getTextScale();
    return `${baseSize * scale}rem`;
  };

  // Get responsive spacing
  const getResponsiveSpacing = (baseSpacing: number): string => {
    const scale = getSpacingScale();
    return `${baseSpacing * scale}rem`;
  };

  // Get responsive dimensions
  const getResponsiveDimensions = (baseWidth: number, baseHeight?: number): { width: string; height: string } => {
    const scale = getScale();
    return {
      width: `${baseWidth * scale}px`,
      height: `${(baseHeight || baseWidth) * scale}px`,
    };
  };

  return {
    screenSize,
    windowSize,
    getResponsiveValue,
    getScale,
    getTextScale,
    getSpacingScale,
    getContainerPadding,
    getResponsiveFontSize,
    getResponsiveSpacing,
    getResponsiveDimensions,
    // Utility functions
    isLaptop: screenSize === 'laptop',
    isLaptopL: screenSize === 'laptopL',
    is2K: screenSize === 'desktop2K',
    is4K: screenSize === 'desktop4K',
  };
}

// Responsive animation variants helper
export function getResponsiveAnimationValues(
  baseValues: { scale?: number; x?: number; y?: number; duration?: number },
  screenSize: ScreenSize
) {
  const scaleMultiplier = {
    laptop: 1,
    laptopL: 1.1,
    desktop2K: 1.3,
    desktop4K: 1.6,
  }[screenSize];

  return {
    scale: baseValues.scale ? baseValues.scale * scaleMultiplier : undefined,
    x: baseValues.x ? baseValues.x * scaleMultiplier : undefined,
    y: baseValues.y ? baseValues.y * scaleMultiplier : undefined,
    duration: baseValues.duration || 1,
  };
}

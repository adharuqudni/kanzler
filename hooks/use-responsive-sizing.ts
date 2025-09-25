'use client';

import { useState, useEffect } from 'react';
import { BASE_VIEWPORT, getScaleFactor, getResponsiveSize } from '@/lib/responsive-sizing';

/**
 * Hook to maintain exact ratio sizing from MacBook Pro M1 16-inch
 * Returns responsive dimensions that scale proportionally
 */
export function useResponsiveSizing() {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : BASE_VIEWPORT.width,
    height: typeof window !== 'undefined' ? window.innerHeight : BASE_VIEWPORT.height,
    scaleFactor: 1,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const scaleFactor = getScaleFactor(width);

      setDimensions({
        width,
        height,
        scaleFactor,
      });
    };

    // Initial calculation
    updateDimensions();

    // Listen for resize events
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return {
    ...dimensions,
    // Helper functions
    scale: (baseSize: number) => Math.round(baseSize * dimensions.scaleFactor),
    responsive: (baseSize: number) => getResponsiveSize(baseSize, dimensions.width),
    // Device type detection
    isMobile: dimensions.width < 768,
    isTablet: dimensions.width >= 768 && dimensions.width < 1024,
    isDesktop: dimensions.width >= 1024,
    isLargeDesktop: dimensions.width >= 1920,
    // Exact breakpoint matching
    isExactMacBookPro: dimensions.width === BASE_VIEWPORT.width,
  };
}

/**
 * Hook for responsive image sizing
 */
export function useResponsiveImageSize(baseWidth: number, baseHeight: number) {
  const { scaleFactor } = useResponsiveSizing();
  
  return {
    width: Math.round(baseWidth * scaleFactor),
    height: Math.round(baseHeight * scaleFactor),
    style: {
      width: `${baseWidth * scaleFactor}px`,
      height: `${baseHeight * scaleFactor}px`,
    }
  };
}

/**
 * Hook for responsive font sizing
 */
export function useResponsiveFontSize(baseSize: number) {
  const { scaleFactor } = useResponsiveSizing();
  
  return {
    fontSize: Math.round(baseSize * scaleFactor),
    style: {
      fontSize: `${baseSize * scaleFactor}px`,
    }
  };
}

/**
 * Hook for responsive spacing
 */
export function useResponsiveSpacing(baseSpacing: number) {
  const { scaleFactor } = useResponsiveSizing();
  
  return {
    spacing: Math.round(baseSpacing * scaleFactor),
    style: {
      padding: `${baseSpacing * scaleFactor}px`,
      margin: `${baseSpacing * scaleFactor}px`,
    }
  };
}

/**
 * CSS-in-JS responsive sizing utility
 */
export function getResponsiveStyles(config: {
  width?: number;
  height?: number;
  fontSize?: number;
  padding?: number;
  margin?: number;
}) {
  const { scaleFactor } = useResponsiveSizing();
  
  const styles: React.CSSProperties = {};
  
  if (config.width) styles.width = `${config.width * scaleFactor}px`;
  if (config.height) styles.height = `${config.height * scaleFactor}px`;
  if (config.fontSize) styles.fontSize = `${config.fontSize * scaleFactor}px`;
  if (config.padding) styles.padding = `${config.padding * scaleFactor}px`;
  if (config.margin) styles.margin = `${config.margin * scaleFactor}px`;
  
  return styles;
}

/**
 * Viewport-based scaling for maintaining exact proportions
 */
export function useViewportScale() {
  const { width } = useResponsiveSizing();
  
  // Calculate scale based on your MacBook Pro width
  const scale = width / BASE_VIEWPORT.width;
  
  return {
    scale,
    transform: `scale(${scale})`,
    // For maintaining aspect ratios
    scaleX: scale,
    scaleY: scale,
    // CSS transform strings
    cssTransform: `scale(${scale})`,
    cssTransformOrigin: 'center',
  };
}

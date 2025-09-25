/**
 * Responsive Sizing Utilities
 * Based on MacBook Pro M1 16-inch as reference (1728px viewport width)
 * Maintains exact ratio sizing from your current perfect setup
 */

// Base reference dimensions (MacBook Pro M1 16-inch actual viewport)
export const BASE_VIEWPORT = {
  width: 1728, // Your current MacBook Pro viewport width
  height: 1117, // Your current MacBook Pro viewport height
} as const;

// Common device breakpoints
export const BREAKPOINTS = {
  xs: 320,   // Small phones
  sm: 640,   // Large phones
  md: 768,   // Tablets
  lg: 1024,  // Small laptops
  xl: 1280,  // Desktop
  '2xl': 1536, // Large desktop
  '3xl': 1728, // MacBook Pro M1 16" (reference)
  '4xl': 1920, // Full HD
  '5xl': 2560, // QHD
} as const;

// Scaling factors relative to base viewport (maintains exact ratios)
export const SCALE_FACTORS = {
  xs: 320 / BASE_VIEWPORT.width,   // iPhone SE ratio
  sm: 640 / BASE_VIEWPORT.width,   // Large phones ratio  
  md: 768 / BASE_VIEWPORT.width,   // Tablets ratio
  lg: 1024 / BASE_VIEWPORT.width,  // Small laptops ratio
  xl: 1280 / BASE_VIEWPORT.width,  // Desktop ratio
  '2xl': 1536 / BASE_VIEWPORT.width, // Large desktop ratio
  '3xl': 1.0,  // 100% (MacBook Pro M1 16" reference)
  '4xl': 1920 / BASE_VIEWPORT.width, // Full HD ratio
  '5xl': 2560 / BASE_VIEWPORT.width, // QHD ratio
} as const;

/**
 * Calculate responsive size based on viewport width
 */
export function getResponsiveSize(baseSize: number, currentWidth: number = window.innerWidth): number {
  const scaleFactor = currentWidth / BASE_VIEWPORT.width;
  return Math.round(baseSize * scaleFactor);
}

/**
 * Get scale factor for current viewport
 */
export function getScaleFactor(currentWidth: number = window.innerWidth): number {
  if (currentWidth >= BREAKPOINTS['5xl']) return SCALE_FACTORS['5xl'];
  if (currentWidth >= BREAKPOINTS['4xl']) return SCALE_FACTORS['4xl'];
  if (currentWidth >= BREAKPOINTS['3xl']) return SCALE_FACTORS['3xl'];
  if (currentWidth >= BREAKPOINTS['2xl']) return SCALE_FACTORS['2xl'];
  if (currentWidth >= BREAKPOINTS.xl) return SCALE_FACTORS.xl;
  if (currentWidth >= BREAKPOINTS.lg) return SCALE_FACTORS.lg;
  if (currentWidth >= BREAKPOINTS.md) return SCALE_FACTORS.md;
  if (currentWidth >= BREAKPOINTS.sm) return SCALE_FACTORS.sm;
  return SCALE_FACTORS.xs;
}

/**
 * Generate responsive CSS values using clamp()
 */
export function clampSize(minSize: number, baseSize: number, maxSize: number): string {
  const minVw = (minSize / BREAKPOINTS.xs) * 100;
  const maxVw = (maxSize / BREAKPOINTS['5xl']) * 100;
  return `clamp(${minSize}px, ${minVw}vw, ${maxSize}px)`;
}

/**
 * Font size utilities - Based on your current exact sizes
 */
export const FONT_SIZES = {
  // Your current exact font sizes from CeritaKanzler.tsx
  'cerita': { base: 90, min: 40, max: 120, vw: 7 }, // clamp(40px,7vw,90px)
  'kanzler': { base: 190, min: 78, max: 240, vw: 16 }, // clamp(78px,16vw,190px)
  'body': { base: 16, min: 13, max: 18, vw: 1.1 }, // clamp(13px,1.1vw,16px)
  
  // Standard sizes maintaining your ratios
  xs: { base: 12, min: 10, max: 14, vw: 0.7 },
  sm: { base: 14, min: 12, max: 16, vw: 0.8 },
  base: { base: 16, min: 14, max: 18, vw: 1.0 },
  lg: { base: 18, min: 16, max: 20, vw: 1.1 },
  xl: { base: 20, min: 18, max: 24, vw: 1.2 },
  '2xl': { base: 24, min: 20, max: 28, vw: 1.4 },
  '3xl': { base: 30, min: 24, max: 36, vw: 1.7 },
  '4xl': { base: 36, min: 28, max: 44, vw: 2.1 },
  '5xl': { base: 48, min: 36, max: 60, vw: 2.8 },
  '6xl': { base: 60, min: 48, max: 72, vw: 3.5 },
  '7xl': { base: 72, min: 60, max: 96, vw: 4.2 },
  '8xl': { base: 96, min: 72, max: 128, vw: 5.6 },
  '9xl': { base: 128, min: 96, max: 160, vw: 7.4 },
} as const;

/**
 * Generate responsive font size using clamp() with viewport width
 */
export function responsiveFontSize(size: keyof typeof FONT_SIZES): string {
  const { min, max, vw } = FONT_SIZES[size];
  return `clamp(${min}px, ${vw}vw, ${max}px)`;
}

/**
 * Image size utilities - Based on your current exact values
 */
export const IMAGE_SIZES = {
  // Navigation & UI icons (from your components)
  'nav-crown': { base: 60, min: 40, max: 80 }, // SinglesSidebar crown
  'navbar-logo': { base: 50, min: 40, max: 60 }, // Navbar crown
  'nav-icon': { base: 48, min: 40, max: 56 }, // Navigation icons
  
  // Logos and branding (from Hero components)
  'crown-hero': { base: 150, min: 100, max: 200 }, // HomepackHeroSection crown
  'crown-split': { base: 120, min: 80, max: 160 }, // SplitHero crown
  'kanzler-logo': { base: 700, min: 400, max: 900 }, // Main Kanzler text
  'kanzler-split': { base: 400, min: 250, max: 500 }, // Split view Kanzler
  'kanzler-quote': { base: 800, min: 500, max: 1000 }, // Quote image
  'homepack-logo': { base: 350, min: 250, max: 450 }, // Homepack logo
  
  // Product images (from your components)
  'product-hero': { base: 350, min: 200, max: 500 }, // AnimatedProducts
  'product-floating': { base: 300, min: 200, max: 400 }, // Hero floating products
  'product-carousel': { base: 700, min: 400, max: 900 }, // ProductCarouselSection (nugget)
  'product-carousel-sm': { base: 500, min: 300, max: 700 }, // ProductCarouselSection (others)
  'product-mockup': { base: 400, min: 250, max: 550 }, // Package mockups
  'product-mockup-lg': { base: 500, min: 350, max: 650 }, // Large package mockups
  
  // Homepack specific (from HomepackHeroSection & ProductsSection)
  'nugget-package': { base: 200, min: 150, max: 280 }, // Central nugget package
  'beef-cocktail': { base: 350, min: 250, max: 450 }, // Beef cocktail mockup
  'crispy-nugget': { base: 500, min: 350, max: 650 }, // Crispy nugget mockup
  'nugget-floating': { base: 220, min: 180, max: 280 }, // Floating nugget
  'homepack-products': { base: 360, min: 280, max: 440 }, // Products section
  
  // Section specific images
  'map-large': { base: 1200, min: 800, max: 1400 }, // MapSection
  'social-icon': { base: 40, min: 32, max: 48 }, // Social media icons
  'singles-logo': { base: 500, min: 350, max: 650 }, // Singles section
  
  // Generic sizes for consistency
  icon: { base: 24, min: 20, max: 32 },
  'icon-sm': { base: 16, min: 14, max: 20 },
  'icon-lg': { base: 32, min: 28, max: 40 },
  'icon-xl': { base: 48, min: 40, max: 56 },
} as const;

/**
 * Generate responsive image size
 */
export function responsiveImageSize(size: keyof typeof IMAGE_SIZES): string {
  const { base, min, max } = IMAGE_SIZES[size];
  return clampSize(min, base, max);
}

/**
 * Spacing utilities
 */
export const SPACING = {
  px: { base: 1, min: 1, max: 1 },
  0.5: { base: 2, min: 1, max: 3 },
  1: { base: 4, min: 3, max: 5 },
  1.5: { base: 6, min: 4, max: 8 },
  2: { base: 8, min: 6, max: 10 },
  2.5: { base: 10, min: 8, max: 12 },
  3: { base: 12, min: 10, max: 14 },
  3.5: { base: 14, min: 12, max: 16 },
  4: { base: 16, min: 12, max: 20 },
  5: { base: 20, min: 16, max: 24 },
  6: { base: 24, min: 20, max: 28 },
  7: { base: 28, min: 24, max: 32 },
  8: { base: 32, min: 28, max: 36 },
  9: { base: 36, min: 32, max: 40 },
  10: { base: 40, min: 36, max: 44 },
  11: { base: 44, min: 40, max: 48 },
  12: { base: 48, min: 44, max: 52 },
  14: { base: 56, min: 52, max: 60 },
  16: { base: 64, min: 60, max: 68 },
  20: { base: 80, min: 72, max: 88 },
  24: { base: 96, min: 88, max: 104 },
  28: { base: 112, min: 104, max: 120 },
  32: { base: 128, min: 120, max: 136 },
  36: { base: 144, min: 136, max: 152 },
  40: { base: 160, min: 152, max: 168 },
  44: { base: 176, min: 168, max: 184 },
  48: { base: 192, min: 184, max: 200 },
  52: { base: 208, min: 200, max: 216 },
  56: { base: 224, min: 216, max: 232 },
  60: { base: 240, min: 232, max: 248 },
  64: { base: 256, min: 248, max: 264 },
  72: { base: 288, min: 280, max: 296 },
  80: { base: 320, min: 312, max: 328 },
  96: { base: 384, min: 376, max: 392 },
} as const;

/**
 * Generate responsive spacing
 */
export function responsiveSpacing(size: keyof typeof SPACING): string {
  const { base, min, max } = SPACING[size];
  return clampSize(min, base, max);
}

/**
 * Container utilities
 */
export const CONTAINER_SIZES = {
  xs: { base: 320, min: 300, max: 360 },
  sm: { base: 640, min: 600, max: 680 },
  md: { base: 768, min: 720, max: 800 },
  lg: { base: 1024, min: 960, max: 1080 },
  xl: { base: 1280, min: 1200, max: 1320 },
  '2xl': { base: 1536, min: 1440, max: 1600 },
  '3xl': { base: 1728, min: 1680, max: 1800 }, // MacBook Pro M1 16" reference
  '4xl': { base: 1920, min: 1840, max: 2000 },
  '5xl': { base: 2560, min: 2400, max: 2720 },
} as const;

/**
 * Generate responsive container size
 */
export function responsiveContainer(size: keyof typeof CONTAINER_SIZES): string {
  const { base, min, max } = CONTAINER_SIZES[size];
  return clampSize(min, base, max);
}

/**
 * Generate CSS custom properties for responsive sizing
 */
export function generateCSSCustomProperties(): Record<string, string> {
  const properties: Record<string, string> = {};

  // Font sizes
  Object.entries(FONT_SIZES).forEach(([key, value]) => {
    properties[`--font-size-${key}`] = responsiveFontSize(key as keyof typeof FONT_SIZES);
  });

  // Image sizes
  Object.entries(IMAGE_SIZES).forEach(([key, value]) => {
    properties[`--image-size-${key}`] = responsiveImageSize(key as keyof typeof IMAGE_SIZES);
  });

  // Spacing
  Object.entries(SPACING).forEach(([key, value]) => {
    properties[`--spacing-${key.replace('.', '-')}`] = responsiveSpacing(key as keyof typeof SPACING);
  });

  // Container sizes
  Object.entries(CONTAINER_SIZES).forEach(([key, value]) => {
    properties[`--container-${key}`] = responsiveContainer(key as keyof typeof CONTAINER_SIZES);
  });

  return properties;
}

// App Configuration
export const APP_CONFIG = {
  name: 'Kanzler',
  description: 'Premium Sausages & Meat Products',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://kanzler.id',
  version: '1.0.0',
} as const

// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 30000,
} as const

// Animation Configuration
export const ANIMATION_CONFIG = {
  defaultDuration: 0.6,
  defaultEasing: 'easeOut',
  staggerDelay: 0.1,
  reducedMotion: false,
} as const

// Breakpoints (matches Tailwind CSS)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

// Product Categories
export const PRODUCT_CATEGORIES = {
  HOMEPACK: 'homepack',
  SINGLES: 'singles',
  SAUSAGES: 'sausages',
  NUGGETS: 'nuggets',
  MEATBALLS: 'meatballs',
} as const

// Navigation Routes
export const ROUTES = {
  HOME: '/',
  OUR_STORY: '/our-story',
  PRODUCTS: '/products',
  RECIPES: '/recipes',
  STORES: '/stores',
  CONTACT: '/contact',
} as const

// Social Media Links
export const SOCIAL_LINKS = {
  INSTAGRAM: 'https://instagram.com/kanzler_id',
  FACEBOOK: 'https://facebook.com/kanzler.indonesia',
  TWITTER: 'https://twitter.com/kanzler_id',
  YOUTUBE: 'https://youtube.com/@kanzler_id',
  TIKTOK: 'https://tiktok.com/@kanzler_id',
} as const

// Company Information
export const COMPANY_INFO = {
  name: 'PT Kanzler Indonesia',
  founded: 1999,
  email: 'contact@kanzler.id',
  phone: '+62 21 555-1234',
  address: 'Jakarta, Indonesia',
  description: 'Kanzler has been delivering exceptional meat products since 1999, with a commitment to quality in every bite.',
} as const

// SEO Configuration
export const SEO_CONFIG = {
  defaultTitle: 'Kanzler | Premium Sausages & Meat Products',
  titleTemplate: '%s | Kanzler',
  defaultDescription: 'Discover Kanzler\'s premium quality sausages and meat products. Made with the finest ingredients for delicious meals every day.',
  keywords: [
    'sausages',
    'meat products', 
    'premium quality',
    'Indonesian food',
    'Kanzler',
    'homepack',
    'singles',
    'nuggets',
    'meatballs'
  ],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Kanzler',
  },
} as const

// Theme Configuration
export const THEME_CONFIG = {
  colors: {
    primary: '#1E2756',
    gold: '#AA7B32',
    goldLight: '#CA8B3A',
    goldDark: '#8A6B2A',
    navy: '#1E2756',
    dark: '#1A1A1A',
    light: '#F5F5F5',
  },
  fonts: {
    sans: 'var(--font-sans)',
    heading: 'var(--font-heading)',
  },
} as const

// Feature Flags
export const FEATURES = {
  NEWSLETTER: true,
  CART: true,
  WISHLIST: false,
  REVIEWS: true,
  STORE_LOCATOR: true,
  RECIPES: true,
} as const

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  NOT_FOUND: 'The page you are looking for does not exist.',
  UNAUTHORIZED: 'You are not authorized to access this page.',
  VALIDATION: 'Please check your input and try again.',
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  NEWSLETTER_SUBSCRIBED: 'Thank you for subscribing to our newsletter!',
  CONTACT_FORM_SENT: 'Your message has been sent successfully!',
  PRODUCT_ADDED_TO_CART: 'Product added to cart!',
} as const

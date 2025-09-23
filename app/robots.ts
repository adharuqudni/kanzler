import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NODE_ENV === 'production'
  
  if (!isProduction) {
    // Block all crawling in development
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  // Allow crawling in production
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/scripts/'],
    },
    sitemap: 'https://kanzler.co.id/sitemap.xml',
  }
}

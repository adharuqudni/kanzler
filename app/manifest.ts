import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
0b  const isProduction = process.env.NODE_ENV === 'production'
  
  if (!isProduction) {
    return {
      name: 'Kanzler Dev',
      short_name: 'Kanzler Dev',
      description: 'Development environment for Kanzler website',
      start_url: '/',
      display: 'standalone',
      background_color: '#1C2653',
      theme_color: '#AA7B32',
      icons: [
        {
          src: '/favicon.svg',
          sizes: 'any',
          type: 'image/svg+xml',
        },
      ],
    }
  }

  return {
    name: 'Kanzler - Premium Sausages & Meat Products',
    short_name: 'Kanzler',
    description: 'Indonesia\'s leading premium sausage manufacturer since 1999. Extra Meaty, Extra Juicy products.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1C2653',
    theme_color: '#AA7B32',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/assets/ASSET - HOME/1 ASSET - HOME/crown_white.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/assets/ASSET - HOME/1 ASSET - HOME/crown_white.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
    ],
    categories: ['food', 'business', 'shopping'],
    lang: 'id',
  }
}

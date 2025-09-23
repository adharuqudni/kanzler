import Head from 'next/head'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
}

export default function SEOHead({
  title = "Kanzler | Premium Sausages & Meat Products",
  description = "Indonesia's leading premium sausage manufacturer since 1999",
  keywords = [],
  canonical,
  ogImage = "/assets/ASSET - HOME/1 ASSET - HOME/crown_white.svg"
}: SEOHeadProps) {
  const baseKeywords = [
    "sausages indonesia", "nugget crispy", "beef cocktail", "premium meat products",
    "kanzler", "extra meaty", "extra juicy", "ready to cook", "indonesian food"
  ]
  
  const allKeywords = [...baseKeywords, ...keywords].join(", ")

  return (
    <Head>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Language and geo targeting */}
      <meta name="language" content="Indonesian" />
      <meta name="geo.region" content="ID" />
      <meta name="geo.country" content="Indonesia" />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="id_ID" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Mobile optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  )
}

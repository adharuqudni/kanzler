import Script from 'next/script'

interface OrganizationStructuredDataProps {
  type?: 'Organization' | 'LocalBusiness' | 'FoodEstablishment'
}

export function OrganizationStructuredData({ type = 'Organization' }: OrganizationStructuredDataProps) {
  const isProduction = process.env.NODE_ENV === 'production'
  
  if (!isProduction) {
    return null
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    "name": "Kanzler Indonesia",
    "description": "Indonesia's leading premium sausage and meat products manufacturer since 1999. Extra Meaty, Extra Juicy products available in 498+ cities.",
    "url": "https://kanzler.co.id",
    "logo": "https://kanzler.co.id/assets/ASSET - HOME/1 ASSET - HOME/crown_white.svg",
    "foundingDate": "1999",
    "slogan": "Extra Meaty, Extra Juicy",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Indonesia",
      "addressRegion": "Indonesia"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "areaServed": "Indonesia"
    },
    "sameAs": [
      "https://www.instagram.com/kanzler.id",
      "https://www.tiktok.com/@kanzler.id"
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Premium Sausages",
          "description": "Premium quality sausages including bratwurst, frankfurter, and beef cocktail"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Product",
          "name": "Premium Nuggets",
          "description": "Extra meaty, extra juicy nuggets including crispy, premium, spicy, and stick varieties"
        }
      }
    ]
  }

  return (
    <Script
      id="structured-data-organization"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

interface ProductStructuredDataProps {
  name: string
  description: string
  image: string
  category: string
  brand?: string
}

export function ProductStructuredData({ 
  name, 
  description, 
  image, 
  category,
  brand = "Kanzler"
}: ProductStructuredDataProps) {
  const isProduction = process.env.NODE_ENV === 'production'
  
  if (!isProduction) {
    return null
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${brand} ${name}`,
    "description": description,
    "image": `https://kanzler.co.id${image}`,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    "category": category,
    "manufacturer": {
      "@type": "Organization",
      "name": "Kanzler Indonesia"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "IDR"
    }
  }

  return (
    <Script
      id={`structured-data-product-${name.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url?: string }> }) {
  const isProduction = process.env.NODE_ENV === 'production'
  
  if (!isProduction) {
    return null
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      ...(item.url && { "item": `https://kanzler.co.id${item.url}` })
    }))
  }

  return (
    <Script
      id="structured-data-breadcrumb"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Mona_Sans as FontSans } from "next/font/google"
import localFont from "next/font/local"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ConditionalNavbar from "@/components/ConditionalNavbar"
import Footer from "@/components/footer"
import { OrganizationStructuredData } from "@/components/seo/StructuredData"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const isProduction = process.env.NODE_ENV === 'production'

export const metadata: Metadata = {
  title: {
    default: "Kanzler | Premium Sausages & Meat Products Since 1999",
    template: "%s | Kanzler"
  },
  description:
    "Kanzler - Indonesia's leading premium sausage and meat products manufacturer since 1999. Extra Meaty, Extra Juicy nuggets, cocktail sausages, bratwurst, and frankfurter. Available in 498+ cities across Indonesia.",
  keywords: isProduction ? [
    "sausages Indonesia", "nugget crispy", "beef cocktail", "bratwurst", "frankfurter",
    "premium meat products", "ready to cook", "Indonesian food", "Kanzler",
    "extra meaty", "extra juicy", "nugget stick", "cheese bratwurst",
    "smoked beef", "beef wiener", "homepack", "singles"
  ] : ["kanzler", "development"],
  authors: isProduction ? [{ name: "Kanzler Team", url: "https://kanzler.co.id" }] : [{ name: "Dev Team" }],
  creator: isProduction ? "Kanzler Indonesia" : undefined,
  publisher: isProduction ? "Kanzler Indonesia" : undefined,
  generator: 'Next.js',
  metadataBase: isProduction ? new URL('https://kanzler.co.id') : new URL('http://localhost:3000'),
  alternates: isProduction ? {
    canonical: 'https://kanzler.co.id',
    languages: {
      'id-ID': 'https://kanzler.co.id',
      'en-US': 'https://kanzler.co.id/en',
    },
  } : undefined,
  openGraph: isProduction ? {
    title: "Kanzler | Premium Sausages & Meat Products Since 1999",
    description: "Indonesia's leading premium sausage manufacturer. Extra Meaty, Extra Juicy products available in 498+ cities. Nuggets, cocktail sausages, bratwurst & more.",
    type: "website",
    locale: "id_ID",
    url: "https://kanzler.co.id",
    siteName: "Kanzler Indonesia",
    images: [
      {
        url: "/assets/ASSET - HOME/1 ASSET - HOME/crown_white.svg",
        width: 1200,
        height: 630,
        alt: "Kanzler Premium Sausages & Meat Products",
      },
    ],
  } : {
    title: "Kanzler Dev",
    description: "Development environment for Kanzler website",
  },
  twitter: isProduction ? {
    card: "summary_large_image",
    title: "Kanzler | Premium Sausages & Meat Products",
    description: "Indonesia's leading premium sausage manufacturer since 1999. Extra Meaty, Extra Juicy products.",
    images: ["/assets/ASSET - HOME/1 ASSET - HOME/crown_white.svg"],
  } : undefined,
  robots: isProduction ? {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  } : {
    index: false,
    follow: false,
  },
  verification: isProduction ? {
    google: 'your-google-verification-code',
  } : undefined,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        <meta name="theme-color" content="#AA7B32" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${fontSans.variable} font-sans antialiased`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem 
          disableTransitionOnChange
        >
          <OrganizationStructuredData />
          <div className="min-h-screen flex flex-col">
            <ConditionalNavbar />
            <main className="flex-1">
              {children}
            </main>
           
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
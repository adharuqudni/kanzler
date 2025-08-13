import type React from "react"
import type { Metadata } from "next"
import { Mona_Sans as FontSans } from "next/font/google"
import localFont from "next/font/local"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navigation/Navbar"
import Footer from "@/components/footer"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Custom font for headings - uncomment when font file is available
// const fontHeading = localFont({
//   src: "../public/fonts/CanelaTrial-Medium.woff2",
//   variable: "--font-heading",
//   display: "swap",
// })

export const metadata: Metadata = {
  title: "Kanzler | Premium Sausages & Meat Products",
  description:
    "Discover Kanzler's premium quality sausages and meat products. Made with the finest ingredients for delicious meals every day.",
  keywords: "sausages, meat products, premium quality, Indonesian food, Kanzler",
  authors: [{ name: "Kanzler Team" }],
  generator: 'Next.js',
  openGraph: {
    title: "Kanzler | Premium Sausages & Meat Products",
    description: "Discover Kanzler's premium quality sausages and meat products. Made with the finest ingredients for delicious meals every day.",
    type: "website",
    locale: "id_ID",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} font-sans antialiased`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem 
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
           
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

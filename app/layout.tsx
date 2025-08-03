import type React from "react"
import type { Metadata } from "next"
import { Mona_Sans as FontSans } from "next/font/google"
import localFont from "next/font/local"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// // Custom font for headings
// const fontHeading = localFont({
//   src: "../public/fonts/CanelaTrial-Medium.woff2",
//   variable: "--font-heading",
//   display: "swap",
// })

export const metadata: Metadata = {
  title: "Kanzler | Premium Sausages & Meat Products",
  description:
    "Discover Kanzler's premium quality sausages and meat products. Made with the finest ingredients for delicious meals every day.",
    generator: 'v0.dev'
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable}  font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}

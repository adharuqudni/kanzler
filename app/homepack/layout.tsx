import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import SinglesSidebar from "@/components/navigation/SinglesSidebar"

export const metadata: Metadata = {
  title: "Kanzler Homepack | Premium Ready-to-Cook Products",
  description:
    "Discover Kanzler Homepack - premium ready-to-cook sausages, nuggets, and meat products. Made with the finest ingredients for delicious home cooking.",
  keywords: "homepack, ready to cook, sausages, nuggets, premium quality, Kanzler",
  openGraph: {
    title: "Kanzler Homepack | Premium Ready-to-Cook Products",
    description: "Discover Kanzler Homepack - premium ready-to-cook sausages, nuggets, and meat products.",
    type: "website",
    locale: "id_ID",
  },
}

export default function HomepackLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen relative">
      <main className="w-full">
      <SinglesSidebar />

        {children}
      </main>
    </div>
  )
}

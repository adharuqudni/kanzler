import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import SinglesSidebar from "@/components/navigation/SinglesSidebar"

const isProduction = process.env.NODE_ENV === 'production'

export const metadata: Metadata = {
  title: "Homepack - Premium Ready-to-Cook Sausages & Nuggets",
  description:
    "Kanzler Homepack - Premium ready-to-cook nuggets, beef cocktail, bratwurst, frankfurter. Extra Meaty, Extra Juicy products for delicious home cooking. Available across Indonesia.",
  keywords: isProduction ? [
    "homepack", "ready to cook sausages", "nugget crispy indonesia", "beef cocktail sausage",
    "bratwurst cheese", "frankfurter blackpepper", "smoked beef", "beef wiener",
    "premium meat products", "extra meaty", "extra juicy", "kanzler homepack",
    "sosis siap masak", "nugget premium", "daging olahan berkualitas"
  ] : ["homepack", "development"],
  openGraph: isProduction ? {
    title: "Kanzler Homepack | Premium Ready-to-Cook Sausages & Nuggets",
    description: "Premium ready-to-cook nuggets, beef cocktail, bratwurst & frankfurter. Extra Meaty, Extra Juicy for delicious home cooking.",
    type: "website",
    locale: "id_ID",
    url: "https://kanzler.co.id/homepack",
    images: [
      {
        url: "/assets/ASSET - HOMEPACK/1 ASSET - HOMEPACK/1 ASSET - HOMEPACK LOGO.png",
        width: 1200,
        height: 630,
        alt: "Kanzler Homepack Premium Ready-to-Cook Products",
      },
    ],
  } : {
    title: "Homepack Dev",
    description: "Development - Homepack products",
  },
  twitter: isProduction ? {
    card: "summary_large_image",
    title: "Kanzler Homepack | Premium Ready-to-Cook Products",
    description: "Premium nuggets, beef cocktail, bratwurst & frankfurter for home cooking.",
  } : undefined,
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

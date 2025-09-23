import type { Metadata } from "next"
import SinglesSidebar from "@/components/navigation/SinglesSidebar"
import { ThemeProvider } from "@/components/theme-provider"

const isProduction = process.env.NODE_ENV === 'production'

export const metadata: Metadata = {
  title: "Singles - Premium Single-Serve Sausages & Meatballs",
  description:
    "Kanzler Singles - Premium single-serve sausages and meatballs, ready to eat. Perfect individual portions for busy lifestyle. Sosis gochu, bakso hot & more premium products.",
  keywords: isProduction ? [
    "singles sausage", "single serve meatballs", "sosis gochu", "bakso hot",
    "ready to eat sausage", "individual portion", "premium meatballs",
    "sosis siap makan", "bakso premium", "kanzler singles",
    "quick meal indonesia", "protein snack", "convenient food"
  ] : ["singles", "development"],
  openGraph: isProduction ? {
    title: "Kanzler Singles | Premium Single-Serve Sausages & Meatballs",
    description: "Premium single-serve sausages and meatballs, ready to eat. Perfect individual portions - sosis gochu, bakso hot & more.",
    type: "website",
    locale: "id_ID",
    url: "https://kanzler.co.id/singles",
    images: [
      {
        url: "/assets/ASSET - SINGLES/2 ASSET - SINGLES/2 ASSET - SINGLES LOGO.png",
        width: 1200,
        height: 630,
        alt: "Kanzler Singles Premium Single-Serve Products",
      },
    ],
  } : {
    title: "Singles Dev",
    description: "Development - Singles products",
  },
  twitter: isProduction ? {
    card: "summary_large_image",
    title: "Kanzler Singles | Premium Single-Serve Products",
    description: "Premium single-serve sausages and meatballs, ready to eat. Perfect individual portions.",
  } : undefined,
}

export default function SinglesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen relative">
      <SinglesSidebar />
      <main className="w-full">
        {children}
      </main>
    </div>
  )
}

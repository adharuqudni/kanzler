import type { Metadata } from "next"
import SinglesSidebar from "@/components/navigation/SinglesSidebar"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Kanzler Singles | Premium Single-Serve Products",
  description:
    "Discover Kanzler Singles - premium single-serve sausages and meatballs perfect for individual portions. Quality you can taste in every bite.",
  keywords: "singles, single serve, sausages, meatballs, premium quality, Kanzler",
  openGraph: {
    title: "Kanzler Singles | Premium Single-Serve Products",
    description: "Discover Kanzler Singles - premium single-serve sausages and meatballs perfect for individual portions.",
    type: "website",
    locale: "id_ID",
  },
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

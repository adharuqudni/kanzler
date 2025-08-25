'use client'

import { usePathname } from 'next/navigation'
import Navbar from "@/components/navigation/Navbar"

export default function ConditionalNavbar() {
  const pathname = usePathname()
  const showNavbar = pathname === '/'

  return showNavbar ? <Navbar /> : null
}

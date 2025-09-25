'use client'

import { usePathname } from 'next/navigation'
import Navbar from "@/components/navigation/Navbar"
import SinglesSidebar from './navigation/SinglesSidebar'

export default function ConditionalNavbar() {
  const pathname = usePathname()
  const showNavbar = pathname === '/'

  return showNavbar ? <Navbar /> : <SinglesSidebar />
}

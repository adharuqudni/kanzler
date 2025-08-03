"use client"

import { useState } from "react"
import Link from "next/link"

const navItems = [
  { name: "Our Story", href: "/our-story" },
  { name: "Product", href: "/products" },
  { name: "Recipes", href: "/recipes" },
  { name: "Buy Here", href: "/stores" },
]

export default function ScrollNavbar() {
  const [activeItem, setActiveItem] = useState("Our Story")

  return (
    <div className="w-full bg-gold-gradient py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 mr-2">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M12 1L15.5 8.5H8.5L12 1Z" fill="#1E2756" />
              <path d="M12 1L8.5 8.5H1L12 1Z" fill="#1E2756" />
              <path d="M12 1L15.5 8.5H23L12 1Z" fill="#1E2756" />
              <path d="M8.5 8.5H15.5L12 16L8.5 8.5Z" fill="#1E2756" />
              <path d="M1 8.5H8.5L4.75 16L1 8.5Z" fill="#1E2756" />
              <path d="M15.5 8.5H23L19.25 16L15.5 8.5Z" fill="#1E2756" />
              <path d="M4.75 16L8.5 23H1L4.75 16Z" fill="#1E2756" />
              <path d="M12 16L15.5 23H8.5L12 16Z" fill="#1E2756" />
              <path d="M19.25 16L23 23H15.5L19.25 16Z" fill="#1E2756" />
            </svg>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-12">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-base font-medium transition-colors text-kanzler-navy hover:text-white ${
                activeItem === item.name ? "text-white" : ""
              }`}
              onClick={() => setActiveItem(item.name)}
            >
              {item.name === "Product" ? (
                <span className="px-5 py-2 rounded-full bg-kanzler-navy text-white">{item.name}</span>
              ) : (
                item.name
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

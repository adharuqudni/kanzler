"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Instagram, Facebook, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribed with:", email)
    setEmail("")
  }

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const socialIcons = [
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Youtube className="h-5 w-5" />, href: "#", label: "YouTube" },
  ]

  const contactInfo = [
    { icon: <Mail className="h-5 w-5" />, text: "contact@kanzler.com" },
    { icon: <Phone className="h-5 w-5" />, text: "+62 21 555-1234" },
    { icon: <MapPin className="h-5 w-5" />, text: "Head Office: Jakarta, Indonesia" },
  ]

  const footerLinks = [
    {
      title: "Products",
      links: [
        { name: "Sausages", href: "#" },
        { name: "Meat Cuts", href: "#" },
        { name: "Ready Meals", href: "#" },
        { name: "New Products", href: "#" },
        { name: "Bestsellers", href: "#" },
      ],
    },
    {
      title: "Help",
      links: [
        { name: "Customer Service", href: "#" },
        { name: "Product FAQ", href: "#" },
        { name: "Cooking Tips", href: "#" },
        { name: "Nutrition Facts", href: "#" },
      ],
    },
    {
      title: "About",
      links: [
        { name: "Our Story", href: "#" },
        { name: "Quality Standards", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
      ],
    },
  ]

  return (
    <motion.footer
      className="bg-kanzler-navy text-kanzler-white pt-16 pb-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 mr-2">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M12 1L15.5 8.5H8.5L12 1Z" fill="#B89E5C" />
                  <path d="M12 1L8.5 8.5H1L12 1Z" fill="#B89E5C" />
                  <path d="M12 1L15.5 8.5H23L12 1Z" fill="#B89E5C" />
                  <path d="M8.5 8.5H15.5L12 16L8.5 8.5Z" fill="#B89E5C" />
                  <path d="M1 8.5H8.5L4.75 16L1 8.5Z" fill="#B89E5C" />
                  <path d="M15.5 8.5H23L19.25 16L15.5 8.5Z" fill="#B89E5C" />
                  <path d="M4.75 16L8.5 23H1L4.75 16Z" fill="#B89E5C" />
                  <path d="M12 16L15.5 23H8.5L12 16Z" fill="#B89E5C" />
                  <path d="M19.25 16L23 23H15.5L19.25 16Z" fill="#B89E5C" />
                </svg>
              </div>
              <h3 className="text-xl font-heading">KANZLER</h3>
            </div>
            <p className="text-sm text-gray-300 max-w-xs">
              Premium quality sausages and meat products made with the finest ingredients for delicious meals every day.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="hover:text-kanzler-gold transition-colors"
                  whileHover={{ scale: 1.1 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {footerLinks.map((section, idx) => (
            <motion.div key={section.title} variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-medium">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div variants={itemVariants} className="space-y-4 md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-medium">Newsletter</h3>
            <p className="text-sm text-gray-300">
              Subscribe to receive updates on new products, recipes, and exclusive offers.
            </p>
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
              <Button
                type="submit"
                className="bg-gold-gradient bg-[length:200%_auto] animate-shine text-kanzler-dark hover:opacity-90"
              >
                Subscribe
              </Button>
            </form>

            <div className="space-y-2 mt-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <Separator className="my-8 bg-white/20" />

        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400"
        >
          <p>© {new Date().getFullYear()} Kanzler. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

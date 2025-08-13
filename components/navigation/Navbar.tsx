'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, ShoppingBag, User, Search, X } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useMobile } from '@/hooks/use-mobile'
import InteractiveButton from '@/components/animations/InteractiveButton'
import MotionWrapper from '@/components/animations/MotionWrapper'
import { cn } from '@/lib/utils'

interface NavItem {
  name: string
  href: string
  isSpecial?: boolean
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Our Story', href: '/our-story' },
  { name: 'Products', href: '/products', isSpecial: true },
  { name: 'Recipes', href: '/recipes' },
  { name: 'Buy Here', href: '/stores' },
]

interface NavbarProps {
  variant?: 'default' | 'transparent' | 'solid'
  showOnScroll?: boolean
  className?: string
}

export default function Navbar({ 
  variant = 'default', 
  showOnScroll = true,
  className = '' 
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()
  const { scrollYProgress } = useScroll()

  // Scroll-based navbar visibility
  const navbarOpacity = useTransform(
    scrollYProgress, 
    [0.15, 0.20], 
    showOnScroll ? [0, 1] : [1, 1]
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getNavbarStyles = () => {
    switch (variant) {
      case 'transparent':
        return 'bg-transparent'
      case 'solid':
        return 'bg-kanzler-navy'
      default:
        return isScrolled
          ? 'bg-kanzler-navy/95 backdrop-blur-md shadow-sm'
          : 'bg-kanzler-navy'
    }
  }

  return (
    <motion.div
      className={cn("fixed top-0 left-0 right-0 z-40", className)}
      style={{ opacity: navbarOpacity }}
    >
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        getNavbarStyles()
      )}>
        <div className="container flex items-center justify-between h-16 md:h-20">
          
          {/* Logo Section */}
          <LogoSection />

          {/* Desktop Navigation */}
          {!isMobile && (
            <DesktopNavigation navItems={navItems} pathname={pathname} />
          )}

          {/* Action Buttons */}
          <ActionButtons />

          {/* Mobile Menu */}
          {isMobile && (
            <MobileMenu 
              navItems={navItems} 
              pathname={pathname}
              isOpen={isMobileMenuOpen}
              onOpenChange={setIsMobileMenuOpen}
            />
          )}
        </div>
      </header>
    </motion.div>
  )
}

function LogoSection() {
  return (
    <MotionWrapper variant="fadeInLeft" delay={0.1}>
      <Link href="/" className="flex items-center group">
        <InteractiveButton variant="scale" className="p-0 bg-transparent hover:bg-transparent">
          <div className="flex items-center">
            <KanzlerLogo className="w-8 h-8 mr-2" />
            <span className="text-xl md:text-2xl font-heading font-bold tracking-wider text-white group-hover:text-kanzler-gold transition-colors">
              KANZLER
            </span>
          </div>
        </InteractiveButton>
      </Link>
    </MotionWrapper>
  )
}

function DesktopNavigation({ navItems, pathname }: { 
  navItems: NavItem[]
  pathname: string 
}) {
  return (
    <MotionWrapper variant="fadeInUp" delay={0.2}>
      <nav className="hidden md:flex items-center space-x-8">
        {navItems.map((item, index) => (
          <NavLink 
            key={item.name} 
            item={item} 
            pathname={pathname}
            delay={index * 0.05}
          />
        ))}
      </nav>
    </MotionWrapper>
  )
}

function NavLink({ item, pathname, delay }: { 
  item: NavItem
  pathname: string
  delay: number 
}) {
  const isActive = pathname === item.href
  
  if (item.isSpecial) {
    return (
      <MotionWrapper variant="fadeInUp" delay={delay}>
        <InteractiveButton variant="scale">
          <Link
            href={item.href}
            className="px-5 py-2 rounded-full bg-gold-gradient bg-[length:200%_auto] animate-shine text-kanzler-dark font-medium transition-all hover:shadow-md"
          >
            {item.name}
          </Link>
        </InteractiveButton>
      </MotionWrapper>
    )
  }

  return (
    <MotionWrapper variant="fadeInUp" delay={delay}>
      <Link
        href={item.href}
        className={cn(
          "text-sm font-medium transition-colors text-white hover:text-kanzler-gold relative group",
          isActive && "text-kanzler-gold"
        )}
      >
        {item.name}
        <span 
          className={cn(
            "absolute -bottom-1 left-0 h-0.5 bg-kanzler-gold transition-all duration-300",
            isActive ? "w-full" : "w-0 group-hover:w-full"
          )}
        />
      </Link>
    </MotionWrapper>
  )
}

function ActionButtons() {
  return (
    <MotionWrapper variant="fadeInRight" delay={0.3}>
      <div className="flex items-center space-x-2">
        <InteractiveButton variant="scale">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-kanzler-navy/20 hover:text-kanzler-gold"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </InteractiveButton>

        <InteractiveButton variant="scale">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-kanzler-navy/20 hover:text-kanzler-gold"
          >
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
        </InteractiveButton>

        <InteractiveButton variant="scale">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-kanzler-navy/20 hover:text-kanzler-gold relative"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Cart</span>
            {/* Cart count badge */}
            <span className="absolute -top-1 -right-1 bg-kanzler-gold text-kanzler-dark text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Button>
        </InteractiveButton>
      </div>
    </MotionWrapper>
  )
}

function MobileMenu({ 
  navItems, 
  pathname, 
  isOpen, 
  onOpenChange 
}: { 
  navItems: NavItem[]
  pathname: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button className="mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-kanzler-navy/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-kanzler-navy border-kanzler-gold/20">
        <div className="flex flex-col h-full">
          
          {/* Mobile Logo */}
          <div className="flex items-center mb-8 pt-4">
            <KanzlerLogo className="w-8 h-8 mr-2" />
            <span className="text-xl font-heading font-bold tracking-wider text-white">
              KANZLER
            </span>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex flex-col gap-4 flex-1">
            {navItems.map((item, index) => (
              <MotionWrapper
                key={item.name}
                variant="fadeInLeft"
                delay={index * 0.1}
              >
                <Link
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-kanzler-gold p-2 rounded-lg",
                    pathname === item.href 
                      ? 'text-kanzler-gold bg-kanzler-gold/10' 
                      : 'text-white hover:bg-white/5'
                  )}
                >
                  {item.name}
                </Link>
              </MotionWrapper>
            ))}
          </nav>

          {/* Mobile Footer */}
          <div className="border-t border-white/10 pt-4 mt-4">
            <p className="text-sm text-white/60 text-center">
              © 2024 Kanzler. Premium Quality.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function KanzlerLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
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
  )
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ShoppingBag, User, Search } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useMobile } from '@/hooks/use-mobile';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Our Story', href: '/our-story' },
  { name: 'Products', href: '/products' },
  { name: 'Recipes', href: '/recipes' },
  { name: 'Buy Here', href: '/stores' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isMobile = useMobile();
  const { scrollYProgress } = useScroll();
  const navbarOpacity = useTransform(scrollYProgress, [0.15, 0.20], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-40"
      style={{ opacity: navbarOpacity }}
    >
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-kanzler-navy/95 backdrop-blur-md shadow-sm'
            : 'bg-kanzler-navy'
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            {isMobile ? (
              <Sheet>
                <SheetTrigger asChild>
                  <button className="mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-kanzler-navy/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <div className="flex items-center mb-8">
                    <div className="w-8 h-8 mr-2">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                      >
                        <path d="M12 1L15.5 8.5H8.5L12 1Z" fill="#B89E5C" />
                        <path d="M12 1L8.5 8.5H1L12 1Z" fill="#B89E5C" />
                        <path d="M12 1L15.5 8.5H23L12 1Z" fill="#B89E5C" />
                        <path d="M8.5 8.5H15.5L12 16L8.5 8.5Z" fill="#B89E5C" />
                        <path d="M1 8.5H8.5L4.75 16L1 8.5Z" fill="#B89E5C" />
                        <path
                          d="M15.5 8.5H23L19.25 16L15.5 8.5Z"
                          fill="#B89E5C"
                        />
                        <path d="M4.75 16L8.5 23H1L4.75 16Z" fill="#B89E5C" />
                        <path d="M12 16L15.5 23H8.5L12 16Z" fill="#B89E5C" />
                        <path
                          d="M19.25 16L23 23H15.5L19.25 16Z"
                          fill="#B89E5C"
                        />
                      </svg>
                    </div>
                    <span className="text-xl font-heading font-bold tracking-wider">
                      KANZLER
                    </span>
                  </div>
                  <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`text-lg font-medium transition-colors hover:text-kanzler-gold ${
                          pathname === item.href ? 'text-kanzler-gold' : ''
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            ) : null}

            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 mr-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
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
              </div>
              <span className="text-xl md:text-2xl font-heading font-bold tracking-wider text-white">
                KANZLER
              </span>
            </Link>
          </div>

          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => {
                // Apply gold gradient to "Product" button
                if (item.name === 'Products') {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-5 py-2 rounded-full bg-gold-gradient bg-[length:200%_auto] animate-shine text-kanzler-dark font-medium transition-all hover:shadow-md`}
                    >
                      {item.name}
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-sm font-medium transition-colors text-white hover:text-kanzler-gold ${
                      pathname === item.href ? 'text-kanzler-gold' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          )}

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-kanzler-navy/20"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-kanzler-navy/20"
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-kanzler-navy/20"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
          </div>
        </div>
      </header>
    </motion.div>
  );
}

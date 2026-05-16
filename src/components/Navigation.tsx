"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import Logo from "./Logo";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navLinks = [
    { name: "Ecosystem", href: "/products" },
    { name: "Community", href: "/community" },
    { name: "Partner Program", href: "/partner" },
  ];

  const isHome = pathname === "/";
  
  const navColor = isHome 
    ? (isScrolled ? "text-white bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5" : "text-white bg-transparent border-b border-transparent")
    : (isScrolled || !isHome ? "text-bewell-text bg-white/80 backdrop-blur-md border-b border-black/5" : "text-white bg-transparent border-b border-transparent");
    
  const logoColor = isHome ? "text-white" : (isScrolled || !isHome ? "text-bewell-green" : "text-white");

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${navColor}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className={`${logoColor} transition-colors duration-300`}>
              <Logo />
            </Link>
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-sm font-medium hover:opacity-70 transition-opacity"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="hidden md:block hover:opacity-70 transition-opacity">
              <User className="w-5 h-5" />
            </Link>
            <Link href="/cart" className="hover:opacity-70 transition-opacity relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-bewell-gold text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">3</span>
            </Link>
            <button 
              className="md:hidden hover:opacity-70"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-bewell-ivory flex flex-col p-6"
        >
          <div className="flex justify-between items-center h-14 border-b border-black/5">
            <span className="text-2xl font-semibold text-bewell-green">BeWell</span>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="w-8 h-8 text-bewell-text" />
            </button>
          </div>
          <div className="flex flex-col gap-8 mt-12 text-3xl font-medium text-bewell-text">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-bewell-green transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-bewell-green transition-colors"
            >
              Account
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
}

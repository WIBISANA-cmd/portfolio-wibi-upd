"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import GlassSurface from "@/components/GlassSurface";
import logoImage from "@/app/logo.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50 px-3 sm:px-4 md:px-6 py-3 md:py-4"
    >
      <GlassSurface
        width="100%"
        borderRadius={18}
        borderWidth={0.08}
        displace={0.35}
        backgroundOpacity={scrolled ? 0.14 : 0.08}
        saturation={1.25}
        opacity={0.88}
        brightness={52}
        className={cn(
          "mx-auto max-w-7xl transition-all duration-300",
          scrolled ? "shadow-xl" : "shadow-none"
        )}
      >
        <div className="w-full px-3 sm:px-4 md:px-6 py-2.5 md:py-3">
          <div className="flex items-center justify-between gap-3">
            <Link href="/" className="hover:opacity-80 transition-opacity shrink-0">
              <Image
                src={logoImage}
                alt="Logo"
                width={40}
                height={40}
                className="h-8 sm:h-9 md:h-10 w-auto object-contain"
                priority
              />
            </Link>

            <nav className="hidden md:flex items-center gap-5 lg:gap-8 text-sm font-medium">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-white/70 hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              href="#contact"
              className="hidden md:inline-flex px-3 sm:px-4 md:px-5 py-2 text-xs sm:text-sm font-medium bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all whitespace-nowrap"
            >
              Contact Me
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white/90 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

          {mobileOpen && (
            <nav className="mt-3 md:hidden grid gap-2 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/75 hover:text-white transition-colors px-3 py-2.5 rounded-xl bg-white/5 border border-white/10"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all"
              >
                Contact Me
              </Link>
            </nav>
          )}
        </div>
      </GlassSurface>
    </motion.header>
  );
}

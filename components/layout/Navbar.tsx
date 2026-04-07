"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import GlassSurface from "@/components/GlassSurface";
import logoImage from "@/app/logo.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50 px-4 md:px-6 py-4"
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
        <div className="w-full flex items-center justify-between px-4 md:px-6 py-3">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src={logoImage}
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#about" className="text-white/70 hover:text-white transition-colors">About</Link>
            <Link href="#experience" className="text-white/70 hover:text-white transition-colors">Experience</Link>
            <Link href="#projects" className="text-white/70 hover:text-white transition-colors">Projects</Link>
          </nav>

          <button className="px-5 py-2 text-sm font-medium bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all">
            Contact Me
          </button>
        </div>
      </GlassSurface>
    </motion.header>
  );
}

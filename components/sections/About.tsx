"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import meImage from "@/app/me.png";

type AboutProps = {
  aboutText?: string | null;
};

const fallbackAboutText =
  "Saya adalah Sarjana Informatika dengan pengalaman dalam pengembangan web modern menggunakan Laravel, React, dan berbagai teknologi lainnya. Saya memiliki fokus pada pembuatan sistem yang scalable, user-friendly, dan memiliki performa tinggi.";

export function About({ aboutText }: AboutProps) {
  const content = aboutText?.trim() || fallbackAboutText;

  return (
    <section id="about" className="relative py-20 sm:py-24 md:py-28 lg:py-32 overflow-hidden">
      <div className="container px-4 sm:px-6 mx-auto relative z-10">
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden max-w-4xl mr-auto"
          >
            {/* Subtle inner glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/10 blur-[80px] rounded-full pointer-events-none" />
            
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 sm:mb-8 text-white">
              About <span className="text-white/40">Me.</span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-white/80 font-light mix-blend-plus-lighter">
              {content}
            </p>

            <div className="mt-6 sm:mt-8">
              <a
                href="/cv-wibisana.pdf"
                download
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm sm:text-base font-medium text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                Download CV
              </a>
            </div>

            <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { label: "Experience", value: "1+ Years" },
                { label: "Projects", value: "10+" },
                { label: "Focus", value: "Fullstack" },
                { label: "Tech", value: "Modern" },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                  className="space-y-1.5 sm:space-y-2 border-l border-white/10 pl-3 sm:pl-4 md:pl-6"
                >
                  <p className="text-2xl sm:text-3xl font-light text-white">{stat.value}</p>
                  <p className="text-[11px] sm:text-xs text-white/40 uppercase tracking-[0.16em] sm:tracking-widest">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative mt-8 sm:mt-10 md:mt-12 lg:mt-0 w-full max-w-[360px] md:max-w-[440px] mx-auto lg:mx-0 lg:absolute lg:right-[-24px] xl:right-[-36px] 2xl:right-[-48px] lg:bottom-0 lg:w-[380px] xl:w-[460px] 2xl:w-[520px]"
          >
            <Image
              src={meImage}
              alt="Foto profil Wibisana"
              className="w-full h-auto object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

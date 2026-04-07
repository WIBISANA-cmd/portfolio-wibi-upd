"use client";

import { motion } from "framer-motion";

type AboutProps = {
  aboutText?: string | null;
};

const fallbackAboutText =
  "Saya adalah Sarjana Informatika dengan pengalaman dalam pengembangan web modern menggunakan Laravel, React, dan berbagai teknologi lainnya. Saya memiliki fokus pada pembuatan sistem yang scalable, user-friendly, dan memiliki performa tinggi.";

export function About({ aboutText }: AboutProps) {
  const content = aboutText?.trim() || fallbackAboutText;

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-10 md:p-16 relative overflow-hidden"
          >
            {/* Subtle inner glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/10 blur-[80px] rounded-full pointer-events-none" />
            
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
              About <span className="text-white/40">Me.</span>
            </h2>
            
            <p className="text-xl md:text-2xl leading-relaxed text-white/80 font-light mix-blend-plus-lighter">
              {content}
            </p>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
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
                  className="space-y-2 border-l border-white/10 pl-6"
                >
                  <p className="text-3xl font-light text-white">{stat.value}</p>
                  <p className="text-sm text-white/40 uppercase tracking-widest">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

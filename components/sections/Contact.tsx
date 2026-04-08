"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-20 sm:py-24 md:py-28 lg:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[520px] sm:h-[520px] lg:w-[800px] lg:h-[800px] bg-white/5 blur-[90px] sm:blur-[110px] lg:blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container px-4 sm:px-6 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-5 sm:mb-6 tracking-tight">
              Let&apos;s create something <br />
              <span className="text-white/40 italic">extraordinary.</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/50 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Saya selalu terbuka untuk mendiskusikan peluang kerja sama baru, ide kreatif, atau kesempatan ngobrol seputar teknologi.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <a 
              href="mailto:contact@example.com" 
              className="group flex items-center justify-center gap-3 w-full sm:w-auto min-h-12 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black rounded-full text-base sm:text-lg font-bold hover:scale-105 transition-transform"
            >
              <Mail className="w-5 h-5" />
              Get In Touch
            </a>
            
            <div className="flex items-center gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-3 sm:p-4 glass rounded-full hover:bg-white/20 transition-colors text-white/70 hover:text-white hover-trigger space-x-2">
                <svg xmlns="http://www.w-svg.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-3 sm:p-4 glass rounded-full hover:bg-white/20 transition-colors text-white/70 hover:text-white hover-trigger space-x-2">
                <svg xmlns="http://www.w-svg.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

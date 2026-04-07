"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BlurText from "@/components/BlurText";
import MagicRings from "@/components/MagicRings";
import { useSectionInView } from "@/hooks/useSectionInView";

type HeroProps = {
  profile?: {
    name?: string;
    title?: string;
    subtitle?: string;
  } | null;
};

const fallbackName = "DWI AGUS WIBISANA";
const fallbackTitle = "<Web Developer />";
const fallbackSubtitle = "Sarjana Informatika";
const heroTextMotion = {
  nameDelay: 45,
  titleDelay: 90,
  stepDuration: 0.4,
  threshold: 0.15,
  rootMargin: "-40px",
} as const;

export function Hero({ profile }: HeroProps) {
  const { ref: sectionRef, isInView: isHeroInView } = useSectionInView<HTMLElement>({
    threshold: 0.05,
    rootMargin: "0px",
  });
  const fullName = profile?.name?.trim() || fallbackName;
  const nameParts = fullName.split(" ").filter(Boolean);
  const splitIndex = Math.max(1, Math.ceil(nameParts.length / 2));
  const firstLineName = nameParts.slice(0, splitIndex).join(" ");
  const secondLineName = nameParts.slice(splitIndex).join(" ");
  const jobTitle = profile?.title?.trim() || fallbackTitle;
  const subtitle = profile?.subtitle?.trim() || fallbackSubtitle;

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-auto">
        <MagicRings
          color="#ffffff"
          colorTwo="#8b8b8b"
          speed={0.85}
          ringCount={7}
          attenuation={12}
          lineThickness={1.6}
          baseRadius={0.32}
          radiusStep={0.09}
          scaleRate={0.1}
          opacity={0.42}
          blur={0.6}
          noiseAmount={0.045}
          rotation={6}
          ringGap={1.45}
          fadeIn={0.68}
          fadeOut={0.58}
          followMouse={false}
          hoverScale={1.04}
          parallax={0.03}
          clickBurst={false}
          isActive={isHeroInView}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/35 pointer-events-none" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <BlurText
              as="span"
              text={firstLineName}
              className="block mb-2"
              segmentClassName="text-gradient"
              animateBy="letters"
              delay={heroTextMotion.nameDelay}
              stepDuration={heroTextMotion.stepDuration}
              threshold={heroTextMotion.threshold}
              rootMargin={heroTextMotion.rootMargin}
            />
            <span className="text-white relative">
              <BlurText
                as="span"
                text={secondLineName || firstLineName}
                className="block"
                animateBy="letters"
                delay={heroTextMotion.nameDelay}
                stepDuration={heroTextMotion.stepDuration}
                threshold={heroTextMotion.threshold}
                rootMargin={heroTextMotion.rootMargin}
              />
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                className="absolute -bottom-2 left-0 h-1 bg-white/20 rounded-full"
              />
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xl text-white/60 mb-10"
          >
            <BlurText
              as="span"
              text={jobTitle}
              className="font-mono"
              animateBy="words"
              delay={heroTextMotion.titleDelay}
              stepDuration={0.3}
              direction="bottom"
              threshold={heroTextMotion.threshold}
              rootMargin={heroTextMotion.rootMargin}
            />
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-white/30" />
            <span>{subtitle}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-lg font-bold overflow-hidden transition-transform hover:scale-105 active:scale-95">
              <span className="relative z-10">View Projects</span>
              <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-white/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

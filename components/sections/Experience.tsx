"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useSectionInView } from "@/hooks/useSectionInView";

const Beams = dynamic(() => import("@/components/Beams"), {
  ssr: false,
});

const experiences: ExperienceItem[] = [
  {
    role: "Freelance Web Developer",
    company: "Self-Employed",
    period: "2023 - sekarang",
    tasks: ["Merra Inventory System (Laravel, MySQL, Bootstrap)", "ZenStore E-Commerce (Laravel, React, Tailwind, PostgreSQL)"],
  },
  {
    role: "Internship",
    company: "PT Sinergi Inovasi Tekno",
    period: "Juni 2025 - September 2025",
    tasks: ["HRIS PLN Nusa Daya Kalimantan", "KPI Kinerja Karyawan"],
  },
  {
    role: "Web Developer",
    company: "Deepublish Group",
    period: "Oktober 2025 - sekarang",
    tasks: [
      "Portal Penulis",
      "Villa Deepublish",
      "General Affairs System Deepublish",
      "HRIS Deepublish",
      "Portal Karyawan",
      "CRM Deepublish Store",
    ],
  },
];

export type ExperienceItem = {
  title?: string;
  role?: string;
  company: string;
  period: string;
  tasks?: string[];
  description?: string[];
};

export function Experience({ data }: { data?: ExperienceItem[] }) {
  const { ref: sectionRef, isInView: isExperienceInView } = useSectionInView<HTMLElement>({
    threshold: 0.08,
    rootMargin: "0px",
  });
  const displayData = data && data.length > 0 ? data : experiences;

  return (
    <section ref={sectionRef} id="experience" className="relative py-20 sm:py-24 md:py-28 lg:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <Beams
          beamWidth={4.2}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ffffff"
          speed={3.4}
          noiseIntensity={2.25}
          scale={0.2}
          rotation={30}
          isActive={isExperienceInView}
        />
      </div>
      <div className="absolute inset-0 bg-black/55 pointer-events-none" />

      <div className="container px-4 sm:px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16 md:mb-24"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Professional <span className="text-white/40">Journey.</span>
          </h2>
          <div className="w-24 h-1 bg-white/20 rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto relative cursor-default">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[18px] sm:left-[20px] md:left-[35px] top-6 bottom-6 w-px bg-white/10" />

          <div className="space-y-10 sm:space-y-12 md:space-y-16">
            {displayData.map((exp, index) => {
              const currentRole = exp.title || exp.role || "Unknown Role";
              const currentTasks = exp.description || exp.tasks || [];
              
              return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-11 sm:pl-14 md:pl-24"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[11px] sm:left-[13px] md:left-[28px] top-1.5 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-black border-2 border-white/40 group hover:border-white transition-colors" />

                <div className="group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3 sm:mb-4">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-white transition-colors">
                      {currentRole}
                    </h3>
                    <span className="text-xs sm:text-sm font-mono text-white/50 bg-white/5 px-2.5 sm:px-3 py-1 rounded-full w-fit">
                      {exp.period}
                    </span>
                  </div>
                  
                  <h4 className="text-base sm:text-lg text-white/60 mb-4 sm:mb-6 font-medium">
                    {exp.company}
                  </h4>

                  <ul className="space-y-2.5 sm:space-y-3">
                    {currentTasks.map((task, i) => (
                      <li key={i} className="flex items-start text-sm sm:text-base text-white/70">
                        <span className="mr-3 text-white/30 mt-1">▹</span>
                        <span className="leading-relaxed hover:text-white/90 transition-colors">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )})}
          </div>
        </div>
      </div>
    </section>
  );
}

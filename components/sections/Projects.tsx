"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects: ProjectItem[] = [
  {
    title: "Portal Penulis Deepublish",
    description: "Platform terintegrasi untuk penulis melacak naskah, royalti, dan proses penerbitan buku secara real-time.",
    tech: ["Laravel", "Bootstrap", "PostgreSQL"],
    color: "from-blue-500/20 to-indigo-500/0",
  },
  {
    title: "Villa Deepublish",
    description: "Sistem reservasi dan manajemen properti Villa eksklusif dengan integrasi kalender dan pembayaran.",
    tech: ["Laravel","Vue.js", "TailwindCSS", "Postgresql"],
    color: "from-yellow-500/20 to-lime-500/0",
  },
  {
    title: "General Affairs System",
    description: "Digitalisasi sistem manajemen aset, inventory kantor, dan tracking pengajuan logistik perusahaan.",
    tech: ["Laravel", "Tailwindcss","React", "Postgresql"],
    color: "from-slate-500/20 to-gray-500/0",
  },
  {
    title: "Deepublish Web Platform",
    description: "Pengembangan dan optimalisasi platform utama Deepublish untuk e-commerce buku dan company profile.",
    tech: ["Laravel", "Bootstrap", "Postgresql"],
    color: "from-blue-600/20 to-cyan-600/0",
  },
  {
    title: "HRIS & Portal Karyawan",
    description: "Sistem Informasi SDM komprehensif mengelola absensi, payroll, dan performance review karyawan.",
    tech: ["Laravel", "Bootstrap", "Postgresql"],
    color: "from-emerald-500/20 to-teal-500/0",
  },
  {
    title: "CRM Deepublish Store",
    description: "Customer Relationship Management khusus operasional e-commerce, menangani ribuan interaksi pelanggan.",
    tech: ["Laravel", "Bootstrap", "Postgresql"],
    color: "from-purple-500/20 to-pink-500/0",
  },
  {
    title: "Merra Inventory System",
    description: "Sistem manajemen stok gudang (WMS) yang kuat, dibangun untuk menangani operasional pergudangan bervolume tinggi.",
    tech: ["Laravel", "MySQL", "Bootstrap"],
    color: "from-orange-500/20 to-amber-500/0",
  },
  {
    title: "ZenStore E-Commerce",
    description: "Platform e-commerce modern dengan performa tinggi dan arsitektur skalabel untuk pengalaman belanja optimal.",
    tech: ["Next.js", "React", "TailwindCSS", "PostgreSQL"],
    color: "from-rose-500/20 to-red-500/0",
  },
  {
    title: "HRIS Nusa Daya",
    description: "Sistem HR *end-to-end* yang disesuaikan khusus untuk operasional perusahaan kelistrikan regional.",
    tech: ["PHP", "Laravel", "React.js", "MySQL"],
    color: "from-cyan-500/20 to-sky-500/0",
  }
];

export type ProjectItem = {
  title: string;
  slug?: { current?: string };
  description: string;
  techStack?: string[];
  tech?: string[];
  image?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  link?: string;
  color?: string;
};

export function Projects({ data }: { data?: ProjectItem[] }) {
  const displayData = data && data.length > 0 ? data : projects;

  return (
    <section id="projects" className="relative py-20 sm:py-24 md:py-28 lg:py-32">
      <div className="container px-4 sm:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16 md:mb-24 flex flex-col md:items-end md:text-right"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Featured <span className="text-white/40">Work.</span>
          </h2>
          <div className="w-24 h-1 bg-white/20 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 md:auto-rows-fr gap-4 sm:gap-5 lg:gap-6 relative z-10 items-stretch">
          {displayData.map((project, index) => {
            const currentTech = project.techStack || project.tech || [];
            const currentColor = project.color || "from-white/10 to-transparent";

            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group relative h-full min-h-[340px] sm:min-h-[390px] lg:min-h-[430px] glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 flex flex-col justify-between overflow-hidden hover-trigger transition-all duration-500 hover:-translate-y-1 hover:bg-white/10"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${currentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

              <div className="flex-1">
                <div className="flex gap-2 flex-wrap mb-4 sm:mb-6">
                  {currentTech.map((t, i) => (
                    <span key={i} className="text-[11px] sm:text-xs font-mono px-2.5 sm:px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/60">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5 sm:mb-3 group-hover:text-white/90 transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/50 leading-relaxed text-sm sm:text-[15px]">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10">
                <button className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                  View Case Study <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
}

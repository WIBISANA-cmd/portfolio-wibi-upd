"use client";

import { motion } from "framer-motion";

export type SkillCategory = {
  category?: string;
  items?: string[];
};

type SkillsProps = {
  data?: SkillCategory[];
};

const fallbackTechnicalSkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Laravel",
  "Node.js",
  "MySQL",
  "PostgreSQL",
  "Tailwind CSS",
  "Git",
];

const fallbackSoftSkills = [
  "Problem Solving",
  "Communication",
  "Team Collaboration",
  "Time Management",
  "Critical Thinking",
  "Adaptability",
];

const isSoftCategory = (name: string) => {
  const normalized = name.toLowerCase();
  return (
    normalized.includes("soft") ||
    normalized.includes("interpersonal") ||
    normalized.includes("personal")
  );
};

export function Skills({ data }: SkillsProps) {
  const source = data ?? [];
  const technicalFromCms: string[] = [];
  const softFromCms: string[] = [];

  source.forEach((group) => {
    const category = group.category?.trim() ?? "";
    const items = (group.items ?? []).filter(Boolean);
    if (isSoftCategory(category)) {
      softFromCms.push(...items);
      return;
    }
    technicalFromCms.push(...items);
  });

  const technicalSkills =
    technicalFromCms.length > 0 ? Array.from(new Set(technicalFromCms)) : fallbackTechnicalSkills;
  const softSkills =
    softFromCms.length > 0 ? Array.from(new Set(softFromCms)) : fallbackSoftSkills;

  return (
    <section id="skills" className="relative py-20 sm:py-24 md:py-28 lg:py-32">
      <div className="container px-4 sm:px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16 md:mb-24"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Core <span className="text-white/40">Skills.</span>
          </h2>
          <div className="w-24 h-1 bg-white/20 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
              Technical Skills
            </h3>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {technicalSkills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs sm:text-sm px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-white/75"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {softSkills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs sm:text-sm px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-white/75"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

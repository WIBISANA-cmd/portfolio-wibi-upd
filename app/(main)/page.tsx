import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills, type SkillCategory } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { client } from "@/lib/cms/client";
import {
  getExperienceQuery,
  getProfileQuery,
  getProjectsQuery,
  getSkillsQuery,
} from "@/lib/cms/queries";
import { hasValidSanityConfig } from "@/sanity/env";

type ProfileData = {
  name?: string;
  title?: string;
  subtitle?: string;
  about?: string;
};

async function getPortfolioData() {
  if (!hasValidSanityConfig) {
    return {
      profile: null as ProfileData | null,
      experiences: [],
      projects: [],
      skills: [] as SkillCategory[],
    };
  }

  try {
    const [profile, experiences, projects, skills] = await Promise.all([
      client.fetch<ProfileData | null>(getProfileQuery),
      client.fetch(getExperienceQuery),
      client.fetch(getProjectsQuery),
      client.fetch<SkillCategory[]>(getSkillsQuery),
    ]);

    return { profile, experiences, projects, skills };
  } catch (error) {
    console.error("Failed to fetch Sanity portfolio content:", error);
    return {
      profile: null as ProfileData | null,
      experiences: [],
      projects: [],
      skills: [] as SkillCategory[],
    };
  }
}

export default async function Home() {
  const { profile, experiences, projects, skills } = await getPortfolioData();

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1 w-full relative">
        <Hero profile={profile} />
        <About aboutText={profile?.about} />
        <Experience data={experiences} />
        <Skills data={skills} />
        <Projects data={projects} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

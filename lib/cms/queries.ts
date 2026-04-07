import { groq } from "next-sanity";

export const getProfileQuery = groq`
  *[_type == "profile"][0] {
    name,
    title,
    subtitle,
    about
  }
`;

export const getExperienceQuery = groq`
  *[_type == "experience"] | order(_createdAt asc) {
    title,
    company,
    period,
    description
  }
`;

export const getProjectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    title,
    slug,
    description,
    techStack,
    image,
    link
  }
`;

export const getSkillsQuery = groq`
  *[_type == "skills"] | order(_createdAt asc) {
    category,
    items
  }
`;

import { defineType, defineField } from 'sanity';

export const skillsType = defineType({
  name: 'skills',
  title: 'Skills',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Skill Category',
      type: 'string',
      description: 'e.g. Frontend, Backend, Tools',
    }),
    defineField({
      name: 'items',
      title: 'Skill Items',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});

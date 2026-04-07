import { defineType, defineField } from 'sanity';

export const experienceType = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title / Role',
      type: 'string',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),
    defineField({
      name: 'period',
      title: 'Time Period',
      type: 'string',
      description: 'e.g. Juni 2025 - September 2025',
    }),
    defineField({
      name: 'description',
      title: 'Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});

import { type SchemaTypeDefinition } from 'sanity';

import { profileType } from './profile';
import { experienceType } from './experience';
import { projectType } from './project';
import { skillsType } from './skills';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [profileType, experienceType, projectType, skillsType],
};

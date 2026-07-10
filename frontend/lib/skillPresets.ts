export type SkillProfile = 'general' | 'engineering' | 'custom';

export type SkillCategoryId =
  | 'industryExpertise'
  | 'toolsAndSystems'
  | 'processesAndMethods'
  | 'technicalSkills'
  | 'languages'
  | 'frameworks'
  | 'testing'
  | 'databases'
  | 'devops'
  | 'cloud'
  | 'tooling'
  | 'architecture';

export interface SkillPreset {
  id: SkillProfile;
  categoryIds: SkillCategoryId[];
}

export const SKILL_PRESETS: SkillPreset[] = [
  {
    id: 'general',
    categoryIds: ['industryExpertise', 'toolsAndSystems', 'processesAndMethods', 'technicalSkills'],
  },
  {
    id: 'engineering',
    categoryIds: [
      'languages',
      'frameworks',
      'testing',
      'databases',
      'devops',
      'cloud',
      'tooling',
      'architecture',
    ],
  },
  {
    id: 'custom',
    categoryIds: [],
  },
];

export const DEFAULT_SKILL_PROFILE: SkillProfile = 'general';

export const getSkillPreset = (profile?: string): SkillPreset =>
  SKILL_PRESETS.find((preset) => preset.id === profile) ?? SKILL_PRESETS[0];

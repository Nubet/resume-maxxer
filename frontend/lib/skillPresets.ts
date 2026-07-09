export type SkillProfile = 'general' | 'engineering' | 'custom';

export interface SkillPreset {
  id: SkillProfile;
  label: string;
  description: string;
  categories: string[];
  placeholder: string;
}

export const SKILL_PRESETS: SkillPreset[] = [
  {
    id: 'general',
    label: 'Uniwersalne',
    description: 'Dobre dla większości ról biznesowych, operacyjnych, administracyjnych i usługowych.',
    categories: [
      'Kompetencje branżowe',
      'Narzędzia i systemy',
      'Procesy i metodyki',
      'Umiejętności techniczne',
    ],
    placeholder: 'np. Salesforce, Excel, obsługa reklamacji, AutoCAD, HACCP',
  },
  {
    id: 'engineering',
    label: 'IT / Engineering',
    description: 'Podział pod techniczne CV: języki, frameworki, testy, dane, DevOps i tooling.',
    categories: [
      'Languages',
      'Frameworks',
      'Testing',
      'Databases',
      'DevOps',
      'Cloud',
      'Tooling',
      'Architecture',
    ],
    placeholder: 'np. Python, TypeScript, FastAPI, React, Pytest, Ruff, PostgreSQL, Docker',
  },
  {
    id: 'custom',
    label: 'Własne',
    description: 'Pełna swoboda. Tworzysz własne grupy dokładnie pod swoją branżę i narrację CV.',
    categories: [],
    placeholder: 'np. wpisz własną kategorię i dodaj do niej konkretne skille',
  },
];

export const DEFAULT_SKILL_PROFILE: SkillProfile = 'general';

export const getSkillPreset = (profile?: string): SkillPreset =>
  SKILL_PRESETS.find((preset) => preset.id === profile) ?? SKILL_PRESETS[0];

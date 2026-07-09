export type ResumeLanguage = 'pl' | 'en';

export interface TemplateVariant {
  id: string;
  familyId: string;
  sourceTemplateId: string;
  language: ResumeLanguage;
  label: string;
}

export interface TemplateFamily {
  id: string;
  sourceTemplateId: string;
  name: string;
  category: string;
  author: string;
  description: string;
  tags: string[];
  available: boolean;
  image: string;
  variants: TemplateVariant[];
}

const createVariants = (familyId: string, sourceTemplateId: string): TemplateVariant[] => [
  {
    id: `${sourceTemplateId}_pl`,
    familyId,
    sourceTemplateId,
    language: 'pl',
    label: 'Polski',
  },
  {
    id: `${sourceTemplateId}_en`,
    familyId,
    sourceTemplateId,
    language: 'en',
    label: 'English',
  },
];

export const TEMPLATE_FAMILIES: TemplateFamily[] = [
  {
    id: 'swiss-rigor',
    sourceTemplateId: 'basic_resume_v1',
    name: 'Szwajcarski Rygor',
    category: 'classic',
    author: 'ResumeMaxxer Team',
    description:
      'Klasyczny układ, który skupia uwagę na Twoich atutach i ułatwia rekruterom szybkie czytanie.',
    tags: ['Jednokolumnowy', 'Klasyczny', 'Minimalistyczny'],
    available: true,
    image: '/images/templates/basic-resume-0.2.9-small.webp',
    variants: createVariants('swiss-rigor', 'basic_resume_v1'),
  },
  {
    id: 'crisp-clean',
    sourceTemplateId: 'crisp_cv_v1',
    name: 'Nowoczesny Przejrzysty',
    category: 'modern',
    author: 'ResumeMaxxer Team',
    description:
      'Przejrzysta forma, która idealnie organizuje treść i prowadzi wzrok czytającego.',
    tags: ['Nowoczesny', 'Przejrzysty', 'Akcenty'],
    available: true,
    image: '/images/templates/modern-resume-1.0.0-small.webp',
    variants: createVariants('crisp-clean', 'crisp_cv_v1'),
  },
  {
    id: 'imprecv-classic',
    sourceTemplateId: 'imprecv_v1',
    name: 'Engineering Classic',
    category: 'tech',
    author: 'imprecv / ResumeMaxxer',
    description:
      'Klasyczny inżynierski układ z mocną hierarchią sekcji i typografią Libertinus Serif, wierny oryginalnemu stylowi imprecv.',
    tags: ['Engineering', 'Serif', 'ATS', 'Classic'],
    available: true,
    image: '/images/templates/imprecv-template3-preview.jpg',
    variants: createVariants('imprecv-classic', 'imprecv_v1'),
  },
  {
    id: 'academicv-timeline',
    sourceTemplateId: 'academicv_v1',
    name: 'Academic Timeline',
    category: 'classic',
    author: 'academicv / ResumeMaxxer',
    description:
      'Akademicki layout wierny oryginalnemu academicv: serifowa typografia, timeline sections i spokojna hierarchia dla researchu, edukacji i doświadczenia.',
    tags: ['Academic', 'Research', 'Timeline', 'Serif'],
    available: true,
    image: '/images/templates/academicv-template4-preview.png',
    variants: createVariants('academicv-timeline', 'academicv_v1'),
  },
  {
    id: 'tech-lead',
    sourceTemplateId: 'tech_lead_v1',
    name: 'Tech Lead & Developer',
    category: 'tech',
    author: 'ResumeMaxxer Team',
    description:
      'Stworzony dla branży IT. Bezpośrednio komunikuje Twoje kompetencje i zrealizowane projekty.',
    tags: ['IT', 'Projekty', 'Umiejętności'],
    available: false,
    image: '/images/templates/metronic-1.1.0-small.webp',
    variants: createVariants('tech-lead', 'tech_lead_v1'),
  },
  {
    id: 'executive',
    sourceTemplateId: 'exec_v1',
    name: 'Executive & Management',
    category: 'exec',
    author: 'ResumeMaxxer Team',
    description:
      'Skonstruowany dla liderów. Skutecznie prezentuje Twój wpływ na rozwój firmy i wyniki biznesowe.',
    tags: ['Biznesowy', 'Dla menedżerów', 'Osiągnięcia'],
    available: false,
    image: '/images/templates/bamdone-rebuttal-0.1.2-small.webp',
    variants: createVariants('executive', 'exec_v1'),
  },
  {
    id: 'academic',
    sourceTemplateId: 'academic_v1',
    name: 'Academic & Research',
    category: 'classic',
    author: 'ResumeMaxxer Team',
    description:
      'Zaprojektowany do eleganckiej prezentacji Twojego obszernego dorobku, badań i publikacji.',
    tags: ['Akademicki', 'Rozbudowany', 'Publikacje'],
    available: false,
    image: '/images/templates/basic-resume-0.2.9-small.webp',
    variants: createVariants('academic', 'academic_v1'),
  },
  {
    id: 'editorial',
    sourceTemplateId: 'editorial_v1',
    name: 'Editorial Studio',
    category: 'modern',
    author: 'ResumeMaxxer Team',
    description:
      'Wyróżniający się układ, który od pierwszej sekundy buduje Twój wizerunek jako estety.',
    tags: ['Kreatywny', 'Design', 'Unikalna typografia'],
    available: false,
    image: '/images/templates/modern-resume-1.0.0-small.webp',
    variants: createVariants('editorial', 'editorial_v1'),
  },
];

export const DEFAULT_TEMPLATE_ID = 'basic_resume_v1_pl';

const TEMPLATE_VARIANTS = TEMPLATE_FAMILIES.flatMap((family) => family.variants);

export const getTemplateVariant = (templateId?: string) =>
  TEMPLATE_VARIANTS.find((variant) => variant.id === templateId) ?? null;

export const getTemplateFamilyByVariant = (templateId?: string) => {
  const variant = getTemplateVariant(templateId);
  return TEMPLATE_FAMILIES.find((family) => family.id === variant?.familyId) ?? null;
};

export const resolveTemplateVariantId = (
  templateId?: string,
  language: ResumeLanguage = 'pl'
): string => {
  const directVariant = getTemplateVariant(templateId);
  if (directVariant) return directVariant.id;

  const family = TEMPLATE_FAMILIES.find((item) => item.sourceTemplateId === templateId);
  if (family) {
    return family.variants.find((variant) => variant.language === language)?.id ?? DEFAULT_TEMPLATE_ID;
  }

  return DEFAULT_TEMPLATE_ID;
};

export const getTemplateLanguage = (templateId?: string): ResumeLanguage =>
  getTemplateVariant(templateId)?.language ?? 'pl';

export const getTemplateSourceId = (templateId?: string): string =>
  getTemplateVariant(templateId)?.sourceTemplateId ?? 'basic_resume_v1';

export const getTemplateDisplayName = (templateId?: string) => {
  const family = getTemplateFamilyByVariant(templateId);
  const variant = getTemplateVariant(templateId);

  if (!family || !variant) return 'Szwajcarski Rygor PL';
  return `${family.name} ${variant.language === 'pl' ? 'PL' : 'EN'}`;
};

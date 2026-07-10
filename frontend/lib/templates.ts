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
    id: 'atlas-classic',
    sourceTemplateId: 'atlas_classic_v1',
    name: 'Atlas Classic',
    category: 'classic',
    author: 'ResumeMaxxer',
    description:
      'Najbardziej formalny z aktualnych szablonów: jednokolumnowy, spokojny i konserwatywny, z prostymi liniami sekcji i układem nastawionym na czytelność ATS.',
    tags: ['Classic', 'ATS', 'One Column', 'Formal'],
    available: true,
    image: '/images/templates/basic-resume-0.2.9-small.webp',
    variants: createVariants('atlas-classic', 'atlas_classic_v1'),
  },
  {
    id: 'meridian-clean',
    sourceTemplateId: 'meridian_clean_v1',
    name: 'Meridian Clean',
    category: 'modern',
    author: 'ResumeMaxxer',
    description:
      'Czysty, bezszeryfowy layout z lekkim rytmem sekcji, siatkowym zapisem wpisów i bardziej współczesnym charakterem niż klasyczne układy CV.',
    tags: ['Clean', 'Sans Serif', 'Structured', 'Modern'],
    available: true,
    image: '/images/templates/modern-resume-1.0.0-small.webp',
    variants: createVariants('meridian-clean', 'meridian_clean_v1'),
  },
  {
    id: 'summit-serif',
    sourceTemplateId: 'summit_serif_v1',
    name: 'Summit Serif',
    category: 'tech',
    author: 'ResumeMaxxer',
    description:
      'Serifowy układ o inżynierskim charakterze: wycentrowany nagłówek, mocna hierarchia sekcji i bardziej akademicki ton bez utraty czytelności biznesowego CV.',
    tags: ['Serif', 'Engineering', 'Centered Header', 'Structured'],
    available: true,
    image: '/images/templates/imprecv-template3-preview.jpg',
    variants: createVariants('summit-serif', 'summit_serif_v1'),
  },
  {
    id: 'contour-timeline',
    sourceTemplateId: 'contour_timeline_v1',
    name: 'Contour Timeline',
    category: 'classic',
    author: 'ResumeMaxxer',
    description:
      'Najbardziej akademicki z aktywnych szablonów: szerokie marginesy, spokojna serifowa typografia i sekcje rozpisane jak uporządkowana oś czasu.',
    tags: ['Timeline', 'Serif', 'Academic', 'Spacious'],
    available: true,
    image: '/images/templates/academicv-template4-preview.png',
    variants: createVariants('contour-timeline', 'contour_timeline_v1'),
  },
  {
    id: 'vector-compact',
    sourceTemplateId: 'vector_compact_v1',
    name: 'Vector Compact',
    category: 'tech',
    author: 'ResumeMaxxer',
    description:
      'Gęsty, techniczny one-pager zaprojektowany pod maksymalne wykorzystanie miejsca: minimalne marginesy, ciasny rytm i szybkie skanowanie doświadczenia.',
    tags: ['Compact', 'Technical', 'One Page', 'Dense'],
    available: true,
    image: '/images/templates/simple-technical-template5-preview.png',
    variants: createVariants('vector-compact', 'vector_compact_v1'),
  },
  {
    id: 'horizon-sidebar',
    sourceTemplateId: 'horizon_sidebar_v1',
    name: 'Horizon Sidebar',
    category: 'modern',
    author: 'ResumeMaxxer',
    description:
      'Najbardziej ekspresyjny szablon w katalogu: kolorowy sidebar, tagi umiejętności i nowoczesny podział treści na warstwę główną oraz pomocniczą.',
    tags: ['Sidebar', 'Color', 'Expressive', 'Modern'],
    available: true,
    image: '/images/templates/metronic-template6-preview.png',
    variants: createVariants('horizon-sidebar', 'horizon_sidebar_v1'),
  },
  {
    id: 'harbor-serif',
    sourceTemplateId: 'harbor_serif_v1',
    name: 'Harbor Serif',
    category: 'classic',
    author: 'ResumeMaxxer',
    description:
      'Elegancki, lekko redakcyjny układ serifowy z etykietami sekcji po lewej stronie. Dobrze sprawdza się tam, gdzie CV ma wyglądać bardziej uporządkowanie niż technicznie.',
    tags: ['Serif', 'Editorial', 'Elegant', 'Two Column Header'],
    available: true,
    image: '/images/templates/yuan-template7-preview.png',
    variants: createVariants('harbor-serif', 'harbor_serif_v1'),
  },
  {
    id: 'beacon-technical',
    sourceTemplateId: 'beacon_technical_v1',
    name: 'Beacon Technical',
    category: 'tech',
    author: 'ResumeMaxxer',
    description:
      'Planowana rodzina dla szablonu technicznego z mocniejszym akcentem na ownership, architekturę i projekty. Jeszcze niedostępna w aplikacji.',
    tags: ['Planned', 'Technical', 'Projects', 'Leadership'],
    available: false,
    image: '/images/templates/metronic-1.1.0-small.webp',
    variants: createVariants('beacon-technical', 'beacon_technical_v1'),
  },
  {
    id: 'north-executive',
    sourceTemplateId: 'north_executive_v1',
    name: 'North Executive',
    category: 'exec',
    author: 'ResumeMaxxer',
    description:
      'Planowana rodzina dla ról zarządczych i liderskich, z większym naciskiem na skalę odpowiedzialności, wyniki i wpływ biznesowy. Jeszcze niedostępna.',
    tags: ['Planned', 'Executive', 'Business', 'Leadership'],
    available: false,
    image: '/images/templates/bamdone-rebuttal-0.1.2-small.webp',
    variants: createVariants('north-executive', 'north_executive_v1'),
  },
  {
    id: 'strata-academic',
    sourceTemplateId: 'strata_academic_v1',
    name: 'Strata Academic',
    category: 'classic',
    author: 'ResumeMaxxer',
    description:
      'Planowana rodzina dla pełnego CV naukowego z publikacjami, grantami i działalnością akademicką. Jeszcze niedostępna w obecnym katalogu.',
    tags: ['Planned', 'Academic', 'Research', 'Publications'],
    available: false,
    image: '/images/templates/basic-resume-0.2.9-small.webp',
    variants: createVariants('strata-academic', 'strata_academic_v1'),
  },
  {
    id: 'delta-editorial',
    sourceTemplateId: 'delta_editorial_v1',
    name: 'Delta Editorial',
    category: 'modern',
    author: 'ResumeMaxxer',
    description:
      'Planowana rodzina dla bardziej magazynowego, wizualnie odważnego CV. Kierunek jest zdefiniowany, ale sam szablon nie jest jeszcze zaimplementowany.',
    tags: ['Planned', 'Editorial', 'Creative', 'Design'],
    available: false,
    image: '/images/templates/modern-resume-1.0.0-small.webp',
    variants: createVariants('delta-editorial', 'delta_editorial_v1'),
  },
];

export const DEFAULT_TEMPLATE_ID = 'atlas_classic_v1_pl';

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
  getTemplateVariant(templateId)?.sourceTemplateId ?? 'atlas_classic_v1';

export const getTemplateDisplayName = (templateId?: string) => {
  const family = getTemplateFamilyByVariant(templateId);
  const variant = getTemplateVariant(templateId);

  if (!family || !variant) return 'Atlas Classic PL';
  return `${family.name} ${variant.language === 'pl' ? 'PL' : 'EN'}`;
};

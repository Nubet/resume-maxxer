import { z } from 'zod';
import { DEFAULT_TEMPLATE_ID } from '@/lib/templates';
import { DEFAULT_SKILL_PROFILE } from '@/lib/skillPresets';

const PRESENT_VALUES = ['present', 'Present', 'PRESENT', 'obecnie', 'Obecnie', 'OBECNIE'] as const;
const CERTIFICATION_STATUSES = ['Bezterminowy', 'Terminowy', 'Wygasły', 'Do odnowienia'] as const;

const monthRegex = /^\d{4}-(0[1-9]|1[0-2])$/;
const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+()\d][+()\d\s.-]{5,24}$/;
const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[^\s]*)?$/i;

const text = (max: number, label: string) =>
  z.string().trim().max(max, `${label} może mieć maksymalnie ${max} znaków`).default('');

const listItem = (max: number, label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} nie może być puste`)
    .max(max, `${label} może mieć maksymalnie ${max} znaków`);

const stringList = (maxItems: number, itemMax: number, label: string) =>
  z
    .array(listItem(itemMax, label))
    .max(maxItems, `Możesz dodać maksymalnie ${maxItems} pozycji w sekcji ${label.toLowerCase()}`)
    .default([]);

const optionalEmail = text(254, 'Adres e-mail').refine(
  (value) => value === '' || emailRegex.test(value),
  'Podaj poprawny adres e-mail'
);

const optionalPhone = text(30, 'Numer telefonu').refine(
  (value) => value === '' || phoneRegex.test(value),
  'Podaj poprawny numer telefonu'
);

const optionalUrl = text(300, 'Link').refine(
  (value) => value === '' || urlRegex.test(value),
  'Podaj poprawny link'
);

const optionalMonth = (label: string) =>
  z
    .string()
    .trim()
    .default('')
    .refine((value) => value === '' || monthRegex.test(value), `${label} musi mieć format YYYY-MM`);

const optionalDate = (label: string) =>
  z
    .string()
    .trim()
    .default('')
    .refine(
      (value) => value === '' || dateRegex.test(value),
      `${label} musi mieć format YYYY-MM-DD`
    );

const optionalMonthOrPresent = (label: string) =>
  z
    .string()
    .trim()
    .default('')
    .refine(
      (value) =>
        value === '' ||
        monthRegex.test(value) ||
        PRESENT_VALUES.includes(value as (typeof PRESENT_VALUES)[number]),
      `${label} musi mieć format YYYY-MM albo wartość typu 'obecnie'`
    );

const optionalFullDate = (label: string) =>
  z
    .string()
    .trim()
    .default('')
    .refine(
      (value) => value === '' || dateRegex.test(value),
      `${label} musi mieć format YYYY-MM-DD`
    );

const withDateOrder = <T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
  startKey: keyof z.infer<typeof schema>,
  endKey: keyof z.infer<typeof schema>,
  message: string,
  allowPresent = false
) =>
  schema.superRefine((value, ctx) => {
    const start = String(value[startKey] ?? '');
    const end = String(value[endKey] ?? '');
    if (!start || !end) return;
    if (allowPresent && PRESENT_VALUES.includes(end as (typeof PRESENT_VALUES)[number])) return;
    if (start > end) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [endKey as string],
        message,
      });
    }
  });

export const ResumeMetadataSchema = z.object({
  language: z.enum(['pl', 'en']).default('pl'),
  schema_version: z.string().trim().default('resume_maxxer.v1'),
  template_id: text(80, 'Identyfikator szablonu').default(DEFAULT_TEMPLATE_ID),
  skill_profile: z.enum(['general', 'engineering', 'custom']).default(DEFAULT_SKILL_PROFILE),
});

export const ResumeUrlsSchema = z
  .object({
    linkedin: optionalUrl.optional(),
    github: optionalUrl.optional(),
    portfolio: optionalUrl.optional(),
    website: optionalUrl.optional(),
  })
  .catchall(optionalUrl.optional())
  .default({});

export const ResumeBasicsSchema = z.object({
  name: text(120, 'Imię i nazwisko'),
  title: text(120, 'Tytuł zawodowy'),
  targetRole: text(120, 'Docelowe stanowisko'),
  targetCompany: text(120, 'Firma lub branża docelowa'),
  targetJobDescription: text(12000, 'Opis oferty pracy'),
  email: optionalEmail,
  phone: optionalPhone,
  location: text(120, 'Lokalizacja'),
  city: text(80, 'Miasto'),
  country: text(80, 'Kraj'),
  remoteFriendly: z.boolean().default(false),
  urls: ResumeUrlsSchema,
  summary: text(1600, 'Podsumowanie zawodowe'),
});

export const ExperienceItemSchema = withDateOrder(
  z.object({
    company: text(140, 'Nazwa firmy'),
    position: text(140, 'Stanowisko'),
    location: text(120, 'Lokalizacja doświadczenia'),
    startDate: optionalMonth('Data rozpoczęcia doświadczenia'),
    endDate: optionalMonthOrPresent('Data zakończenia doświadczenia'),
    responsibilities: stringList(20, 220, 'Obowiązek'),
    highlights: stringList(20, 240, 'Osiągnięcie'),
  }),
  'startDate',
  'endDate',
  'Data zakończenia nie może być wcześniejsza niż data rozpoczęcia',
  true
);

export const EducationItemSchema = withDateOrder(
  z.object({
    institution: text(160, 'Nazwa uczelni lub szkoły'),
    degree: text(120, 'Stopień lub tytuł'),
    field: text(140, 'Kierunek lub specjalizacja'),
    location: text(120, 'Lokalizacja edukacji'),
    startDate: optionalMonth('Data rozpoczęcia edukacji'),
    endDate: optionalMonth('Data zakończenia edukacji'),
    gpa: text(40, 'Wynik lub średnia'),
    coursework: stringList(20, 120, 'Kurs lub przedmiot'),
  }),
  'startDate',
  'endDate',
  'Data zakończenia nie może być wcześniejsza niż data rozpoczęcia'
);

export const SkillGroupSchema = z.object({
  category: text(80, 'Kategoria umiejętności'),
  keywords: stringList(40, 60, 'Umiejętność'),
});

export const ProjectItemSchema = withDateOrder(
  z.object({
    name: text(160, 'Nazwa projektu'),
    role: text(120, 'Rola w projekcie'),
    organization: text(140, 'Organizacja lub kontekst projektu'),
    startDate: optionalDate('Data rozpoczęcia projektu'),
    endDate: optionalDate('Data zakończenia projektu'),
    period: text(32, 'Okres projektu'),
    description: text(1200, 'Opis projektu'),
    url: optionalUrl,
    keywords: stringList(30, 60, 'Słowo kluczowe projektu'),
    highlights: stringList(20, 240, 'Rezultat projektu'),
  }),
  'startDate',
  'endDate',
  'Data zakończenia projektu nie może być wcześniejsza niż data rozpoczęcia'
);

export const LanguageItemSchema = z.object({
  language: text(60, 'Język'),
  fluency: text(60, 'Poziom znajomości języka'),
  certificate: text(120, 'Certyfikat językowy'),
  url: optionalUrl,
});

export const CertificationItemSchema = withDateOrder(
  z.object({
    name: text(180, 'Nazwa certyfikatu'),
    issuer: text(140, 'Wystawca certyfikatu'),
    date: optionalFullDate('Data uzyskania certyfikatu'),
    expires: optionalFullDate('Data wygaśnięcia certyfikatu'),
    status: z.enum(CERTIFICATION_STATUSES).default('Bezterminowy'),
    details: text(1000, 'Zakres certyfikatu'),
    url: optionalUrl,
  }),
  'date',
  'expires',
  'Data wygaśnięcia nie może być wcześniejsza niż data uzyskania certyfikatu'
).superRefine((value, ctx) => {
  if (value.status !== 'Bezterminowy' && !value.expires) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['expires'],
      message: 'Data wygaśnięcia jest wymagana dla certyfikatu terminowego',
    });
  }
});

export const ResumeDataSchema = z.object({
  metadata: ResumeMetadataSchema.default({
    language: 'pl',
    schema_version: 'resume_maxxer.v1',
    template_id: DEFAULT_TEMPLATE_ID,
    skill_profile: DEFAULT_SKILL_PROFILE,
  }),
  basics: ResumeBasicsSchema.default({
    name: '',
    title: '',
    targetRole: '',
    targetCompany: '',
    targetJobDescription: '',
    email: '',
    phone: '',
    location: '',
    city: '',
    country: '',
    remoteFriendly: false,
    urls: {},
    summary: '',
  }),
  experience: z.array(ExperienceItemSchema).default([]),
  education: z.array(EducationItemSchema).default([]),
  skills: z.array(SkillGroupSchema).default([]),
  projects: z.array(ProjectItemSchema).default([]),
  languages: z.array(LanguageItemSchema).default([]),
  certifications: z.array(CertificationItemSchema).default([]),
});

export type ResumeMetadata = z.infer<typeof ResumeMetadataSchema>;
export type ResumeUrls = z.infer<typeof ResumeUrlsSchema>;
export type ResumeBasics = z.infer<typeof ResumeBasicsSchema>;
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;
export type EducationItem = z.infer<typeof EducationItemSchema>;
export type SkillGroup = z.infer<typeof SkillGroupSchema>;
export type ProjectItem = z.infer<typeof ProjectItemSchema>;
export type LanguageItem = z.infer<typeof LanguageItemSchema>;
export type CertificationItem = z.infer<typeof CertificationItemSchema>;
export type ResumeData = z.infer<typeof ResumeDataSchema>;

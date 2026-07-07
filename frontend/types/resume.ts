import { z } from 'zod';

export const ResumeMetadataSchema = z.object({
  language: z.string().default('pl'),
  template_id: z.string().default('minimalist_ats_v1'),
});

export const ResumeUrlsSchema = z
  .object({
    linkedin: z.string().optional(),
    github: z.string().optional(),
    portfolio: z.string().optional(),
    website: z.string().optional(),
  })
  .catchall(z.string().optional());

export const ResumeBasicsSchema = z.object({
  name: z.string().min(1, 'Imię i nazwisko jest wymagane'),
  title: z.string().min(1, 'Tytuł zawodowy jest wymagany'),
  email: z.string().email('Niepoprawny adres email'),
  phone: z.string().min(1, 'Numer telefonu jest wymagany'),
  location: z.string().min(1, 'Lokalizacja jest wymagana'),
  urls: ResumeUrlsSchema.optional().default({}),
  summary: z.string().optional(),
});

export const ExperienceItemSchema = z.object({
  company: z.string().min(1, 'Nazwa firmy jest wymagana'),
  position: z.string().min(1, 'Stanowisko jest wymagane'),
  location: z.string().optional(),
  startDate: z.string().min(1, 'Data rozpoczęcia jest wymagana (np. 2021-05)'),
  endDate: z.string().min(1, "Data zakończenia lub 'obecnie'"),
  highlights: z.array(z.string()).default([]),
});

export const EducationItemSchema = z.object({
  institution: z.string().min(1, 'Nazwa uczelni/szkoły jest wymagana'),
  degree: z.string().min(1, 'Stopień/Tytuł jest wymagany'),
  field: z.string().min(1, 'Kierunek/Specjalizacja jest wymagana'),
  startDate: z.string().min(1, 'Data rozpoczęcia jest wymagana'),
  endDate: z.string().min(1, 'Data zakończenia jest wymagana'),
  gpa: z.string().optional(),
  highlights: z.array(z.string()).optional().default([]),
});

export const SkillGroupSchema = z.object({
  category: z.string().min(1, 'Kategoria jest wymagana (np. Języki programowania)'),
  keywords: z.array(z.string()).min(1, 'Dodaj co najmniej jedną umiejętność'),
});

export const ProjectItemSchema = z.object({
  name: z.string().min(1, 'Nazwa projektu jest wymagana'),
  description: z.string().optional(),
  url: z.string().optional(),
  keywords: z.array(z.string()).default([]),
  highlights: z.array(z.string()).optional().default([]),
});

export const LanguageItemSchema = z.object({
  language: z.string().min(1, 'Język jest wymagany'),
  fluency: z.string().min(1, 'Poziom zaawansowania jest wymagany (np. C1 / Ojczysty)'),
});

export const CertificationItemSchema = z.object({
  name: z.string().min(1, 'Nazwa certyfikatu jest wymagana'),
  issuer: z.string().min(1, 'Wystawca jest wymagany'),
  date: z.string().min(1, 'Data uzyskania jest wymagana'),
  url: z.string().optional(),
});

export const ResumeDataSchema = z.object({
  metadata: ResumeMetadataSchema.default({ language: 'pl', template_id: 'minimalist_ats_v1' }),
  basics: ResumeBasicsSchema,
  experience: z.array(ExperienceItemSchema).default([]),
  education: z.array(EducationItemSchema).default([]),
  skills: z.array(SkillGroupSchema).default([]),
  projects: z.array(ProjectItemSchema).default([]),
  languages: z.array(LanguageItemSchema).optional().default([]),
  certifications: z.array(CertificationItemSchema).optional().default([]),
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

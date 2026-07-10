import { z } from 'zod';
import { DEFAULT_TEMPLATE_ID } from '@/lib/templates';
import { DEFAULT_SKILL_PROFILE } from '@/lib/skillPresets';

export type ResumeLocale = 'pl' | 'en';

const PRESENT_VALUES = ['present', 'Present', 'PRESENT', 'obecnie', 'Obecnie', 'OBECNIE'] as const;
const CERTIFICATION_STATUSES = ['Bezterminowy', 'Terminowy', 'Wygasły', 'Do odnowienia'] as const;

const monthRegex = /^\d{4}-(0[1-9]|1[0-2])$/;
const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+()\d][+()\d\s.-]{5,24}$/;
const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[^\s]*)?$/i;

const getSchemaCopy = (locale: ResumeLocale) => {
  const isPl = locale === 'pl';

  return {
    max: (label: string, max: number) =>
      isPl ? `${label} może mieć maksymalnie ${max} znaków` : `${label} can be at most ${max} characters`,
    required: (label: string) =>
      isPl ? `${label} nie może być puste` : `${label} cannot be empty`,
    maxItems: (label: string, count: number) =>
      isPl
        ? `Możesz dodać maksymalnie ${count} pozycji w sekcji ${label.toLowerCase()}`
        : `You can add at most ${count} items in the ${label.toLowerCase()} section`,
    invalidEmail: isPl ? 'Podaj poprawny adres e-mail' : 'Enter a valid email address',
    invalidPhone: isPl ? 'Podaj poprawny numer telefonu' : 'Enter a valid phone number',
    invalidUrl: isPl ? 'Podaj poprawny link' : 'Enter a valid URL',
    monthFormat: (label: string) =>
      isPl ? `${label} musi mieć format YYYY-MM` : `${label} must use the YYYY-MM format`,
    dateFormat: (label: string) =>
      isPl ? `${label} musi mieć format YYYY-MM-DD` : `${label} must use the YYYY-MM-DD format`,
    monthOrPresent: (label: string) =>
      isPl
        ? `${label} musi mieć format YYYY-MM albo wartość typu 'obecnie'`
        : `${label} must use YYYY-MM or a value like 'present'`,
    dateOrder: (label: string) =>
      isPl ? `${label} nie może być wcześniejsza niż data rozpoczęcia` : `${label} cannot be earlier than the start date`,
    expiryRequired: isPl
      ? 'Data wygaśnięcia jest wymagana dla certyfikatu terminowego'
      : 'Expiry date is required for a time-limited certification',
    labels: isPl
      ? {
          templateId: 'Identyfikator szablonu',
          name: 'Imię i nazwisko',
          title: 'Tytuł zawodowy',
          targetRole: 'Docelowe stanowisko',
          targetCompany: 'Firma lub branża docelowa',
          targetJobDescription: 'Opis oferty pracy',
          email: 'Adres e-mail',
          phone: 'Numer telefonu',
          location: 'Lokalizacja',
          city: 'Miasto',
          country: 'Kraj',
          summary: 'Podsumowanie zawodowe',
          company: 'Nazwa firmy',
          position: 'Stanowisko',
          experienceLocation: 'Lokalizacja doświadczenia',
          experienceStart: 'Data rozpoczęcia doświadczenia',
          experienceEnd: 'Data zakończenia doświadczenia',
          responsibility: 'Obowiązek',
          highlight: 'Osiągnięcie',
          institution: 'Nazwa uczelni lub szkoły',
          degree: 'Stopień lub tytuł',
          field: 'Kierunek lub specjalizacja',
          educationLocation: 'Lokalizacja edukacji',
          educationStart: 'Data rozpoczęcia edukacji',
          educationEnd: 'Data zakończenia edukacji',
          gpa: 'Wynik lub średnia',
          coursework: 'Kurs lub przedmiot',
          skillCategory: 'Kategoria umiejętności',
          skill: 'Umiejętność',
          projectName: 'Nazwa projektu',
          projectRole: 'Rola w projekcie',
          projectOrganization: 'Organizacja lub kontekst projektu',
          projectStart: 'Data rozpoczęcia projektu',
          projectEnd: 'Data zakończenia projektu',
          projectPeriod: 'Okres projektu',
          projectDescription: 'Opis projektu',
          projectKeyword: 'Słowo kluczowe projektu',
          projectResult: 'Rezultat projektu',
          language: 'Język',
          fluency: 'Poziom znajomości języka',
          languageCertificate: 'Certyfikat językowy',
          certificationName: 'Nazwa certyfikatu',
          certificationIssuer: 'Wystawca certyfikatu',
          certificationDate: 'Data uzyskania certyfikatu',
          certificationExpires: 'Data wygaśnięcia certyfikatu',
          certificationDetails: 'Zakres certyfikatu',
        }
      : {
          templateId: 'Template identifier',
          name: 'Full name',
          title: 'Professional title',
          targetRole: 'Target role',
          targetCompany: 'Target company or industry',
          targetJobDescription: 'Job description',
          email: 'Email address',
          phone: 'Phone number',
          location: 'Location',
          city: 'City',
          country: 'Country',
          summary: 'Professional summary',
          company: 'Company name',
          position: 'Position',
          experienceLocation: 'Experience location',
          experienceStart: 'Experience start date',
          experienceEnd: 'Experience end date',
          responsibility: 'Responsibility',
          highlight: 'Achievement',
          institution: 'School or university name',
          degree: 'Degree or title',
          field: 'Field or specialization',
          educationLocation: 'Education location',
          educationStart: 'Education start date',
          educationEnd: 'Education end date',
          gpa: 'Grade or GPA',
          coursework: 'Course or subject',
          skillCategory: 'Skill category',
          skill: 'Skill',
          projectName: 'Project name',
          projectRole: 'Project role',
          projectOrganization: 'Project organization or context',
          projectStart: 'Project start date',
          projectEnd: 'Project end date',
          projectPeriod: 'Project period',
          projectDescription: 'Project description',
          projectKeyword: 'Project keyword',
          projectResult: 'Project result',
          language: 'Language',
          fluency: 'Language proficiency',
          languageCertificate: 'Language certificate',
          certificationName: 'Certification name',
          certificationIssuer: 'Certification issuer',
          certificationDate: 'Certification issue date',
          certificationExpires: 'Certification expiry date',
          certificationDetails: 'Certification scope',
        },
  };
};

const createResumeSchema = (locale: ResumeLocale) => {
  const copy = getSchemaCopy(locale);
  const text = (max: number, label: string) =>
    z.string().trim().max(max, copy.max(label, max)).default('');

  const listItem = (max: number, label: string) =>
    z.string().trim().min(1, copy.required(label)).max(max, copy.max(label, max));

  const stringList = (maxItems: number, itemMax: number, label: string) =>
    z.array(listItem(itemMax, label)).max(maxItems, copy.maxItems(label, maxItems)).default([]);

  const optionalEmail = text(254, copy.labels.email).refine(
    (value) => value === '' || emailRegex.test(value),
    copy.invalidEmail
  );

  const optionalPhone = text(30, copy.labels.phone).refine(
    (value) => value === '' || phoneRegex.test(value),
    copy.invalidPhone
  );

  const optionalUrl = text(300, 'Link').refine(
    (value) => value === '' || urlRegex.test(value),
    copy.invalidUrl
  );

  const optionalMonth = (label: string) =>
    z.string().trim().default('').refine((value) => value === '' || monthRegex.test(value), copy.monthFormat(label));

  const optionalDate = (label: string) =>
    z.string().trim().default('').refine((value) => value === '' || dateRegex.test(value), copy.dateFormat(label));

  const optionalMonthOrPresent = (label: string) =>
    z
      .string()
      .trim()
      .default('')
      .refine(
        (value) => value === '' || monthRegex.test(value) || PRESENT_VALUES.includes(value as (typeof PRESENT_VALUES)[number]),
        copy.monthOrPresent(label)
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

  const ResumeMetadataSchema = z.object({
    language: z.enum(['pl', 'en']).default('pl'),
    schema_version: z.string().trim().default('resume_maxxer.v1'),
    template_id: text(80, copy.labels.templateId).default(DEFAULT_TEMPLATE_ID),
    skill_profile: z.enum(['general', 'engineering', 'custom']).default(DEFAULT_SKILL_PROFILE),
  });

  const ResumeUrlsSchema = z
    .object({
      linkedin: optionalUrl.optional(),
      github: optionalUrl.optional(),
      portfolio: optionalUrl.optional(),
      website: optionalUrl.optional(),
    })
    .catchall(optionalUrl.optional())
    .default({});

  const ResumeBasicsSchema = z.object({
    name: text(120, copy.labels.name),
    title: text(120, copy.labels.title),
    targetRole: text(120, copy.labels.targetRole),
    targetCompany: text(120, copy.labels.targetCompany),
    targetJobDescription: text(12000, copy.labels.targetJobDescription),
    email: optionalEmail,
    phone: optionalPhone,
    location: text(120, copy.labels.location),
    city: text(80, copy.labels.city),
    country: text(80, copy.labels.country),
    showCountry: z.boolean().default(true),
    remoteFriendly: z.boolean().default(false),
    urls: ResumeUrlsSchema,
    summary: text(1600, copy.labels.summary),
    showSummary: z.boolean().default(true),
  });

  const ExperienceItemSchema = withDateOrder(
    z.object({
      company: text(140, copy.labels.company),
      position: text(140, copy.labels.position),
      location: text(120, copy.labels.experienceLocation),
      startDate: optionalMonth(copy.labels.experienceStart),
      endDate: optionalMonthOrPresent(copy.labels.experienceEnd),
      responsibilities: stringList(20, 220, copy.labels.responsibility),
      highlights: stringList(20, 240, copy.labels.highlight),
    }),
    'startDate',
    'endDate',
    copy.dateOrder(copy.labels.experienceEnd),
    true
  );

  const EducationItemSchema = withDateOrder(
    z.object({
      institution: text(160, copy.labels.institution),
      degree: text(120, copy.labels.degree),
      field: text(140, copy.labels.field),
      location: text(120, copy.labels.educationLocation),
      startDate: optionalMonth(copy.labels.educationStart),
      endDate: optionalMonth(copy.labels.educationEnd),
      gpa: text(40, copy.labels.gpa),
      coursework: stringList(20, 120, copy.labels.coursework),
    }),
    'startDate',
    'endDate',
    copy.dateOrder(copy.labels.educationEnd)
  );

  const SkillGroupSchema = z.object({
    category: text(80, copy.labels.skillCategory),
    keywords: stringList(40, 60, copy.labels.skill),
  });

  const ProjectItemSchema = withDateOrder(
    z.object({
      name: text(160, copy.labels.projectName),
      role: text(120, copy.labels.projectRole),
      organization: text(140, copy.labels.projectOrganization),
      startDate: optionalDate(copy.labels.projectStart),
      endDate: optionalDate(copy.labels.projectEnd),
      period: text(32, copy.labels.projectPeriod),
      description: text(1200, copy.labels.projectDescription),
      url: optionalUrl,
      keywords: stringList(30, 60, copy.labels.projectKeyword),
      highlights: stringList(20, 240, copy.labels.projectResult),
    }),
    'startDate',
    'endDate',
    copy.dateOrder(copy.labels.projectEnd)
  );

  const LanguageItemSchema = z.object({
    language: text(60, copy.labels.language),
    fluency: text(60, copy.labels.fluency),
    certificate: text(120, copy.labels.languageCertificate),
    url: optionalUrl,
  });

  const CertificationItemSchema = withDateOrder(
    z.object({
      name: text(180, copy.labels.certificationName),
      issuer: text(140, copy.labels.certificationIssuer),
      date: optionalDate(copy.labels.certificationDate),
      expires: optionalDate(copy.labels.certificationExpires),
      status: z.enum(CERTIFICATION_STATUSES).default('Bezterminowy'),
      details: text(1000, copy.labels.certificationDetails),
      url: optionalUrl,
    }),
    'date',
    'expires',
    copy.dateOrder(copy.labels.certificationExpires)
  ).superRefine((value, ctx) => {
    if (value.status !== 'Bezterminowy' && !value.expires) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['expires'],
        message: copy.expiryRequired,
      });
    }
  });

  return z.object({
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
      showCountry: true,
      remoteFriendly: false,
      urls: {},
      summary: '',
      showSummary: true,
    }),
    experience: z.array(ExperienceItemSchema).default([]),
    education: z.array(EducationItemSchema).default([]),
    skills: z.array(SkillGroupSchema).default([]),
    projects: z.array(ProjectItemSchema).default([]),
    languages: z.array(LanguageItemSchema).default([]),
    certifications: z.array(CertificationItemSchema).default([]),
  });
};

export const getResumeDataSchema = (locale: ResumeLocale = 'pl') => createResumeSchema(locale);
export const ResumeDataSchema = getResumeDataSchema();

export type ResumeMetadata = z.infer<typeof ResumeDataSchema>['metadata'];
export type ResumeUrls = z.infer<typeof ResumeDataSchema>['basics']['urls'];
export type ResumeBasics = z.infer<typeof ResumeDataSchema>['basics'];
export type ExperienceItem = z.infer<typeof ResumeDataSchema>['experience'][number];
export type EducationItem = z.infer<typeof ResumeDataSchema>['education'][number];
export type SkillGroup = z.infer<typeof ResumeDataSchema>['skills'][number];
export type ProjectItem = z.infer<typeof ResumeDataSchema>['projects'][number];
export type LanguageItem = z.infer<typeof ResumeDataSchema>['languages'][number];
export type CertificationItem = z.infer<typeof ResumeDataSchema>['certifications'][number];
export type ResumeData = z.infer<typeof ResumeDataSchema>;

import type { ZodError } from 'zod';
import {
  getResumeDataSchema,
  type CertificationItem,
  type ResumeData,
  type ResumeLocale,
  type ResumeMetadata,
} from '@/types/resume';
import { DEFAULT_SKILL_PROFILE, type SkillProfile } from '@/lib/skillPresets';
import { DEFAULT_TEMPLATE_ID, getTemplateLanguage, resolveTemplateVariantId } from '@/lib/templates';

export const RESUME_SCHEMA_VERSION = 'resume_maxxer.v1';

export const formatResumeValidationError = (error: ZodError) =>
  error.issues
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join('.') : 'resume';
      return `${path}: ${issue.message}`;
    })
    .join('\n');

const asString = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const asStringArray = (value: unknown) =>
  Array.isArray(value) ? value.map((item) => asString(item)).filter(Boolean) : [];

const asObject = (value: unknown): Record<string, unknown> =>
  value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};

const asLanguage = (value: unknown): ResumeMetadata['language'] => (value === 'en' ? 'en' : 'pl');

const getLocalizedPresent = (language: ResumeMetadata['language']) =>
  language === 'en' ? 'present' : 'Obecnie';

const getLocalizedRemote = (language: ResumeMetadata['language']) =>
  language === 'en' ? 'Remote' : 'Zdalnie';

const asSkillProfile = (value: unknown): SkillProfile =>
  value === 'engineering' || value === 'custom' ? value : DEFAULT_SKILL_PROFILE;

const asCertificationStatus = (value: unknown): CertificationItem['status'] => {
  const status = asString(value);
  if (['Bezterminowy', 'Terminowy', 'Wygasły', 'Do odnowienia'].includes(status)) {
    return status as CertificationItem['status'];
  }

  if (['Wygasł'].includes(status)) return 'Wygasły';
  if (['Do odnowienia'].includes(status)) return 'Do odnowienia';
  if (['Aktywny', 'Ukończony'].includes(status)) return 'Bezterminowy';
  if (status === 'W trakcie') return 'Terminowy';

  return 'Bezterminowy';
};

const asFullDate = (value: unknown) => {
  const date = asString(value);
  if (/^\d{4}-\d{2}-\d{2}/.test(date)) return date.slice(0, 10);
  if (/^\d{4}-\d{2}/.test(date)) return `${date}-01`;
  if (/^\d{4}/.test(date)) return `${date}-01-01`;
  return date;
};

const asMonth = (value: unknown) => {
  const date = asString(value);
  if (/^\d{4}-\d{2}-\d{2}/.test(date)) return date.slice(0, 7);
  if (/^\d{4}-\d{2}$/.test(date)) return date;
  return '';
};

const asMonthOrPresent = (value: unknown, language: ResumeMetadata['language']) => {
  const date = asString(value);
  if (/^\d{4}-\d{2}-\d{2}/.test(date)) return date.slice(0, 7);
  if (/^\d{4}-\d{2}$/.test(date)) return date;
  if (['present', 'Present', 'PRESENT', 'obecnie', 'Obecnie', 'OBECNIE'].includes(date)) {
    return getLocalizedPresent(language);
  }
  return '';
};

const buildLocation = (
  city: string,
  country: string,
  remoteFriendly: boolean,
  current: string,
  language: ResumeMetadata['language']
) => {
  const remote = getLocalizedRemote(language);
  const baseLocation = [country, city].filter(Boolean).join(', ');
  if (baseLocation) {
    return remoteFriendly ? `${baseLocation} / ${remote}` : baseLocation;
  }

  if (current) return current;
  return remoteFriendly ? remote : '';
};

const buildProjectPeriod = (startDate: string, endDate: string, current: string) => {
  if (startDate && endDate) return `${startDate} - ${endDate}`;
  if (startDate) return startDate;
  if (endDate) return endDate;
  return current;
};

const normalizeUrls = (value: unknown) => {
  const entries = Object.entries(asObject(value))
    .map(([key, url]) => [asString(key), asString(url)] as const)
    .filter(([key]) => Boolean(key));

  return Object.fromEntries(entries);
};

const cleanUrls = (value: Record<string, string | undefined>) =>
  Object.fromEntries(
    Object.entries(value).filter(([, url]) => Boolean(url)) as Array<[string, string]>
  );

const withOptionalString = (key: string, value: string) => (value ? { [key]: value } : {});

export const normalizeResumeData = (input: unknown, templateId?: string): ResumeData => {
  const source = asObject(input);
  const metadata = asObject(source.metadata);
  const language = asLanguage(metadata.language);
  const basics = asObject(source.basics);
  const city = asString(basics.city);
  const country = asString(basics.country);
  const showCountry = basics.showCountry !== false;
  const remoteFriendly = Boolean(basics.remoteFriendly);
  const showSummary = basics.showSummary !== false;
  const normalizedTemplateId = resolveTemplateVariantId(
    templateId || asString(metadata.template_id),
    language
  );

  return {
    metadata: {
        language: getTemplateLanguage(normalizedTemplateId),
      schema_version: RESUME_SCHEMA_VERSION,
      template_id: normalizedTemplateId || DEFAULT_TEMPLATE_ID,
      skill_profile: asSkillProfile(metadata.skill_profile),
    },
      basics: {
      name: asString(basics.name),
      title: asString(basics.title),
      targetRole: asString(basics.targetRole),
      targetCompany: asString(basics.targetCompany),
      targetJobDescription: asString(basics.targetJobDescription),
      email: asString(basics.email),
      phone: asString(basics.phone),
      city,
      country,
      showCountry,
      remoteFriendly,
      location: buildLocation(city, showCountry ? country : '', remoteFriendly, asString(basics.location), language),
      urls: normalizeUrls(basics.urls),
      summary: asString(basics.summary),
      showSummary,
    },
    experience: Array.isArray(source.experience)
      ? source.experience.map((item) => {
          const experience = asObject(item);
          return {
            company: asString(experience.company),
            position: asString(experience.position),
            location: asString(experience.location),
            startDate: asMonth(experience.startDate),
            endDate: asMonthOrPresent(experience.endDate, language),
            responsibilities: asStringArray(experience.responsibilities),
            highlights: asStringArray(experience.highlights),
          };
        })
      : [],
    education: Array.isArray(source.education)
      ? source.education.map((item) => {
          const education = asObject(item);
          return {
            institution: asString(education.institution),
            degree: asString(education.degree),
            field: asString(education.field),
            location: asString(education.location),
            startDate: asMonth(education.startDate),
            endDate: asMonth(education.endDate),
            gpa: asString(education.gpa),
            coursework: asStringArray(education.coursework),
          };
        })
      : [],
    skills: Array.isArray(source.skills)
      ? source.skills
          .map((item) => {
            const group = asObject(item);
            return {
              category: asString(group.category),
              keywords: asStringArray(group.keywords),
            };
          })
          .filter((group) => group.category || group.keywords.length > 0)
      : [],
    projects: Array.isArray(source.projects)
      ? source.projects.map((item) => {
          const project = asObject(item);
          const startDate = asString(project.startDate);
          const endDate = asString(project.endDate);
          return {
            name: asString(project.name),
            role: asString(project.role),
            organization: asString(project.organization),
            startDate,
            endDate,
            period: buildProjectPeriod(startDate, endDate, asString(project.period)),
            description: asString(project.description),
            url: asString(project.url),
            keywords: asStringArray(project.keywords),
            highlights: asStringArray(project.highlights),
          };
        })
      : [],
    languages: Array.isArray(source.languages)
      ? source.languages.map((item) => {
          const language = asObject(item);
          return {
            language: asString(language.language),
            fluency: asString(language.fluency),
            certificate: asString(language.certificate),
            url: asString(language.url),
          };
        })
      : [],
    certifications: Array.isArray(source.certifications)
      ? source.certifications.map((item) => {
          const certification = asObject(item);
          const expires = asFullDate(certification.expires);
          const status =
            asCertificationStatus(certification.status) || (expires ? 'Terminowy' : 'Bezterminowy');
          return {
            name: asString(certification.name),
            issuer: asString(certification.issuer),
            date: asFullDate(certification.date),
            expires: status === 'Bezterminowy' ? '' : expires,
            status,
            details: asString(certification.details),
            url: asString(certification.url),
          };
        })
      : [],
  };
};

export const serializeResumeData = (
  input: ResumeData,
  templateId?: string,
  locale?: ResumeLocale
): ResumeData => {
  const data = normalizeResumeData(input, templateId);
  const schema = getResumeDataSchema(locale || data.metadata.language);

  return schema.parse({
    metadata: data.metadata,
    basics: {
      name: data.basics.name,
      title: data.basics.title,
      email: data.basics.email,
      phone: data.basics.phone,
      location: data.basics.location,
      remoteFriendly: data.basics.remoteFriendly,
      urls: cleanUrls(data.basics.urls || {}),
      summary: data.basics.summary,
      showSummary: data.basics.showSummary,
      ...withOptionalString('targetRole', data.basics.targetRole || ''),
      ...withOptionalString('targetCompany', data.basics.targetCompany || ''),
      ...withOptionalString('targetJobDescription', data.basics.targetJobDescription || ''),
      ...withOptionalString('city', data.basics.city || ''),
      ...withOptionalString('country', data.basics.country || ''),
      showCountry: data.basics.showCountry,
    },
    experience: data.experience
      .filter((item) => item.company || item.position || item.highlights.length > 0)
      .map((item) => ({
        company: item.company,
        position: item.position,
        ...withOptionalString('location', item.location || ''),
        startDate: item.startDate,
        endDate: item.endDate,
        responsibilities: item.responsibilities,
        highlights: item.highlights,
      })),
    education: data.education
      .filter((item) => item.institution || item.degree || item.field)
      .map((item) => ({
        institution: item.institution,
        degree: item.degree,
        field: item.field,
        ...withOptionalString('location', item.location || ''),
        startDate: item.startDate,
        endDate: item.endDate,
        ...withOptionalString('gpa', item.gpa || ''),
        coursework: item.coursework,
      })),
    skills: data.skills
      .filter((group) => group.category && group.keywords.length > 0)
      .map((group) => ({
        category: group.category,
        keywords: group.keywords,
      })),
    projects: data.projects
      .filter((item) => item.name || item.description || item.highlights.length > 0)
      .map((item) => ({
        name: item.name,
        ...withOptionalString('role', item.role || ''),
        ...withOptionalString('organization', item.organization || ''),
        ...withOptionalString('startDate', item.startDate || ''),
        ...withOptionalString('endDate', item.endDate || ''),
        ...withOptionalString('period', item.period || ''),
        ...withOptionalString('description', item.description || ''),
        ...withOptionalString('url', item.url || ''),
        keywords: item.keywords,
        highlights: item.highlights,
      })),
    languages: data.languages
      .filter((item) => item.language || item.fluency)
      .map((item) => ({
        language: item.language,
        fluency: item.fluency,
        ...withOptionalString('certificate', item.certificate || ''),
        ...withOptionalString('url', item.url || ''),
      })),
    certifications: data.certifications
      .filter((item) => item.name || item.issuer || item.date)
      .map((item) => ({
        name: item.name,
        issuer: item.issuer,
        date: asFullDate(item.date),
        ...(item.status === 'Bezterminowy'
          ? {}
          : withOptionalString('expires', item.expires || '')),
        status: item.status || 'Bezterminowy',
        ...withOptionalString('details', item.details || ''),
        ...withOptionalString('url', item.url || ''),
      })),
  });
};

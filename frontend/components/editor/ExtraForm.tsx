'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useResume } from '@/context/ResumeContext';
import { Globe, Award, Plus, Trash2 } from 'lucide-react';
import { FormBlock } from '@/components/editor/FormBlock';

export const ExtraForm: React.FC = () => {
  const t = useTranslations('Editor.Extra');
  const { resumeData, updateResumeData } = useResume();
  const languages = resumeData?.languages || [];
  const certifications = resumeData?.certifications || [];
  const fluencyLevels = t.raw('fluencyLevels') as string[];
  const certificationStatuses = [
    { value: 'Bezterminowy', label: t('statuses.permanent') },
    { value: 'Terminowy', label: t('statuses.expiring') },
    { value: 'Wygasły', label: t('statuses.expired') },
    { value: 'Do odnowienia', label: t('statuses.renewal') },
  ];

  const toDateInputValue = (value?: string) => {
    if (!value) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    if (/^\d{4}-\d{2}$/.test(value)) return `${value}-01`;
    if (/^\d{4}$/.test(value)) return `${value}-01-01`;
    return '';
  };

  const certificationNeedsExpiry = (status?: string) =>
    status === 'Terminowy' || status === 'Wygasły' || status === 'Do odnowienia';

  const handleAddLanguage = () => {
    updateResumeData((prev) => ({
      ...prev,
      languages: [
        ...(prev.languages || []),
        { language: '', fluency: '', certificate: '', url: '' },
      ],
    }));
  };

  const handleRemoveLanguage = (index: number) => {
    updateResumeData((prev) => ({
      ...prev,
      languages: (prev.languages || []).filter((_, i) => i !== index),
    }));
  };

  const handleChangeLanguage = (index: number, field: string, value: string) => {
    updateResumeData((prev) => {
      const newLangs = [...(prev.languages || [])];
      newLangs[index] = { ...newLangs[index], [field]: value };
      return { ...prev, languages: newLangs };
    });
  };

  const handleAddCert = () => {
    updateResumeData((prev) => ({
      ...prev,
      certifications: [
        ...(prev.certifications || []),
        {
          name: '',
          date: '',
          issuer: '',
          expires: '',
          status: 'Bezterminowy',
          details: '',
          url: '',
        },
      ],
    }));
  };

  const handleRemoveCert = (index: number) => {
    updateResumeData((prev) => ({
      ...prev,
      certifications: (prev.certifications || []).filter((_, i) => i !== index),
    }));
  };

  const handleChangeCert = (index: number, field: string, value: string) => {
    updateResumeData((prev) => {
      const newCerts = [...(prev.certifications || [])];
      newCerts[index] = { ...newCerts[index], [field]: value };
      if (field === 'status' && value === 'Bezterminowy') {
        newCerts[index].expires = '';
      }
      return { ...prev, certifications: newCerts };
    });
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <FormBlock
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
      >
        <div className="grid grid-cols-1 gap-3 text-xs font-semibold text-content-secondary sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface px-4 py-3">
            {t('tips.languages')}
          </div>
          <div className="rounded-2xl border border-border bg-surface px-4 py-3">
            {t('tips.certifications')}
          </div>
        </div>
      </FormBlock>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-5">
          <div className="flex items-center space-x-2.5">
            <Globe className="h-5 w-5 text-content" />
            <h3 className="text-xl font-bold tracking-tight text-content">{t('languages.title')}</h3>
          </div>
          <button
            onClick={handleAddLanguage}
            className="inline-flex items-center gap-2 rounded-full bg-content px-5 py-2 text-xs font-bold text-content-inverse shadow-sm hover:bg-neutral-800 transition-all active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span>{t('languages.add')}</span>
          </button>
        </div>

        {languages.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border p-8 text-center space-y-2 bg-surface-secondary">
            <p className="text-xs font-bold text-content">{t('languages.emptyTitle')}</p>
            <p className="text-[11px] text-content-muted">
              {t('languages.emptyDescription')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {languages.map((lang, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-surface-secondary p-5 space-y-3"
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    value={lang.language || ''}
                    onChange={(e) => handleChangeLanguage(idx, 'language', e.target.value)}
                    placeholder={t('languages.fields.language.placeholder')}
                    className="rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:outline-none"
                  />
                  <select
                    value={lang.fluency || ''}
                    onChange={(e) => handleChangeLanguage(idx, 'fluency', e.target.value)}
                    className="rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:outline-none"
                  >
                    <option value="">{t('languages.fields.fluency.placeholder')}</option>
                    {fluencyLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    value={lang.certificate || ''}
                    onChange={(e) => handleChangeLanguage(idx, 'certificate', e.target.value)}
                    placeholder={t('languages.fields.certificate.placeholder')}
                    className="rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:outline-none"
                  />
                  <input
                    type="text"
                    value={lang.url || ''}
                    onChange={(e) => handleChangeLanguage(idx, 'url', e.target.value)}
                    placeholder={t('languages.fields.url.placeholder')}
                    className="rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:outline-none"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleRemoveLanguage(idx)}
                    className="text-content-muted hover:text-red-600 p-1.5 rounded-full hover:bg-surface transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between border-b border-border pb-5">
          <div className="flex items-center space-x-2.5">
            <Award className="h-5 w-5 text-content" />
            <h3 className="text-xl font-bold tracking-tight text-content">
              {t('certifications.title')}
            </h3>
          </div>
          <button
            onClick={handleAddCert}
            className="inline-flex items-center gap-2 rounded-full bg-content px-5 py-2 text-xs font-bold text-content-inverse shadow-sm hover:bg-neutral-800 transition-all active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span>{t('certifications.add')}</span>
          </button>
        </div>

        {certifications.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border p-8 text-center space-y-2 bg-surface-secondary">
            <p className="text-xs font-bold text-content">{t('certifications.emptyTitle')}</p>
            <p className="text-[11px] text-content-muted">
              {t('certifications.emptyDescription')}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-border bg-surface-secondary p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-content-muted">
                      {t('certifications.itemLabel', { index: idx + 1 })}
                  </span>
                  <button
                    onClick={() => handleRemoveCert(idx)}
                    className="text-content-muted hover:text-red-600 p-1.5 rounded-full hover:bg-surface transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-content mb-1">
                      {t('certifications.fields.name.label')}
                    </label>
                    <input
                      type="text"
                      value={cert.name || ''}
                      onChange={(e) => handleChangeCert(idx, 'name', e.target.value)}
                        placeholder={t('certifications.fields.name.placeholder')}
                      className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-content mb-1">
                      {t('certifications.fields.date.label')}
                    </label>
                    <input
                      type="date"
                      value={toDateInputValue(cert.date)}
                      onChange={(e) => handleChangeCert(idx, 'date', e.target.value)}
                      className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-content mb-1">{t('certifications.fields.status.label')}</label>
                    <select
                      value={cert.status || 'Bezterminowy'}
                      onChange={(e) => handleChangeCert(idx, 'status', e.target.value)}
                      className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:outline-none"
                    >
                      {certificationStatuses.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 text-[10px] text-content-muted">
                      {t('certifications.fields.status.helper')}
                    </p>
                  </div>

                  {certificationNeedsExpiry(cert.status) ? (
                    <div>
                      <label className="block text-[11px] font-bold text-content mb-1">
                        {t('certifications.fields.expires.label')}
                      </label>
                      <input
                        type="date"
                        value={toDateInputValue(cert.expires)}
                        onChange={(e) => handleChangeCert(idx, 'expires', e.target.value)}
                        className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:outline-none"
                      />
                    </div>
                  ) : null}

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-bold text-content mb-1">
                      {t('certifications.fields.issuer.label')}
                    </label>
                    <input
                      type="text"
                      value={cert.issuer || ''}
                      onChange={(e) => handleChangeCert(idx, 'issuer', e.target.value)}
                      placeholder={t('certifications.fields.issuer.placeholder')}
                      className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-bold text-content mb-1">
                      {t('certifications.fields.url.label')}
                    </label>
                    <input
                      type="text"
                      value={cert.url || ''}
                      onChange={(e) => handleChangeCert(idx, 'url', e.target.value)}
                      placeholder={t('certifications.fields.url.placeholder')}
                      className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-bold text-content mb-1">
                      {t('certifications.fields.details.label')}
                    </label>
                    <textarea
                      rows={3}
                      value={cert.details || ''}
                      onChange={(e) => handleChangeCert(idx, 'details', e.target.value)}
                      placeholder={t('certifications.fields.details.placeholder')}
                      className="w-full rounded-xl border border-border bg-surface p-3 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

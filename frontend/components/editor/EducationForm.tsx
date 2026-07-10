'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useResume } from '@/context/ResumeContext';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import type { EducationItem } from '@/types/resume';
import { FormBlock } from '@/components/editor/FormBlock';
import { ListEditorField } from '@/components/editor/ListEditorField';

export const EducationForm: React.FC = () => {
  const t = useTranslations('Editor.Education');
  const { resumeData, updateResumeData } = useResume();
  const education: EducationItem[] = resumeData?.education || [];

  const toDateInputValue = (value?: string) => {
    if (!value) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    if (/^\d{4}-\d{2}$/.test(value)) return `${value}-01`;
    return '';
  };
  const degreeOptions = t.raw('degreeOptions') as string[];
  const fieldOptions = t.raw('fieldOptions') as string[];

  const handleAdd = () => {
    updateResumeData((prev) => ({
      ...prev,
      education: [
        ...(prev.education || []),
        {
          institution: '',
          degree: '',
          field: '',
          location: '',
          startDate: '',
          endDate: '',
          gpa: '',
          coursework: [],
        },
      ],
    }));
  };

  const handleRemove = (index: number) => {
    updateResumeData((prev) => ({
      ...prev,
      education: (prev.education || []).filter((_, i) => i !== index),
    }));
  };

  const handleChange = <K extends keyof EducationItem>(
    index: number,
    field: K,
    value: EducationItem[K]
  ) => {
    updateResumeData((prev) => {
      const newEdu = [...(prev.education || [])];
      newEdu[index] = { ...newEdu[index], [field]: value };
      return { ...prev, education: newEdu };
    });
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <FormBlock
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
      >
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 rounded-full bg-content px-6 py-2.5 text-xs font-bold text-content-inverse shadow-sm hover:bg-neutral-800 transition-all active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          <span>{t('add')}</span>
        </button>
        <datalist id="degree-options">
          {degreeOptions.map((option) => (
            <option key={option} value={option} />
          ))}
        </datalist>
        <datalist id="field-options">
          {fieldOptions.map((option) => (
            <option key={option} value={option} />
          ))}
        </datalist>
      </FormBlock>

      {education.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center space-y-3 bg-surface-secondary">
          <GraduationCap className="h-8 w-8 text-content-muted mx-auto" />
          <p className="text-sm font-bold text-content">{t('emptyTitle')}</p>
          <p className="text-xs text-content-muted max-w-xs mx-auto leading-relaxed">
            {t('emptyDescription')}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="rounded-3xl border border-border bg-surface-secondary p-8 space-y-6 transition-all hover:border-border-strong"
            >
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center space-x-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-content text-content-inverse font-bold text-xs">
                    {index + 1}
                  </span>
                  <span className="font-bold text-base text-content">
                      {edu.institution || t('newItem')}
                  </span>
                </div>
                <button
                  onClick={() => handleRemove(index)}
                  title={t('remove')}
                  className="text-content-muted hover:text-red-600 transition-all p-2 rounded-full hover:bg-surface"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="rounded-2xl border border-border bg-surface px-4 py-3 text-[11px] font-semibold leading-relaxed text-content-secondary">
                {t('tip')}
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-content mb-2">
                    {t('fields.degree.label')}
                  </label>
                  <input
                    type="text"
                    list="degree-options"
                    value={edu.degree || ''}
                    onChange={(e) => handleChange(index, 'degree', e.target.value)}
                    placeholder={t('fields.degree.placeholder')}
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">
                    {t('fields.field.label')}
                  </label>
                  <input
                    type="text"
                    list="field-options"
                    value={edu.field || ''}
                    onChange={(e) => handleChange(index, 'field', e.target.value)}
                    placeholder={t('fields.field.placeholder')}
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">
                    {t('fields.institution.label')}
                  </label>
                  <input
                    type="text"
                    value={edu.institution || ''}
                    onChange={(e) => handleChange(index, 'institution', e.target.value)}
                    placeholder={t('fields.institution.placeholder')}
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">{t('fields.location.label')}</label>
                  <input
                    type="text"
                    value={edu.location || ''}
                    onChange={(e) => handleChange(index, 'location', e.target.value)}
                    placeholder={t('fields.location.placeholder')}
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-content mb-2">
                    {t('fields.gpa.label')}
                  </label>
                  <input
                    type="text"
                    value={edu.gpa || ''}
                    onChange={(e) => handleChange(index, 'gpa', e.target.value)}
                    placeholder={t('fields.gpa.placeholder')}
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">{t('fields.startDate.label')}</label>
                  <input
                    type="date"
                    value={toDateInputValue(edu.startDate)}
                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">{t('fields.endDate.label')}</label>
                  <input
                    type="date"
                    value={toDateInputValue(edu.endDate)}
                    onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <ListEditorField
                  label={t('coursework.label')}
                  items={edu.coursework || []}
                  onChange={(items) => handleChange(index, 'coursework', items)}
                  placeholder={t('coursework.placeholder')}
                  helperText={t('coursework.helper')}
                  addLabel={t('coursework.add')}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

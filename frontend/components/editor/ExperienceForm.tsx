'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useResume } from '@/context/ResumeContext';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import type { ExperienceItem } from '@/types/resume';
import { FormBlock } from '@/components/editor/FormBlock';
import { ListEditorField } from '@/components/editor/ListEditorField';

export const ExperienceForm: React.FC = () => {
  const t = useTranslations('Editor.Experience');
  const { resumeData, updateResumeData } = useResume();
  const experience: ExperienceItem[] = resumeData?.experience || [];
  const currentValue = t('fields.endDate.current');

  const toDateInputValue = (value?: string) => {
    if (!value) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    if (/^\d{4}-\d{2}$/.test(value)) return `${value}-01`;
    return '';
  };

  const isCurrentRole = (value?: string) =>
    value === 'Obecnie' || value === 'obecnie' || value === 'present' || value === 'Present';

  const handleAdd = () => {
    updateResumeData((prev) => ({
      ...prev,
      experience: [
        ...(prev.experience || []),
        {
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          responsibilities: [],
          highlights: [],
        },
      ],
    }));
  };

  const handleRemove = (index: number) => {
    updateResumeData((prev) => ({
      ...prev,
      experience: (prev.experience || []).filter((_, i) => i !== index),
    }));
  };

  const handleChange = <K extends keyof ExperienceItem>(
    index: number,
    field: K,
    value: ExperienceItem[K]
  ) => {
    updateResumeData((prev) => {
      const newExp = [...(prev.experience || [])];
      newExp[index] = { ...newExp[index], [field]: value };
      return { ...prev, experience: newExp };
    });
  };

  const handleCurrentChange = (index: number, checked: boolean) => {
    handleChange(index, 'endDate', checked ? currentValue : '');
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
      </FormBlock>

      {experience.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center space-y-3 bg-surface-secondary">
          <Briefcase className="h-8 w-8 text-content-muted mx-auto" />
          <p className="text-sm font-bold text-content">{t('emptyTitle')}</p>
          <p className="text-xs text-content-muted max-w-xs mx-auto leading-relaxed">
            {t('emptyDescription')}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {experience.map((exp, index) => (
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
                    {exp.position || t('newItem')} {exp.company ? ` ${t('at')} ${exp.company}` : ''}
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
                    {t('fields.position.label')}
                  </label>
                  <input
                    type="text"
                    value={exp.position || ''}
                    onChange={(e) => handleChange(index, 'position', e.target.value)}
                    placeholder={t('fields.position.placeholder')}
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">
                    {t('fields.company.label')}
                  </label>
                  <input
                    type="text"
                    value={exp.company || ''}
                    onChange={(e) => handleChange(index, 'company', e.target.value)}
                    placeholder={t('fields.company.placeholder')}
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">{t('fields.startDate.label')}</label>
                  <input
                    type="date"
                    value={toDateInputValue(exp.startDate)}
                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">{t('fields.endDate.label')}</label>
                  <div className="space-y-2">
                    <input
                      type="date"
                      value={isCurrentRole(exp.endDate) ? '' : toDateInputValue(exp.endDate)}
                      onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                      disabled={isCurrentRole(exp.endDate)}
                      className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                    />
                    <label className="flex items-center gap-2 text-[11px] font-semibold text-content-secondary">
                      <input
                        type="checkbox"
                        checked={isCurrentRole(exp.endDate)}
                        onChange={(e) => handleCurrentChange(index, e.target.checked)}
                        className="h-3.5 w-3.5 rounded border-border"
                      />
                      {t('fields.endDate.current')}
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <div className="mb-2 flex items-center gap-2">
                    <label className="block text-xs font-bold text-content">
                      {t('fields.location.label')}
                    </label>
                    <span className="rounded-full bg-surface-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-content-muted">
                      {t('fields.location.optional')}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={exp.location || ''}
                    onChange={(e) => handleChange(index, 'location', e.target.value)}
                    placeholder={t('fields.location.placeholder')}
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                  <p className="mt-2 text-[11px] font-medium leading-relaxed text-content-secondary">
                    {t('fields.location.helper')}
                  </p>
                </div>

                <ListEditorField
                  label={t('responsibilities.label')}
                  items={exp.responsibilities || []}
                  onChange={(items) => handleChange(index, 'responsibilities', items)}
                  placeholder={t('responsibilities.placeholder')}
                  helperText={t('responsibilities.helper')}
                  addLabel={t('responsibilities.add')}
                />

                <ListEditorField
                  label={t('highlights.label')}
                  items={exp.highlights || []}
                  onChange={(items) => handleChange(index, 'highlights', items)}
                  placeholder={t('highlights.placeholder')}
                  helperText={t('highlights.helper')}
                  addLabel={t('highlights.add')}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

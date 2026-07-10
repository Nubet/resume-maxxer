'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useResume } from '@/context/ResumeContext';
import { FolderGit2, Plus, Trash2 } from 'lucide-react';
import { FormBlock } from '@/components/editor/FormBlock';
import { ListEditorField } from '@/components/editor/ListEditorField';
import type { ProjectItem } from '@/types/resume';

export const ProjectsForm: React.FC = () => {
  const t = useTranslations('Editor.Projects');
  const { resumeData, updateResumeData } = useResume();
  const projects = resumeData?.projects || [];

  const handleAdd = () => {
    updateResumeData((prev) => ({
      ...prev,
      projects: [
        ...(prev.projects || []),
        {
          name: '',
          role: '',
          organization: '',
          startDate: '',
          endDate: '',
          period: '',
          description: '',
          highlights: [],
          keywords: [],
          url: '',
        },
      ],
    }));
  };

  const handleRemove = (index: number) => {
    updateResumeData((prev) => ({
      ...prev,
      projects: (prev.projects || []).filter((_, i) => i !== index),
    }));
  };

  const handleChange = <K extends keyof ProjectItem>(
    index: number,
    field: K,
    value: ProjectItem[K]
  ) => {
    updateResumeData((prev) => {
      const newProj = [...(prev.projects || [])];
      newProj[index] = { ...newProj[index], [field]: value };
      return { ...prev, projects: newProj };
    });
  };

  const handleKeywordsChange = (index: number, value: string) => {
    const kws = value
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);
    handleChange(index, 'keywords', kws);
  };

  const buildPeriod = (startDate?: string, endDate?: string) => {
    if (!startDate && !endDate) return '';
    if (startDate && endDate) return `${startDate} - ${endDate}`;
    return startDate || endDate || '';
  };

  const handlePeriodDateChange = (index: number, field: 'startDate' | 'endDate', value: string) => {
    updateResumeData((prev) => {
      const newProj = [...(prev.projects || [])];
      const nextProject = { ...newProj[index], [field]: value };
      nextProject.period = buildPeriod(nextProject.startDate, nextProject.endDate);
      newProj[index] = nextProject;
      return { ...prev, projects: newProj };
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
      </FormBlock>

      {projects.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center space-y-3 bg-surface-secondary">
          <FolderGit2 className="h-8 w-8 text-content-muted mx-auto" />
          <p className="text-sm font-bold text-content">{t('emptyTitle')}</p>
          <p className="text-xs text-content-muted max-w-xs mx-auto leading-relaxed">
            {t('emptyDescription')}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((proj, index) => (
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
                      {proj.name || t('newItem')}
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
                    {t('fields.name.label')}
                  </label>
                  <input
                    type="text"
                    value={proj.name || ''}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    placeholder={t('fields.name.placeholder')}
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">
                    {t('fields.url.label')}
                  </label>
                  <input
                    type="text"
                    value={proj.url || ''}
                    onChange={(e) => handleChange(index, 'url', e.target.value)}
                    placeholder={t('fields.url.placeholder')}
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">{t('fields.role.label')}</label>
                  <input
                    type="text"
                    value={proj.role || ''}
                    onChange={(e) => handleChange(index, 'role', e.target.value)}
                    placeholder={t('fields.role.placeholder')}
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">
                    {t('fields.organization.label')}
                  </label>
                  <input
                    type="text"
                    value={proj.organization || ''}
                    onChange={(e) => handleChange(index, 'organization', e.target.value)}
                    placeholder={t('fields.organization.placeholder')}
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">
                    {t('fields.startDate.label')}
                  </label>
                  <input
                    type="date"
                    value={proj.startDate || ''}
                    onChange={(e) => handlePeriodDateChange(index, 'startDate', e.target.value)}
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">
                    {t('fields.endDate.label')}
                  </label>
                  <input
                    type="date"
                    value={proj.endDate || ''}
                    onChange={(e) => handlePeriodDateChange(index, 'endDate', e.target.value)}
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-content mb-2">
                    {t('fields.keywords.label')}
                  </label>
                  <input
                    type="text"
                    value={(proj.keywords || []).join(', ')}
                    onChange={(e) => handleKeywordsChange(index, e.target.value)}
                    placeholder={t('fields.keywords.placeholder')}
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-content mb-2">
                    {t('fields.description.label')}
                  </label>
                  <textarea
                    rows={4}
                    value={proj.description || ''}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    placeholder={t('fields.description.placeholder')}
                    className="w-full rounded-2xl border border-border bg-surface p-4 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none leading-relaxed font-mono transition-colors"
                  />
                </div>

                <ListEditorField
                  label={t('highlights.label')}
                  items={proj.highlights || []}
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

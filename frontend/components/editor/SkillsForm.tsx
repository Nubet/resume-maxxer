'use client';

import React, { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Wrench, Plus, Trash2 } from 'lucide-react';
import type { SkillGroup } from '@/types/resume';
import { FormBlock } from '@/components/editor/FormBlock';
import {
  DEFAULT_SKILL_PROFILE,
  getSkillPreset,
  SKILL_PRESETS,
  type SkillProfile,
} from '@/lib/skillPresets';

export const SkillsForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();
  const skills: SkillGroup[] = resumeData?.skills || [];
  const skillProfile = resumeData?.metadata?.skill_profile || DEFAULT_SKILL_PROFILE;
  const activePreset = getSkillPreset(skillProfile);
  const existingCategories = skills.map((group) => group.category).filter(Boolean);
  const selectableCategories = Array.from(
    new Set([...activePreset.categories, ...existingCategories].filter(Boolean))
  );

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState(activePreset.categories[0] || '');
  const [customCategoryName, setCustomCategoryName] = useState('');

  const resolvedCategory = newSkillCategory === '__custom__' ? customCategoryName.trim() : newSkillCategory;

  const setSkillProfile = (profile: SkillProfile) => {
    updateResumeData((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        skill_profile: profile,
      },
    }));

    const preset = getSkillPreset(profile);
    setNewSkillCategory(preset.categories[0] || '__custom__');
    if (profile !== 'custom') {
      setCustomCategoryName('');
    }
  };

  const ensureCategoryExists = (category: string) => {
    if (!category) return;

    updateResumeData((prev) => {
      const currentSkills = [...(prev.skills || [])];
      if (currentSkills.some((group) => group.category === category)) return prev;

      return {
        ...prev,
        skills: [...currentSkills, { category, keywords: [] }],
      };
    });
  };

  const handleAddSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newSkillName.trim() || !resolvedCategory) return;

    const items = newSkillName
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    updateResumeData((prev) => {
      const currentSkills = [...(prev.skills || [])];
      const existingGroupIndex = currentSkills.findIndex((g) => g.category === resolvedCategory);

      if (existingGroupIndex >= 0) {
        const existingKeywords = currentSkills[existingGroupIndex].keywords || [];
        const uniqueItems = items.filter((i) => !existingKeywords.includes(i));
        currentSkills[existingGroupIndex] = {
          ...currentSkills[existingGroupIndex],
          keywords: [...existingKeywords, ...uniqueItems],
        };
      } else {
        currentSkills.push({
          category: resolvedCategory,
          keywords: items,
        });
      }

      return { ...prev, skills: currentSkills };
    });

    setNewSkillName('');
  };

  const handleRenameCategory = (groupIndex: number, value: string) => {
    updateResumeData((prev) => {
      const currentSkills = [...(prev.skills || [])];
      if (!currentSkills[groupIndex]) return prev;

      currentSkills[groupIndex] = {
        ...currentSkills[groupIndex],
        category: value,
      };

      return { ...prev, skills: currentSkills };
    });
  };

  const handleCategoryBlur = (groupIndex: number) => {
    updateResumeData((prev) => {
      const currentSkills = [...(prev.skills || [])];
      const group = currentSkills[groupIndex];
      if (!group) return prev;

      const nextCategory = group.category.trim();
      if (!nextCategory) {
        currentSkills.splice(groupIndex, 1);
        return { ...prev, skills: currentSkills };
      }

      const duplicateIndex = currentSkills.findIndex(
        (item, index) => index !== groupIndex && item.category === nextCategory
      );

      if (duplicateIndex >= 0) {
        const mergedKeywords = Array.from(
          new Set([...currentSkills[duplicateIndex].keywords, ...group.keywords])
        );
        currentSkills[duplicateIndex] = {
          ...currentSkills[duplicateIndex],
          keywords: mergedKeywords,
        };
        currentSkills.splice(groupIndex, 1);
        return { ...prev, skills: currentSkills };
      }

      currentSkills[groupIndex] = {
        ...group,
        category: nextCategory,
      };

      return { ...prev, skills: currentSkills };
    });
  };

  const handleRemoveGroup = (groupIndex: number) => {
    updateResumeData((prev) => ({
      ...prev,
      skills: (prev.skills || []).filter((_, index) => index !== groupIndex),
    }));
  };

  const handleRemoveSkill = (groupIndex: number, keywordToRemove: string) => {
    updateResumeData((prev) => {
      const currentSkills = [...(prev.skills || [])];
      if (!currentSkills[groupIndex]) return prev;

      const filteredKeywords = currentSkills[groupIndex].keywords.filter(
        (k) => k !== keywordToRemove
      );
      if (filteredKeywords.length === 0) {
        currentSkills.splice(groupIndex, 1);
      } else {
        currentSkills[groupIndex] = {
          ...currentSkills[groupIndex],
          keywords: filteredKeywords,
        };
      }

      return { ...prev, skills: currentSkills };
    });
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <FormBlock
        eyebrow="Słowa kluczowe"
        title="Dodawaj tylko kompetencje, które umiesz obronić"
        description="Wybierz układ kategorii pod swoją branżę. Template tylko pokaże dane, a preset pomaga Ci je sensownie uporządkować."
      >
        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          {SKILL_PRESETS.map((preset) => {
            const isActive = skillProfile === preset.id;

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setSkillProfile(preset.id)}
                className={`rounded-3xl border px-4 py-4 text-left transition-all ${
                  isActive
                    ? 'border-content bg-content text-content-inverse shadow-sm'
                    : 'border-border bg-surface text-content hover:border-content'
                }`}
              >
                <div className="text-sm font-black tracking-tight">{preset.label}</div>
                <p
                  className={`mt-2 text-xs leading-relaxed ${
                    isActive ? 'text-content-inverse/85' : 'text-content-secondary'
                  }`}
                >
                  {preset.description}
                </p>
              </button>
            );
          })}
        </div>

        {activePreset.categories.length > 0 && (
          <div className="mb-4 rounded-3xl border border-border bg-surface p-4 shadow-xs sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-content-muted">
                  Sugerowane grupy
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-content-secondary">
                  Kliknij kategorię, żeby od razu dodać do niej skille albo utworzyć pustą grupę.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {activePreset.categories.map((category) => {
                const exists = existingCategories.includes(category);

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setNewSkillCategory(category);
                      ensureCategoryExists(category);
                    }}
                    className={`rounded-full border px-3 py-2 text-xs font-bold transition-all ${
                      exists
                        ? 'border-content bg-content text-content-inverse'
                        : 'border-border bg-surface-secondary text-content hover:border-content'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <form
          onSubmit={handleAddSkill}
          className="rounded-3xl border border-border bg-surface p-4 space-y-4 shadow-xs sm:p-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-4">
              <select
                value={newSkillCategory}
                onChange={(e) => setNewSkillCategory(e.target.value)}
                className="w-full rounded-2xl border border-border bg-surface px-4 py-3.5 text-xs font-bold text-content focus:border-content focus:outline-none"
              >
                {selectableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="__custom__">Własna kategoria...</option>
              </select>
            </div>

            <div className="sm:col-span-4">
              {newSkillCategory === '__custom__' ? (
                <input
                  type="text"
                  value={customCategoryName}
                  onChange={(e) => setCustomCategoryName(e.target.value)}
                  placeholder="np. Tooling, Security, Embedded, ERP"
                  className="w-full rounded-2xl border border-border bg-surface px-4 py-3.5 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:outline-none"
                />
              ) : (
                <div className="flex h-full items-center rounded-2xl border border-border bg-surface-secondary px-4 py-3.5 text-xs font-bold text-content-secondary">
                  {resolvedCategory || 'Wybierz kategorię'}
                </div>
              )}
            </div>

            <div className="sm:col-span-4">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder={activePreset.placeholder}
                className="w-full rounded-2xl border border-border bg-surface px-4 py-3.5 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={!resolvedCategory}
                className="w-full h-full inline-flex items-center justify-center gap-1.5 rounded-2xl bg-content px-4 py-3.5 text-xs font-bold text-content-inverse shadow-sm hover:bg-neutral-800 transition-all active:scale-[0.98]"
              >
                <Plus className="h-4 w-4" />
                <span>Dodaj</span>
              </button>
            </div>
          </div>
        </form>
      </FormBlock>

      {skills.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center space-y-3 bg-surface-secondary">
          <Wrench className="h-8 w-8 text-content-muted mx-auto" />
          <p className="text-sm font-bold text-content">Brak wpisów o umiejętnościach</p>
          <p className="text-xs text-content-muted max-w-xs mx-auto leading-relaxed">
            Dodaj 6-12 najważniejszych umiejętności pasujących do docelowej roli i ogłoszenia.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {skills.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-3 rounded-3xl border border-border bg-surface-secondary p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={group.category}
                  onChange={(e) => handleRenameCategory(groupIdx, e.target.value)}
                  onBlur={() => handleCategoryBlur(groupIdx)}
                  placeholder="Nazwa grupy"
                  className="flex-1 rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-black tracking-tight text-content focus:border-content focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveGroup(groupIdx)}
                  title="Usuń grupę"
                  className="rounded-full p-2 text-content-muted transition-colors hover:bg-surface hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.keywords.map((kw, kwIdx) => (
                  <div
                    key={kwIdx}
                    className="group inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2 text-xs font-bold text-content shadow-xs hover:border-content transition-all"
                  >
                    <span>{kw}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(groupIdx, kw)}
                      className="text-content-muted hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

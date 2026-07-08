'use client';

import React, { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Wrench, Plus, Trash2 } from 'lucide-react';
import type { SkillGroup } from '@/types/resume';
import { FormBlock } from '@/components/editor/FormBlock';

export const SkillsForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();
  const skills: SkillGroup[] = resumeData?.skills || [];

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Kompetencje Branżowe');

  const categories = [
    'Kompetencje Branżowe',
    'Narzędzia i Systemy',
    'Metodyki i Procesy',
    'Techniczne i Specjalistyczne',
  ];

  const handleAddSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newSkillName.trim()) return;

    const items = newSkillName
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    updateResumeData((prev) => {
      const currentSkills = [...(prev.skills || [])];
      const existingGroupIndex = currentSkills.findIndex((g) => g.category === newSkillCategory);

      if (existingGroupIndex >= 0) {
        const existingKeywords = currentSkills[existingGroupIndex].keywords || [];
        const uniqueItems = items.filter((i) => !existingKeywords.includes(i));
        currentSkills[existingGroupIndex] = {
          ...currentSkills[existingGroupIndex],
          keywords: [...existingKeywords, ...uniqueItems],
        };
      } else {
        currentSkills.push({
          category: newSkillCategory,
          keywords: items,
        });
      }

      return { ...prev, skills: currentSkills };
    });

    setNewSkillName('');
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
        description="Najlepiej działają konkretne narzędzia, systemy, metody i kompetencje branżowe. Miękkie cechy pokaż później w osiągnięciach."
      >
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
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-6">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="np. Salesforce, Excel, obsługa reklamacji, AutoCAD, HACCP"
                className="w-full rounded-2xl border border-border bg-surface px-4 py-3.5 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
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
            <div key={groupIdx} className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-content-muted px-2">
                / {group.category}
              </h4>
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

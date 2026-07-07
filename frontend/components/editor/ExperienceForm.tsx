'use client';

import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { ExperienceItem } from '@/types/resume';

export const ExperienceForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();
  const experience: ExperienceItem[] = resumeData?.experience || [];

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

  const handleChange = (index: number, field: keyof ExperienceItem, value: any) => {
    updateResumeData((prev) => {
      const newExp = [...(prev.experience || [])];
      newExp[index] = { ...newExp[index], [field]: value };
      return { ...prev, experience: newExp };
    });
  };

  const handleHighlightsChange = (index: number, value: string) => {
    const highlightsArray = value
      .split('\n')
      .map((line) => line.replace(/^[•\-\*]\s*/, '').trim())
      .filter(Boolean);

    handleChange(index, 'highlights', highlightsArray);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between border-b border-border pb-5">
        <h3 className="text-xl font-bold tracking-tight text-content">Doświadczenie Zawodowe</h3>
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 rounded-full bg-content px-6 py-2.5 text-xs font-bold text-content-inverse shadow-sm hover:bg-neutral-800 transition-all active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          <span>Dodaj Stanowisko</span>
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center space-y-3 bg-surface-secondary">
          <Briefcase className="h-8 w-8 text-content-muted mx-auto" />
          <p className="text-sm font-bold text-content">Brak wpisów o doświadczeniu</p>
          <p className="text-xs text-content-muted max-w-xs mx-auto leading-relaxed">
            Dodaj swoje miejsca pracy, staże lub projekty komercyjne. Pamiętaj o używaniu liczb i
            języka korzyści!
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
                    {exp.position || 'Nowe Stanowisko'} {exp.company ? `w ${exp.company}` : ''}
                  </span>
                </div>
                <button
                  onClick={() => handleRemove(index)}
                  title="Usuń stanowisko"
                  className="text-content-muted hover:text-red-600 transition-all p-2 rounded-full hover:bg-surface"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-content mb-2">
                    Stanowisko / Rola
                  </label>
                  <input
                    type="text"
                    value={exp.position || ''}
                    onChange={(e) => handleChange(index, 'position', e.target.value)}
                    placeholder="np. Senior Software Engineer"
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">
                    Nazwa Firmy / Organizacji
                  </label>
                  <input
                    type="text"
                    value={exp.company || ''}
                    onChange={(e) => handleChange(index, 'company', e.target.value)}
                    placeholder="np. Google / Tech Corp"
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">Od (YYYY-MM)</label>
                  <input
                    type="text"
                    value={exp.startDate || ''}
                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                    placeholder="np. 2021-03"
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">
                    Do (YYYY-MM lub Obecnie)
                  </label>
                  <input
                    type="text"
                    value={exp.endDate || ''}
                    onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                    placeholder="np. Obecnie"
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-content mb-2">
                    Lokalizacja (Miasto / Tryb)
                  </label>
                  <input
                    type="text"
                    value={exp.location || ''}
                    onChange={(e) => handleChange(index, 'location', e.target.value)}
                    placeholder="np. Warszawa, Polska (Hybrydowo)"
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-content mb-2">
                    Opis Obowiązków i Osiągnięć (każda linia to nowy punkt)
                  </label>
                  <p className="text-[11px] text-content-secondary mb-2 leading-relaxed">
                    Opisz swoje kluczowe sukcesy. Każda nowa linia zostanie zmapowana jako punktor w
                    kompilatorze Typst.
                  </p>
                  <textarea
                    rows={5}
                    value={(exp.highlights || []).join('\n')}
                    onChange={(e) => handleHighlightsChange(index, e.target.value)}
                    placeholder="Zasiadałem w zespole architektonicznym, redukując opóźnienia API o 40%...&#10;Koordynowałem migrację do chmury AWS dla 10+ mikroserwisów..."
                    className="w-full rounded-2xl border border-border bg-surface p-4 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none leading-relaxed font-mono transition-colors"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

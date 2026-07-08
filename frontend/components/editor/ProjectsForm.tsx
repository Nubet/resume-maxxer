'use client';

import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { FolderGit2, Plus, Trash2 } from 'lucide-react';
import { FormBlock } from '@/components/editor/FormBlock';

export const ProjectsForm: React.FC = () => {
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

  const handleChange = (index: number, field: string, value: any) => {
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

  const handleHighlightsChange = (index: number, value: string) => {
    const items = value
      .split('\n')
      .map((line) => line.replace(/^[•\-\*]\s*/, '').trim())
      .filter(Boolean);

    handleChange(index, 'highlights', items);
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
        eyebrow="Dowody"
        title="Dodaj projekty, które pokazują praktyczne umiejętności"
        description="To mogą być projekty zawodowe, szkolne, własne, wolontariackie albo usprawnienia procesów. Najważniejsze są Twoja rola i rezultat."
      >
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 rounded-full bg-content px-6 py-2.5 text-xs font-bold text-content-inverse shadow-sm hover:bg-neutral-800 transition-all active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          <span>Dodaj Projekt</span>
        </button>
      </FormBlock>

      {projects.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center space-y-3 bg-surface-secondary">
          <FolderGit2 className="h-8 w-8 text-content-muted mx-auto" />
          <p className="text-sm font-bold text-content">Brak wpisów o projektach</p>
          <p className="text-xs text-content-muted max-w-xs mx-auto leading-relaxed">
            Dodaj projekty zawodowe, akademickie, portfolio, usprawnienia procesów albo ważne
            inicjatywy pozaetatowe.
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
                    {proj.name || 'Nowy Projekt'}
                  </span>
                </div>
                <button
                  onClick={() => handleRemove(index)}
                  title="Usuń projekt"
                  className="text-content-muted hover:text-red-600 transition-all p-2 rounded-full hover:bg-surface"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="rounded-2xl border border-border bg-surface px-4 py-3 text-[11px] font-semibold leading-relaxed text-content-secondary">
                Wpis powinien odpowiedzieć na cztery pytania: co to było, jaka była Twoja rola,
                jakich narzędzi użyto i jaki był efekt.
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-content mb-2">
                    Nazwa Projektu / Inicjatywy
                  </label>
                  <input
                    type="text"
                    value={proj.name || ''}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    placeholder="np. Wdrożenie CRM, Audyt magazynu, Kampania sprzedażowa"
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">
                    Link / Materiał Online
                  </label>
                  <input
                    type="text"
                    value={proj.url || ''}
                    onChange={(e) => handleChange(index, 'url', e.target.value)}
                    placeholder="np. portfolio, publikacja, repozytorium, case study"
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">Twoja Rola</label>
                  <input
                    type="text"
                    value={proj.role || ''}
                    onChange={(e) => handleChange(index, 'role', e.target.value)}
                    placeholder="np. Koordynator, Analityk, Projektant, Wykonawca"
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">
                    Organizacja / Kontekst
                  </label>
                  <input
                    type="text"
                    value={proj.organization || ''}
                    onChange={(e) => handleChange(index, 'organization', e.target.value)}
                    placeholder="np. uczelnia, firma, klient, projekt własny"
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">
                    Start projektu (opcjonalnie)
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
                    Koniec projektu (opcjonalnie)
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
                    Narzędzia / Metody / Słowa Kluczowe (oddzielone przecinkami)
                  </label>
                  <input
                    type="text"
                    value={(proj.keywords || []).join(', ')}
                    onChange={(e) => handleKeywordsChange(index, e.target.value)}
                    placeholder="np. Excel, CRM, analiza danych, Figma, AutoCAD, Lean, SQL"
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-content mb-2">
                    Cel i Zakres Projektu
                  </label>
                  <textarea
                    rows={4}
                    value={proj.description || ''}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    placeholder="Opisz po co projekt powstał, jaki problem rozwiązywał, dla kogo był realizowany i jaka była Twoja odpowiedzialność."
                    className="w-full rounded-2xl border border-border bg-surface p-4 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none leading-relaxed font-mono transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-content mb-2">
                    Rezultaty Projektu (każda linia osobno)
                  </label>
                  <textarea
                    rows={4}
                    value={(proj.highlights || []).join('\n')}
                    onChange={(e) => handleHighlightsChange(index, e.target.value)}
                    placeholder="Skrócenie czasu raportowania z 3 godzin do 30 minut&#10;Przygotowanie dokumentacji używanej przez 20-osobowy zespół"
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

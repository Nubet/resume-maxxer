'use client';

import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import type { ExperienceItem } from '@/types/resume';
import { FormBlock } from '@/components/editor/FormBlock';

export const ExperienceForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();
  const experience: ExperienceItem[] = resumeData?.experience || [];

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

  const handleChange = (index: number, field: keyof ExperienceItem, value: any) => {
    updateResumeData((prev) => {
      const newExp = [...(prev.experience || [])];
      newExp[index] = { ...newExp[index], [field]: value };
      return { ...prev, experience: newExp };
    });
  };

  const handleCurrentChange = (index: number, checked: boolean) => {
    handleChange(index, 'endDate', checked ? 'Obecnie' : '');
  };

  const handleHighlightsChange = (index: number, value: string) => {
    const highlightsArray = value
      .split('\n')
      .map((line) => line.replace(/^[•\-\*]\s*/, '').trim())
      .filter(Boolean);

    handleChange(index, 'highlights', highlightsArray);
  };

  const handleResponsibilitiesChange = (index: number, value: string) => {
    const responsibilitiesArray = value
      .split('\n')
      .map((line) => line.replace(/^[•\-\*]\s*/, '').trim())
      .filter(Boolean);

    handleChange(index, 'responsibilities', responsibilitiesArray);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <FormBlock
        eyebrow="Zasada"
        title="Opisz stanowisko tak, jak ma wyglądać w CV"
        description="Podaj firmę, rolę, daty, lokalizację, obowiązki i konkretne efekty. Nic więcej nie jest tu potrzebne."
      >
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 rounded-full bg-content px-6 py-2.5 text-xs font-bold text-content-inverse shadow-sm hover:bg-neutral-800 transition-all active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          <span>Dodaj Stanowisko</span>
        </button>
      </FormBlock>

      {experience.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center space-y-3 bg-surface-secondary">
          <Briefcase className="h-8 w-8 text-content-muted mx-auto" />
          <p className="text-sm font-bold text-content">Brak wpisów o doświadczeniu</p>
          <p className="text-xs text-content-muted max-w-xs mx-auto leading-relaxed">
            Dodaj pracę etatową, zlecenia, praktyki, działalność lub doświadczenie branżowe.
            Najmocniejsze wpisy pokazują efekt pracy, nie tylko zakres obowiązków.
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

              <div className="rounded-2xl border border-border bg-surface px-4 py-3 text-[11px] font-semibold leading-relaxed text-content-secondary">
                Wypełnij w kolejności: firma i rola, daty, obowiązki, a potem konkretne efekty z
                liczbami.
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
                    placeholder="np. Specjalista ds. sprzedaży, Technik utrzymania ruchu"
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
                    placeholder="np. IKEA / ABC Logistics / własna działalność"
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">Od</label>
                  <input
                    type="date"
                    value={toDateInputValue(exp.startDate)}
                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">Do</label>
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
                      Obecnie
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-content mb-2">
                    Lokalizacja (Miasto / Tryb)
                  </label>
                  <input
                    type="text"
                    value={exp.location || ''}
                    onChange={(e) => handleChange(index, 'location', e.target.value)}
                    placeholder="np. Warszawa, Polska"
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-content mb-2">
                    Główne Obowiązki (każda linia to osobny punkt)
                  </label>
                  <p className="text-[11px] text-content-secondary mb-2 leading-relaxed">
                    Wpisz po prostu, co realnie robiłeś na tym stanowisku.
                  </p>
                  <textarea
                    rows={4}
                    value={(exp.responsibilities || []).join('\n')}
                    onChange={(e) => handleResponsibilitiesChange(index, e.target.value)}
                    placeholder="Obsługa klientów biznesowych w systemie CRM&#10;Koordynacja zamówień i reklamacji dla 3 regionów"
                    className="w-full rounded-2xl border border-border bg-surface p-4 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none leading-relaxed font-mono transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-content mb-2">
                    Osiągnięcia i Efekty (każda linia to nowy punkt)
                  </label>
                  <p className="text-[11px] text-content-secondary mb-2 leading-relaxed">
                    Najlepiej: czasownik działania, co zostało zrobione, jak i z jakim rezultatem.
                  </p>
                  <textarea
                    rows={5}
                    value={(exp.highlights || []).join('\n')}
                    onChange={(e) => handleHighlightsChange(index, e.target.value)}
                    placeholder="Zwiększenie sprzedaży o 18% dzięki uporządkowaniu procesu kontaktu z klientem&#10;Skrócenie czasu obsługi reklamacji z 5 do 2 dni roboczych"
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

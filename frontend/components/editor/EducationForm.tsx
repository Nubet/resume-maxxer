'use client';

import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import type { EducationItem } from '@/types/resume';
import { FormBlock } from '@/components/editor/FormBlock';

export const EducationForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();
  const education: EducationItem[] = resumeData?.education || [];
  const degreeOptions = [
    'Szkoła średnia',
    'Technik',
    'Licencjat',
    'Inżynier',
    'Magister',
    'Magister Inżynier',
    'Studia podyplomowe',
    'Kurs zawodowy',
    'Szkolenie branżowe',
  ];
  const fieldOptions = [
    'Administracja',
    'Ekonomia',
    'Finanse i rachunkowość',
    'Informatyka',
    'Logistyka',
    'Marketing',
    'Mechanika',
    'Pedagogika',
    'Sprzedaż',
    'Zarządzanie',
  ];

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

  const handleChange = (index: number, field: keyof EducationItem, value: any) => {
    updateResumeData((prev) => {
      const newEdu = [...(prev.education || [])];
      newEdu[index] = { ...newEdu[index], [field]: value };
      return { ...prev, education: newEdu };
    });
  };

  const handleListChange = (index: number, field: keyof EducationItem, value: string) => {
    const items = value
      .split('\n')
      .map((line) => line.replace(/^[•\-\*]\s*/, '').trim())
      .filter(Boolean);

    handleChange(index, field, items);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <FormBlock
        eyebrow="Kiedy to ważne"
        title="Edukacja może być głównym dowodem kompetencji"
        description="Jeśli masz mało doświadczenia albo zmieniasz branżę, dodaj szkoły, kierunki i ważne kursy pasujące do docelowej roli."
      >
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 rounded-full bg-content px-6 py-2.5 text-xs font-bold text-content-inverse shadow-sm hover:bg-neutral-800 transition-all active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          <span>Dodaj Szkołę / Uczelnię</span>
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
          <p className="text-sm font-bold text-content">Brak wpisów o edukacji</p>
          <p className="text-xs text-content-muted max-w-xs mx-auto leading-relaxed">
            Dodaj szkoły, studia, kursy zawodowe albo szkolenia, które wspierają docelową rolę.
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
                    {edu.institution || 'Nowa Uczelnia'}
                  </span>
                </div>
                <button
                  onClick={() => handleRemove(index)}
                  title="Usuń wpis"
                  className="text-content-muted hover:text-red-600 transition-all p-2 rounded-full hover:bg-surface"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="rounded-2xl border border-border bg-surface px-4 py-3 text-[11px] font-semibold leading-relaxed text-content-secondary">
                Zacznij od formalnych danych, a niżej dodaj tylko te kursy i przedmioty, które
                wspierają aplikację.
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-content mb-2">
                    Stopień / Tytuł
                  </label>
                  <input
                    type="text"
                    list="degree-options"
                    value={edu.degree || ''}
                    onChange={(e) => handleChange(index, 'degree', e.target.value)}
                    placeholder="Wybierz lub wpisz własny"
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">
                    Kierunek / Specjalizacja
                  </label>
                  <input
                    type="text"
                    list="field-options"
                    value={edu.field || ''}
                    onChange={(e) => handleChange(index, 'field', e.target.value)}
                    placeholder="Wybierz lub wpisz własny"
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">
                    Uczelnia / Szkoła
                  </label>
                  <input
                    type="text"
                    value={edu.institution || ''}
                    onChange={(e) => handleChange(index, 'institution', e.target.value)}
                    placeholder="np. Politechnika Warszawska"
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">Lokalizacja</label>
                  <input
                    type="text"
                    value={edu.location || ''}
                    onChange={(e) => handleChange(index, 'location', e.target.value)}
                    placeholder="np. Polska, Warszawa"
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-content mb-2">
                    Wynik / Średnia (opcjonalnie)
                  </label>
                  <input
                    type="text"
                    value={edu.gpa || ''}
                    onChange={(e) => handleChange(index, 'gpa', e.target.value)}
                    placeholder="np. 4.8 / 5.0 (Wyróżnienie)"
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">Od (YYYY-MM)</label>
                  <input
                    type="month"
                    value={edu.startDate || ''}
                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                    placeholder="np. 2018-10"
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">
                    Do (YYYY-MM lub Obecnie)
                  </label>
                  <input
                    type="month"
                    value={edu.endDate || ''}
                    onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                    placeholder="np. 2020-06"
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-content mb-2">
                    Ważne Kursy / Przedmioty (każda linia osobno)
                  </label>
                  <textarea
                    rows={3}
                    value={(edu.coursework || []).join('\n')}
                    onChange={(e) => handleListChange(index, 'coursework', e.target.value)}
                    placeholder="Analiza finansowa&#10;Podstawy zarządzania projektami&#10;Obsługa systemów ERP"
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

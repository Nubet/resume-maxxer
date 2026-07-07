'use client';

import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import {
  Check,
  Sparkles,
  LayoutTemplate,
  ShieldCheck,
  ArrowRight,
  FileText,
  Briefcase,
  Code2,
  Award,
} from 'lucide-react';

interface TemplateGalleryProps {
  onSelectTemplate: (templateId: string) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onSelectTemplate }) => {
  const { templateId, setTemplateId } = useResume();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Wszystkie' },
    { id: 'classic', label: 'Klasyczne' },
    { id: 'modern', label: 'Nowoczesne' },
    { id: 'tech', label: 'IT & Inżynieria' },
    { id: 'exec', label: 'Management' },
  ];

  const templates = [
    {
      id: 'basic_resume_v1',
      name: 'Szwajcarski Rygor',
      category: 'classic',
      description:
        'Jednokolumnowy układ Swiss Editorial. Zoptymalizowany pod kątem czytelności w systemach ATS i skanerach rekrutacyjnych.',
      tags: ['Jednokolumnowy', 'ATS 100%', 'Minimalizm'],
      icon: FileText,
      available: true,
    },
    {
      id: 'crisp_cv_v1',
      name: 'Nowoczesny Przejrzysty',
      category: 'modern',
      description:
        'Czysty układ z wyraźnie wyodrębnionymi sekcjami, czytelną hierarchią nagłówków i datami wyrównanymi do prawej.',
      tags: ['Wyrazista hierarchia', 'Nowoczesny A4', 'Czytelne daty'],
      icon: LayoutTemplate,
      available: true,
    },
    {
      id: 'tech_lead_v1',
      name: 'Tech Lead & Developer',
      category: 'tech',
      description:
        'Zaprojektowany dla programistów i inżynierów. Wyeksponowany stos technologiczny, linki do GitHub oraz projekty open-source.',
      tags: ['GitHub', 'Stack techniczny', 'Projekty IT'],
      icon: Code2,
      available: false,
    },
    {
      id: 'exec_v1',
      name: 'Executive & Management',
      category: 'exec',
      description:
        'Dla dyrektorów i menedżerów. Kładzie nacisk na podsumowanie osiągnięć liczbowych, zarządzany budżet i skalę biznesu.',
      tags: ['Osiągnięcia KPI', 'Executive summary', 'Zarządzanie'],
      icon: Briefcase,
      available: false,
    },
    {
      id: 'academic_v1',
      name: 'Academic & Research',
      category: 'classic',
      description:
        'Uporządkowany szablon dla naukowców i badaczy. Zoptymalizowany pod kątem listy publikacji, grantów i certyfikatów.',
      tags: ['Publikacje', 'Granty', 'Edukacja'],
      icon: Award,
      available: false,
    },
    {
      id: 'editorial_v1',
      name: 'Editorial Studio',
      category: 'modern',
      description:
        'Wysmakowana typografia dla projektantów, architekta i twórców produktów. Inspirowana szwajcarskimi publikacjami wydawniczymi.',
      tags: ['Swiss Design', 'Wysoka typografia', 'Product Design'],
      icon: Sparkles,
      available: false,
    },
  ];

  const filteredTemplates =
    selectedCategory === 'all'
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  const handleSelect = (id: string, available: boolean) => {
    if (!available) {
      alert('Ten szablon będzie dostępny w nadchodzącej aktualizacji biblioteki!');
      return;
    }
    setTemplateId(id);
    onSelectTemplate(id);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-12 lg:p-16 bg-surface text-content animate-fade-in">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="border-b border-border pb-8 space-y-3">
          <div className="flex items-center space-x-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-content text-content-inverse">
              <LayoutTemplate className="h-3.5 w-3.5" />
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-content-muted">
              Biblioteka Szablonów
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-content">
            Galeria Szablonów CV
          </h2>
          <p className="text-sm sm:text-base text-content-secondary max-w-2xl leading-relaxed font-medium">
            Wybierz układ, który najlepiej pasuje do Twojej branży i stanowiska. Wszystkie nasze
            szablony są składane w profesjonalnym silniku Typst i przechodzą rygorystyczne testy
            czytelności w systemach ATS.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all duration-200 active:scale-[0.98] ${
                selectedCategory === cat.id
                  ? 'bg-content text-content-inverse shadow-sm'
                  : 'bg-surface-secondary text-content-muted border border-border hover:border-content hover:text-content'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((tpl) => {
            const isSelected = templateId === tpl.id;
            const Icon = tpl.icon;
            return (
              <div
                key={tpl.id}
                onClick={() => handleSelect(tpl.id, tpl.available)}
                className={`group relative flex flex-col justify-between rounded-3xl border p-8 transition-all duration-300 cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'border-2 border-content bg-surface-secondary shadow-xl'
                    : tpl.available
                      ? 'border-border bg-surface hover:border-content hover:shadow-lg hover:-translate-y-1'
                      : 'border-border bg-surface-secondary/50 opacity-60 cursor-not-allowed'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface border border-border text-content shadow-xs group-hover:scale-105 transition-transform">
                      <Icon className="h-6 w-6" />
                    </span>
                    {isSelected && (
                      <span className="rounded-full bg-content px-3 py-1 text-[11px] font-black tracking-wide text-content-inverse">
                        Wybrany
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-black text-content tracking-tight mb-2">
                    {tpl.name}
                  </h3>
                  <p className="text-xs text-content-secondary leading-relaxed mb-6 font-medium">
                    {tpl.description}
                  </p>
                </div>

                <div className="space-y-6 pt-4 border-t border-border">
                  <div className="flex flex-wrap gap-1.5">
                    {tpl.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-surface-tertiary px-2.5 py-1 text-[10px] font-bold text-content-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    disabled={!tpl.available}
                    className={`w-full flex items-center justify-center gap-2 rounded-full py-3.5 text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-content text-content-inverse shadow-md'
                        : tpl.available
                          ? 'border border-content bg-surface text-content group-hover:bg-content group-hover:text-content-inverse'
                          : 'bg-border text-content-muted cursor-not-allowed'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Aktywny w Edytorze</span>
                      </>
                    ) : tpl.available ? (
                      <>
                        <span>Wybierz ten szablon</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    ) : (
                      <span>Dostępny wkrótce</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-3xl border border-border bg-surface-secondary p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-12">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-content">
              <ShieldCheck className="h-4 w-4" />
              <span>Gwarancja Czytelności ATS</span>
            </div>
            <p className="text-xs text-content-secondary max-w-xl leading-relaxed font-medium">
              Wszystkie szablony z naszej galerii są kompilowane bez użycia problematycznych tabel
              HTML czy graficznych warstw, co zapewnia 100% poprawności odczytu w skanerach
              rekrutacyjnych Workday, Taleo i Greenhouse.
            </p>
          </div>
          <button
            onClick={() => onSelectTemplate(templateId)}
            className="rounded-full bg-content px-8 py-3.5 text-xs font-bold text-content-inverse hover:bg-neutral-800 transition-all shadow-md shrink-0 active:scale-[0.98]"
          >
            Wróć do Edytora CV
          </button>
        </div>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import type { TabType } from './DashboardSidebar';
import { BasicsForm } from './editor/BasicsForm';
import { ExperienceForm } from './editor/ExperienceForm';
import { EducationForm } from './editor/EducationForm';
import { SkillsForm } from './editor/SkillsForm';
import { ProjectsForm } from './editor/ProjectsForm';
import { ExtraForm } from './editor/ExtraForm';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

interface EditorProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Editor: React.FC<EditorProps> = ({ activeTab, onTabChange }) => {
  const steps: TabType[] = ['basics', 'experience', 'education', 'skills', 'projects', 'extra'];
  const currentStepIndex = steps.indexOf(activeTab);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;
  const stepContent: Record<TabType, { title: string; description: string; checklist: string }> = {
    basics: {
      title: 'Profil, kontakt i cel aplikacji',
      description: 'Zbierz najpierw informacje, które ustawiają kierunek całego CV.',
      checklist: 'Dane kontaktowe, docelowa rola, oferta pracy, krótkie podsumowanie.',
    },
    experience: {
      title: 'Doświadczenie i efekty pracy',
      description:
        'Oddziel zakres obowiązków od rezultatów, żeby później łatwo zbudować mocne punkty CV.',
      checklist: 'Stanowiska, kontekst firmy, obowiązki, liczby, osiągnięcia.',
    },
    education: {
      title: 'Edukacja, kursy i osiągnięcia',
      description:
        'Ta sekcja jest szczególnie ważna dla studentów, juniorów i osób po przebranżowieniu.',
      checklist: 'Szkoły, kierunki, kursy, projekty edukacyjne, wyróżnienia.',
    },
    skills: {
      title: 'Umiejętności i słowa kluczowe',
      description:
        'Dodaj tylko konkretne kompetencje, które pasują do roli i można je obronić rozmową lub doświadczeniem.',
      checklist: 'Narzędzia, systemy, branżowe kompetencje, certyfikowane umiejętności.',
    },
    projects: {
      title: 'Projekty, inicjatywy i portfolio',
      description:
        'Dodaj rzeczy, które pokazują praktyczne zastosowanie umiejętności poza samą nazwą stanowiska.',
      checklist: 'Cel projektu, rola, narzędzia, skala, rezultat.',
    },
    extra: {
      title: 'Języki, certyfikaty i dodatki',
      description:
        'Na końcu dodaj informacje, które wzmacniają wiarygodność lub są wymagane w ofercie.',
      checklist: 'Języki, poziomy, licencje, certyfikaty, linki potwierdzające.',
    },
  };
  const currentContent = stepContent[activeTab];

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      onTabChange(steps[currentStepIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      onTabChange(steps[currentStepIndex - 1]);
    }
  };

  const renderActiveForm = () => {
    switch (activeTab) {
      case 'basics':
        return <BasicsForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      case 'projects':
        return <ProjectsForm />;
      case 'extra':
        return <ExtraForm />;
      default:
        return <BasicsForm />;
    }
  };

  return (
    <div className="flex h-full flex-col bg-surface text-content">
      <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-12 sm:py-12 lg:px-16 animate-fade-in">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="rounded-[2rem] border border-border bg-surface-secondary p-6 shadow-xs sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-black uppercase tracking-widest text-content-muted">
                  Krok {currentStepIndex + 1} z {steps.length}
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-content sm:text-3xl">
                    {currentContent.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-content-secondary">
                    {currentContent.description}
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-surface px-4 py-3 text-xs font-semibold leading-relaxed text-content-secondary sm:max-w-xs">
                {currentContent.checklist}
              </div>
            </div>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-content transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {renderActiveForm()}
        </div>
      </div>

      <div className="border-t border-border bg-surface px-8 py-5 flex items-center justify-between gap-4 shrink-0">
        <button
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-2.5 text-xs font-bold text-content hover:border-content disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-border transition-all active:scale-[0.98]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Wstecz</span>
        </button>

        <div className="text-xs font-bold text-content-muted">
          Krok <strong className="text-content">{currentStepIndex + 1}</strong> z {steps.length}
        </div>

        {currentStepIndex < steps.length - 1 ? (
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 rounded-full bg-content px-8 py-2.5 text-xs font-bold text-content-inverse hover:bg-neutral-800 transition-all active:scale-[0.98] shadow-sm"
          >
            <span>Dalej</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            onClick={() =>
              alert(
                'Wszystkie sekcje wypełnione! Możesz teraz przejrzeć podgląd PDF lub sprawdzić audyt ATS.'
              )
            }
            className="inline-flex items-center gap-2 rounded-full bg-content px-8 py-2.5 text-xs font-bold text-content-inverse hover:bg-neutral-800 transition-all active:scale-[0.98] shadow-sm"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>Zakończ i sprawdź PDF</span>
          </button>
        )}
      </div>
    </div>
  );
};

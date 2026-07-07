'use client';

import React from 'react';
import { useResume } from '@/context/ResumeContext';
import {
  Download,
  Eye,
  Columns,
  Sparkles,
  LayoutTemplate,
  Edit3,
  ShieldCheck,
  HardDrive,
} from 'lucide-react';
import { DashboardModule, TabType } from './DashboardSidebar';

interface DashboardNavbarProps {
  activeModule: DashboardModule;
  onModuleChange: (mod: DashboardModule) => void;
  activeTab?: TabType;
  dashboardView: 'editor' | 'preview' | 'split';
  onViewChange: (mode: 'editor' | 'preview' | 'split') => void;
  onOpenAiModal: () => void;
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  activeModule,
  onModuleChange,
  dashboardView,
  onViewChange,
  onOpenAiModal,
}) => {
  const { downloadPdf, pdfBlobUrl, isGenerating, resumeData } = useResume();

  const getModuleTitle = () => {
    switch (activeModule) {
      case 'editor':
        return {
          title: resumeData?.basics?.name || 'Nowy Życiorys Zawodowy',
          subtitle:
            resumeData?.basics?.title ||
            'Wypełnij sekcje po lewej stronie, aby wygenerować dokument PDF.',
          icon: Edit3,
        };
      case 'templates':
        return {
          title: 'Galeria Szablonów',
          subtitle: 'Wybierz układ i styl swojego życiorysu.',
          icon: LayoutTemplate,
        };
      case 'ats':
        return {
          title: 'Audyt ATS & AI',
          subtitle: 'Sprawdź czytelność swojego CV i zoptymalizuj treść.',
          icon: ShieldCheck,
        };
      case 'history':
        return {
          title: 'Historia Zapisanych CV',
          subtitle: 'Zarządzaj swoimi wersjami dokumentu i kodem źródłowym JSON.',
          icon: HardDrive,
        };
    }
  };

  const currentInfo = getModuleTitle();
  const Icon = currentInfo.icon;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-surface/90 backdrop-blur-xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0 transition-all">
      <div className="flex items-center space-x-3.5 min-w-0">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-surface-secondary border border-border text-content shadow-xs">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-black tracking-tight text-content truncate">
            {currentInfo.title}
          </h1>
          <p className="text-xs text-content-secondary truncate font-medium">
            {currentInfo.subtitle}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
        {activeModule === 'editor' && (
          <div className="flex items-center rounded-full border border-border bg-surface-secondary p-1 shadow-xs">
            <button
              onClick={() => onViewChange('editor')}
              title="Tylko Edytor"
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                dashboardView === 'editor'
                  ? 'bg-content text-content-inverse shadow-sm'
                  : 'text-content-secondary hover:text-content'
              }`}
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Edytor</span>
            </button>
            <button
              onClick={() => onViewChange('split')}
              title="Widok Podzielony"
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                dashboardView === 'split'
                  ? 'bg-content text-content-inverse shadow-sm'
                  : 'text-content-secondary hover:text-content'
              }`}
            >
              <Columns className="h-3.5 w-3.5" />
              <span className="hidden md:inline">50/50</span>
            </button>
            <button
              onClick={() => onViewChange('preview')}
              title="Tylko Podgląd PDF"
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                dashboardView === 'preview'
                  ? 'bg-content text-content-inverse shadow-sm'
                  : 'text-content-secondary hover:text-content'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Podgląd PDF</span>
            </button>
          </div>
        )}

        <button
          onClick={onOpenAiModal}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-tertiary px-4 py-2 text-xs font-bold text-content hover:border-content transition-all active:scale-[0.98] shadow-xs"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-600" />
          <span>AI Asystent</span>
        </button>

        {activeModule !== 'editor' && (
          <button
            onClick={() => onModuleChange('editor')}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2 text-xs font-bold text-content hover:border-content transition-all active:scale-[0.98] shadow-xs"
          >
            <span>Wróć do edycji CV</span>
          </button>
        )}

        <button
          onClick={downloadPdf}
          disabled={!pdfBlobUrl || isGenerating}
          className="inline-flex items-center gap-2 rounded-full bg-content px-5 py-2 text-xs font-black text-content-inverse shadow-md hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] shrink-0"
        >
          <Download className="h-3.5 w-3.5" />
          <span>{isGenerating ? 'Kompilacja...' : 'Pobierz PDF'}</span>
        </button>
      </div>
    </header>
  );
};

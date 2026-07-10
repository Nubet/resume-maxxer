'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
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
import type { DashboardModule, TabType } from './DashboardSidebar';

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
  const t = useTranslations('DashboardNavbar');
  const { downloadPdf, pdfBlobUrl, isGenerating, resumeData } = useResume();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const getModuleTitle = () => {
    switch (activeModule) {
      case 'editor':
        return {
          title: resumeData?.basics?.name || t('newResumeTitle'),
          subtitle:
            resumeData?.basics?.title || t('editorSubtitle'),
          icon: Edit3,
        };
      case 'templates':
        return {
          title: t('templatesTitle'),
          subtitle: t('templatesSubtitle'),
          icon: LayoutTemplate,
        };
      case 'ats':
        return {
          title: t('atsTitle'),
          subtitle: t('atsSubtitle'),
          icon: ShieldCheck,
        };
      case 'history':
        return {
          title: t('historyTitle'),
          subtitle: t('historySubtitle'),
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
              title={t('editorOnly')}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                dashboardView === 'editor'
                  ? 'bg-content text-content-inverse shadow-sm'
                  : 'text-content-secondary hover:text-content'
              }`}
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{t('editor')}</span>
            </button>
            <button
              onClick={() => onViewChange('split')}
              title={t('splitView')}
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
              title={t('previewOnly')}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                dashboardView === 'preview'
                  ? 'bg-content text-content-inverse shadow-sm'
                  : 'text-content-secondary hover:text-content'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{t('pdfPreview')}</span>
            </button>
          </div>
        )}

        <button
          onClick={onOpenAiModal}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-tertiary px-4 py-2 text-xs font-bold text-content hover:border-content transition-all active:scale-[0.98] shadow-xs"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-600" />
          <span>{t('aiAssistant')}</span>
        </button>

        {activeModule !== 'editor' && (
          <button
            onClick={() => onModuleChange('editor')}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2 text-xs font-bold text-content hover:border-content transition-all active:scale-[0.98] shadow-xs"
          >
            <span>{t('backToEditing')}</span>
          </button>
        )}

        <button
          onClick={downloadPdf}
          disabled={!hasMounted || !pdfBlobUrl || isGenerating}
          className="inline-flex items-center gap-2 rounded-full bg-content px-5 py-2 text-xs font-black text-content-inverse shadow-md hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] shrink-0"
        >
          <Download className="h-3.5 w-3.5" />
          <span>{isGenerating ? t('compiling') : t('downloadPdf')}</span>
        </button>
      </div>
    </header>
  );
};

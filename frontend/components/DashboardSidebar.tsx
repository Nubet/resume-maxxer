'use client';

import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useResume } from '@/context/ResumeContext';
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Globe2,
  CheckCircle2,
  Cpu,
  Upload,
  FileJson,
  LayoutTemplate,
  Edit3,
  ShieldCheck,
  History,
} from 'lucide-react';
import { getTemplateDisplayName } from '@/lib/templates';

export type TabType = 'basics' | 'experience' | 'education' | 'skills' | 'projects' | 'extra';
export type DashboardModule = 'editor' | 'templates' | 'ats' | 'history';

interface DashboardSidebarProps {
  activeModule: DashboardModule;
  onModuleChange: (mod: DashboardModule) => void;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onBackToLanding: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeModule,
  onModuleChange,
  activeTab,
  onTabChange,
  onBackToLanding,
}) => {
  const t = useTranslations('DashboardSidebar');
  const { resumeData, templateId, importJson, exportJson } = useResume();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasBasics = Boolean(resumeData?.basics?.name && resumeData?.basics?.email);
  const hasExp = Boolean(resumeData?.experience && resumeData.experience.length > 0);
  const hasEdu = Boolean(resumeData?.education && resumeData.education.length > 0);
  const hasSkills = Boolean(resumeData?.skills && resumeData.skills.length > 0);
  const hasExtra = Boolean(
    (resumeData?.languages && resumeData.languages.length > 0) ||
    (resumeData?.certifications && resumeData.certifications.length > 0)
  );

  const modules = [
    { id: 'editor', label: t('modules.editor'), icon: Edit3 },
    { id: 'templates', label: t('modules.templates'), icon: LayoutTemplate },
    { id: 'ats', label: t('modules.ats'), icon: ShieldCheck },
    { id: 'history', label: t('modules.history'), icon: History },
  ];

  const steps = [
    { id: 'basics', number: 1, label: t('steps.basics'), icon: User, completed: hasBasics },
    { id: 'experience', number: 2, label: t('steps.experience'), icon: Briefcase, completed: hasExp },
    { id: 'education', number: 3, label: t('steps.education'), icon: GraduationCap, completed: hasEdu },
    { id: 'skills', number: 4, label: t('steps.skills'), icon: Wrench, completed: hasSkills },
    {
      id: 'projects',
      number: 5,
      label: t('steps.projects'),
      icon: FolderGit2,
      completed: Boolean(resumeData?.projects && resumeData.projects.length > 0),
    },
    { id: 'extra', number: 6, label: t('steps.extra'), icon: Globe2, completed: hasExtra },
  ];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await importJson(file);
        alert(t('alerts.importSuccess'));
      } catch (err: any) {
        alert(t('alerts.importError', { message: err.message }));
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <aside className="w-full md:w-64 lg:w-72 border-b md:border-b-0 md:border-r border-border bg-surface-secondary p-6 flex flex-col justify-between shrink-0 min-h-full">
      <div className="space-y-8">
        <button
          onClick={onBackToLanding}
          title={t('backHome')}
          className="flex items-center space-x-3 text-left transition-all hover:opacity-80 active:scale-[0.98] group w-full"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-content text-content-inverse group-hover:scale-105 transition-transform shadow-sm">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <span className="text-base font-black tracking-tight text-content block leading-none">
              Resume Maxxer
            </span>
          </div>
        </button>

        <div className="space-y-2">
            <div className="px-3 text-[11px] font-black uppercase tracking-widest text-content-muted mb-2">
              {t('navigation')}
            </div>
          <nav className="space-y-1.5">
            {modules.map((mod) => {
              const isActive = activeModule === mod.id;
              const Icon = mod.icon;
              return (
                <button
                  key={mod.id}
                  onClick={() => onModuleChange(mod.id as DashboardModule)}
                  className={`group flex w-full items-center space-x-3 rounded-2xl px-4 py-3 text-xs font-bold transition-all duration-200 active:scale-[0.98] ${
                    isActive
                      ? 'bg-content text-content-inverse shadow-md'
                      : 'text-content-secondary hover:bg-surface hover:text-content'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${isActive ? 'text-content-inverse' : 'text-content-muted group-hover:text-content'}`}
                  />
                  <span>{mod.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {activeModule === 'editor' && (
          <div className="space-y-2 pt-4 border-t border-border animate-fade-in">
            <div className="px-3 text-[11px] font-black uppercase tracking-widest text-content-muted mb-2">
              {t('resumeSections')}
            </div>
            <nav className="space-y-1">
              {steps.map((step) => {
                const isActive = activeTab === step.id;
                return (
                  <button
                    key={step.id}
                    onClick={() => onTabChange(step.id as TabType)}
                    className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 active:scale-[0.98] ${
                      isActive
                        ? 'bg-surface text-content font-bold shadow-xs border border-border'
                        : 'text-content-secondary hover:bg-surface/60 hover:text-content'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-lg text-[10px] font-black transition-colors ${
                          isActive
                            ? 'bg-content text-content-inverse'
                            : step.completed
                              ? 'bg-content text-content-inverse'
                              : 'bg-border text-content-muted'
                        }`}
                      >
                        {step.completed && !isActive ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          step.number
                        )}
                      </span>
                      <span>{step.label}</span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-border space-y-4">
        <div className="flex items-center justify-between text-xs text-content-secondary">
          <span className="font-semibold">{t('template')}</span>
          <button
            onClick={() => onModuleChange('templates')}
            className="font-bold text-content hover:underline"
          >
            {getTemplateDisplayName(templateId)} ➔
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            title={t('importTitle')}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-bold text-content-secondary hover:border-content hover:text-content transition-all active:scale-[0.98] shadow-xs"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>{t('import')}</span>
          </button>
          <button
            onClick={exportJson}
            title={t('exportTitle')}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-bold text-content-secondary hover:border-content hover:text-content transition-all active:scale-[0.98] shadow-xs"
          >
            <FileJson className="h-3.5 w-3.5" />
            <span>{t('export')}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

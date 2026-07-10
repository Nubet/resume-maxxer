'use client';

import React, { useSyncExternalStore, useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import type { DashboardModule, TabType } from './DashboardSidebar';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardNavbar } from './DashboardNavbar';
import { Editor } from './Editor';
import { LivePreview } from './LivePreview';
import { TemplateGallery } from './TemplateGallery';
import { AtsStudio } from './AtsStudio';
import { FileManager } from './FileManager';
import { AiModal } from './AiModal';

interface BuilderViewProps {
  activeModule: DashboardModule;
}

const BUILDER_STORAGE_EVENT = 'resume-maxxer-builder-state';

const getStoredActiveTab = (): TabType => {
  if (typeof window === 'undefined') return 'basics';
  const value = sessionStorage.getItem('builder_activeTab');
  return value === 'experience' ||
    value === 'education' ||
    value === 'skills' ||
    value === 'projects' ||
    value === 'extra'
    ? value
    : 'basics';
};

const getStoredDashboardView = (): 'editor' | 'preview' | 'split' => {
  if (typeof window === 'undefined') return 'split';
  const value = sessionStorage.getItem('builder_dashboardView');
  return value === 'editor' || value === 'preview' || value === 'split' ? value : 'split';
};

const subscribeBuilderState = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {};

  const handleChange = () => callback();
  window.addEventListener('storage', handleChange);
  window.addEventListener(BUILDER_STORAGE_EVENT, handleChange);

  return () => {
    window.removeEventListener('storage', handleChange);
    window.removeEventListener(BUILDER_STORAGE_EVENT, handleChange);
  };
};

const notifyBuilderStateChange = () => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(BUILDER_STORAGE_EVENT));
};

export const BuilderView: React.FC<BuilderViewProps> = ({ activeModule }) => {
  const router = useRouter();

  const activeTab = useSyncExternalStore<TabType>(
    subscribeBuilderState,
    getStoredActiveTab,
    () => 'basics'
  );

  const dashboardView = useSyncExternalStore<'editor' | 'preview' | 'split'>(
    subscribeBuilderState,
    getStoredDashboardView,
    () => 'split'
  );

  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  const handleTabChange = (tab: TabType) => {
    sessionStorage.setItem('builder_activeTab', tab);
    notifyBuilderStateChange();
  };

  const handleViewChange = (view: 'editor' | 'preview' | 'split') => {
    sessionStorage.setItem('builder_dashboardView', view);
    notifyBuilderStateChange();
  };

  const handleBackToLanding = () => {
    router.push('/');
  };

  const handleModuleChange = (mod: DashboardModule) => {
    if (mod === 'editor') {
      router.push('/builder');
    } else {
      router.push(`/builder/${mod}`);
    }
  };

  return (
    <div className="flex h-dvh min-h-dvh flex-col md:flex-row overflow-hidden bg-surface text-content animate-fade-in">
      <DashboardSidebar
        activeModule={activeModule}
        onModuleChange={handleModuleChange}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onBackToLanding={handleBackToLanding}
      />

      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <DashboardNavbar
          activeModule={activeModule}
          onModuleChange={handleModuleChange}
          activeTab={activeTab}
          dashboardView={dashboardView}
          onViewChange={handleViewChange}
          onOpenAiModal={() => setIsAiModalOpen(true)}
        />

        <main className="flex flex-1 overflow-hidden bg-surface">
          {activeModule === 'editor' && (
            <div className="flex w-full h-full">
              {(dashboardView === 'editor' || dashboardView === 'split') && (
                <div
                  className={`h-full overflow-hidden ${
                    dashboardView === 'split' ? 'w-full lg:w-1/2 border-r border-border' : 'w-full'
                  }`}
                >
                  <Editor activeTab={activeTab} onTabChange={handleTabChange} />
                </div>
              )}

              {(dashboardView === 'preview' || dashboardView === 'split') && (
                <div
                  className={`h-full overflow-hidden ${
                    dashboardView === 'split' ? 'hidden lg:block lg:w-1/2' : 'w-full'
                  }`}
                >
                  <LivePreview />
                </div>
              )}
            </div>
          )}

          {activeModule === 'templates' && (
            <TemplateGallery
              onSelectTemplate={() => {
                handleModuleChange('editor');
              }}
            />
          )}

          {activeModule === 'ats' && (
            <AtsStudio
              onOpenAiModal={() => setIsAiModalOpen(true)}
              onBackToEditor={() => handleModuleChange('editor')}
            />
          )}

          {activeModule === 'history' && <FileManager />}
        </main>
      </div>

      <AiModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </div>
  );
};

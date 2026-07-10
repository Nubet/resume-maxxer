'use client';

import React, { useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { useResume } from '@/context/ResumeContext';
import { Upload, Trash2, History, Save, RotateCcw, FileJson } from 'lucide-react';

export const FileManager: React.FC = () => {
  const locale = useLocale();
  const isPl = locale === 'pl';
  const {
    savedVersions,
    saveCurrentVersion,
    loadVersion,
    deleteVersion,
    exportVersionJson,
    importJson,
  } = useResume();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [versionName, setVersionName] = useState('');

  const text = isPl
    ? {
        importSuccess: 'Pomyślnie wczytano dane z pliku jako bieżącą wersję!',
        importError: (message: string) => `Błąd wczytywania: ${message}`,
        saveSuccess: 'Zapisano obecny stan jako nową wersję.',
        eyebrow: 'Historia wersji',
        title: 'Zapisane wersje CV',
        description:
          'Zapisuj różne wersje swojego dokumentu wewnątrz platformy, aby swobodnie do nich wracać, eksperymentować ze zmianami i generować z nich pliki PDF.',
        newVersionLabel: 'Nazwa nowej wersji',
        newVersionPlaceholder: 'np. Wersja pod firmę X',
        saveCurrent: 'Zapisz obecny stan',
        timeline: 'Oś czasu (lokalnie zapisane)',
        empty: 'Nie masz jeszcze żadnych zapisanych wersji.',
        savedAt: 'Zapisano:',
        restoreTitle: 'Załaduj tę wersję do edytora',
        restore: 'Przywróć',
        exportTitle: 'Eksportuj dane do pliku JSON',
        export: 'Eksport (JSON)',
        deleteConfirm: 'Na pewno usunąć tę wersję z historii?',
        deleteTitle: 'Usuń wersję',
        importOldTitle: 'Importuj starszy profil',
        importOldDescription:
          'Jeśli masz plik JSON wyeksportowany w przeszłości, wgraj go tutaj. Zostanie on załadowany jako Twój obecny profil w edytorze.',
        uploadJson: 'Wgraj plik (JSON)',
      }
    : {
        importSuccess: 'Imported resume data from file as the current version.',
        importError: (message: string) => `Import failed: ${message}`,
        saveSuccess: 'Saved the current state as a new version.',
        eyebrow: 'Version history',
        title: 'Saved resume versions',
        description:
          'Save different versions of your document inside the platform so you can return to them, test changes, and generate PDFs from each variant.',
        newVersionLabel: 'New version name',
        newVersionPlaceholder: 'e.g. Version for Company X',
        saveCurrent: 'Save current state',
        timeline: 'Timeline (saved locally)',
        empty: 'You do not have any saved versions yet.',
        savedAt: 'Saved:',
        restoreTitle: 'Load this version into the editor',
        restore: 'Restore',
        exportTitle: 'Export data to JSON file',
        export: 'Export (JSON)',
        deleteConfirm: 'Are you sure you want to delete this version from history?',
        deleteTitle: 'Delete version',
        importOldTitle: 'Import older profile',
        importOldDescription:
          'If you have a JSON file exported earlier, upload it here. It will be loaded as your current profile in the editor.',
        uploadJson: 'Upload file (JSON)',
      };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await importJson(file);
        alert(text.importSuccess);
      } catch (err: any) {
        alert(text.importError(err.message));
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSaveVersion = () => {
    saveCurrentVersion(versionName);
    setVersionName('');
    alert(text.saveSuccess);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-12 lg:p-16 bg-surface text-content animate-fade-in">
      <div className="mx-auto max-w-5xl space-y-12">
        <div className="border-b border-border pb-8 space-y-3">
          <div className="flex items-center space-x-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-content text-content-inverse">
              <History className="h-3.5 w-3.5" />
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-content-muted">
              {text.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-content">
            {text.title}
          </h2>
          <p className="text-sm sm:text-base text-content-secondary max-w-2xl leading-relaxed font-medium">
            {text.description}
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-surface-secondary p-8 shadow-xs flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 space-y-2 w-full">
            <label className="text-xs font-bold text-content-secondary uppercase tracking-widest">
              {text.newVersionLabel}
            </label>
            <input
              type="text"
              value={versionName}
              onChange={(e) => setVersionName(e.target.value)}
               placeholder={text.newVersionPlaceholder}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-content placeholder:text-content-muted focus:border-content focus:outline-none transition-colors"
            />
          </div>
          <button
            onClick={handleSaveVersion}
            className="w-full sm:w-auto inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-content px-6 py-3 text-sm font-bold text-content-inverse hover:bg-neutral-800 transition-all shadow-md active:scale-[0.98]"
          >
            <Save className="h-4 w-4" />
            <span>{text.saveCurrent}</span>
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold tracking-tight text-content">
            {text.timeline}
          </h3>
          {savedVersions.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border p-12 text-center text-content-muted">
              <History className="h-8 w-8 mx-auto mb-3 opacity-50" />
              <p className="text-sm font-medium">{text.empty}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedVersions.map((version) => (
                <div
                  key={version.id}
                  className="group rounded-2xl border border-border bg-surface p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm hover:border-border-strong transition-colors"
                >
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-content">{version.name}</h4>
                    <p className="text-xs font-medium text-content-secondary">
                      {text.savedAt} {new Date(version.date).toLocaleString(isPl ? 'pl-PL' : 'en-US')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => loadVersion(version.id)}
                      title={text.restoreTitle}
                      className="inline-flex items-center gap-2 rounded-xl bg-surface-secondary border border-border px-4 py-2 text-xs font-bold text-content hover:bg-surface-tertiary transition-colors active:scale-[0.98]"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>{text.restore}</span>
                    </button>

                    <button
                      onClick={() => exportVersionJson(version.id)}
                      title={text.exportTitle}
                      className="inline-flex items-center gap-2 rounded-xl bg-surface-secondary border border-border px-4 py-2 text-xs font-bold text-content hover:bg-surface-tertiary transition-colors active:scale-[0.98]"
                    >
                      <FileJson className="h-3.5 w-3.5" />
                      <span>{text.export}</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(text.deleteConfirm)) {
                          deleteVersion(version.id);
                        }
                      }}
                      title={text.deleteTitle}
                      className="inline-flex items-center justify-center rounded-xl bg-red-50 text-red-600 border border-red-100 p-2 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-border pt-12">
          <div className="rounded-3xl border border-border bg-surface-secondary p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-content">{text.importOldTitle}</h3>
              <p className="text-xs text-content-secondary leading-relaxed font-medium max-w-lg">
                {text.importOldDescription}
              </p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="shrink-0 inline-flex items-center gap-2 rounded-full border border-content bg-surface px-6 py-3 text-xs font-bold text-content hover:bg-content hover:text-content-inverse transition-all shadow-sm active:scale-[0.98]"
            >
              <Upload className="h-4 w-4" />
              <span>{text.uploadJson}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";

import React, { useRef, useState } from "react";
import { useResume } from "../context/ResumeContext";
import { 
  Download, 
  Upload, 
  Trash2, 
  History,
  Save,
  RotateCcw,
  FileJson
} from "lucide-react";

export const FileManager: React.FC = () => {
  const { 
    savedVersions, 
    saveCurrentVersion, 
    loadVersion, 
    deleteVersion, 
    exportVersionJson,
    importJson 
  } = useResume();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [versionName, setVersionName] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await importJson(file);
        alert("Pomyślnie wczytano dane z pliku jako bieżącą wersję!");
      } catch (err: any) {
        alert(`Błąd wczytywania: ${err.message}`);
      }
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSaveVersion = () => {
    saveCurrentVersion(versionName);
    setVersionName("");
    alert("Zapisano obecny stan jako nową wersję.");
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
              Historia Wersji
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-content">
            Zapisane Wersje CV
          </h2>
          <p className="text-sm sm:text-base text-content-secondary max-w-2xl leading-relaxed font-medium">
            Zapisuj różne wersje swojego dokumentu wewnątrz platformy, aby swobodnie do nich wracać, eksperymentować ze zmianami i generować z nich pliki PDF.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-surface-secondary p-8 shadow-xs flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 space-y-2 w-full">
            <label className="text-xs font-bold text-content-secondary uppercase tracking-widest">
              Nazwa nowej wersji
            </label>
            <input
              type="text"
              value={versionName}
              onChange={(e) => setVersionName(e.target.value)}
              placeholder="np. Wersja pod firmę X"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-content placeholder:text-content-muted focus:border-content focus:outline-none transition-colors"
            />
          </div>
          <button
            onClick={handleSaveVersion}
            className="w-full sm:w-auto inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-content px-6 py-3 text-sm font-bold text-content-inverse hover:bg-neutral-800 transition-all shadow-md active:scale-[0.98]"
          >
            <Save className="h-4 w-4" />
            <span>Zapisz obecny stan</span>
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold tracking-tight text-content">Oś czasu (Lokalnie zapisane)</h3>
          {savedVersions.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border p-12 text-center text-content-muted">
              <History className="h-8 w-8 mx-auto mb-3 opacity-50" />
              <p className="text-sm font-medium">Nie masz jeszcze żadnych zapisanych wersji.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedVersions.map((version) => (
                <div key={version.id} className="group rounded-2xl border border-border bg-surface p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm hover:border-border-strong transition-colors">
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-content">{version.name}</h4>
                    <p className="text-xs font-medium text-content-secondary">
                      Zapisano: {new Date(version.date).toLocaleString('pl-PL')}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => loadVersion(version.id)}
                      title="Załaduj tę wersję do edytora"
                      className="inline-flex items-center gap-2 rounded-xl bg-surface-secondary border border-border px-4 py-2 text-xs font-bold text-content hover:bg-surface-tertiary transition-colors active:scale-[0.98]"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Przywróć</span>
                    </button>
                    
                    <button
                      onClick={() => exportVersionJson(version.id)}
                      title="Eksportuj dane do pliku JSON"
                      className="inline-flex items-center gap-2 rounded-xl bg-surface-secondary border border-border px-4 py-2 text-xs font-bold text-content hover:bg-surface-tertiary transition-colors active:scale-[0.98]"
                    >
                      <FileJson className="h-3.5 w-3.5" />
                      <span>Eksport (JSON)</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm("Na pewno usunąć tę wersję z historii?")) {
                          deleteVersion(version.id);
                        }
                      }}
                      title="Usuń wersję"
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
              <h3 className="text-lg font-bold text-content">Importuj starszy profil</h3>
              <p className="text-xs text-content-secondary leading-relaxed font-medium max-w-lg">
                Jeśli masz plik JSON wyeksportowany w przeszłości, wgraj go tutaj. Zostanie on załadowany jako Twój obecny profil w edytorze.
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
              <span>Wgraj plik (JSON)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

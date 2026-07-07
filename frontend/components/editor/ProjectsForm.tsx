"use client";

import React from "react";
import { useResume } from "../../context/ResumeContext";
import { FolderGit2, Plus, Trash2 } from "lucide-react";

export const ProjectsForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();
  const projects = resumeData?.projects || [];

  const handleAdd = () => {
    updateResumeData((prev) => ({
      ...prev,
      projects: [
        ...(prev.projects || []),
        {
          name: "",
          description: "",
          highlights: [],
          keywords: [],
          url: "",
        },
      ],
    }));
  };

  const handleRemove = (index: number) => {
    updateResumeData((prev) => ({
      ...prev,
      projects: (prev.projects || []).filter((_, i) => i !== index),
    }));
  };

  const handleChange = (index: number, field: string, value: any) => {
    updateResumeData((prev) => {
      const newProj = [...(prev.projects || [])];
      newProj[index] = { ...newProj[index], [field]: value };
      return { ...prev, projects: newProj };
    });
  };

  const handleKeywordsChange = (index: number, value: string) => {
    const kws = value.split(",").map(k => k.trim()).filter(Boolean);
    handleChange(index, "keywords", kws);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between border-b border-border pb-5">
        <h3 className="text-xl font-bold tracking-tight text-content">Projekty IT / Komercyjne</h3>
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 rounded-full bg-content px-6 py-2.5 text-xs font-bold text-content-inverse shadow-sm hover:bg-neutral-800 transition-all active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          <span>Dodaj Projekt</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center space-y-3 bg-surface-secondary">
          <FolderGit2 className="h-8 w-8 text-content-muted mx-auto" />
          <p className="text-sm font-bold text-content">Brak wpisów o projektach</p>
          <p className="text-xs text-content-muted max-w-xs mx-auto leading-relaxed">
            Projekty open-source, aplikacje komercyjne lub osiągnięcia akademickie to doskonały sposób na wyróżnienie się w branży IT i inżynierii.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((proj, index) => (
            <div key={index} className="rounded-3xl border border-border bg-surface-secondary p-8 space-y-6 transition-all hover:border-border-strong">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center space-x-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-content text-content-inverse font-bold text-xs">
                    {index + 1}
                  </span>
                  <span className="font-bold text-base text-content">
                    {proj.name || "Nowy Projekt"}
                  </span>
                </div>
                <button
                  onClick={() => handleRemove(index)}
                  title="Usuń projekt"
                  className="text-content-muted hover:text-red-600 transition-all p-2 rounded-full hover:bg-surface"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-content mb-2">Nazwa Projektu / Aplikacji</label>
                  <input
                    type="text"
                    value={proj.name || ""}
                    onChange={(e) => handleChange(index, "name", e.target.value)}
                    placeholder="np. E-Commerce Microservice Architecture"
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-content mb-2">Link do Repozytorium / Live URL</label>
                  <input
                    type="text"
                    value={proj.url || ""}
                    onChange={(e) => handleChange(index, "url", e.target.value)}
                    placeholder="np. github.com/username/project"
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-content mb-2">Technologie / Słowa Kluczowe (oddzielone przecinkami)</label>
                  <input
                    type="text"
                    value={(proj.keywords || []).join(", ")}
                    onChange={(e) => handleKeywordsChange(index, e.target.value)}
                    placeholder="np. TypeScript, Next.js, Docker, PostgreSQL, Redis, AWS"
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none transition-colors font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-content mb-2">Opis Projektu i Rozwiązane Problemy</label>
                  <textarea
                    rows={4}
                    value={proj.description || ""}
                    onChange={(e) => handleChange(index, "description", e.target.value)}
                    placeholder="Opisz architekturę, cel aplikacji i swoje kluczowe osiągnięcia (np. • Zbudowałem system przetwarzający 10 000 żądań na sekundę...)"
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

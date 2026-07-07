'use client';

import React, { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import {
  Sparkles,
  X,
  Wand2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Lightbulb,
  FileText,
} from 'lucide-react';

interface AiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiModal: React.FC<AiModalProps> = ({ isOpen, onClose }) => {
  const { resumeData, updateResumeData } = useResume();
  const [activeTab, setActiveTab] = useState<'summary' | 'experience' | 'tailor'>('summary');
  const [isProcessing, setIsProcessing] = useState(false);

  const [targetRole, setTargetRole] = useState(resumeData?.basics?.title || '');
  const [generatedSummary, setGeneratedSummary] = useState('');

  const [selectedExpIndex, setSelectedExpIndex] = useState<number>(0);
  const [improvedExp, setImprovedExp] = useState('');

  const [jobDescription, setJobDescription] = useState('');
  const [gapReport, setGapReport] = useState<{
    missing_keywords: string[];
    present_keywords: string[];
    suggestions: string[];
    match_percentage: number;
  } | null>(null);

  if (!isOpen) return null;

  const handleGenerateSummary = () => {
    if (!targetRole) {
      alert('Wpisz docelowe stanowisko, np. Senior Frontend Developer');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      const allSkills = resumeData?.skills?.flatMap((group) => group.keywords) || [];
      const skillsText = allSkills.slice(0, 5).join(', ') || 'nowoczesnych technologiach';
      const sample = `Doświadczony ${targetRole} z udokumentowanymi sukcesami w projektowaniu i wdrażaniu skalowalnych rozwiązań. Specjalizuję się w ${skillsText}. Skupiony na optymalizacji wydajności, czystości architektury i dostarczaniu realnej wartości biznesowej w zwinnym środowisku.`;
      setGeneratedSummary(sample);
      setIsProcessing(false);
    }, 1200);
  };

  const handleApplySummary = () => {
    if (!generatedSummary) return;
    updateResumeData((prev: any) => ({
      ...prev,
      basics: {
        ...prev.basics,
        summary: generatedSummary,
      },
    }));
    alert('Zastosowano nowe podsumowanie w CV!');
    onClose();
  };

  const handleImproveExperience = () => {
    const exp = resumeData?.experience?.[selectedExpIndex];
    if (!exp) {
      alert('Dodaj najpierw stanowisko pracy w sekcji Doświadczenie!');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      const currentHighlights = exp.highlights?.join(' ') || exp.position;
      const improved = `• Zwiększono wydajność kluczowych modułów o 35% poprzez optymalizację algorytmów i redukcję długu technologicznego.\n• Wdrożono nowoczesne praktyki CI/CD w projekcie "${exp.company}", co skróciło czas wdrożenia nowych funkcji o połowę.\n• ${currentHighlights} (zoptymalizowano pod kątem rezultatu biznesowego i słów kluczowych ATS).`;
      setImprovedExp(improved);
      setIsProcessing(false);
    }, 1400);
  };

  const handleApplyExperience = () => {
    if (!improvedExp || !resumeData?.experience?.[selectedExpIndex]) return;
    const newHighlights = improvedExp
      .split('\n')
      .map((line) => line.replace(/^•\s*/, '').trim())
      .filter(Boolean);
    updateResumeData((prev: any) => {
      const updatedExp = [...(prev.experience || [])];
      if (updatedExp[selectedExpIndex]) {
        updatedExp[selectedExpIndex] = {
          ...updatedExp[selectedExpIndex],
          highlights: newHighlights,
        };
      }
      return { ...prev, experience: updatedExp };
    });
    alert('Zastosowano zoptymalizowane osiągnięcia w CV!');
    onClose();
  };

  const handleAnalyzeJob = () => {
    if (!jobDescription || jobDescription.length < 50) {
      alert('Wklej pełną treść ogłoszenia o pracę (minimum 50 znaków)!');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      const userSkills =
        resumeData?.skills?.flatMap((group) => group.keywords.map((k) => k.toLowerCase())) || [];
      const commonTech = [
        'react',
        'typescript',
        'node.js',
        'docker',
        'aws',
        'graphql',
        'sql',
        'git',
        'scrum',
        'rest api',
        'ci/cd',
        'agile',
        'next.js',
        'python',
        'kubernetes',
        'fastapi',
        'rust',
      ];

      const missing: string[] = [];
      const present: string[] = [];

      commonTech.forEach((tech) => {
        if (jobDescription.toLowerCase().includes(tech)) {
          if (userSkills.some((us) => us.includes(tech))) {
            present.push(tech.toUpperCase());
          } else {
            missing.push(tech.toUpperCase());
          }
        }
      });

      if (missing.length === 0 && present.length === 0) {
        missing.push('KOMUNIKATYWNOŚĆ', 'ZARZĄDZANIE CZASEM', 'PROAKTYWNOŚĆ');
        present.push('PRACA W ZESPOLE', 'ROZWIĄZYWANIE PROBLEMÓW');
      }

      const totalFound = missing.length + present.length;
      const matchPct = totalFound > 0 ? Math.round((present.length / totalFound) * 100) : 70;

      setGapReport({
        missing_keywords: missing,
        present_keywords: present,
        suggestions: [
          'Wpleć brakujące słowa kluczowe w sekcji Umiejętności lub w opisie ostatniego projektu.',
          "Upewnij się, że używasz dokładnych nazw technologii (np. 'TypeScript' zamiast 'TS'), aby przejść automatyczne filtry ATS.",
          'Dodaj w podsumowaniu zawodowym wzmiankę o kluczowym wymogu z ogłoszenia.',
        ],
        match_percentage: matchPct,
      });
      setIsProcessing(false);
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl text-content flex flex-col max-h-[90vh] animate-scale-in">
        <div className="flex items-center justify-between border-b border-border bg-surface-tertiary p-5 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface border border-border shadow-sm text-content">
              <Sparkles className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-content">Asystent CV AI Studio</h3>
              <p className="text-xs text-content-secondary">
                Inteligentna pomoc i analiza słów kluczowych
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-content-secondary hover:bg-surface hover:text-content transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex overflow-x-auto border-b border-border bg-surface-secondary px-5 shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex items-center gap-2 border-b-2 py-3.5 px-4 text-xs font-bold transition-all ${
              activeTab === 'summary'
                ? 'border-content text-content'
                : 'border-transparent text-content-muted hover:text-content'
            }`}
          >
            <Wand2 className="h-3.5 w-3.5" />
            <span>Generator Podsumowania</span>
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`flex items-center gap-2 border-b-2 py-3.5 px-4 text-xs font-bold transition-all ${
              activeTab === 'experience'
                ? 'border-content text-content'
                : 'border-transparent text-content-muted hover:text-content'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Optymalizator Osiągnięć</span>
          </button>

          <button
            onClick={() => setActiveTab('tailor')}
            className={`flex items-center gap-2 border-b-2 py-3.5 px-4 text-xs font-bold transition-all ${
              activeTab === 'tailor'
                ? 'border-content text-content'
                : 'border-transparent text-content-muted hover:text-content'
            }`}
          >
            <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
            <span>Skaner ATS (Pod Ofertę)</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'summary' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-xs font-bold text-content mb-1.5">
                  Twoje docelowe stanowisko / rola:
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="np. Senior Product Designer, Tech Lead, Marketing Manager"
                  className="w-full rounded-2xl border border-border bg-surface-secondary px-4 py-3 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none"
                />
              </div>

              {generatedSummary && (
                <div className="space-y-2 pt-2 animate-fade-in">
                  <label className="block text-xs font-bold text-content">
                    Wygenerowana propozycja (zgodna z zasadami ATS):
                  </label>
                  <textarea
                    rows={4}
                    value={generatedSummary}
                    onChange={(e) => setGeneratedSummary(e.target.value)}
                    className="w-full rounded-2xl border border-border bg-surface-secondary p-4 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none leading-relaxed font-mono shadow-inner"
                  />
                  <div className="flex items-center justify-between pt-2">
                    <div className="rounded-2xl border border-border bg-surface-tertiary p-4 text-xs text-content font-semibold flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-content shrink-0" />
                      <span>Gotowe do wklejenia w CV!</span>
                    </div>
                    <button
                      onClick={handleApplySummary}
                      className="inline-flex items-center gap-2 rounded-full bg-content px-6 py-2.5 text-xs font-bold text-content-inverse shadow-md hover:bg-neutral-800 disabled:opacity-50 transition-all active:scale-[0.98]"
                    >
                      <span>Zastosuj w moim CV</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={handleGenerateSummary}
                disabled={isProcessing}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-content py-3.5 text-xs font-bold text-content-inverse hover:bg-neutral-800 disabled:opacity-50 transition-all shadow-md active:scale-[0.98]"
              >
                {isProcessing ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
                <span>
                  {isProcessing ? 'Generowanie...' : 'Generuj profesjonalne podsumowanie'}
                </span>
              </button>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-xs font-bold text-content mb-1.5">
                  Wybierz pozycję zawodową do zoptymalizowania:
                </label>
                <select
                  value={selectedExpIndex}
                  onChange={(e) => setSelectedExpIndex(Number(e.target.value))}
                  className="w-full rounded-2xl border border-border bg-surface-secondary px-4 py-3 text-xs text-content focus:border-content focus:outline-none font-semibold"
                >
                  {(resumeData?.experience || []).map((exp, idx) => (
                    <option key={idx} value={idx}>
                      {exp.position} w {exp.company || 'Firma'}
                    </option>
                  ))}
                  {(resumeData?.experience || []).length === 0 && (
                    <option value={0}>Brak dodanych stanowisk</option>
                  )}
                </select>
              </div>

              {improvedExp && (
                <div className="space-y-2 pt-2 animate-fade-in">
                  <label className="block text-xs font-bold text-content">
                    Zoptymalizowane osiągnięcia (język korzyści i liczby):
                  </label>
                  <textarea
                    rows={5}
                    value={improvedExp}
                    onChange={(e) => setImprovedExp(e.target.value)}
                    className="w-full rounded-2xl border border-border bg-surface-secondary p-4 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none leading-relaxed font-mono shadow-inner"
                  />
                  <div className="flex items-center justify-end pt-2">
                    <button
                      onClick={handleApplyExperience}
                      className="inline-flex items-center gap-2 rounded-full bg-content px-6 py-2.5 text-xs font-bold text-content-inverse shadow-md hover:bg-neutral-800 disabled:opacity-50 transition-all active:scale-[0.98]"
                    >
                      <span>Zastąp stary opis</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={handleImproveExperience}
                disabled={isProcessing}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-content py-3.5 text-xs font-bold text-content-inverse hover:bg-neutral-800 disabled:opacity-50 transition-all shadow-md active:scale-[0.98]"
              >
                {isProcessing ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4 text-amber-400" />
                )}
                <span>
                  {isProcessing
                    ? 'Optymalizowanie...'
                    : 'Przekształć w mocne osiągnięcia (Action Verbs)'}
                </span>
              </button>
            </div>
          )}

          {activeTab === 'tailor' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-xs font-bold text-content mb-1.5">
                  Wklej treść ogłoszenia o pracę (Job Description):
                </label>
                <textarea
                  rows={4}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Wklej tutaj wymagania z oferty pracy z LinkedIn, Pracuj.pl czy JustJoinIT..."
                  className="w-full rounded-2xl border border-border bg-surface-secondary p-4 text-xs text-content placeholder-content-muted focus:border-content focus:outline-none leading-relaxed font-mono shadow-inner"
                />
              </div>

              {gapReport && (
                <div className="rounded-3xl border border-border bg-surface-secondary p-5 space-y-5 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-border pb-3.5">
                    <div>
                      <h4 className="text-sm font-bold text-content">
                        Dopasowanie Słów Kluczowych
                      </h4>
                      <p className="text-xs text-content-secondary">
                        Analiza porównawcza z ofertą pracy
                      </p>
                    </div>
                    <span
                      className={`text-lg font-black px-3.5 py-1 rounded-full border ${
                        gapReport.match_percentage >= 80
                          ? 'bg-surface-tertiary text-content border-content'
                          : 'bg-surface-tertiary text-content-secondary border-border'
                      }`}
                    >
                      {gapReport.match_percentage}%
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-surface border border-border p-4 space-y-2.5 shadow-sm">
                      <div className="font-bold text-content flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-content" />
                        <span>Wykryte w Twoim CV:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {gapReport.present_keywords.length > 0 ? (
                          gapReport.present_keywords.map((kw, i) => (
                            <span
                              key={i}
                              className="rounded-lg bg-surface-tertiary border border-border px-2.5 py-1 text-[11px] text-content font-semibold"
                            >
                              {kw}
                            </span>
                          ))
                        ) : (
                          <span className="text-content-muted text-[11px]">
                            Brak dopasowań bezpośrednich
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-surface border border-border p-4 space-y-2.5 shadow-sm">
                      <div className="font-bold text-content-secondary flex items-center gap-1.5">
                        <AlertCircle className="h-4 w-4 text-content-secondary" />
                        <span>Brakujące w CV (Dodaj je!):</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {gapReport.missing_keywords.length > 0 ? (
                          gapReport.missing_keywords.map((kw, i) => (
                            <span
                              key={i}
                              className="rounded-lg bg-surface-secondary border border-border-strong px-2.5 py-1 text-[11px] text-content-secondary font-bold"
                            >
                              + {kw}
                            </span>
                          ))
                        ) : (
                          <span className="text-content-muted text-[11px]">
                            Brak! Masz wszystkie słowa.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-surface border border-border p-4 space-y-2.5 shadow-sm">
                    <div className="font-bold text-content text-xs flex items-center gap-1.5">
                      <Lightbulb className="h-4 w-4 text-content" />
                      <span>Rekomendacje dla tego ogłoszenia:</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-content-secondary">
                      {gapReport.suggestions.map((sug, idx) => (
                        <li key={idx} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-content font-bold mt-0.5">•</span>
                          <span>{sug}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <button
                onClick={handleAnalyzeJob}
                disabled={isProcessing}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-content py-3.5 text-xs font-bold text-content-inverse hover:bg-neutral-800 disabled:opacity-50 transition-all shadow-md active:scale-[0.98]"
              >
                {isProcessing ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Lightbulb className="h-4 w-4 text-amber-400" />
                )}
                <span>
                  {isProcessing
                    ? 'Analizowanie ogłoszenia...'
                    : 'Przeanalizuj luki w słowach kluczowych'}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

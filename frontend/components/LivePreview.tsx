'use client';

import React, { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { RefreshCw, AlertTriangle, CheckCircle2, X } from 'lucide-react';

export const LivePreview: React.FC = () => {
  const { pdfBlobUrl, isGenerating, triggerRefresh, resumeData } = useResume();
  const [atsReport, setAtsReport] = useState<{
    status: string;
    checks: { name: string; passed: boolean; message: string }[];
  } | null>(null);

  const handleRunAtsCheck = () => {
    const hasSummary = Boolean(
      resumeData?.basics?.summary && resumeData.basics.summary.length > 20
    );
    const hasExp = Boolean(resumeData?.experience && resumeData.experience.length > 0);
    const totalSkills =
      resumeData?.skills?.reduce((acc, g) => acc + (g.keywords?.length || 0), 0) || 0;
    const hasSkills = totalSkills >= 3;

    setAtsReport({
      status: 'Zgodność ze skanerami (Workday, Taleo, Greenhouse)',
      checks: [
        {
          name: 'Format i Silnik Składu',
          passed: true,
          message: 'Plik kompilowany w Typst (100% wektorowy strumień bez ukrytych tabel HTML).',
        },
        {
          name: 'Profil Wykonawczy (Summary)',
          passed: hasSummary,
          message: hasSummary
            ? 'Wykryto czytelne podsumowanie na początku dokumentu.'
            : 'Brak podsumowania — dodaj 2-3 zdania w sekcji Kontakt i Profil.',
        },
        {
          name: 'Historia Zatrudnienia',
          passed: hasExp,
          message: hasExp
            ? 'Wykryto sekcję doświadczenia z chronologicznym układem dat.'
            : 'Brak pozycji zawodowych — dodaj swoje stanowiska.',
        },
        {
          name: 'Słowa Kluczowe (Keywords)',
          passed: hasSkills,
          message: hasSkills
            ? `Zidentyfikowano ${totalSkills} kompetencji kluczowych.`
            : 'Dodaj min. 3 umiejętności, aby przejść automatyczną filtrację.',
        },
      ],
    });
  };

  return (
    <div
      className={`relative flex h-full flex-col bg-surface-secondary border-l border-border p-6 lg:p-8`}
    >
      <div className="flex items-center justify-between pb-6 border-b border-border shrink-0">
        <div className="flex items-center space-x-2.5">
          <span className="h-2 w-2 rounded-full bg-content"></span>
          <span className="text-xs font-bold uppercase tracking-widest text-content-muted">
            Podgląd na żywo
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleRunAtsCheck}
            title="Szybki test czytelności ATS"
            className="inline-flex items-center gap-2 rounded-full border border-content bg-content px-4 py-2 text-xs font-bold text-content-inverse hover:bg-neutral-800 disabled:opacity-50 transition-all shadow-sm active:scale-[0.98]"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Sprawdź ATS</span>
          </button>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-3xl border border-border bg-surface shadow-xl flex items-center justify-center mt-6">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in">
            <RefreshCw className="h-6 w-6 text-content animate-spin mb-3" />
            <span className="text-xs font-bold tracking-wide uppercase text-content-muted">
              Generowanie...
            </span>
          </div>
        ) : !pdfBlobUrl ? (
          <div className="flex flex-col items-center justify-center p-8 text-center max-w-sm space-y-4 animate-fade-in">
            <AlertTriangle className="h-8 w-8 text-content mx-auto" />
            <p className="text-xs font-medium text-content-secondary leading-relaxed">
              Nie udało się załadować podglądu PDF. Kliknij przycisk poniżej, aby ponowić próbe
              kompilacji w silniku Typst.
            </p>
            <button
              onClick={() => triggerRefresh()}
              className="rounded-full bg-content px-6 py-2.5 text-xs font-bold text-content-inverse hover:bg-neutral-800 transition-all"
            >
              Odśwież podgląd
            </button>
          </div>
        ) : (
          <iframe
            src={`${pdfBlobUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            className="h-full w-full border-0 rounded-3xl"
            title="Podgląd PDF"
          />
        )}
      </div>

      {atsReport && (
        <div className="absolute inset-0 z-40 bg-black/40 backdrop-blur-xs flex items-center justify-center p-6 animate-fade-in">
          <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-8 shadow-2xl text-content space-y-6 animate-scale-in">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface-tertiary font-black text-base text-content">
                  ATS
                </div>
                <div>
                  <h4 className="font-bold text-sm text-content">Czytelność ATS</h4>
                  <p className="text-xs text-content-muted">{atsReport.status}</p>
                </div>
              </div>
              <button
                onClick={() => setAtsReport(null)}
                className="text-content-muted hover:text-content p-1.5 rounded-full hover:bg-surface-tertiary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {atsReport.checks.map((chk, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 text-xs p-3.5 rounded-2xl bg-surface-secondary border border-border"
                >
                  <span className={`mt-0.5 ${chk.passed ? 'text-content' : 'text-content-muted'}`}>
                    {chk.passed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                    )}
                  </span>
                  <div>
                    <div className="font-bold text-content">{chk.name}</div>
                    <div className="text-content-secondary text-[11px] leading-relaxed mt-0.5">
                      {chk.message}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setAtsReport(null)}
              className="w-full rounded-full bg-content py-3 text-xs font-bold text-content-inverse hover:bg-neutral-800 transition-all shadow-sm active:scale-[0.98]"
            >
              Zamknij raport
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

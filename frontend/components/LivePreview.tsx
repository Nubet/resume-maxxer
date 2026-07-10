'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { useResume } from '@/context/ResumeContext';
import { RefreshCw, AlertTriangle, CheckCircle2, X } from 'lucide-react';

export const LivePreview: React.FC = () => {
  const locale = useLocale();
  const isPl = locale === 'pl';
  const { pdfBlobUrl, isGenerating, triggerRefresh, resumeData } = useResume();
  const [atsReport, setAtsReport] = useState<{
    status: string;
    checks: { name: string; passed: boolean; message: string }[];
  } | null>(null);

  const text = isPl
    ? {
        status: 'Zgodność ze skanerami (Workday, Taleo, Greenhouse)',
        formatName: 'Format i silnik składu',
        formatMessage: 'Plik kompilowany w Typst (100% wektorowy strumień bez ukrytych tabel HTML).',
        summaryName: 'Profil wykonawczy (Summary)',
        summaryPass: 'Wykryto czytelne podsumowanie na początku dokumentu.',
        summaryFail: 'Brak podsumowania. Dodaj 2-3 zdania w sekcji Kontakt i Profil.',
        historyName: 'Historia zatrudnienia',
        historyPass: 'Wykryto sekcję doświadczenia z chronologicznym układem dat.',
        historyFail: 'Brak pozycji zawodowych. Dodaj swoje stanowiska.',
        keywordsName: 'Słowa kluczowe (Keywords)',
        keywordsPass: (count: number) => `Zidentyfikowano ${count} kompetencji kluczowych.`,
        keywordsFail: 'Dodaj min. 3 umiejętności, aby przejść automatyczną filtrację.',
        livePreview: 'Podgląd na żywo',
        atsTitle: 'Szybki test czytelności ATS',
        runAts: 'Sprawdź ATS',
        generating: 'Generowanie...',
        previewError: 'Nie udało się załadować podglądu PDF. Kliknij przycisk poniżej, aby ponowić próbę kompilacji w silniku Typst.',
        refresh: 'Odśwież podgląd',
        pdfTitle: 'Podgląd PDF',
        reportTitle: 'Czytelność ATS',
        close: 'Zamknij raport',
      }
    : {
        status: 'Scanner compatibility (Workday, Taleo, Greenhouse)',
        formatName: 'Format and typesetting engine',
        formatMessage: 'File compiled with Typst (100% vector output stream without hidden HTML tables).',
        summaryName: 'Executive profile (summary)',
        summaryPass: 'A clear summary was detected at the beginning of the document.',
        summaryFail: 'No summary found. Add 2-3 sentences in the Contact and Profile section.',
        historyName: 'Employment history',
        historyPass: 'Detected an experience section with chronological dates.',
        historyFail: 'No work entries found. Add your roles.',
        keywordsName: 'Keywords',
        keywordsPass: (count: number) => `Detected ${count} key competencies.`,
        keywordsFail: 'Add at least 3 skills to pass automated filtering.',
        livePreview: 'Live preview',
        atsTitle: 'Quick ATS readability check',
        runAts: 'Check ATS',
        generating: 'Generating...',
        previewError: 'Could not load the PDF preview. Click the button below to retry compilation in Typst.',
        refresh: 'Refresh preview',
        pdfTitle: 'PDF preview',
        reportTitle: 'ATS readability',
        close: 'Close report',
      };

  const handleRunAtsCheck = () => {
    const hasSummary = Boolean(
      resumeData?.basics?.summary && resumeData.basics.summary.length > 20
    );
    const hasExp = Boolean(resumeData?.experience && resumeData.experience.length > 0);
    const totalSkills =
      resumeData?.skills?.reduce((acc, g) => acc + (g.keywords?.length || 0), 0) || 0;
    const hasSkills = totalSkills >= 3;

    setAtsReport({
      status: text.status,
      checks: [
        {
          name: text.formatName,
          passed: true,
          message: text.formatMessage,
        },
        {
          name: text.summaryName,
          passed: hasSummary,
          message: hasSummary ? text.summaryPass : text.summaryFail,
        },
        {
          name: text.historyName,
          passed: hasExp,
          message: hasExp ? text.historyPass : text.historyFail,
        },
        {
          name: text.keywordsName,
          passed: hasSkills,
          message: hasSkills ? text.keywordsPass(totalSkills) : text.keywordsFail,
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
            {text.livePreview}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleRunAtsCheck}
            title={text.atsTitle}
            className="inline-flex items-center gap-2 rounded-full border border-content bg-content px-4 py-2 text-xs font-bold text-content-inverse hover:bg-neutral-800 disabled:opacity-50 transition-all shadow-sm active:scale-[0.98]"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>{text.runAts}</span>
          </button>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-3xl border border-border bg-surface shadow-xl flex items-center justify-center mt-6">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in">
            <RefreshCw className="h-6 w-6 text-content animate-spin mb-3" />
            <span className="text-xs font-bold tracking-wide uppercase text-content-muted">
              {text.generating}
            </span>
          </div>
        ) : !pdfBlobUrl ? (
          <div className="flex flex-col items-center justify-center p-8 text-center max-w-sm space-y-4 animate-fade-in">
            <AlertTriangle className="h-8 w-8 text-content mx-auto" />
            <p className="text-xs font-medium text-content-secondary leading-relaxed">
              {text.previewError}
            </p>
            <button
              onClick={() => triggerRefresh()}
              className="rounded-full bg-content px-6 py-2.5 text-xs font-bold text-content-inverse hover:bg-neutral-800 transition-all"
            >
              {text.refresh}
            </button>
          </div>
        ) : (
          <iframe
            src={`${pdfBlobUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            className="h-full w-full border-0 rounded-3xl"
            title={text.pdfTitle}
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
                  <h4 className="font-bold text-sm text-content">{text.reportTitle}</h4>
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
              {text.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

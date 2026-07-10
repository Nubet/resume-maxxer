'use client';

import React, { useState, useRef } from 'react';
import { useLocale } from 'next-intl';
import { useResume } from '@/context/ResumeContext';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  UploadCloud,
} from 'lucide-react';

interface AtsStudioProps {
  onOpenAiModal: () => void;
  onBackToEditor: () => void;
}

export const AtsStudio: React.FC<AtsStudioProps> = ({ onBackToEditor }) => {
  const locale = useLocale();
  const isPl = locale === 'pl';
  const { resumeData } = useResume();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [analysisState, setAnalysisState] = useState<'idle' | 'analyzing' | 'results'>('idle');
  const [fileName, setFileName] = useState<string | null>(null);

  const text = isPl
    ? {
        checks: {
          readabilityTitle: 'Czytelność pliku (Parsowanie tekstu)',
          readabilityDesc:
            'Wykryto poprawną warstwę tekstową w pliku PDF. Systemy ATS bez problemu odczytają z niego poszczególne słowa.',
          structureTitle: 'Struktura blokowa dokumentu',
          structureDesc:
            'Zidentyfikowano czytelny układ. Nie wykryto skomplikowanych tabel ani ukrytych grafik, które mogłyby zaburzyć kolejność czytania.',
          keywordsTitle: 'Wykryte słowa kluczowe (Umiejętności)',
          keywordsPass: (count: number) => `Zidentyfikowano ${count} kluczowych umiejętności.`,
          keywordsWarn:
            'Nie wykryto wystarczającej liczby wyraźnych słów kluczowych. Algorytm HR może zignorować ten plik przy automatycznym filtrowaniu.',
          summaryTitle: 'Sekcja profilu / podsumowania',
          summaryPass: 'Wykryto sekcję z podsumowaniem zawodowym na początku dokumentu.',
          summaryWarn:
            'Nie zidentyfikowano wyraźnego podsumowania zawodowego (Executive Summary) na górze strony.',
          lengthTitle: 'Odpowiednia długość i gęstość tekstu',
          lengthDesc: (count: number) =>
            `Zliczono około ${count} słów w treści dokumentu. Rekomendowana długość dla optymalnego skanowania to między 250 a 500 słów.`,
        },
        idleTitle: 'Sprawdź swoje obecne CV',
        idleDescription:
          'Wgraj plik PDF, aby upewnić się, że automatyczne systemy rekrutacyjne potrafią z niego poprawnie odczytać Twoje dane.',
        uploadCta: 'Upuść plik tutaj lub kliknij, aby wybrać',
        uploadFormats: 'Obsługiwane formaty: PDF (do 5 MB)',
        analyzingTitle: 'Trwa analiza pliku...',
        analyzingDescription:
          'Skanowanie warstwy tekstowej, ekstrakcja słów kluczowych i weryfikacja algorytmów ATS.',
        resultEyebrow: 'Wynik Audytu ATS',
        resultTitle: 'Raport z analizy pliku',
        resultDescription: (name: string) =>
          `Zakończono skanowanie pliku ${name}. Zobacz, jak Twój dokument został zinterpretowany przez nasz system.`,
        analyzeAnother: 'Sprawdź inny plik PDF',
        scoreLabel: 'Czytelność dla skanerów',
        identifiedData: 'Zidentyfikowane dane',
        words: 'Liczba słów',
        keywords: 'Słowa kluczowe',
        unhappy: 'Niezadowolony z wyniku?',
        buildProper: 'Zbuduj poprawne CV',
        buildProperDescription:
          'Skorzystaj z naszego kreatora, aby wygenerować dokument w 100% zoptymalizowany pod kątem systemów HR.',
        backToBuilder: 'Przejdź do kreatora CV',
        checksTitle: 'Wyniki sprawdzenia',
        ok: 'Wykryto (OK)',
        missing: 'Brak danych / Błąd',
      }
    : {
        checks: {
          readabilityTitle: 'File readability (text parsing)',
          readabilityDesc:
            'A valid text layer was detected in the PDF. ATS systems should be able to read individual words without trouble.',
          structureTitle: 'Document block structure',
          structureDesc:
            'A clear structure was detected. No complex tables or hidden graphics were found that could break reading order.',
          keywordsTitle: 'Detected keywords (skills)',
          keywordsPass: (count: number) => `Detected ${count} key skills.`,
          keywordsWarn:
            'Not enough clear keywords were detected. An HR screening algorithm may ignore this file during automated filtering.',
          summaryTitle: 'Profile / summary section',
          summaryPass: 'A professional summary section was detected near the top of the document.',
          summaryWarn:
            'No clear professional summary (Executive Summary) was detected near the top of the page.',
          lengthTitle: 'Appropriate length and text density',
          lengthDesc: (count: number) =>
            `About ${count} words were counted in the document. The recommended length for efficient scanning is between 250 and 500 words.`,
        },
        idleTitle: 'Check your current resume',
        idleDescription:
          'Upload a PDF file to verify that automated hiring systems can correctly read your information.',
        uploadCta: 'Drop a file here or click to choose',
        uploadFormats: 'Supported formats: PDF (up to 5 MB)',
        analyzingTitle: 'Analyzing file...',
        analyzingDescription:
          'Scanning the text layer, extracting keywords, and verifying ATS-oriented signals.',
        resultEyebrow: 'ATS Audit Result',
        resultTitle: 'File analysis report',
        resultDescription: (name: string) =>
          `Finished scanning ${name}. See how your document was interpreted by our system.`,
        analyzeAnother: 'Check another PDF file',
        scoreLabel: 'Scanner readability',
        identifiedData: 'Detected data',
        words: 'Word count',
        keywords: 'Keywords',
        unhappy: 'Not happy with the result?',
        buildProper: 'Build a correct resume',
        buildProperDescription:
          'Use the builder to generate a document optimized for HR systems from the start.',
        backToBuilder: 'Go to the resume builder',
        checksTitle: 'Audit results',
        ok: 'Detected (OK)',
        missing: 'Missing data / Error',
      };

  const totalWords = [
    resumeData?.basics?.summary || '',
    ...(resumeData?.experience?.map(
      (e) => `${e.position} ${e.company} ${(e.highlights || []).join(' ')}`
    ) || []),
    ...(resumeData?.projects?.map((p) => `${p.name} ${p.description}`) || []),
    ...(resumeData?.skills?.flatMap((s) => s.keywords) || []),
  ]
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;

  const hasSummary = Boolean(resumeData?.basics?.summary && resumeData.basics.summary.length > 30);
  const totalSkills =
    resumeData?.skills?.reduce((acc, g) => acc + (g.keywords?.length || 0), 0) || 0;
  const hasSkills = totalSkills >= 5;

  const checks = [
    {
      title: text.checks.readabilityTitle,
      status: 'pass',
      desc: text.checks.readabilityDesc,
    },
    {
      title: text.checks.structureTitle,
      status: 'pass',
      desc: text.checks.structureDesc,
    },
    {
      title: text.checks.keywordsTitle,
      status: hasSkills ? 'pass' : 'warn',
      desc: hasSkills ? text.checks.keywordsPass(totalSkills) : text.checks.keywordsWarn,
    },
    {
      title: text.checks.summaryTitle,
      status: hasSummary ? 'pass' : 'warn',
      desc: hasSummary ? text.checks.summaryPass : text.checks.summaryWarn,
    },
    {
      title: text.checks.lengthTitle,
      status: totalWords > 150 ? 'pass' : 'warn',
      desc: text.checks.lengthDesc(totalWords),
    },
  ];

  const passedCount = checks.filter((c) => c.status === 'pass').length;
  const score = Math.round((passedCount / checks.length) * 100);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setAnalysisState('analyzing');

      // Simulate AI analysis delay
      setTimeout(() => {
        setAnalysisState('results');
      }, 2500);
    }
  };

  if (analysisState === 'idle') {
    return (
      <div className="flex-1 overflow-y-auto p-6 sm:p-12 lg:p-16 bg-surface text-content flex items-center justify-center animate-fade-in">
        <div className="max-w-2xl w-full space-y-10 text-center">
          <div className="space-y-3">
            <h2 className="text-4xl font-black tracking-tight text-content">
              {text.idleTitle}
            </h2>
            <p className="text-base text-content-secondary max-w-md mx-auto font-medium">
              {text.idleDescription}
            </p>
          </div>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="group relative rounded-[2.5rem] border-2 border-dashed border-border hover:border-content bg-surface-secondary/30 hover:bg-surface-secondary/80 transition-all duration-300 cursor-pointer overflow-hidden p-16 flex flex-col items-center justify-center shadow-sm hover:shadow-md"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-content/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative mb-6">
              <div className="absolute inset-0 bg-content/5 rounded-full scale-150 group-hover:scale-[2] opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out" />
              <div className="rounded-2xl bg-surface p-5 border border-border/60 shadow-sm group-hover:shadow-lg group-hover:-translate-y-3 transition-all duration-500 ease-out relative z-10">
                <UploadCloud className="h-8 w-8 text-content" />
              </div>
            </div>

            <div className="space-y-2 text-center relative z-10">
              <span className="text-lg font-bold text-content block">
                {text.uploadCta}
              </span>
              <span className="text-sm font-medium text-content-muted">
                {text.uploadFormats}
              </span>
            </div>

            <input
              type="file"
              accept=".pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
          </div>
        </div>
      </div>
    );
  }

  if (analysisState === 'analyzing') {
    return (
      <div className="flex-1 overflow-y-auto p-6 sm:p-12 lg:p-16 bg-surface text-content flex items-center justify-center animate-fade-in">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="relative mx-auto h-24 w-24">
            <div className="absolute inset-0 rounded-full border-4 border-surface-secondary"></div>
            <div className="absolute inset-0 rounded-full border-4 border-content border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <ShieldCheck className="h-8 w-8 text-content animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold tracking-tight">{text.analyzingTitle}</h3>
            <p className="text-xs text-content-secondary font-medium">
              {text.analyzingDescription}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-12 lg:p-16 bg-surface text-content animate-fade-in">
      <div className="mx-auto max-w-5xl space-y-12">
        <div className="border-b border-border pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-content text-content-inverse">
                <ShieldCheck className="h-3.5 w-3.5" />
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-content-muted">
                {text.resultEyebrow}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-content">
              {text.resultTitle}
            </h2>
            <p className="text-sm sm:text-base text-content-secondary max-w-2xl leading-relaxed font-medium">
              {text.resultDescription(fileName || 'CV.pdf')}
            </p>
          </div>
          <button
            onClick={() => setAnalysisState('idle')}
            className="shrink-0 text-xs font-bold text-content hover:underline decoration-content underline-offset-4"
          >
            {text.analyzeAnother}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-3xl border border-border bg-surface-secondary p-8 flex flex-col justify-between shadow-xs relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-content-muted block">
                {text.scoreLabel}
              </span>
              <div className="text-6xl font-black tracking-tight text-content">{score}%</div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-surface-secondary p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-content-muted block">
                {text.identifiedData}
              </span>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-black text-content">{totalWords}</div>
                  <div className="text-[11px] font-semibold text-content-secondary">
                    {text.words}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-content">{totalSkills}</div>
                  <div className="text-[11px] font-semibold text-content-secondary">
                    {text.keywords}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-content bg-content text-content-inverse p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-amber-400">
                <Sparkles className="h-4 w-4" />
                <span>{text.unhappy}</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight">{text.buildProper}</h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-medium">
                {text.buildProperDescription}
              </p>
            </div>
            <button
              onClick={onBackToEditor}
              className="w-full mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-surface py-3 text-xs font-black text-content hover:bg-neutral-200 transition-all shadow-md active:scale-[0.98]"
            >
              <span>{text.backToBuilder}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-black text-content tracking-tight">{text.checksTitle}</h3>
          <div className="space-y-4">
            {checks.map((chk, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-surface-secondary p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-border-strong"
              >
                <div className="flex items-start space-x-4 max-w-2xl">
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      chk.status === 'pass'
                        ? 'bg-black text-white'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {chk.status === 'pass' ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      <AlertTriangle className="h-3.5 w-3.5" />
                    )}
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-content tracking-tight">{chk.title}</h4>
                    <p className="text-xs sm:text-sm text-content-secondary leading-relaxed font-medium">
                      {chk.desc}
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-md px-3 py-1 text-[10px] font-black uppercase tracking-wider shrink-0 ${
                    chk.status === 'pass'
                      ? 'bg-surface text-content border border-border'
                      : 'bg-amber-500 text-white'
                  }`}
                >
                  {chk.status === 'pass' ? text.ok : text.missing}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

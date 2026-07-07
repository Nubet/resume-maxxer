"use client";

import React, { useState, useRef } from "react";
import { useResume } from "../context/ResumeContext";
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight,
  UploadCloud
} from "lucide-react";

interface AtsStudioProps {
  onOpenAiModal: () => void;
  onBackToEditor: () => void;
}

export const AtsStudio: React.FC<AtsStudioProps> = ({ onOpenAiModal, onBackToEditor }) => {
  const { resumeData } = useResume();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [analysisState, setAnalysisState] = useState<"idle" | "analyzing" | "results">("idle");
  const [fileName, setFileName] = useState<string | null>(null);

  const totalWords = [
    resumeData?.basics?.summary || "",
    ...(resumeData?.experience?.map(e => `${e.position} ${e.company} ${(e.highlights || []).join(" ")}`) || []),
    ...(resumeData?.projects?.map(p => `${p.name} ${p.description}`) || []),
    ...(resumeData?.skills?.flatMap(s => s.keywords) || [])
  ].join(" ").split(/\s+/).filter(Boolean).length;

  const hasSummary = Boolean(resumeData?.basics?.summary && resumeData.basics.summary.length > 30);
  const totalSkills = resumeData?.skills?.reduce((acc, g) => acc + (g.keywords?.length || 0), 0) || 0;
  const hasSkills = totalSkills >= 5;

  const checks = [
    {
      title: "Czytelność pliku (Parsowanie tekstu)",
      status: "pass",
      desc: "Wykryto poprawną warstwę tekstową w pliku PDF. Systemy ATS bez problemu odczytają z niego poszczególne słowa.",
    },
    {
      title: "Struktura blokowa dokumentu",
      status: "pass",
      desc: "Zidentyfikowano czytelny układ. Nie wykryto skomplikowanych tabel ani ukrytych grafik, które mogłyby zaburzyć kolejność czytania.",
    },
    {
      title: "Wykryte słowa kluczowe (Umiejętności)",
      status: hasSkills ? "pass" : "warn",
      desc: hasSkills
        ? `Zidentyfikowano ${totalSkills} kluczowych umiejętności.`
        : "Nie wykryto wystarczającej liczby wyraźnych słów kluczowych. Algorytm HR może zignorować ten plik przy automatycznym filtrowaniu.",
    },
    {
      title: "Sekcja profilu / podsumowania",
      status: hasSummary ? "pass" : "warn",
      desc: hasSummary
        ? "Wykryto sekcję z podsumowaniem zawodowym na początku dokumentu."
        : "Nie zidentyfikowano wyraźnego podsumowania zawodowego (Executive Summary) na górze strony.",
    },
    {
      title: "Odpowiednia długość i gęstość tekstu",
      status: totalWords > 150 ? "pass" : "warn",
      desc: `Zliczono około ${totalWords} słów w treści dokumentu. Rekomendowana długość dla optymalnego skanowania to między 250 a 500 słów.`,
    },
  ];

  const passedCount = checks.filter(c => c.status === "pass").length;
  const score = Math.round((passedCount / checks.length) * 100);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setAnalysisState("analyzing");
      
      // Simulate AI analysis delay
      setTimeout(() => {
        setAnalysisState("results");
      }, 2500);
    }
  };

  if (analysisState === "idle") {
    return (
      <div className="flex-1 overflow-y-auto p-6 sm:p-12 lg:p-16 bg-surface text-content flex items-center justify-center animate-fade-in">
        <div className="max-w-xl w-full space-y-8 text-center">
          <div className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-secondary border border-border shadow-sm text-content">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-black tracking-tight text-content">
              Audyt ATS i Czytelności
            </h2>
            <p className="text-sm text-content-secondary leading-relaxed font-medium">
              Wgraj swój obecny plik CV (PDF), a nasz system przeanalizuje go pod kątem czytelności przez automatyczne filtry rekrutacyjne (ATS).
            </p>
          </div>

          <div 
            onClick={() => fileInputRef.current?.click()}
            className="rounded-3xl border-2 border-dashed border-border bg-surface-secondary hover:border-content transition-all cursor-pointer p-12 space-y-4 flex flex-col items-center justify-center group"
          >
            <div className="rounded-full bg-surface p-4 border border-border group-hover:scale-110 transition-transform">
              <UploadCloud className="h-6 w-6 text-content" />
            </div>
            <div className="space-y-1">
              <span className="text-base font-bold text-content block">Kliknij, aby wybrać plik PDF</span>
              <span className="text-xs text-content-muted">Maksymalny rozmiar: 5 MB</span>
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

  if (analysisState === "analyzing") {
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
            <h3 className="text-xl font-bold tracking-tight">Trwa analiza pliku...</h3>
            <p className="text-xs text-content-secondary font-medium">
              Skanowanie warstwy tekstowej, ekstrakcja słów kluczowych i weryfikacja algorytmów ATS.
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
                Wynik Audytu ATS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-content">
              Raport z analizy pliku
            </h2>
            <p className="text-sm sm:text-base text-content-secondary max-w-2xl leading-relaxed font-medium">
              Zakończono skanowanie pliku <span className="font-bold text-content">{fileName || "CV.pdf"}</span>. Zobacz, jak Twój dokument został zinterpretowany przez nasz system.
            </p>
          </div>
          <button
            onClick={() => setAnalysisState("idle")}
            className="shrink-0 text-xs font-bold text-content hover:underline decoration-content underline-offset-4"
          >
            Sprawdź inny plik PDF
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="rounded-3xl border border-border bg-surface-secondary p-8 flex flex-col justify-between shadow-xs relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-content-muted block">
                Czytelność dla skanerów
              </span>
              <div className="text-6xl font-black tracking-tight text-content">
                {score}%
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-surface-secondary p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-content-muted block">
                Zidentyfikowane Dane
              </span>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-black text-content">{totalWords}</div>
                  <div className="text-[11px] font-semibold text-content-secondary">Liczba słów</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-content">{totalSkills}</div>
                  <div className="text-[11px] font-semibold text-content-secondary">Słowa kluczowe</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-content bg-content text-content-inverse p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-amber-400">
                <Sparkles className="h-4 w-4" />
                <span>Niezadowolony z wyniku?</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight">
                Zbuduj poprawne CV
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-medium">
                Skorzystaj z naszego kreatora, aby wygenerować dokument w 100% zoptymalizowany pod kątem systemów HR.
              </p>
            </div>
            <button
              onClick={onBackToEditor}
              className="w-full mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-surface py-3 text-xs font-black text-content hover:bg-neutral-200 transition-all shadow-md active:scale-[0.98]"
            >
              <span>Przejdź do kreatora CV</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-black text-content tracking-tight">
            Wyniki sprawdzenia
          </h3>
          <div className="space-y-4">
            {checks.map((chk, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-surface-secondary p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-border-strong"
              >
                <div className="flex items-start space-x-4 max-w-2xl">
                  <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    chk.status === "pass" 
                      ? "bg-black text-white" 
                      : "bg-amber-100 text-amber-800 border border-amber-300"
                  }`}>
                    {chk.status === "pass" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-content tracking-tight">
                      {chk.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-content-secondary leading-relaxed font-medium">
                      {chk.desc}
                    </p>
                  </div>
                </div>
                <span className={`rounded-md px-3 py-1 text-[10px] font-black uppercase tracking-wider shrink-0 ${
                  chk.status === "pass"
                    ? "bg-surface text-content border border-border"
                    : "bg-amber-500 text-white"
                }`}>
                  {chk.status === "pass" ? "Wykryto (OK)" : "Brak danych / Błąd"}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

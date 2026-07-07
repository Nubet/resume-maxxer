"use client";

import React from "react";
import Link from "next/link";
import { Cpu, RefreshCw, Sparkles, CheckCircle2 } from "lucide-react";
import { useResume } from "../context/ResumeContext";

interface HeaderProps {
  onOpenAiModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAiModal }) => {
  const { isGenerating, triggerRefresh, templateId, setTemplateId } = useResume();

  const templates = [
    { id: "basic_resume_v1", name: "Swiss Minimal" },
    { id: "harvard_classic_v1", name: "Harvard Classic" },
    { id: "tech_modern_v1", name: "Tech Modern" },
  ];

  return (
    <header className="w-full border-b border-border bg-surface px-6 lg:px-10 py-4 transition-all shrink-0">
      <div className="flex items-center justify-between">

        <Link href="/" className="flex items-center space-x-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-content text-content-inverse group-hover:scale-105 transition-transform">
            <Cpu className="h-5 w-5" />
          </div>
          <span className="text-base font-black tracking-tight text-content">
            Resume Maxxer
          </span>
        </Link>

        <div className="flex items-center space-x-3">

          <div className="hidden sm:flex items-center space-x-2 rounded-full border border-border bg-surface-secondary px-4 py-1.5 text-xs">
            <span className="font-bold text-content-muted">Szablon:</span>
            <select
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              className="bg-transparent font-bold text-content focus:outline-none cursor-pointer pr-1 hover:opacity-80"
            >
              {templates.map((tpl) => (
                <option key={tpl.id} value={tpl.id}>{tpl.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => triggerRefresh()}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-bold text-content hover:border-content transition-all active:scale-[0.98]"
          >
            {isGenerating ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-content" />
            ) : (
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            )}
            <span>{isGenerating ? "Kompilacja..." : "Odśwież PDF"}</span>
          </button>

          {onOpenAiModal && (
            <button
              onClick={onOpenAiModal}
              className="inline-flex items-center gap-2 rounded-full bg-content px-6 py-2 text-xs font-bold text-content-inverse hover:bg-neutral-800 transition-all active:scale-[0.98]"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>AI Asystent</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
};

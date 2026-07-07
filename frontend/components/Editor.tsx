"use client";

import React from "react";
import { TabType } from "./DashboardSidebar";
import { BasicsForm } from "./editor/BasicsForm";
import { ExperienceForm } from "./editor/ExperienceForm";
import { EducationForm } from "./editor/EducationForm";
import { SkillsForm } from "./editor/SkillsForm";
import { ProjectsForm } from "./editor/ProjectsForm";
import { ExtraForm } from "./editor/ExtraForm";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

interface EditorProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Editor: React.FC<EditorProps> = ({ activeTab, onTabChange }) => {
  const steps: TabType[] = ["basics", "experience", "education", "skills", "projects", "extra"];
  const currentStepIndex = steps.indexOf(activeTab);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      onTabChange(steps[currentStepIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      onTabChange(steps[currentStepIndex - 1]);
    }
  };

  const renderActiveForm = () => {
    switch (activeTab) {
      case "basics":
        return <BasicsForm />;
      case "experience":
        return <ExperienceForm />;
      case "education":
        return <EducationForm />;
      case "skills":
        return <SkillsForm />;
      case "projects":
        return <ProjectsForm />;
      case "extra":
        return <ExtraForm />;
      default:
        return <BasicsForm />;
    }
  };

  return (
    <div className="flex h-full flex-col bg-surface text-content">
      
      <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-12 sm:py-12 lg:px-16 animate-fade-in">
        <div className="mx-auto max-w-3xl">
          {renderActiveForm()}
        </div>
      </div>

      <div className="border-t border-border bg-surface px-8 py-5 flex items-center justify-between gap-4 shrink-0">
        <button
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-2.5 text-xs font-bold text-content hover:border-content disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-border transition-all active:scale-[0.98]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Wstecz</span>
        </button>

        <div className="text-xs font-bold text-content-muted">
          Krok <strong className="text-content">{currentStepIndex + 1}</strong> z {steps.length}
        </div>

        {currentStepIndex < steps.length - 1 ? (
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 rounded-full bg-content px-8 py-2.5 text-xs font-bold text-content-inverse hover:bg-neutral-800 transition-all active:scale-[0.98] shadow-sm"
          >
            <span>Dalej</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            onClick={() => alert("Wszystkie sekcje wypełnione! Możesz teraz przejrzeć podgląd PDF lub sprawdzić audyt ATS.")}
            className="inline-flex items-center gap-2 rounded-full bg-content px-8 py-2.5 text-xs font-bold text-content-inverse hover:bg-neutral-800 transition-all active:scale-[0.98] shadow-sm"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>Zakończ i sprawdź PDF</span>
          </button>
        )}
      </div>
    </div>
  );
};

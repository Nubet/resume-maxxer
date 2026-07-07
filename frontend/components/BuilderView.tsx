"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardSidebar, DashboardModule, TabType } from "./DashboardSidebar";
import { DashboardNavbar } from "./DashboardNavbar";
import { Editor } from "./Editor";
import { LivePreview } from "./LivePreview";
import { TemplateGallery } from "./TemplateGallery";
import { AtsStudio } from "./AtsStudio";
import { FileManager } from "./FileManager";
import { AiModal } from "./AiModal";

interface BuilderViewProps {
  activeModule: DashboardModule;
}

export const BuilderView: React.FC<BuilderViewProps> = ({ activeModule }) => {
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    if (typeof window !== "undefined") {
      return (sessionStorage.getItem("builder_activeTab") as TabType) || "basics";
    }
    return "basics";
  });

  const [dashboardView, setDashboardView] = useState<"editor" | "preview" | "split">(() => {
    if (typeof window !== "undefined") {
      return (sessionStorage.getItem("builder_dashboardView") as any) || "split";
    }
    return "split";
  });

  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  useEffect(() => {
    sessionStorage.setItem("builder_activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    sessionStorage.setItem("builder_dashboardView", dashboardView);
  }, [dashboardView]);

  const handleBackToLanding = () => {
    router.push("/");
  };

  const handleModuleChange = (mod: DashboardModule) => {
    if (mod === "editor") {
      router.push("/builder");
    } else {
      router.push(`/builder/${mod}`);
    }
  };

  return (
    <div className="flex h-dvh min-h-dvh flex-col md:flex-row overflow-hidden bg-surface text-content animate-fade-in">
      
      <DashboardSidebar
        activeModule={activeModule}
        onModuleChange={handleModuleChange}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBackToLanding={handleBackToLanding}
      />

      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">

        <DashboardNavbar
          activeModule={activeModule}
          onModuleChange={handleModuleChange}
          activeTab={activeTab}
          dashboardView={dashboardView}
          onViewChange={setDashboardView}
          onOpenAiModal={() => setIsAiModalOpen(true)}
        />

        <main className="flex flex-1 overflow-hidden bg-surface">
          {activeModule === "editor" && (
            <div className="flex w-full h-full">
              
              {(dashboardView === "editor" || dashboardView === "split") && (
                <div className={`h-full overflow-hidden ${
                  dashboardView === "split" ? "w-full lg:w-1/2 border-r border-border" : "w-full"
                }`}>
                  <Editor activeTab={activeTab} onTabChange={setActiveTab} />
                </div>
              )}

              {(dashboardView === "preview" || dashboardView === "split") && (
                <div className={`h-full overflow-hidden ${
                  dashboardView === "split" ? "hidden lg:block lg:w-1/2" : "w-full"
                }`}>
                  <LivePreview />
                </div>
              )}
            </div>
          )}

          {activeModule === "templates" && (
            <TemplateGallery onSelectTemplate={() => {
              handleModuleChange("editor");
            }} />
          )}

          {activeModule === "ats" && (
            <AtsStudio
              onOpenAiModal={() => setIsAiModalOpen(true)}
              onBackToEditor={() => handleModuleChange("editor")}
            />
          )}

          {activeModule === "history" && (
            <FileManager />
          )}
        </main>
      </div>

      <AiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
    </div>
  );
};

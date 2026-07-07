'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { ResumeData } from '../types/resume';
import { defaultResumeData } from '../lib/defaultResume';

export interface SavedVersion {
  id: string;
  name: string;
  date: string;
  data: ResumeData;
}

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  updateResumeData: (updater: (prev: ResumeData) => ResumeData) => void;
  templateId: string;
  setTemplateId: (id: string) => void;
  isGenerating: boolean;
  pdfBlobUrl: string | null;
  serverError: string | null;
  exportJson: () => void;
  importJson: (file: File) => Promise<void>;
  downloadPdf: () => void;
  triggerRefresh: () => void;

  // History Feature
  savedVersions: SavedVersion[];
  saveCurrentVersion: (name: string) => void;
  loadVersion: (id: string) => void;
  deleteVersion: (id: string) => void;
  exportVersionJson: (id: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'resume_maxxer_data_v1';
const HISTORY_STORAGE_KEY = 'resume_maxxer_history_v1';
const BACKEND_URL = 'http://127.0.0.1:8000/api/v1/cv/generate';

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [templateId, setTemplateId] = useState<string>('basic_resume_v1');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [savedVersions, setSavedVersions] = useState<SavedVersion[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.basics) {
          setResumeData(parsed);
          if (parsed.metadata?.template_id) {
            setTemplateId(parsed.metadata.template_id);
          }
        }
      }
      const history = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (history) {
        setSavedVersions(JSON.parse(history));
      }
    } catch (err) {
      console.error('Błąd wczytywania danych z localStorage:', err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resumeData));
    } catch (err) {
      console.error('Błąd zapisu do localStorage:', err);
    }
  }, [resumeData]);

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(savedVersions));
    } catch (err) {
      console.error('Błąd zapisu historii do localStorage:', err);
    }
  }, [savedVersions]);

  const saveCurrentVersion = useCallback(
    (name: string) => {
      setSavedVersions((prev) => [
        {
          id: crypto.randomUUID(),
          name: name || 'Nowa wersja',
          date: new Date().toISOString(),
          data: {
            ...resumeData,
            metadata: { ...resumeData.metadata, template_id: templateId },
          },
        },
        ...prev,
      ]);
    },
    [resumeData, templateId]
  );

  const loadVersion = useCallback(
    (id: string) => {
      const version = savedVersions.find((v) => v.id === id);
      if (version) {
        setResumeData(version.data);
        if (version.data.metadata?.template_id) {
          setTemplateId(version.data.metadata.template_id);
        }
      }
    },
    [savedVersions]
  );

  const deleteVersion = useCallback((id: string) => {
    setSavedVersions((prev) => prev.filter((v) => v.id !== id));
  }, []);

  const exportVersionJson = useCallback(
    (id: string) => {
      const version = savedVersions.find((v) => v.id === id);
      if (!version) return;
      const dataStr =
        'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(version.data, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      const safeName = version.name.replace(/\s+/g, '_');
      downloadAnchor.setAttribute('download', `${safeName}_resume_data.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    },
    [savedVersions]
  );

  const updateResumeData = useCallback(
    (updater: (prev: ResumeData) => ResumeData) => {
      setResumeData((prev) => {
        const next = updater(prev);
        return {
          ...next,
          metadata: {
            ...next.metadata,
            template_id: templateId,
          },
        };
      });
    },
    [templateId]
  );

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const generatePdf = async () => {
      setIsGenerating(true);
      setServerError(null);
      try {
        const payload: ResumeData = {
          ...resumeData,
          metadata: {
            ...resumeData.metadata,
            template_id: templateId,
          },
        };

        const response = await fetch(`${BACKEND_URL}?template_id=${templateId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Błąd serwera (${response.status}): ${errorText}`);
        }

        const blob = await response.blob();
        if (isMounted) {
          const url = URL.createObjectURL(blob);
          setPdfBlobUrl((prevUrl) => {
            if (prevUrl) URL.revokeObjectURL(prevUrl);
            return url;
          });
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Błąd generowania PDF:', err);
          if (isMounted) {
            setServerError(
              err.message || 'Nie udało się połączyć z backendem. Czy serwer działa na porcie 8000?'
            );
          }
        }
      } finally {
        if (isMounted) {
          setIsGenerating(false);
        }
      }
    };

    const timer = setTimeout(() => {
      generatePdf();
    }, 600);

    return () => {
      isMounted = false;
      controller.abort();
      clearTimeout(timer);
    };
  }, [resumeData, templateId, refreshTrigger]);

  const triggerRefresh = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const exportJson = useCallback(() => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    const safeName = (resumeData.basics.name || 'CV').replace(/\s+/g, '_');
    downloadAnchor.setAttribute('download', `${safeName}_resume_data.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [resumeData]);

  const importJson = useCallback(async (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const parsed = JSON.parse(content);
          if (!parsed.basics || !parsed.basics.name) {
            throw new Error('Nieprawidłowy format pliku JSON CV.');
          }
          setResumeData(parsed);
          if (parsed.metadata?.template_id) {
            setTemplateId(parsed.metadata.template_id);
          }
          resolve();
        } catch (err: any) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error('Błąd odczytu pliku.'));
      reader.readAsText(file);
    });
  }, []);

  const downloadPdf = useCallback(() => {
    if (!pdfBlobUrl) return;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', pdfBlobUrl);
    const safeName = (resumeData.basics.name || 'CV').replace(/\s+/g, '_');
    downloadAnchor.setAttribute('download', `${safeName}_ResumeMaxxer.pdf`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [pdfBlobUrl, resumeData.basics.name]);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        updateResumeData,
        templateId,
        setTemplateId,
        isGenerating,
        pdfBlobUrl,
        serverError,
        exportJson,
        importJson,
        downloadPdf,
        triggerRefresh,
        savedVersions,
        saveCurrentVersion,
        loadVersion,
        deleteVersion,
        exportVersionJson,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume musi być używane wewnątrz ResumeProvider');
  }
  return context;
};

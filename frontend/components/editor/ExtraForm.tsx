'use client';

import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Globe, Award, Plus, Trash2 } from 'lucide-react';

export const ExtraForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();
  const languages = resumeData?.languages || [];
  const certifications = resumeData?.certifications || [];

  const handleAddLanguage = () => {
    updateResumeData((prev) => ({
      ...prev,
      languages: [...(prev.languages || []), { language: '', fluency: '' }],
    }));
  };

  const handleRemoveLanguage = (index: number) => {
    updateResumeData((prev) => ({
      ...prev,
      languages: (prev.languages || []).filter((_, i) => i !== index),
    }));
  };

  const handleChangeLanguage = (index: number, field: string, value: string) => {
    updateResumeData((prev) => {
      const newLangs = [...(prev.languages || [])];
      newLangs[index] = { ...newLangs[index], [field]: value };
      return { ...prev, languages: newLangs };
    });
  };

  const handleAddCert = () => {
    updateResumeData((prev) => ({
      ...prev,
      certifications: [...(prev.certifications || []), { name: '', date: '', issuer: '', url: '' }],
    }));
  };

  const handleRemoveCert = (index: number) => {
    updateResumeData((prev) => ({
      ...prev,
      certifications: (prev.certifications || []).filter((_, i) => i !== index),
    }));
  };

  const handleChangeCert = (index: number, field: string, value: string) => {
    updateResumeData((prev) => {
      const newCerts = [...(prev.certifications || [])];
      newCerts[index] = { ...newCerts[index], [field]: value };
      return { ...prev, certifications: newCerts };
    });
  };

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-5">
          <div className="flex items-center space-x-2.5">
            <Globe className="h-5 w-5 text-content" />
            <h3 className="text-xl font-bold tracking-tight text-content">Języki Obce</h3>
          </div>
          <button
            onClick={handleAddLanguage}
            className="inline-flex items-center gap-2 rounded-full bg-content px-5 py-2 text-xs font-bold text-content-inverse shadow-sm hover:bg-neutral-800 transition-all active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span>Dodaj Język</span>
          </button>
        </div>

        {languages.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border p-8 text-center space-y-2 bg-surface-secondary">
            <p className="text-xs font-bold text-content">Brak dodanych języków</p>
            <p className="text-[11px] text-content-muted">
              Dodaj języki obce oraz poziom biegłości (np. Angielski - C1 / Biegły).
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {languages.map((lang, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-surface-secondary p-5 flex items-center justify-between gap-4"
              >
                <div className="grid grid-cols-2 gap-3 flex-1">
                  <input
                    type="text"
                    value={lang.language || ''}
                    onChange={(e) => handleChangeLanguage(idx, 'language', e.target.value)}
                    placeholder="Język (np. Angielski)"
                    className="rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:outline-none"
                  />
                  <input
                    type="text"
                    value={lang.fluency || ''}
                    onChange={(e) => handleChangeLanguage(idx, 'fluency', e.target.value)}
                    placeholder="Poziom (np. C1 / Biegły)"
                    className="rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => handleRemoveLanguage(idx)}
                  className="text-content-muted hover:text-red-600 p-1.5 rounded-full hover:bg-surface transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between border-b border-border pb-5">
          <div className="flex items-center space-x-2.5">
            <Award className="h-5 w-5 text-content" />
            <h3 className="text-xl font-bold tracking-tight text-content">
              Certyfikaty, Licencje i Nagrody
            </h3>
          </div>
          <button
            onClick={handleAddCert}
            className="inline-flex items-center gap-2 rounded-full bg-content px-5 py-2 text-xs font-bold text-content-inverse shadow-sm hover:bg-neutral-800 transition-all active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span>Dodaj Certyfikat</span>
          </button>
        </div>

        {certifications.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border p-8 text-center space-y-2 bg-surface-secondary">
            <p className="text-xs font-bold text-content">Brak dodanych certyfikatów</p>
            <p className="text-[11px] text-content-muted">
              Dodaj zdobyte certyfikaty branżowe (np. AWS Certified Solutions Architect, Scrum
              Master).
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-border bg-surface-secondary p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-content-muted">
                    Certyfikat #{idx + 1}
                  </span>
                  <button
                    onClick={() => handleRemoveCert(idx)}
                    className="text-content-muted hover:text-red-600 p-1.5 rounded-full hover:bg-surface transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-content mb-1">
                      Nazwa Certyfikatu / Nagrody
                    </label>
                    <input
                      type="text"
                      value={cert.name || ''}
                      onChange={(e) => handleChangeCert(idx, 'name', e.target.value)}
                      placeholder="np. AWS Certified Solutions Architect - Associate"
                      className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-content mb-1">
                      Data Uzyskania (YYYY-MM)
                    </label>
                    <input
                      type="text"
                      value={cert.date || ''}
                      onChange={(e) => handleChangeCert(idx, 'date', e.target.value)}
                      placeholder="np. 2023-08"
                      className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-bold text-content mb-1">
                      Wystawca / Organizacja
                    </label>
                    <input
                      type="text"
                      value={cert.issuer || ''}
                      onChange={(e) => handleChangeCert(idx, 'issuer', e.target.value)}
                      placeholder="np. Amazon Web Services (AWS) / Scrum.org"
                      className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

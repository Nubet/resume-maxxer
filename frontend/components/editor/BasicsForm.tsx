'use client';

import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { User, Mail, Phone, MapPin, Briefcase, Link as LinkIcon } from 'lucide-react';

export const BasicsForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();
  const basics = resumeData?.basics || {
    name: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    summary: '',
    urls: {},
  };

  const handleChange = (field: string, value: string) => {
    updateResumeData((prev) => ({
      ...prev,
      basics: { ...prev.basics, [field]: value },
    }));
  };

  const handleUrlChange = (network: string, url: string) => {
    updateResumeData((prev) => ({
      ...prev,
      basics: {
        ...prev.basics,
        urls: { ...prev.basics?.urls, [network]: url },
      },
    }));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-border pb-5 flex items-center justify-between">
        <h3 className="text-xl font-bold tracking-tight text-content">Profil i Kontakt</h3>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="flex items-center gap-2 text-xs font-bold text-content mb-2">
            <User className="h-4 w-4 text-content-muted" />
            <span>Imię i Nazwisko</span>
          </label>
          <input
            type="text"
            value={basics.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="np. Jan Kowalski"
            className="w-full rounded-2xl border border-border bg-surface-secondary px-4 py-3 text-sm text-content placeholder-content-muted focus:border-content focus:bg-surface focus:outline-none transition-colors font-semibold"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-xs font-bold text-content mb-2">
            <Briefcase className="h-4 w-4 text-content-muted" />
            <span>Tytuł Zawodowy</span>
          </label>
          <input
            type="text"
            value={basics.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="np. Senior Frontend Developer"
            className="w-full rounded-2xl border border-border bg-surface-secondary px-4 py-3 text-sm text-content placeholder-content-muted focus:border-content focus:bg-surface focus:outline-none transition-colors font-semibold"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-xs font-bold text-content mb-2">
            <Mail className="h-4 w-4 text-content-muted" />
            <span>Adres E-mail</span>
          </label>
          <input
            type="email"
            value={basics.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="np. jan.kowalski@example.com"
            className="w-full rounded-2xl border border-border bg-surface-secondary px-4 py-3 text-sm text-content placeholder-content-muted focus:border-content focus:bg-surface focus:outline-none transition-colors font-semibold"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-xs font-bold text-content mb-2">
            <Phone className="h-4 w-4 text-content-muted" />
            <span>Numer Telefonu</span>
          </label>
          <input
            type="tel"
            value={basics.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="np. +48 123 456 789"
            className="w-full rounded-2xl border border-border bg-surface-secondary px-4 py-3 text-sm text-content placeholder-content-muted focus:border-content focus:bg-surface focus:outline-none transition-colors font-semibold"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-center gap-2 text-xs font-bold text-content mb-2">
            <MapPin className="h-4 w-4 text-content-muted" />
            <span>Lokalizacja / Miasto</span>
          </label>
          <input
            type="text"
            value={basics.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="np. Warszawa, Polska (lub Praca Zdalna)"
            className="w-full rounded-2xl border border-border bg-surface-secondary px-4 py-3 text-sm text-content placeholder-content-muted focus:border-content focus:bg-surface focus:outline-none transition-colors font-semibold"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-content mb-2">
          Podsumowanie Zawodowe (Executive Summary)
        </label>
        <p className="text-xs text-content-secondary mb-3 leading-relaxed">
          Napisz 2-3 zdania podsumowujące Twoje najważniejsze osiągnięcia i cele zawodowe. To
          pierwsza sekcja, którą czyta rekruter.
        </p>
        <textarea
          rows={4}
          value={basics.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Doświadczony inżynier z 5-letnim stażem w projektowaniu systemów..."
          className="w-full rounded-2xl border border-border bg-surface-secondary p-5 text-sm text-content placeholder-content-muted focus:border-content focus:bg-surface focus:outline-none leading-relaxed transition-colors font-medium"
        />
      </div>

      <div className="pt-6 border-t border-border space-y-4">
        <div className="flex items-center space-x-2">
          <LinkIcon className="h-4 w-4 text-content" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-content-muted">
            Linki i Profile
          </h4>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-bold text-content mb-2">LinkedIn</label>
            <input
              type="text"
              value={basics.urls?.linkedin || ''}
              onChange={(e) => handleUrlChange('linkedin', e.target.value)}
              placeholder="linkedin.com/in/..."
              className="w-full rounded-2xl border border-border bg-surface-secondary px-4 py-2.5 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:bg-surface focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-content mb-2">GitHub</label>
            <input
              type="text"
              value={basics.urls?.github || ''}
              onChange={(e) => handleUrlChange('github', e.target.value)}
              placeholder="github.com/..."
              className="w-full rounded-2xl border border-border bg-surface-secondary px-4 py-2.5 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:bg-surface focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-content mb-2">Portfolio / Strona</label>
            <input
              type="text"
              value={basics.urls?.portfolio || ''}
              onChange={(e) => handleUrlChange('portfolio', e.target.value)}
              placeholder="example.com"
              className="w-full rounded-2xl border border-border bg-surface-secondary px-4 py-2.5 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:bg-surface focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

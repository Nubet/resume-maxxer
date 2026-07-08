'use client';

import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { Briefcase, Mail, Phone, Plus, Trash2, User } from 'lucide-react';
import { FormBlock } from '@/components/editor/FormBlock';

export const BasicsForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();
  const basics = resumeData?.basics || {
    name: '',
    email: '',
    phone: '',
    location: '',
    city: '',
    country: '',
    remoteFriendly: false,
    title: '',
    targetRole: '',
    targetCompany: '',
    targetJobDescription: '',
    summary: '',
    urls: {},
  };
  const urls = Object.entries(basics.urls || {});
  const linkTypes = [
    'linkedin',
    'portfolio',
    'github',
    'behance',
    'dribbble',
    'gitlab',
    'medium',
    'substack',
    'youtube',
    'instagram',
    'tiktok',
    'website',
    'other',
  ];

  const buildLocation = (city?: string, country?: string, remoteFriendly?: boolean) => {
    const baseLocation = [country, city].filter(Boolean).join(', ');
    if (!baseLocation) return remoteFriendly ? 'Remote' : '';
    return remoteFriendly ? `${baseLocation} / Remote` : baseLocation;
  };

  const handleChange = (field: string, value: string) => {
    updateResumeData((prev) => ({
      ...prev,
      basics: { ...prev.basics, [field]: value },
    }));
  };

  const handleLocationPartChange = (field: 'city' | 'country', value: string) => {
    updateResumeData((prev) => {
      const nextBasics = { ...prev.basics, [field]: value };
      const location = buildLocation(
        nextBasics.city,
        nextBasics.country,
        nextBasics.remoteFriendly
      );
      return { ...prev, basics: { ...nextBasics, location } };
    });
  };

  const handleRemoteFriendlyChange = (checked: boolean) => {
    updateResumeData((prev) => {
      const nextBasics = { ...prev.basics, remoteFriendly: checked };
      const location = buildLocation(nextBasics.city, nextBasics.country, checked);
      return { ...prev, basics: { ...nextBasics, location } };
    });
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

  const handleUrlKeyChange = (oldKey: string, newKey: string) => {
    const key = newKey.trim().toLowerCase().replace(/\s+/g, '-');
    if (!key || key === oldKey) return;

    updateResumeData((prev) => {
      const nextUrls = { ...(prev.basics.urls || {}) };
      nextUrls[key] = nextUrls[oldKey] || '';
      delete nextUrls[oldKey];
      return { ...prev, basics: { ...prev.basics, urls: nextUrls } };
    });
  };

  const handleAddUrl = () => {
    updateResumeData((prev) => {
      const nextUrls = { ...(prev.basics.urls || {}) };
      let key =
        linkTypes.find((type) => !nextUrls[type]) || `link-${Object.keys(nextUrls).length + 1}`;
      if (key === 'other') key = `link-${Object.keys(nextUrls).length + 1}`;
      nextUrls[key] = '';
      return { ...prev, basics: { ...prev.basics, urls: nextUrls } };
    });
  };

  const handleRemoveUrl = (key: string) => {
    updateResumeData((prev) => {
      const nextUrls = { ...(prev.basics.urls || {}) };
      delete nextUrls[key];
      return { ...prev, basics: { ...prev.basics, urls: nextUrls } };
    });
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <FormBlock
        eyebrow="Najpierw"
        title="Kim jesteś i na jaką rolę aplikujesz?"
        description="Te dane pomagają dopasować ton CV, nagłówek i słowa kluczowe do konkretnej rekrutacji."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-content placeholder-content-muted transition-colors focus:border-content focus:bg-surface focus:outline-none"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-content mb-2">
              <Briefcase className="h-4 w-4 text-content-muted" />
              <span>Aktualny Tytuł Zawodowy</span>
            </label>
            <input
              type="text"
              value={basics.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="np. Specjalista ds. obsługi klienta, Księgowa, Elektryk"
              className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-content placeholder-content-muted transition-colors focus:border-content focus:bg-surface focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-content mb-2">Docelowe Stanowisko</label>
            <input
              type="text"
              value={basics.targetRole || ''}
              onChange={(e) => handleChange('targetRole', e.target.value)}
              placeholder="np. Kierownik zmiany, Junior Analityk, Magazynier"
              className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-content placeholder-content-muted transition-colors focus:border-content focus:bg-surface focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-content mb-2">
              Firma / Branża Docelowa
            </label>
            <input
              type="text"
              value={basics.targetCompany || ''}
              onChange={(e) => handleChange('targetCompany', e.target.value)}
              placeholder="np. logistyka, bankowość, edukacja, konkretna firma"
              className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-content placeholder-content-muted transition-colors focus:border-content focus:bg-surface focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-content mb-2">Opis Oferty Pracy</label>
            <p className="text-xs text-content-secondary mb-3 leading-relaxed">
              Jeśli masz ogłoszenie, wklej je tutaj. Jeśli nie, zostaw puste i uzupełnij resztę CV
              normalnie.
            </p>
            <textarea
              rows={5}
              value={basics.targetJobDescription || ''}
              onChange={(e) => handleChange('targetJobDescription', e.target.value)}
              placeholder="Wymagania, obowiązki, nazwa stanowiska, słowa kluczowe z ogłoszenia..."
              className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-medium leading-relaxed text-content placeholder-content-muted transition-colors focus:border-content focus:bg-surface focus:outline-none"
            />
          </div>
        </div>
      </FormBlock>

      <FormBlock
        eyebrow="Kontakt"
        title="Jak rekruter ma się z Tobą skontaktować?"
        description="Podaj tylko dane potrzebne rekruterowi. Lokalizacja w CV zostanie złożona z kraju, miasta i ewentualnej informacji o pracy zdalnej."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-content placeholder-content-muted transition-colors focus:border-content focus:bg-surface focus:outline-none"
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
              className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-content placeholder-content-muted transition-colors focus:border-content focus:bg-surface focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-content mb-2">Kraj</label>
            <input
              type="text"
              value={basics.country || ''}
              onChange={(e) => handleLocationPartChange('country', e.target.value)}
              placeholder="np. Polska"
              className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-content placeholder-content-muted transition-colors focus:border-content focus:bg-surface focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-content mb-2">Miasto</label>
            <input
              type="text"
              value={basics.city || ''}
              onChange={(e) => handleLocationPartChange('city', e.target.value)}
              placeholder="np. Warszawa"
              className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-content placeholder-content-muted transition-colors focus:border-content focus:bg-surface focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-content mb-2">
              Czy praca zdalna też wchodzi w grę?
            </label>
            <div className="rounded-2xl border border-border bg-surface px-4 py-3">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={Boolean(basics.remoteFriendly)}
                  onChange={(e) => handleRemoteFriendlyChange(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border text-content focus:ring-0"
                />
                <span className="text-xs font-semibold leading-relaxed text-content-secondary">
                  Jeśli zaznaczone, w wygenerowanym CV lokalizacja może zostać zapisana jako `miasto
                  / Zdalnie`.
                </span>
              </label>
            </div>
          </div>
        </div>
      </FormBlock>

      <FormBlock
        eyebrow="Wizytówka"
        title="Podsumowanie zawodowe"
        description="Napisz 2-4 linie w trzeciej osobie: lata doświadczenia, specjalizacja, najmocniejsze osiągnięcia i dopasowanie do roli."
      >
        <textarea
          rows={4}
          value={basics.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Specjalista ds. obsługi klienta z 4-letnim doświadczeniem w pracy z klientem biznesowym, reklamacjami i systemami CRM..."
          className="w-full rounded-2xl border border-border bg-surface p-5 text-sm font-medium leading-relaxed text-content placeholder-content-muted transition-colors focus:border-content focus:bg-surface focus:outline-none"
        />
      </FormBlock>

      <FormBlock
        eyebrow="Online"
        title="Profile i portfolio"
        description="Sam wybierz portale. Inne linki mają sens dla grafika, inne dla programisty, sprzedawcy, twórcy lub naukowca."
      >
        <div className="space-y-3">
          {urls.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface px-4 py-5 text-center text-xs font-semibold text-content-muted">
              Brak linków. Dodaj tylko te profile, które realnie wspierają aplikację.
            </div>
          ) : (
            urls.map(([key, value]) => (
              <div
                key={key}
                className="grid grid-cols-1 gap-3 rounded-2xl border border-border bg-surface p-3 sm:grid-cols-12"
              >
                <select
                  value={linkTypes.includes(key) ? key : 'other'}
                  onChange={(e) =>
                    handleUrlKeyChange(key, e.target.value === 'other' ? key : e.target.value)
                  }
                  className="rounded-xl border border-border bg-surface-secondary px-3 py-2 text-xs font-bold text-content focus:border-content focus:outline-none sm:col-span-3"
                >
                  {linkTypes.map((type) => (
                    <option key={type} value={type}>
                      {type === 'other' ? 'własny typ' : type}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={key}
                  onChange={(e) => handleUrlKeyChange(key, e.target.value)}
                  placeholder="etykieta"
                  className="rounded-xl border border-border bg-surface-secondary px-3 py-2 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:outline-none sm:col-span-3"
                />
                <input
                  type="text"
                  value={value || ''}
                  onChange={(e) => handleUrlChange(key, e.target.value)}
                  placeholder="adres profilu lub strony"
                  className="rounded-xl border border-border bg-surface-secondary px-3 py-2 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:outline-none sm:col-span-5"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveUrl(key)}
                  className="inline-flex items-center justify-center rounded-xl border border-border bg-surface-secondary px-3 py-2 text-content-muted transition-colors hover:border-red-200 hover:text-red-600 sm:col-span-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
          <button
            type="button"
            onClick={handleAddUrl}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-xs font-bold text-content transition-all hover:border-content active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            Dodaj link
          </button>
        </div>
      </FormBlock>
    </div>
  );
};

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useResume } from '@/context/ResumeContext';
import { Briefcase, Mail, Phone, Plus, Trash2, User } from 'lucide-react';
import { FormBlock } from '@/components/editor/FormBlock';

export const BasicsForm: React.FC = () => {
  const t = useTranslations('Editor.Basics');
  const tGlobal = useTranslations('Editor');
  const { resumeData, updateResumeData } = useResume();
  const basics = resumeData?.basics || {
    name: '',
    email: '',
    phone: '',
    location: '',
    city: '',
    country: '',
    showCountry: true,
    remoteFriendly: false,
    title: '',
    targetRole: '',
    targetCompany: '',
    targetJobDescription: '',
    summary: '',
    showSummary: true,
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

  const linkTypeLabel = (type: string) => (type === 'other' ? t('linkTypes.other') : type);
  const remoteWord = t('fields.remoteFriendly.remoteWord');

  const buildLocation = (city?: string, country?: string, remoteFriendly?: boolean) => {
    const baseLocation = [country, city].filter(Boolean).join(', ');
    if (!baseLocation) return remoteFriendly ? remoteWord : '';
    return remoteFriendly ? `${baseLocation} / ${remoteWord}` : baseLocation;
  };

  const handleChange = (field: string, value: string | boolean) => {
    updateResumeData((prev) => ({
      ...prev,
      basics: { ...prev.basics, [field]: value },
    }));
  };

  const handleLocationPartChange = (field: 'city' | 'country' | 'showCountry', value: string | boolean) => {
    updateResumeData((prev) => {
      const nextBasics = { ...prev.basics, [field]: value };
      const location = buildLocation(
        nextBasics.city,
        nextBasics.showCountry !== false ? nextBasics.country : '',
        nextBasics.remoteFriendly
      );
      return { ...prev, basics: { ...nextBasics, location } };
    });
  };

  const handleRemoteFriendlyChange = (checked: boolean) => {
    updateResumeData((prev) => {
      const nextBasics = { ...prev.basics, remoteFriendly: checked };
      const location = buildLocation(
        nextBasics.city,
        nextBasics.showCountry !== false ? nextBasics.country : '',
        checked
      );
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
        eyebrow={t('introEyebrow')}
        title={t('introTitle')}
        description={t('introDescription')}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-content mb-2">
              <User className="h-4 w-4 text-content-muted" />
              <span>{t('fields.name.label')}</span>
            </label>
            <input
              type="text"
              value={basics.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder={t('fields.name.placeholder')}
              className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-content placeholder-content-muted transition-colors focus:border-content focus:bg-surface focus:outline-none"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-content mb-2">
              <Briefcase className="h-4 w-4 text-content-muted" />
              <span>{t('fields.title.label')}</span>
            </label>
            <input
              type="text"
              value={basics.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder={t('fields.title.placeholder')}
              className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-content placeholder-content-muted transition-colors focus:border-content focus:bg-surface focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-content mb-2">{t('fields.targetRole.label')}</label>
            <input
              type="text"
              value={basics.targetRole || ''}
              onChange={(e) => handleChange('targetRole', e.target.value)}
              placeholder={t('fields.targetRole.placeholder')}
              className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-content placeholder-content-muted transition-colors focus:border-content focus:bg-surface focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-content mb-2">
              {t('fields.targetCompany.label')}
            </label>
            <input
              type="text"
              value={basics.targetCompany || ''}
              onChange={(e) => handleChange('targetCompany', e.target.value)}
              placeholder={t('fields.targetCompany.placeholder')}
              className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-content placeholder-content-muted transition-colors focus:border-content focus:bg-surface focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-content mb-2">{t('fields.targetJobDescription.label')}</label>
            <p className="text-xs text-content-secondary mb-3 leading-relaxed">
              {t('fields.targetJobDescription.helper')}
            </p>
            <textarea
              rows={5}
              value={basics.targetJobDescription || ''}
              onChange={(e) => handleChange('targetJobDescription', e.target.value)}
              placeholder={t('fields.targetJobDescription.placeholder')}
              className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-medium leading-relaxed text-content placeholder-content-muted transition-colors focus:border-content focus:bg-surface focus:outline-none"
            />
          </div>
        </div>
      </FormBlock>

      <FormBlock
        eyebrow={t('contactEyebrow')}
        title={t('contactTitle')}
        description={t('contactDescription')}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-content mb-2">
              <Mail className="h-4 w-4 text-content-muted" />
              <span>{t('fields.email.label')}</span>
            </label>
            <input
              type="email"
              value={basics.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder={t('fields.email.placeholder')}
              className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-content placeholder-content-muted transition-colors focus:border-content focus:bg-surface focus:outline-none"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-content mb-2">
              <Phone className="h-4 w-4 text-content-muted" />
              <span>{t('fields.phone.label')}</span>
            </label>
            <input
              type="tel"
              value={basics.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder={t('fields.phone.placeholder')}
              className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-content placeholder-content-muted transition-colors focus:border-content focus:bg-surface focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-content">{t('fields.country.label')}</label>
              <label className="flex items-center gap-1.5 cursor-pointer text-[10px] font-bold uppercase tracking-wider text-content-secondary hover:text-content">
                <input
                  type="checkbox"
                  checked={basics.showCountry !== false}
                  onChange={(e) => handleLocationPartChange('showCountry', e.target.checked)}
                  className="rounded border-border text-content focus:ring-0 w-3.5 h-3.5"
                />
                {tGlobal('showOnResume')}
              </label>
            </div>
            <input
              type="text"
              value={basics.country || ''}
              onChange={(e) => handleLocationPartChange('country', e.target.value)}
              placeholder={t('fields.country.placeholder')}
              className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-content placeholder-content-muted transition-colors focus:border-content focus:bg-surface focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-content mb-2">{t('fields.city.label')}</label>
            <input
              type="text"
              value={basics.city || ''}
              onChange={(e) => handleLocationPartChange('city', e.target.value)}
              placeholder={t('fields.city.placeholder')}
              className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-content placeholder-content-muted transition-colors focus:border-content focus:bg-surface focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-content mb-2">
              {t('fields.remoteFriendly.label')}
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
                  {t('fields.remoteFriendly.helper')}
                </span>
              </label>
            </div>
          </div>
        </div>
      </FormBlock>

      <FormBlock
        eyebrow={t('summaryEyebrow')}
        title={t('summaryTitle')}
        description={t('summaryDescription')}
      >
        <div className="mb-3 flex justify-end">
          <label className="flex cursor-pointer items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-content-secondary hover:text-content">
            <input
              type="checkbox"
              checked={basics.showSummary !== false}
              onChange={(e) => handleChange('showSummary', e.target.checked)}
              className="h-3.5 w-3.5 rounded border-border text-content focus:ring-0"
            />
            {tGlobal('showOnResume')}
          </label>
        </div>
        <textarea
          rows={4}
          value={basics.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder={t('fields.summary.placeholder')}
          className="w-full rounded-2xl border border-border bg-surface p-5 text-sm font-medium leading-relaxed text-content placeholder-content-muted transition-colors focus:border-content focus:bg-surface focus:outline-none"
        />
      </FormBlock>

      <FormBlock
        eyebrow={t('linksEyebrow')}
        title={t('linksTitle')}
        description={t('linksDescription')}
      >
        <div className="space-y-3">
          {urls.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface px-4 py-5 text-center text-xs font-semibold text-content-muted">
              {t('empty')}
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
                      {linkTypeLabel(type)}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={key}
                  onChange={(e) => handleUrlKeyChange(key, e.target.value)}
                  placeholder={t('fields.customLabel.placeholder')}
                  className="rounded-xl border border-border bg-surface-secondary px-3 py-2 text-xs font-semibold text-content placeholder-content-muted focus:border-content focus:outline-none sm:col-span-3"
                />
                <input
                  type="text"
                  value={value || ''}
                  onChange={(e) => handleUrlChange(key, e.target.value)}
                  placeholder={t('fields.url.placeholder')}
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
            {t('addLink')}
          </button>
        </div>
      </FormBlock>
    </div>
  );
};

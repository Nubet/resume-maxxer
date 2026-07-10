'use client';

import React from 'react';
import { Languages } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export const LocaleSwitcher: React.FC = () => {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-secondary p-1 shadow-xs">
      <span className="sr-only">{t('label')}</span>
      <div className="flex h-8 w-8 items-center justify-center rounded-full text-content-muted">
        <Languages className="h-3.5 w-3.5" />
      </div>
      {routing.locales.map((nextLocale) => {
        const isActive = nextLocale === locale;

        return (
          <button
            key={nextLocale}
            type="button"
            onClick={() => router.replace(pathname, { locale: nextLocale })}
            className={`rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-wider transition-all ${
              isActive
                ? 'bg-content text-content-inverse shadow-sm'
                : 'text-content-secondary hover:text-content'
            }`}
          >
            {t(`locales.${nextLocale}`)}
          </button>
        );
      })}
    </div>
  );
};

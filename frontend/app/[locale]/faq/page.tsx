'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { SubpageLayout } from '@/components/SubpageLayout';

export default function FaqPage() {
  const t = useTranslations('Pages.Faq');
  const faqs = t.raw('items') as Array<{ num: string; q: string; a: string }>;

  return (
    <SubpageLayout title={t('title')} subtitle={t('subtitle')}>
      <div className="space-y-12 max-w-4xl mx-auto pt-6 font-medium">
        {faqs.map((faq) => (
          <div
            key={faq.num}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-10 border-t border-border first:border-t-0 first:pt-0"
          >
            <div className="lg:col-span-2">
              <span className="text-xl font-black font-mono text-content-muted tracking-tight block">
                /{faq.num}
              </span>
            </div>

            <div className="lg:col-span-10 space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-content tracking-tight leading-snug">
                {faq.q}
              </h3>
              <p className="text-sm sm:text-base text-content-secondary leading-relaxed max-w-2xl">
                {faq.a}
              </p>
            </div>
          </div>
        ))}

        <div className="pt-16 border-t border-border mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-black text-content tracking-tight">{t('contactTitle')}</h4>
            <p className="text-xs sm:text-sm text-content-secondary mt-1">{t('contactDescription')}</p>
          </div>
          <a
            href="mailto:kontakt@resumemaxxer.pl"
            className="inline-flex items-center justify-center rounded-full bg-content px-8 py-3.5 text-xs font-bold text-content-inverse hover:bg-neutral-800 transition-all shadow-sm shrink-0 active:scale-[0.98]"
          >
            {t('contactCta')}
          </a>
        </div>
      </div>
    </SubpageLayout>
  );
}

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { SubpageLayout } from '@/components/SubpageLayout';

export default function TermsPage() {
  const t = useTranslations('Pages.Terms');
  const sections = t.raw('sections') as Array<{ title: string; paragraphs: string[] }>;

  return (
    <SubpageLayout title={t('title')} subtitle={t('subtitle')}>
      <div className="space-y-8 text-sm sm:text-base text-content-secondary leading-relaxed max-w-3xl font-medium">
        {sections.map((section, index) => (
          <section
            key={section.title}
            className={index === 0 ? 'space-y-3' : 'space-y-3 pt-6 border-t border-border'}
          >
            <h2 className="text-lg sm:text-xl font-black text-content tracking-tight">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </SubpageLayout>
  );
}

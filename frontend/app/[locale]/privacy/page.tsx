'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { SubpageLayout } from '@/components/SubpageLayout';

export default function PrivacyPage() {
  const t = useTranslations('Pages.Privacy');
  const sections = t.raw('sections') as Array<{ title: string; paragraphs: string[]; bullets?: string[] }>;

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
            {section.bullets && (
              <ul className="list-disc pl-6 space-y-1 text-content">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </SubpageLayout>
  );
}

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Globe } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { SubpageLayout } from '@/components/SubpageLayout';

export default function AuthorsPage() {
  const t = useTranslations('Pages.Authors');

  return (
    <SubpageLayout title={t('title')} subtitle={t('subtitle')}>
      <div className="max-w-4xl mx-auto pt-6 space-y-16 font-medium">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-border">
          <div className="md:col-span-5 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-content-muted">
              / 01 {t('manifestLabel')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-content tracking-tight leading-snug">
              {t('manifestTitle')}
            </h2>
          </div>

          <div className="md:col-span-7 space-y-6 text-sm sm:text-base text-content-secondary leading-relaxed">
            <p>{t('manifestBody1')}</p>
            <p>{t('manifestBody2')}</p>
          </div>
        </div>

        <div className="pt-8">
          <div className="group rounded-4xl sm:rounded-[3rem] bg-surface border border-border overflow-hidden flex flex-col md:flex-row shadow-lg hover:shadow-2xl transition-all duration-500">
            <div className="w-full md:w-[45%] h-100 md:h-auto shrink-0 overflow-hidden bg-surface-tertiary border-b md:border-b-0 md:border-r border-border">
              <img
                src="/images/norbert-fila.jpg"
                alt="Norbert Fila"
                className="w-full h-full object-cover object-top sm:object-center group-hover:scale-105 group-hover:-rotate-1 transition-transform duration-700 ease-out"
              />
            </div>

            <div className="w-full md:w-[55%] p-8 sm:p-12 md:p-14 flex flex-col justify-center space-y-10 bg-surface-secondary relative">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-content-muted">
                    / {t('founderLabel')}
                  </span>
                  <h3 className="text-4xl sm:text-5xl font-black text-content tracking-tight">
                    Norbert Fila
                  </h3>
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-content">{t('founderRole')}</p>
                <p className="text-sm sm:text-base text-content-secondary leading-relaxed pt-3">
                  {t('founderDescription')}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://norbertfila.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-content px-7 py-3.5 text-xs font-bold text-content-inverse hover:bg-neutral-800 transition-all active:scale-[0.98] shadow-md"
                >
                  <Globe className="h-4 w-4" />
                  <span>{t('visitPortfolio')}</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/norbert-fila/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-11 w-11 rounded-full border border-border bg-surface text-content hover:border-content hover:bg-surface-tertiary transition-all active:scale-[0.98]"
                  title={t('linkedinTitle')}
                >
                  <FiLinkedin className="h-4 w-4" />
                </a>

                <a
                  href="https://github.com/Nubet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-11 w-11 rounded-full border border-border bg-surface text-content hover:border-content hover:bg-surface-tertiary transition-all active:scale-[0.98]"
                  title={t('githubTitle')}
                >
                  <FiGithub className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
}

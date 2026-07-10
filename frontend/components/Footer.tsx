'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Cpu } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export const Footer: React.FC = () => {
  const t = useTranslations('Footer');

  return (
    <footer className="border-t border-border bg-surface-tertiary py-12 md:py-16 text-xs text-content-secondary font-sans">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface border border-border text-content shadow-sm">
                <Cpu className="h-4 w-4" />
              </div>
              <span className="text-base font-bold tracking-tight text-content">Resume Maxxer</span>
            </div>
            <p className="text-content-secondary leading-relaxed max-w-sm">
              {t('description')}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-content tracking-wider uppercase">
              / {t('sections.product')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-content transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/builder" className="hover:text-content transition-colors font-medium text-content">
                  {t('builder')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-content tracking-wider uppercase">
              / {t('sections.aboutProject')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/authors" className="hover:text-content transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-content transition-colors">
                  {t('faq')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-content tracking-wider uppercase">
              / {t('sections.legal')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-content transition-colors">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-content transition-colors">
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-content-muted font-mono text-[11px]">
          <div>&copy; {new Date().getFullYear()} Resume Maxxer. {t('copyright')}</div>
        </div>
      </div>
    </footer>
  );
};

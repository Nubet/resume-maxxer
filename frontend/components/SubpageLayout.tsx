'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Cpu, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Footer } from './Footer';
import { LocaleSwitcher } from './LocaleSwitcher';

interface SubpageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const SubpageLayout: React.FC<SubpageLayoutProps> = ({ children, title, subtitle }) => {
  const t = useTranslations('SubpageLayout');

  return (
    <div className="min-h-dvh bg-surface text-content flex flex-col font-sans selection:bg-content selection:text-content-inverse">
      <header className="sticky top-4 sm:top-6 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-300">
        <div className="mx-auto max-w-5xl rounded-full border border-border bg-surface/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] px-5 py-2.5 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-3 transition-opacity hover:opacity-80 active:scale-[0.98]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-tertiary border border-border text-content">
              <Cpu className="h-4.5 w-4.5" />
            </div>
            <span className="text-base font-bold tracking-tight text-content">Resume Maxxer</span>
          </Link>

          <div className="flex items-center space-x-4">
            <LocaleSwitcher />

            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-content-secondary hover:text-content transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{t('backHome')}</span>
            </Link>

            <Link
              href="/builder"
              className="inline-flex items-center gap-2 rounded-full bg-content px-5 py-2 text-xs sm:text-sm font-bold text-content-inverse shadow-sm hover:bg-neutral-800 transition-all active:scale-[0.98]"
            >
              <span>{t('openBuilder')}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="border-b border-border pb-10 space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-content">
              {title}
            </h1>
            {subtitle && (
              <p className="text-base sm:text-lg text-content-secondary leading-relaxed max-w-3xl font-medium">
                {subtitle}
              </p>
            )}
          </div>

          <div className="space-y-8 text-sm sm:text-base text-content-secondary leading-relaxed font-medium">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

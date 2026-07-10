'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ArrowRight, Menu, X } from 'lucide-react';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';

interface NavbarProps {
  onStartBuilder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartBuilder }) => {
  const t = useTranslations('Landing.Navbar');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: t('comparison'), href: '#comparison' },
    { name: t('workflow'), href: '#workflow' },
    { name: t('faq'), href: '#faq' },
  ];

  return (
    <>
      <header className="sticky top-4 sm:top-6 z-50 w-full px-4 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
        <div className="mx-auto max-w-5xl pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between rounded-full border border-border bg-white/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] px-5 py-2.5 transition-all duration-300"
          >
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-tertiary border border-border text-content transition-transform duration-300 group-hover:scale-105">
                <Cpu className="h-4.5 w-4.5" />
              </div>
              <span className="text-base font-bold tracking-tight text-content">Resume Maxxer</span>
            </a>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-1.5 text-xs font-semibold text-content-secondary hover:text-content hover:bg-surface-tertiary rounded-full transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="hidden sm:flex items-center gap-2">
              <LocaleSwitcher />

              <button
                onClick={onStartBuilder}
                className="group inline-flex items-center gap-2 rounded-full bg-content px-5 py-2 text-xs font-bold text-content-inverse shadow-sm hover:bg-neutral-800 transition-all duration-200 active:scale-[0.98]"
              >
                <span>{t('cta')}</span>
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-black group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="h-2.5 w-2.5 stroke-3" />
                </span>
              </button>
            </div>

            <div className="flex sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full border border-border bg-surface-tertiary text-content"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="sm:hidden fixed inset-x-4 top-20 z-40 rounded-3xl border border-border bg-white/95 backdrop-blur-xl p-5 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-2xl text-xs font-bold text-content-secondary hover:bg-surface-tertiary hover:text-content transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-content-muted" />
                </a>
              ))}
              <div className="pt-3 border-t border-border flex flex-col gap-2">
                <LocaleSwitcher />

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onStartBuilder();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-content px-4 py-3.5 text-xs font-bold text-content-inverse shadow-md hover:bg-neutral-800 transition-colors"
                >
                  <span>{t('cta')}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

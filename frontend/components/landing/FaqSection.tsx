'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, FileText } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const t = useTranslations('Landing.Faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = t.raw('items') as Array<{ question: string; answer: string }>;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-32 relative border-t border-border bg-surface">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-16"
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-content">
            {t.rich('title', {
              br: () => <br />,
              underline: (chunks) => (
                <span className="underline decoration-border-strong decoration-2 underline-offset-8">
                  {chunks}
                </span>
              ),
            })}
          </h2>
          <p className="text-base text-content-secondary leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-content bg-white shadow-md'
                    : 'border-border bg-surface-tertiary hover:border-border-strong'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                >
                  <span
                    className={`text-base sm:text-lg font-bold transition-colors ${
                      isOpen ? 'text-content' : 'text-content group-hover:text-content'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? 'bg-content border-content text-content-inverse rotate-180'
                        : 'bg-white border-border text-content-secondary group-hover:border-content group-hover:text-content'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-content-secondary leading-relaxed border-t border-border">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="p-8 rounded-3xl border border-border bg-surface-tertiary text-center space-y-4 shadow-sm">
          <FileText className="h-8 w-8 text-content mx-auto" />
          <h3 className="text-xl font-bold text-content">{t('moreQuestionsTitle')}</h3>
          <p className="text-sm text-content-secondary max-w-md mx-auto">
            {t('moreQuestionsDescription')}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layers, ArrowRight, Download } from 'lucide-react';

interface WorkflowSectionProps {
  onStartBuilder: () => void;
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ onStartBuilder }) => {
  const steps = [
    {
      number: '01',
      icon: <Code2 className="h-5 w-5 text-content" />,
      title: 'Wpisz lub wklej swoje dane',
      desc: 'Dodaj doświadczenie i umiejętności w prostym formularzu, bez walki z formatowaniem.',
    },
    {
      number: '02',
      icon: <Layers className="h-5 w-5 text-content" />,
      title: 'Wybierz wygląd dokumentu',
      desc: 'Przełączaj szablony jednym kliknięciem. Tekst automatycznie dopasuje się do marginesów.',
    },
    {
      number: '03',
      icon: <Download className="h-5 w-5 text-content" />,
      title: 'Pobierz gotowy plik PDF',
      desc: 'Otrzymujesz profesjonalny dokument, gotowy do wysłania rekruterowi.',
    },
  ];

  return (
    <section id="workflow" className="py-20 md:py-32 relative bg-surface border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16"
      >
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-content">
            Jak działa <br />
            <span className="underline decoration-border-strong decoration-2 underline-offset-8">
              nasz kreator CV?
            </span>
          </h2>
          <p className="text-base sm:text-lg text-content-secondary leading-relaxed">
            Od pierwszego słowa do gotowego dokumentu PDF w kilka minut.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {steps.map((step, _idx) => (
            <div
              key={step.number}
              className="rounded-3xl border border-border bg-surface-secondary p-8 flex flex-col justify-between hover:border-border-strong hover:bg-surface-tertiary transition-all duration-300 shadow-sm"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-border shadow-sm text-content">
                    {step.icon}
                  </div>
                  <span className="text-base font-mono font-bold tracking-wider text-content-muted">
                    {step.number}
                  </span>
                </div>

                <div className="space-y-2.5 text-left">
                  <h3 className="text-xl font-bold text-content tracking-tight">{step.title}</h3>
                  <p className="text-sm text-content-secondary leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <button
            onClick={onStartBuilder}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-content px-9 py-4 text-base sm:text-lg font-bold text-content-inverse shadow-xl hover:bg-neutral-800 transition-all duration-200 active:scale-[0.98]"
          >
            <span>Stwórz swoje CV teraz — Za darmo</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="h-3.5 w-3.5 stroke-3" />
            </span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};

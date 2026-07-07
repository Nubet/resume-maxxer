"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  XCircle, 
  ArrowRight,
  Check
} from "lucide-react";

interface ComparisonSectionProps {
  onStartBuilder: () => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ onStartBuilder }) => {
  const traditionalFlaws = [
    {
      title: "Rozjeżdżające się tabele",
      desc: "Po otwarciu na innym komputerze kolumny i marginesy często się przesuwają."
    },
    {
      title: "Brak odczytu w systemach HR",
      desc: "Programy rekrutacyjne nie potrafią odczytać liter z szablonów graficznych i odrzucają plik."
    },
    {
      title: "Ręczne poprawianie układu",
      desc: "Dopisanie jednego zdania niszczy układ strony i zmusza do poprawiania całości."
    },
    {
      title: "Przepisywanie danych od nowa",
      desc: "Zmiana wyglądu CV wymaga ponownego wprowadzania całej historii zatrudnienia."
    }
  ];

  const maxxerAdvantages = [
    {
      title: "Pewna rekrutacja HR",
      desc: "Czysty format PDF gwarantuje, że system rekrutacyjny odczyta 100% Twoich umiejętności."
    },
    {
      title: "Automatyczny układ strony",
      desc: "Nasz system sam wyrównuje tekst i marginesy w czasie rzeczywistym."
    },
    {
      title: "Zmień wygląd jednym kliknięciem",
      desc: "Dane wpisujesz raz, a szablony graficzne przełączasz bez utraty treści."
    },
    {
      title: "Dopasowanie do oferty pracy",
      desc: "Inteligentny asystent pomaga wyeksponować umiejętności, których dokładnie szuka pracodawca."
    }
  ];

  return (
    <section id="comparison" className="py-20 md:py-32 relative bg-surface border-t border-border">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16"
      >

        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-content">
            Dlaczego zwykłe edytory <br />
            <span className="underline decoration-border-strong decoration-2 underline-offset-8">
              utrudniają znalezienie pracy?
            </span>
          </h2>
          <p className="text-base sm:text-lg text-content-secondary leading-relaxed">
            Świetne kandydatury często przepadają przez błędy w pliku. Zobacz, jak oszczędzić czas i zyskać pewność w rekrutacji.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">

          <div className="rounded-3xl border border-border bg-surface-secondary p-8 sm:p-10 flex flex-col justify-between space-y-8 relative">
            <div className="space-y-6">
              <div className="border-b border-border pb-6">
                <h3 className="text-xl font-bold text-content">Zwykłe programy i edytory</h3>
                <p className="text-xs text-content-muted mt-1">Popularne kreatory graficzne i edytory tekstu</p>
              </div>

              <div className="space-y-5">
                {traditionalFlaws.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-600 dark:text-red-500">
                      <XCircle className="h-3.5 w-3.5" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-bold text-content block">{item.title}</span>
                      <p className="text-xs text-content-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-800 bg-content text-content-inverse p-8 sm:p-10 flex flex-col justify-between space-y-8 relative shadow-2xl">
            <div className="space-y-6">
              <div className="border-b border-neutral-800 pb-6">
                <h3 className="text-xl font-bold text-content-inverse">Resume Maxxer</h3>
                <p className="text-xs text-neutral-400 mt-1">Nowoczesny kreator odporny na błędy formatowania</p>
              </div>

              <div className="space-y-5">
                {maxxerAdvantages.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-black">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-bold text-white block">{item.title}</span>
                      <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800 flex justify-end">
              <button
                onClick={onStartBuilder}
                className="inline-flex items-center gap-1.5 font-bold text-white hover:underline decoration-white underline-offset-4"
              >
                <span>Stwórz swoje CV teraz</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

        </div>

      </motion.div>
    </section>
  );
};

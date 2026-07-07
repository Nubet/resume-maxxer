"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { Meteors } from "../ui/meteors";

interface CtaSectionProps {
  onStartBuilder: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onStartBuilder }) => {
  return (
    <section className="py-20 md:py-32 relative bg-surface border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-3xl bg-content text-content-inverse p-10 sm:p-16 lg:p-20 text-center relative overflow-hidden shadow-2xl group"
        >
          
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-neutral-800/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-neutral-800/40 rounded-full blur-3xl pointer-events-none" />

          <Meteors number={18} />

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              Gotowy na <span className="underline decoration-neutral-600 underline-offset-8">czytelne CV</span> bez problemów z formatowaniem?
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Dołącz do osób, które tworzą swoje życiorysy w nowoczesnym kreatorze, mając pewność, że pracodawca zawsze otworzy przejrzysty i profesjonalny dokument.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onStartBuilder}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 rounded-full bg-content-inverse px-8 py-4 text-base sm:text-lg font-bold text-content shadow-xl hover:bg-neutral-200 transition-all duration-200 active:scale-[0.98]"
              >
                <FileText className="h-5 w-5 text-content" />
                <span>Stwórz swoje CV teraz — Za darmo</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-content text-content-inverse group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="h-3.5 w-3.5 stroke-[3]" />
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

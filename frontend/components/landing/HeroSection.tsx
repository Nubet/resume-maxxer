"use client";

import React from "react";
import { LayoutGroup, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TextRotate } from "../ui/text-rotate";

interface HeroSectionProps {
  onStartBuilder: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartBuilder }) => {
  return (
    <section className="relative pt-16 pb-24 md:pt-28 md:pb-36 overflow-hidden bg-surface">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-10">

          <LayoutGroup>
            <motion.h1
              layout
              className="text-4xl sm:text-6xl lg:text-[76px] font-bold tracking-[-0.045em] text-content leading-[1.15] flex flex-col items-center justify-center gap-2 sm:gap-4"
            >
              <motion.span layout className="text-center">
                CV, które przechodzi przez systemy ATS
              </motion.span>
              
              <TextRotate
                texts={[
                  "i zdobywa zaproszenia.",
                  "i wyróżnia Cię z tłumu.",
                  "i buduje Twój wizerunek."
                ]}
                splitBy="words"
                animatePresenceMode="wait"
                mainClassName="text-content border-b-2 border-border-strong pb-2 flex justify-center text-center relative"
                staggerFrom="last"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-120%", opacity: 0 }}
                staggerDuration={0.06}
                splitLevelClassName="overflow-hidden pb-2 sm:pb-4 -mb-2 sm:-mb-4"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={6000}
              />
            </motion.h1>
          </LayoutGroup>

          <p className="text-lg sm:text-xl text-content-secondary max-w-2xl mx-auto leading-relaxed font-normal">
            Wpisz swoje dane w prostym formularzu. Nasz kreator automatycznie zadba o czytelny układ, właściwe marginesy i wygeneruje plik PDF, który bezbłędnie odczyta każdy system HR.
          </p>

          <div className="pt-4 flex justify-center">
            <button
              onClick={onStartBuilder}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-content px-9 py-4 text-base sm:text-lg font-bold text-content-inverse shadow-xl hover:bg-neutral-800 transition-all duration-200 active:scale-[0.98]"
            >
              <span>Stwórz swoje CV teraz — Za darmo</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="h-3.5 w-3.5 stroke-[3]" />
              </span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

"use client";

import React from "react";
import { SubpageLayout } from "../../components/SubpageLayout";

export default function FaqPage() {
  const faqs = [
    {
      num: "01",
      q: "Dlaczego nasz kreator CV jest lepszy od zwykłych programów graficznych i edytorów tekstu?",
      a: "Tradycyjne szablony graficzne z popularnych edytorów często psują układ kolumn i ukrywają tekst w sposób nienaturalny dla programów rekrutacyjnych w firmach. Nasze narzędzie generuje czysty, czytelny plik PDF, który zawsze zachowuje właściwą strukturę i jest bezbłędnie odczytywany przez systemy HR i skanery ATS."
    },
    {
      num: "02",
      q: "Co zyskuję dzięki oddzieleniu treści CV od jego wyglądu?",
      a: "W tradycyjnych programach zmiana szablonu często oznacza konieczność układania całego tekstu od nowa. U nas wpisujesz swoją historię zatrudnienia tylko raz. Potem możesz dowolnie zmieniać wygląd dokumentu w galerii szablonów – tekst automatycznie dopasuje się do nowych marginesów i hierarchii."
    },
    {
      num: "03",
      q: "Czy muszę płacić za pobranie wygenerowanego pliku PDF?",
      a: "Nie. Nasz kreator jest narzędziem całkowicie bezpłatnym. Nie wymagamy zakładania konta, podawania karty kredytowej ani obowiązkowej rejestracji. Twoje dane pozostają w Twojej przeglądarce."
    },
    {
      num: "04",
      q: "W jaki sposób silnik Typst gwarantuje czytelność w systemach ATS?",
      a: "Typst to nowoczesny, akademicki silnik składu tekstu (następca LaTeX). W przeciwieństwie do generatorów opartych na HTML i CSS, Typst kompiluje czysty strumień znaków i wektorów, bez zagnieżdżonych tabel czy ukrytych warstw graficznych, które gubią algorytmy rekrutacyjne."
    }
  ];

  return (
    <SubpageLayout
      title="Często Zadawane Pytania"
      subtitle="Filozofia działania, bezpieczeństwo danych i przewaga techniczna silnika składu Typst."
    >
      <div className="space-y-12 max-w-4xl mx-auto pt-6 font-medium">
        {faqs.map((faq) => (
          <div
            key={faq.num}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-10 border-t border-border first:border-t-0 first:pt-0"
          >
            
            <div className="lg:col-span-2">
              <span className="text-xl font-black font-mono text-content-muted tracking-tight block">
                /{faq.num}
              </span>
            </div>

            <div className="lg:col-span-10 space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-content tracking-tight leading-snug">
                {faq.q}
              </h3>
              <p className="text-sm sm:text-base text-content-secondary leading-relaxed max-w-2xl">
                {faq.a}
              </p>
            </div>
          </div>
        ))}

        <div className="pt-16 border-t border-border mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-black text-content tracking-tight">
              Masz pytania techniczne lub propozycję nowego szablonu?
            </h4>
            <p className="text-xs sm:text-sm text-content-secondary mt-1">
              Jesteśmy otwarci na sugestie społeczności inżynierów i projektantów.
            </p>
          </div>
          <a
            href="mailto:kontakt@resumemaxxer.pl"
            className="inline-flex items-center justify-center rounded-full bg-content px-8 py-3.5 text-xs font-bold text-content-inverse hover:bg-neutral-800 transition-all shadow-sm shrink-0 active:scale-[0.98]"
          >
            Napisz do zespołu
          </a>
        </div>
      </div>
    </SubpageLayout>
  );
}

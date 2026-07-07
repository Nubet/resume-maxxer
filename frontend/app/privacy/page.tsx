'use client';

import React from 'react';
import { SubpageLayout } from '../../components/SubpageLayout';

export default function PrivacyPage() {
  return (
    <SubpageLayout
      title="Polityka Prywatności"
      subtitle="Dokument określający zasady przetwarzania i ochrony danych osobowych użytkowników platformy Resume Maxxer."
    >
      <div className="space-y-8 text-sm sm:text-base text-content-secondary leading-relaxed max-w-3xl font-medium">
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-content tracking-tight">
            1. Postanowienia Ogólne
          </h2>
          <p>
            Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych
            użytkowników korzystających z aplikacji internetowej Resume Maxxer (zwanej dalej
            „Serwisem”). Celem dokumentu jest zapewnienie użytkownikom pełnej informacji o tym, w
            jaki sposób ich dane są gromadzone, przetwarzane i chronione w świetle Rozporządzenia
            Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO).
          </p>
          <p>
            Korzystanie z Serwisu nie wymaga zakładania konta użytkownika, logowania ani podawania
            danych identyfikacyjnych w celu uzyskania dostępu do podstawowych funkcjonalności
            edytora.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-border">
          <h2 className="text-lg sm:text-xl font-black text-content tracking-tight">
            2. Architektura Przetwarzania Danych (Local Storage)
          </h2>
          <p>
            W trosce o maksymalne bezpieczeństwo i prywatność kandydatów, Serwis został
            zaprojektowany w architekturze po stronie klienta (Client-Side Processing). Wszelkie
            dane wprowadzane do formularza życiorysu (w tym dane osobowe, historia zatrudnienia,
            dane kontaktowe oraz osiągnięcia) są zapisywane i przechowywane wyłącznie w lokalnej
            pamięci przeglądarki internetowej użytkownika (Local Storage).
          </p>
          <p>
            Administrator Serwisu nie prowadzi centralnej bazy danych życiorysów, nie archiwizuje
            treści wprowadzanych przez użytkowników ani nie ma do nich bezpośredniego dostępu.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-border">
          <h2 className="text-lg sm:text-xl font-black text-content tracking-tight">
            3. Kompilacja Dokumentów PDF i Integracja z API
          </h2>
          <p>
            W procesie generowania pliku wyjściowego w formacie PDF, struktura danych życiorysu w
            formacie JSON jest przesyłana do zewnętrznego silnika kompilacji Typst. Przekazanie
            danych ma charakter wyłącznie chwilowy i techniczny – następuje na czas niezbędny do
            wygenerowania pliku graficznego (zazwyczaj poniżej jednej sekundy). Natychmiast po
            ukończeniu procesu kompilacji i zwróceniu pliku do przeglądarki użytkownika, dane są
            bezpowrotnie usuwane z pamięci operacyjnej serwera kompilacyjnego.
          </p>
          <p>
            W przypadku korzystania z opcjonalnych funkcji sztucznej inteligencji (AI Studio),
            wybrane fragmenty tekstu mogą być przesyłane do dostawców modeli językowych (np.
            OpenRouter) w trybie bezstanowym (No-Training Policy), co gwarantuje, że dane te nie
            będą wykorzystywane do trenowania modeli AI.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-border">
          <h2 className="text-lg sm:text-xl font-black text-content tracking-tight">
            4. Pliki Cookies i Narzędzia Analityczne
          </h2>
          <p>
            Serwis nie wykorzystuje śledzących plików cookies (ciasteczek) podmiotów trzecich,
            pikseli marketingowych ani agresywnych narzędzi profilujących użytkowników w celach
            reklamowych. Wykorzystywane mogą być jedynie niezbędne mechanizmy techniczne
            przeglądarki służące do prawidłowego utrzymania stanu aplikacji podczas danej sesji.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-border">
          <h2 className="text-lg sm:text-xl font-black text-content tracking-tight">
            5. Prawa Użytkownika w Świetle RODO
          </h2>
          <p>
            Z uwagi na fakt, że dane życiorysu są przechowywane lokalnie w urządzeniu użytkownika,
            użytkownik ma w każdej chwili pełną kontrolę nad swoimi danymi. Posiada on prawo do:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-content">
            <li>
              Dostępu do treści swoich danych oraz ich natychmiastowej edycji w interfejsie
              aplikacji.
            </li>
            <li>
              Eksportu pełnego zestawu danych do otwartego formatu pliku JSON w dowolnym momencie.
            </li>
            <li>
              Trwałego usunięcia danych poprzez wyczyszczenie pamięci podręcznej (Local Storage) w
              ustawieniach swojej przeglądarki internetowej.
            </li>
          </ul>
        </section>

        <section className="space-y-3 pt-6 border-t border-border">
          <h2 className="text-lg sm:text-xl font-black text-content tracking-tight">
            6. Zmiany Polityki Prywatności
          </h2>
          <p>
            Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej Polityce
            Prywatności w przypadku rozwoju funkcjonalności Serwisu lub zmian w obowiązujących
            przepisach prawa. Aktualna wersja dokumentu jest zawsze publikowana na niniejszej
            podstronie.
          </p>
        </section>
      </div>
    </SubpageLayout>
  );
}

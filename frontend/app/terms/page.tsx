"use client";

import React from "react";
import { SubpageLayout } from "../../components/SubpageLayout";

export default function TermsPage() {
  return (
    <SubpageLayout
      title="Regulamin Serwisu"
      subtitle="Warunki świadczenia usług drogą elektroniczną w ramach platformy Resume Maxxer."
    >
      <div className="space-y-8 text-sm sm:text-base text-content-secondary leading-relaxed max-w-3xl font-medium">
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-content tracking-tight">
            § 1. Postanowienia Ogólne
          </h2>
          <p>
            1. Niniejszy Regulamin określa zasady i warunki technicznoprawne korzystania z aplikacji internetowej Resume Maxxer (zwanej dalej „Serwisem”).
          </p>
          <p>
            2. Serwis stanowi narzędzie programistyczne udostępniane drogą elektroniczną, przeznaczone do wspierania procesu tworzenia, edycji, walidacji pod kątem czytelności w systemach ATS (Applicant Tracking Systems) oraz formatowania dokumentów życiorysowych (CV) przy wykorzystaniu silnika składu tekstu Typst.
          </p>
          <p>
            3. Rozpoczęcie korzystania z Serwisu jest równoznaczne z akceptacją warunków niniejszego Regulaminu. Każdy użytkownik jest zobowiązany do przestrzegania postanowień w nim zawartych od momentu podjęcia pierwszej czynności w interfejsie aplikacji.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-border">
          <h2 className="text-lg sm:text-xl font-black text-content tracking-tight">
            § 2. Warunki Świadczenia Usług
          </h2>
          <p>
            1. Dostęp do podstawowych funkcjonalności Serwisu – obejmujących edytor danych zawodowych, podgląd dokumentu na żywo, walidację ATS oraz eksport do formatów PDF i JSON – jest nieodpłatny i nie wymaga uprzedniej rejestracji w systemie.
          </p>
          <p>
            2. Do prawidłowego korzystania z Serwisu wymagane jest posiadanie standardowej, aktualnej przeglądarki internetowej z włączoną obsługą języka JavaScript oraz mechanizmu Local Storage, a także dostęp do sieci Internet na czas kompilacji pliku wyjściowego.
          </p>
          <p>
            3. Zabrania się wykorzystywania Serwisu w sposób sprzeczny z prawem, w tym do generowania dokumentów zawierających treści fałszywe, naruszające dobra osobiste osób trzecich lub zakażone złośliwym oprogramowaniem.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-border">
          <h2 className="text-lg sm:text-xl font-black text-content tracking-tight">
            § 3. Własność Intelektualna i Dane Kandydatów
          </h2>
          <p>
            1. Wszelkie prawa autorskie do treści i informacji wprowadzanych przez użytkownika do formularza życiorysu (w tym historia kariery, podsumowania zawodowe, dane kontaktowe) pozostają wyłączną własnością użytkownika.
          </p>
          <p>
            2. Użytkownik zachowuje pełne i nieograniczone prawo do dysponowania wygenerowanymi plikami w formacie PDF oraz wyeksportowanymi strukturami JSON w celach prywatnych, komercyjnych oraz rekrutacyjnych.
          </p>
          <p>
            3. Kod źródłowy aplikacji, interfejs graficzny, silnik walidacji oraz szablony Typst stanowią własność intelektualną twórców Serwisu i są chronione przepisami prawa autorskiego.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-border">
          <h2 className="text-lg sm:text-xl font-black text-content tracking-tight">
            § 4. Wyłączenie Odpowiedzialności (Disclaimer)
          </h2>
          <p>
            1. Serwis jest udostępniany w stanie „taki, jaki jest” (as is), bez jakichkolwiek gwarancji wyraźnych lub dorozumianych, w tym gwarancji przydatności do określonego celu handlowego lub rekrutacyjnego.
          </p>
          <p>
            2. Twórcy Serwisu dokładają najwyższej staranności, aby generowane pliki PDF były w 100% czytelne i zgodne ze standardami współczesnych systemów ATS (takich jak Workday, Taleo czy Greenhouse). Z uwagi jednak na zamknięty charakter i ciągłe modyfikacje algorytmów rekrutacyjnych stosowanych przez podmioty trzecie, twórcy nie gwarantują, że wygenerowany dokument nie zostanie odrzucony w konkretnym procesie rekrutacyjnym.
          </p>
          <p>
            3. Administrator nie ponosi odpowiedzialności za decyzje podejmowane przez pracodawców i rekruterów na podstawie dokumentów wygenerowanych za pomocą Serwisu, ani za ewentualne utracone korzyści użytkownika.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-border">
          <h2 className="text-lg sm:text-xl font-black text-content tracking-tight">
            § 5. Postanowienia Końcowe
          </h2>
          <p>
            1. Administrator zastrzega sobie prawo do czasowego zawieszenia funkcjonowania Serwisu w celach konserwacyjnych, modernizacyjnych lub w związku z aktualizacją infrastruktury serwerowej.
          </p>
          <p>
            2. W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają właściwe przepisy prawa powszechnie obowiązującego, w szczególności przepisy Kodeksu Cywilnego oraz ustawy o świadczeniu usług drogą elektroniczną.
          </p>
        </section>
      </div>
    </SubpageLayout>
  );
}

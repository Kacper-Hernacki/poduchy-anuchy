import React from 'react';
import './Cookies.scss';

function Cookies() {
  return (
    <div className="cookies">
      <h1>Polityka plików “cookies” serwisu Poduchy Anuchy.</h1>
      <p className="cookies__point">
        1. Poprzez piki “cookies” należy rozumieć dane informatyczne
        przechowywane w urządzeniach końcowych użytkowników, przeznaczone do
        korzystania ze stron internetowych. W szczególności są to pliki
        tekstowe, zawierające nazwę strony internetowej, z której pochodzą, czas
        przechowywania ich na urządzeniu końcowym oraz unikalny numer.{' '}
      </p>
      <p className="cookies__point">
        2. Serwis nie zbiera w sposób automatyczny żadnych informacji, z
        wyjątkiem informacji zawartych w plikach cookies.
      </p>{' '}
      <p className="cookies__point">
        {' '}
        3. Pliki cookies przeznaczone są do korzystania ze stron serwisu.
        Operator wykorzystuje te pliki do:{' '}
        <p>
          a) możliwości logowania i utrzymywania sesji użytkownika na każdej
          kolejnej stronie serwisu
        </p>{' '}
        <p>
          b) dopasowania zawartości strony internetowej do indywidualnych
          preferencji użytkownika, przede wszystkim pliki te rozpoznają jego
          urządzenie, aby zgodnie z jego preferencjami wyświetlić stronę
        </p>
        <p>
          {' '}
          c) do tworzenia anonimowych statystyk z wyłączeniem możliwości
          identyfikacji użytkownika.{' '}
        </p>
      </p>
      <p className="cookies__point">
        4. Pliki cookies wykorzystywane przez partnerów operatora strony
        internetowej, w tym w szczególności użytkowników strony internetowej,
        podlegają ich własnej polityce prywatności.{' '}
      </p>
      <p className="cookies__point">
        {' '}
        5. W trosce o bezpieczeństwo powierzonych nam danych opracowaliśmy
        wewnętrzne procedury i zalecenia, które mają zapobiec udostępnieniu
        danych osobom nieupoważnionym. Kontrolujemy ich wykonywanie i stale
        sprawdzamy ich zgodność z odpowiednimi aktami prawnymi - ustawą o
        ochronie danych osobowych, ustawą o świadczeniu usług drogą
        elektroniczną, a także wszelkiego rodzaju aktach wykonawczych i aktach
        prawa wspólnotowego
      </p>
      <p className="cookies__point">
        {' '}
        6. Standardowo oprogramowanie służące do przeglądania stron
        internetowych domyślnie dopuszcza umieszczanie plików cookies na
        urządzeniu końcowym Użytkownika. Ustawienia te mogą zostać zmienione
        przez Użytkownika w taki sposób, aby blokować automatyczną obsługę
        “cookies” w ustawieniach przeglądarki internetowej bądź informować o ich
        każdorazowym przesłaniu na urządzenia użytkownika.{' '}
      </p>
      <p className="cookies__point">
        {' '}
        7. Użytkownicy Serwisu mogą dokonać w każdym czasie zmiany ustawień
        dotyczących plików cookies. Szczegółowe informacje o możliwości i
        sposobach obsługi plików cookies dostępne są w ustawieniach
        oprogramowania (przeglądarki internetowej). Przykładowe opcje edytowania
        w popularnych przeglądarkach: - Mozilla Firefox:
        www.support.mozilla.org/pl/kb/ciasteczka - Internet Explorer:
        www.support.microsoft.com/kb/278835/pl - Google Chrome:
        www.support.google.com/chrome/bin/answer.py?hl=pl&answer=95647 - Safari:
        www.safari.helpmax.net/pl/oszczedzanie-czasu/blokowanie-zawartosci/
      </p>
      <p className="cookies__point">
        {' '}
        8. Operator Serwisu informuje, że zmiany ustawień w przeglądarce
        internetowej użytkownika mogą uniemożliwić poprawne działanie Stron
        Internetowych.
      </p>
    </div>
  );
}

export default Cookies;

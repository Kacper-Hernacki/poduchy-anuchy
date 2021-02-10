import React from 'react';

export default function Header() {
  return (
    <header>
      <div className="header-inner">
        <div className="logo">Poduchy Anuchy</div>
        <nav>
          <ul>
            <li>
              <a href="/">Strona Główna</a>
            </li>
            <li>
              <a href="/">O mnie</a>
            </li>
            <li>
              <a href="/">Produkty</a>
            </li>
            <li>
              <a href="/">Jak Zamówić</a>
            </li>
            <li className="btn">
              <a href="/">Kontakt</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

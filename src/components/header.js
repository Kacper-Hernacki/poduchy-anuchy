import React from 'react';

export default function Header() {
  return (
    <header>
      <div className="header-inner">
        <div className="logo">Poduchy&nbsp;Anuchy</div>
        <nav>
          <ul>
            <li>
              <a href="/">Strona&nbsp;Główna</a>
            </li>
            <li>
              <a href="/">O&nbsp;mnie</a>
            </li>
            <li>
              <a href="/">Produkty</a>
            </li>
            <li>
              <a href="/">Jak&nbsp;Zamówić</a>
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

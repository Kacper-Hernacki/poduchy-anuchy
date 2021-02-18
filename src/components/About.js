import React from 'react';
import './About.scss';
import pillow from '../images/BRł.png';

function About() {
  return (
    <div className="about">
      <h1>O mnie</h1>
      <div className="about__container">
        <div className="about__left">
          <img src={pillow} alt="" srcset="" />
        </div>

        <div className="about__right">
          <p>Robótki na drutach towarzyszą mi od dzieciństwa.</p>
          <p>
            Dziergała moja prababcia, potem babcia, mama i teraz to moja kolej,
            by kontynuować tą tradycję, dziedzictwo. Dzierganie przerodziło się
            w pasję. Z tej pasji powstały oferowane produkty i wciąż powstają
            nowe.
          </p>
          <p>
            Jeśli masz jakiś pomysł na wyrób dziergany - napisz, wykreuję go z
            wełny lub sznurka specjalnie dla Ciebie.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;

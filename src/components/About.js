import React from 'react';
import './About.scss';
import pillow from '../images/BRł.png';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="about">
      <h1>O mnie</h1>
      <div className="about__container">
        <div className="about__right">
          <p>Robótki na drutach towarzyszą mi od dzieciństwa.</p>
          <p>
            Dziergała moja prababcia, potem babcia, mama i&nbsp;teraz to moja
            kolej, by kontynuować tą tradycję. Dzierganie przerodziło się w
            pasję. Z tej pasji powstały oferowane produkty i&nbsp;wciąż powstają
            nowe.
          </p>
          <p className="about__rightContact">
            Jeśli masz jakiś pomysł na wyrób dziergany - napisz, wykreuję go z
            wełny lub sznurka specjalnie dla Ciebie.
          </p>
          <Link to="/kontakt">
            <button href="#products">Napisz teraz</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;

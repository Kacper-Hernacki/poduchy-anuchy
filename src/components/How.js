import React from 'react';
import './How.scss';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import BrushIcon from '@material-ui/icons/Brush';

function How() {
  return (
    <div className="how">
      <h1>Jak Zamówić?</h1>
      <div className="how__container">
        {' '}
        <div className="how__steps">
          <CheckCircleOutlineIcon />
          <p>1. Wybierz produkt</p>
        </div>
        <div className="how__steps">
          <MailOutlineIcon />
          <p>2. Napisz do mnie maila z danymi produktu i wysyłki</p>
        </div>
        <div className="how__steps">
          <HourglassEmptyIcon />
          <p>3. Czekaj na potwierdzenie</p>
        </div>
      </div>
      <h2>Lub</h2>
      <div className="how__container">
        <div className="how__steps">
          <BrushIcon />
          <p>
            Wyślij mi swój unikalny pomysł, a po konsultacji zrealizuję go dla
            Ciebie
          </p>
        </div>
      </div>
    </div>
  );
}

export default How;

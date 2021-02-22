import React from 'react';
import './How.scss';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

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
    </div>
  );
}

export default How;

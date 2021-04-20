import React from 'react';
import './How.scss';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import BrushIcon from '@material-ui/icons/Brush';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import WebIcon from '@material-ui/icons/Web';

function How() {
  return (
    <div className="how">
      <h1>Jak Zamówić?</h1>
      <div className="how__externalContainer">
        <div className="how__container">
          <h2>I sposób</h2>
          <div className="how__stepsContainer">
            <div className="how__steps">
              <ShoppingBasketIcon />
              <p>1. Dodaj produkt do koszyka</p>
            </div>
            <div className="how__steps">
              <WebIcon />
              <p>2. Wybierz spsób płatności na stronie</p>
            </div>
          </div>
        </div>
        <div className="how__container">
          <h2>II sposób</h2>
          <div className="how__stepsContainer">
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
            <div className="how__steps">
              <CreditCardIcon />
              <p>4. Zrób przelew na podane konto</p>
            </div>
          </div>
        </div>
        <div className="how__container">
          <h2>III sposób</h2>
          <div className="how__stepsContainer">
            <div className="how__steps">
              <BrushIcon />
              <p>
                Wyślij mi swój unikalny pomysł, a po konsultacji zrealizuję go
                dla Ciebie
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default How;

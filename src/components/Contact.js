import React from 'react';
import './Contact.scss';

function Contact() {
  return (
    <div className="contact">
      <h1>Kontakt</h1>
      <div className="contact__container">
        <div className="contact__row">
          <h3>Imię</h3>
          <input type="text" placeholder="Imię" />
        </div>
        <div className="contact__row">
          <h3>Adres e-mail</h3>
          <input type="email" placeholder="adres e-mail" />
        </div>
        <div className="contact__row">
          <h3>Wiadomość</h3>
          <textarea
            name="message"
            placeholder="wiadomość"
            rows="5"
            id=""
            required></textarea>
        </div>
        <button>Wyślij</button>
      </div>
    </div>
  );
}

export default Contact;

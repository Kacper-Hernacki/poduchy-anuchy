import React from 'react';
import './Contact.scss';
import emailjs from 'emailjs-com';

function Contact() {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_ap434db',
        'template_7ao3d9t',
        e.target,
        'user_Y91RK2CL5KNadDdb5L9Qo'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }

  return (
    <div className="contact">
      <h1>Kontakt</h1>
      <form onSubmit={sendEmail} className="contact__container">
        <div className="contact__row">
          <h3>Imię</h3>
          <input type="text" placeholder="Imię" name="name" />
        </div>
        <div className="contact__row">
          <h3>Adres e-mail</h3>
          <input type="email" placeholder="adres e-mail" name="email" />
        </div>
        <div className="contact__row">
          <h3>Wiadomość</h3>
          <textarea
            name="message"
            placeholder="wiadomość"
            rows="2"
            id=""
            required></textarea>
        </div>
        <button type="submit">Wyślij</button>
      </form>
    </div>
  );
}

export default Contact;

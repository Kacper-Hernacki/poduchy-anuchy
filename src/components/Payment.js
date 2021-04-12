import React from 'react';
import './Payment.scss';
import { useStateValue } from '../StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link } from 'react-router-dom';

function Payment() {
  const [{ basket }] = useStateValue();

  return (
    <div className="payment">
      <h1>Zamówienie</h1>
      <div className="payment__container">
        <div className="payment__section">
          <div className="payment__title">
            <h2>Adres dostawy</h2>
          </div>
          <div className="payment__address">
            <input type="text" placeholder="Imię" />
            <input type="text" placeholder="Nazwisko" />
            <input type="email" placeholder="e-mail" />
            <input type="text" placeholder="Ulica" />
            <input type="text" placeholder="Kod pocztowy" />
            <input type="text" placeholder="Miasto" />
            <input type="text" placeholder="Nr telefonu" />
          </div>
          <Link to="/payment">
            {' '}
            <button>Zapłać</button>
          </Link>
        </div>
        <div className="payment__section">
          <h2>Przegląd przedmiotów</h2>
          <div className="payment__itemz">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

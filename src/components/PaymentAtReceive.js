import React, { useState } from 'react';
import { useStateValue } from '../StateProvider';
import CheckoutProduct from './CheckoutProduct';
import './PaymentAtReceive.scss';
import { db, firebase } from '../firebase';
import { useHistory } from 'react-router-dom';

function PaymentAtReceive() {
  const [{ basket }, dispatch] = useStateValue();
  const history = useHistory();
  //form inputs
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mail, setMail] = useState('');
  const [street, setStreet] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const paymentCashOnDelivery = () => {
    if (
      name &&
      lastName &&
      mail &&
      street &&
      zipCode &&
      city &&
      phoneNumber &&
      basket
    ) {
      basket.forEach((product) => {
        dispatch({
          type: 'ADD_TO_ORDER',
          item: {
            id: product.id,
            title: product.title,
            image: product.image,
            price: parseInt(product.price),
            description: product.description,
            collection: product.collectionId,
          },
        });
      });

      db.collection('bought').add({
        products: basket,
        data: [name, lastName, mail, street, zipCode, city, phoneNumber],
      });

      history.replace('/order');

      // deleting bought products

      basket.forEach((item) => {
        db.collection('products')
          .doc('xVN6XLNCssO15UaMb8IymQ2f1as2')
          .collection(`${item.collection}`)
          .doc(item.id)
          .update({
            amount: firebase.firestore.FieldValue.increment(-1),
          });
      });

      dispatch({
        type: 'EMPTY_BASKET',
      });
    }
  };

  return (
    <div className="paymentAtReceive">
      <h1>Płatność przy Odbiorze</h1>
      <div className="payment__container">
        <div className="payment__section">
          <div className="payment__title">
            <h2>Dane dla Dostawcy</h2>
          </div>
          <div className="payment__address">
            <input
              type="text"
              placeholder="Imię"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
            <input
              type="text"
              placeholder="Nazwisko"
              onChange={(event) => setLastName(event.target.value)}
              value={lastName}
            />
            <input
              type="email"
              placeholder="e-mail"
              onChange={(event) => setMail(event.target.value)}
              value={mail}
            />
            <input
              type="text"
              placeholder="Ulica"
              onChange={(event) => setStreet(event.target.value)}
              value={street}
            />
            <input
              type="text"
              placeholder="Kod pocztowy"
              onChange={(event) => setZipCode(event.target.value)}
              value={zipCode}
            />
            <input
              type="text"
              placeholder="Miasto"
              onChange={(event) => setCity(event.target.value)}
              value={city}
            />
            <input
              type="text"
              placeholder="Nr telefonu"
              onChange={(event) => setPhoneNumber(event.target.value)}
              value={phoneNumber}
            />
          </div>

          <button onClick={paymentCashOnDelivery}>Zapłać</button>
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
                buttonFalse={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentAtReceive;

import React, { useEffect, useState } from 'react';
import './PaymentForm.scss';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../reducer';
import { useStateValue } from '../StateProvider';
import axios from './axios';
import { useHistory } from 'react-router-dom';
import { db, firebase } from '../firebase';
import { getDefaultNormalizer } from '@testing-library/dom';
import CheckoutProduct from './CheckoutProduct';

function PaymentForm() {
  const [{ basket, order }, dispatch] = useStateValue();

  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [clientSecret, setClientSecret] = useState(true);

  const [product, setProduct] = useState(null);

  //form inputs
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mail, setMail] = useState('');
  const [street, setStreet] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // generate stripe secret to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#313b3f',
        fontFamily: 'Courgette, cursive',
        height: '30px',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        iconColor: '#fa755a',
      },
    },
  };

  console.log('the secret is >>>>>', clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        setSucceeded(true);
        setError(null);
        setProcessing(false);

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
          price: getBasketTotal(basket),
          data: [name, lastName, mail, street, zipCode, city, phoneNumber],
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        history.replace('/order');

        console.table(basket);

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
      });
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  return (
    <div className="paymentForm">
      <div className="payment__container">
        <div className="payment__section">
          <div className="payment__title">
            <h2>Dane dla Dostawcy</h2>
          </div>
          <div className="payment__address">
            <input
              className="input__paymentAddress"
              type="text"
              placeholder="Imię"
              onChange={(event) => setName(event.target.value)}
              value={name}
              required
            />
            <input
              className="input__paymentAddress"
              type="text"
              placeholder="Nazwisko"
              onChange={(event) => setLastName(event.target.value)}
              value={lastName}
            />
            <input
              className="input__paymentAddress"
              type="email"
              placeholder="e-mail"
              onChange={(event) => setMail(event.target.value)}
              value={mail}
            />
            <input
              className="input__paymentAddress"
              type="text"
              placeholder="Ulica"
              onChange={(event) => setStreet(event.target.value)}
              value={street}
            />
            <input
              className="input__paymentAddress"
              type="text"
              placeholder="Kod pocztowy"
              onChange={(event) => setZipCode(event.target.value)}
              value={zipCode}
            />
            <input
              className="input__paymentAddress"
              type="text"
              placeholder="Miasto"
              onChange={(event) => setCity(event.target.value)}
              value={city}
            />
            <input
              className="input__paymentAddress"
              type="text"
              placeholder="Nr telefonu"
              onChange={(event) => setPhoneNumber(event.target.value)}
              value={phoneNumber}
            />
          </div>
          <h2 className="card__details">Dane Karty</h2>
          <form onSubmit={handleSubmit}>
            <CardElement
              options={CARD_ELEMENT_OPTIONS}
              className="cardElement"
              onChange={handleChange}
            />
            <div className="payment__priceContainer">
              <CurrencyFormat
                renderText={(value) => (
                  <h3 className="amountToPay">Suma do zapłaty: {value}</h3>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'pln '}
              />

              {/* {name &&
                lastName &&
                mail &&
                street &&
                zipCode &&
                city &&
                phoneNumber && ( */}
              <button disabled={processing || disabled || succeeded}>
                <span>
                  {processing ? (
                    <p>Przetwarzanie</p>
                  ) : (
                    `Zapłać ${getBasketTotal(basket)} zł`
                  )}
                </span>
              </button>
              {/* )} */}
            </div>

            {/* Error */}
            {error && <div>{error}</div>}
          </form>
        </div>
        <div className="payment__sectionRight">
          <h2>Przegląd przedmiotów</h2>
          <div className="payment__items">
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

export default PaymentForm;

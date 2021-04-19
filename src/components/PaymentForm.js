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

  const card_element_options = {
    style: {
      base: {
        paddingLeft: '12px',
        height: '80px',
        width: '80% !important',
        color: '#32325d',
        marginTop: '40px',
        fontSize: '36px',
        backgroundColor: 'rgb(220, 220, 228)',
        border: '1px solid #2c2c2c',
        borderRadius: '20px',
        fontFamily: 'Courgette, cursive',
        '::placeholder': {
          color: '#2e2c2c',
          fontSize: '26px',
        },
      },
    },
  };

  console.log('the secret is >>>>>', clientSecret);

  const handleSubmit = async (event) => {
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
            data: [name, lastName, mail, street, zipCode, city, phoneNumber],
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
    }
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  return (
    <div className="paymentForm">
      <h1>Płatność</h1>

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

      <form onSubmit={handleSubmit}>
        <CardElement
          options={card_element_options}
          className="cardElement"
          onChange={handleChange}
        />
        <div className="payment__priceContainer">
          <CurrencyFormat
            renderText={(value) => <h3>Suma do zapłaty: {value}</h3>}
            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'pln '}
          />
          <button disabled={processing || disabled || succeeded}>
            <span>{processing ? <p>Przetwarzanie</p> : 'Kup teraz'}</span>
          </button>
        </div>

        {/* Error */}
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default PaymentForm;

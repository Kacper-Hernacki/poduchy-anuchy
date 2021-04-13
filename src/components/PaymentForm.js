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
      <h1>Płatność</h1>

      <form onSubmit={handleSubmit}>
        <CardElement onChange={handleChange} />
        <div className="payment__priceContainer">
          <CurrencyFormat
            renderText={(value) => <h3>Suma do zapłaty: {value}</h3>}
            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'pln'}
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

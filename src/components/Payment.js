import React from 'react';
import './Payment.scss';
import { useStateValue } from '../StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link } from 'react-router-dom';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';

function Payment() {
  const [{ basket }] = useStateValue();

  return (
    <div className="payment">
      <h1>Zamówienie</h1>
      <div className="payment__containerButtons">
        {' '}
        <Link to="/paymentAtReceive">
          {' '}
          <button>
            <MarkunreadMailboxIcon />
            Zapłać przy odbiorze
          </button>
        </Link>
        <Link to="/payment">
          <button>
            <CreditCardIcon />
            Zapłać teraz kartą
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Payment;

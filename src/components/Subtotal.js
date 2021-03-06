import React from 'react';
import './Subtotal.scss';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../StateProvider';
import { getBasketTotal } from '../reducer';

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="subtotal">
      <CurrencyFormat
        className="price"
        renderText={(value) => (
          <>
            <p>
              Suma ({basket.length} produktów): <strong>{` ${value}`}</strong>
            </p>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'zł '}
      />
      <button>Przejdź do zapłaty</button>
    </div>
  );
}

export default Subtotal;

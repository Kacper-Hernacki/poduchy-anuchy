import React from 'react';
import './Checkout.scss';
import { useStateValue } from '../StateProvider';
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';

function Checkout() {
  const [{ basket }] = useStateValue();

  return (
    <div className="checkout">
      {basket?.length === 0 ? (
        <div className="checkout__empty">
          <h2>Twój kosz jest pusty</h2>
          <p>Nie masz żadnego produktu dodanego do koszyka.</p>
        </div>
      ) : (
        <div className="checkout__left">
          <h2 className="checkout__title">Twój kosz</h2>
          {basket?.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      )}

      {basket.length > 0 && (
        <div className="checkout__right">
          <Subtotal />
        </div>
      )}
    </div>
  );
}

export default Checkout;

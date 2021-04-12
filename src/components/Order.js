import React from 'react';
import './Order.scss';
import { useStateValue } from '../StateProvider';
import CheckoutProduct from './CheckoutProduct';
function Order() {
  const [{ basket }] = useStateValue();
  return (
    <div className="order">
      <h1>Twoje Zamówienie</h1>
      <div className="order__container">
        {' '}
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
  );
}

export default Order;

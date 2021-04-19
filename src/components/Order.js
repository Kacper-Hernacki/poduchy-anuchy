import React from 'react';
import './Order.scss';
import { useStateValue } from '../StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link } from 'react-router-dom';
function Order() {
  const [{ basket, order }] = useStateValue();

  console.table(order);
  return (
    <div className="order">
      <h1>Twoje Zamówienie</h1>
      <div className="order__container">
        {' '}
        {order.map((item) => (
          <CheckoutProduct
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            buttonFalse={false}
          />
        ))}
      </div>
      <Link to="/">
        <button>Wróć do strony głównej</button>
      </Link>
    </div>
  );
}

export default Order;

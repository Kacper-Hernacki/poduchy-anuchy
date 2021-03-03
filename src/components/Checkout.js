import React from 'react';
import './Checkout.scss';
import { useStateValue } from '../StateProvider';
import CheckoutProduct from './CheckoutProduct';

function Checkout() {
  const [{ basket }] = useStateValue();

  return (
    <div className="checkout">
      {basket?.length === 0 ? (
        <div>
          <h2>Your shopping basket is empty</h2>
          <p>
            You have no items in your basket. To buy one or more, click "Add to
            basket" next to the item.
          </p>
        </div>
      ) : (
        <div>
          <h2 className="checkout__title">Your Shopping Basket</h2>
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
    </div>
  );
}

export default Checkout;

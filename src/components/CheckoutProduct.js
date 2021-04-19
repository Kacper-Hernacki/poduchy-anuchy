import React from 'react';
import './CheckoutProduct.scss';
import { useStateValue } from '../StateProvider';

function CheckoutProduct({ id, title, image, price, rating, buttonFalse }) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id,
    });
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt="" />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>

        <p className="checkoutProduct__price">
          <small>zł </small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating"></div>
        {buttonFalse !== false && (
          <button
            className="checkoutProduct__button"
            onClick={removeFromBasket}>
            Usuń z kosza
          </button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;

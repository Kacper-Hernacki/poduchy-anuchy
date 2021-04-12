import React, { useEffect, useState } from 'react';
import { useStateValue } from '../StateProvider';
import './Product.scss';
import { db, auth } from '../firebase';
import { Link } from 'react-router-dom';

function Product({
  title,
  image,
  description,
  price,
  id,
  amount,
  collectionId,
}) {
  const [{ user }, dispatch] = useStateValue();
  const [added, setAdded] = useState(false);
  const [numberOfItems, setNumberOfItems] = useState(amount);

  const addToBasket = () => {
    if (numberOfItems > 0 && user.uid) {
      setNumberOfItems(amount - 1);
      console.log('adddd permission');
      dispatch({
        type: 'ADD_TO_BASKET',
        item: {
          id: id,
          title: title,
          image: image,
          price: parseInt(price),
          description: description,
          user: user.uid,
          collection: collectionId,
          // items: parseInt(items),
        },
      });
      setAdded(true);

      db.collection('products')
        .doc('xVN6XLNCssO15UaMb8IymQ2f1as2')
        .collection(`${collectionId}`)
        .doc(id)
        .update({
          amount: amount - 1,
        });

      db.collection('basket')
        .doc('8RMPD6Q2f36iOvpJWEjP')
        .collection('users')
        .doc(user.uid)
        .collection(`${collectionId}`)
        .add({
          caption: title,
          id: id,
          price: price,
          amount: 1,
        });
    }
  };

  return (
    <div className="product">
      {' '}
      <div className="product__left">
        <img src={image} alt="" />
      </div>
      <div className="product__right">
        <h2>{title}</h2>
        <h3>{description}</h3>
        <p>Ilość sztuk dostępnych sztuk: {amount}</p>
        <div className="product__price">
          <h2>Cena: {price} zł</h2>
        </div>

        {numberOfItems > 0 && (
          <button onClick={addToBasket} className="product__add">
            Dodaj do koszyka
          </button>
        )}

        {numberOfItems === 0 && (
          <h3>
            Ten produkt jest chwilowo niedostępny, jednakże możesz napisać do
            mnie, a wykonam go w pierwszej kolejności.
          </h3>
        )}

        {numberOfItems === 0 && (
          <Link to="/kontakt">
            {' '}
            <button onClick={addToBasket} className="product__email">
              Napisz do mnie
            </button>
          </Link>
        )}

        {added === true && (
          <div className="product__added">Dodano Produkt do koszyka</div>
        )}
      </div>
    </div>
  );
}

export default Product;

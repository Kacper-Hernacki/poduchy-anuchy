import React, { useEffect, useState } from 'react';
import { useStateValue } from '../StateProvider';
import './Product.scss';
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
  const [{ basket }, dispatch] = useStateValue();
  const [added, setAdded] = useState(false);
  const [numberOfItems, setNumberOfItems] = useState(parseInt(amount));

  useEffect(() => {
    const list = [];
    basket.forEach((item) => {
      if (item.id === id) {
        list.push(item.id);

        setNumberOfItems(parseInt(amount) - list.length);
      }
    });

    console.table(list);
  }, [basket, id, amount]);

  const setTimeForDiv = () => {
    setAdded(false);
  };

  const addToBasket = () => {
    setAdded(true);

    setTimeout(setTimeForDiv, 3000);

    if (numberOfItems > 0) {
      dispatch({
        type: 'ADD_TO_BASKET',
        item: {
          id: id,
          title: title,
          image: image,
          price: parseInt(price),
          description: description,
          collection: collectionId,
        },
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
        <p>Ilość sztuk dostępnych sztuk: {numberOfItems}</p>
        <div className="product__price">
          <h2>{price} zł</h2>
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

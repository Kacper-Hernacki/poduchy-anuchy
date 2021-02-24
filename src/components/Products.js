import React from 'react';
import './Products.scss';
import pillow from '../images/BRł.png';

function Products() {
  return (
    <div id="products" className="products">
      <h1>Produkty</h1>
      <h2>
        Poniżej zostały przedstawione produkty, które obecnie są na stanie
        magazynu:
      </h2>
      <div className="products__container">
        {' '}
        <div className="products__left">
          <img src={pillow} alt="" srcset="" />
        </div>
        <div className="products__right">
          <h2>Poduszka Dziergana</h2>
          <h3>Dostępne kolory</h3>
          <div className="products__price">
            <h2>Cena: 60 zł</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;

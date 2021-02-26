import React, { useEffect, useState } from 'react';
import './Products.scss';
import pillow from '../images/BRł.png';
import pillow1 from '../pillows__products/pillow__beige.png';
import pillow2 from '../pillows__products/pillow__black.png';
import pillow3 from '../pillows__products/pillow__blue.png';
import pillow4 from '../pillows__products/pillow__green.png';
import pillow5 from '../pillows__products/pillow__grey.png';
import pillow6 from '../pillows__products/pillow__purple.png';

import colors from '../img/products/product-12.jpg';

function Products() {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPillow, setSelectedPillow] = useState('pillow');

  const selectProduct = (e) => {
    console.log(e.target.value);

    setSelectedColor(e.target.value);
  };

  useEffect(() => {
    switch (selectedColor) {
      case 'purple':
        return setSelectedPillow(pillow6);
      case 'blue':
        return setSelectedPillow(pillow3);
      case 'beige':
        return setSelectedPillow(pillow1);
      case 'black':
        return setSelectedPillow(pillow2);
      case 'green':
        return setSelectedPillow(pillow4);
      case 'grey':
        return setSelectedPillow(pillow5);
      default:
        return setSelectedPillow(pillow);
    }
  });

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
          <img src={selectedPillow} alt="" srcset="" />
        </div>
        <div className="products__right">
          <h2>Poduszka Dziergana</h2>
          <h3>Dostępne kolory i tekstura</h3>
          <div className="colors">
            <button
              onClick={selectProduct}
              value="beige"
              className="colors__beige"></button>
            <button
              onClick={selectProduct}
              value="black"
              className="colors__black"></button>
            <button
              onClick={selectProduct}
              value="blue"
              className="colors__blue"></button>
            <button
              onClick={selectProduct}
              value="green"
              className="colors__green"></button>
            <button
              onClick={selectProduct}
              value="grey"
              className="colors__grey"></button>
            <button
              onClick={selectProduct}
              value="purple"
              className="colors__purple"></button>
          </div>
          <div className="products__price">
            <h2>Cena: 60 zł</h2>
          </div>
        </div>
      </div>
      <h2>
        Kolory, które możesz uwzględnić przy zamówieniu swojego unikalnego
        produktu dzierganego.
      </h2>
      <div className="products__container">
        <img className="products__colorImg" src={colors} alt="" />
      </div>
    </div>
  );
}

export default Products;

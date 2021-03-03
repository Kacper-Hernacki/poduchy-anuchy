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
import { useStateValue } from '../StateProvider';

function Products() {
  const [{}, dispatch] = useStateValue();
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPillow, setSelectedPillow] = useState('pillow');
  const [selectedId, setSelectedId] = useState(0);
  const [selectedTitle, setSelectedTitle] = useState('poduszka dziergana');
  const [selectedPrice, setSelectedPrice] = useState(119.99);

  const selectProduct = (e) => {
    console.log(e.target.value);

    setSelectedColor(e.target.value);
  };

  useEffect(() => {
    switch (selectedColor) {
      case 'purple':
        return (
          setSelectedPillow(pillow6),
          setSelectedId(1),
          setSelectedTitle('Poduszka dziergana "Bordowa"'),
          setSelectedPrice(99.99)
        );
      case 'blue':
        return (
          setSelectedPillow(pillow3),
          setSelectedId(2),
          setSelectedTitle('Poduszka dziergana "niebieska"'),
          setSelectedPrice(99.99)
        );
      case 'beige':
        return (
          setSelectedPillow(pillow1),
          setSelectedId(3),
          setSelectedTitle('Poduszka dziergana "beżowa"'),
          setSelectedPrice(99.99)
        );
      case 'black':
        return (
          setSelectedPillow(pillow2),
          setSelectedId(4),
          setSelectedTitle('Poduszka dziergana "czarna"'),
          setSelectedPrice(99.99)
        );
      case 'green':
        return (
          setSelectedPillow(pillow4),
          setSelectedId(5),
          setSelectedTitle('Poduszka dziergana "zielona"'),
          setSelectedPrice(99.99)
        );
      case 'grey':
        return (
          setSelectedPillow(pillow5),
          setSelectedId(6),
          setSelectedTitle('Poduszka dziergana "szara"'),
          setSelectedPrice(99.99)
        );
      default:
        return (
          setSelectedPillow(pillow),
          setSelectedId(0),
          setSelectedTitle('Poduszka dziergana "biała"'),
          setSelectedPrice(99.99)
        );
    }
  });

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: selectedId,
        title: selectedTitle,
        image: selectedPillow,
        price: selectedPrice,
      },
    });
  };

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
          <h2>{selectedTitle}</h2>
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
            <h2>Cena: {selectedPrice} zł</h2>
          </div>
          <button onClick={addToBasket} className="products__add">
            Dodaj do koszyka
          </button>
        </div>
      </div>
      {/* <h2>
        Kolory, które możesz uwzględnić przy zamówieniu swojego unikalnego
        produktu dzierganego.
      </h2>
      <div className="products__container">
        <img className="products__colorImg" src={colors} alt="" />
      </div> */}
    </div>
  );
}

export default Products;

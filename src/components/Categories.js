import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.scss';
import product from '../img/product-1.jpg';
import pillow from '../img/RBT.jpg';
import pillowInside from '../img/pillow-inside.jpg';
import picture from '../img/picture.JPG';

function Categories() {
  return (
    <div className="categories">
      <h1>Kategorie</h1>
      <div className="categories__container">
        <Link to="/products/pillowcases">
          <div className="categories__card">
            <img className="categories__image" src={pillow} alt="" />
            <div className="overlay">
              <div className="text">Poszewki</div>
            </div>
          </div>
        </Link>
        <Link to="/products/others">
          <div className="categories__card">
            <img className="categories__image" src={product} alt="" />
            <div className="overlay">
              <div className="text">koszyczki i&nbsp;inne</div>
            </div>
          </div>
        </Link>
        <Link to="/products/pillows">
          <div className="categories__card">
            <img className="categories__image" src={pillowInside} alt="" />
            <div className="overlay">
              <div className="text">Wypełnienie</div>
            </div>
          </div>
        </Link>
        <Link to="/products/decoupage">
          <div className="categories__card">
            <img className="categories__image" src={picture} alt="" />
            <div className="overlay">
              <div className="text">Ramki Decoupage</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Categories;

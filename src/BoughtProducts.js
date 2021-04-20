import React, { useState } from 'react';
import './BoughtProducts.scss';
import CheckoutProduct from './components/CheckoutProduct';

function BoughtProducts({ key, id, data, products, price, timestamp }) {
  const [name, setName] = useState(data?.[0]);
  const [lastName, setLastName] = useState(data?.[1]);
  const [mail, setMail] = useState(data?.[2]);
  const [street, setStreet] = useState(data?.[3]);
  const [zipCode, setZipCode] = useState(data?.[4]);
  const [city, setCity] = useState(data?.[5]);
  const [phoneNumber, setPhoneNumber] = useState(data?.[6]);

  console.log(name, lastName);

  return (
    <div className="boughtProducts">
      <div className="boughtProducts__date">
        <h3>{new Date(timestamp?.toDate()).toLocaleString()}</h3>
        <h2>Kupujący:</h2>
      </div>

      <div className="boughtProducts__data">
        {' '}
        <h3>
          <p>Imię:</p>
          <span>{name}</span>{' '}
        </h3>
        <h3>
          <p>Nazwisko:</p>
          <span>{lastName}</span>{' '}
        </h3>
        <h3>
          <p> E-mail:</p>
          <span>{mail}</span>{' '}
        </h3>
        <h3>
          <p> Ulica:</p>
          <span>{street}</span>{' '}
        </h3>
        <h3>
          <p>Kod pocztowy:</p> <span>{zipCode}</span>{' '}
        </h3>
        <h3>
          <p>Miasto:</p> <span>{city}</span>{' '}
        </h3>
        <h3>
          <p> Nr telefonu:</p>
          <span>{phoneNumber}</span>{' '}
        </h3>
      </div>
      <div className="boughtProducts__products">
        {products?.map((item) => (
          <CheckoutProduct
            id={item.id}
            image={item.image}
            buttonFalse={false}
            price={item.price}
            title={item.title}
          />
        ))}
      </div>
      <div className="boughtProducts__allPrice">
        <h3>
          Suma: <span>{price}</span> zł{' '}
        </h3>
      </div>
    </div>
  );
}

export default BoughtProducts;

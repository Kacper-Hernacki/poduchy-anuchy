import React, { useEffect, useState } from 'react';

import { useStateValue } from '../StateProvider';
import { db } from '../firebase';
import Product from '../components/Product';
import './Pillows.scss';

function Pillows() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    db.collection('products')
      .doc('xVN6XLNCssO15UaMb8IymQ2f1as2')
      .collection('poduszki')
      .onSnapshot((snapshot) =>
        setProduct(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);
  return (
    <div className="pillows">
      {' '}
      <h1>Poduszki</h1>
      {product?.map(({ id, data }) => (
        <Product
          key={id}
          id={id}
          title={data.caption}
          image={data.imageUrl}
          description={data.description}
          price={data.price}
          amount={data.amount}
          collectionId="poduszki"
        />
      ))}
    </div>
  );
}

export default Pillows;

import React, { useEffect, useState } from 'react';
import { useStateValue } from '../StateProvider';
import { db } from '../firebase';
import Product from '../components/Product';
import './Others.scss';

function Others() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    db.collection('products')
      .doc('xVN6XLNCssO15UaMb8IymQ2f1as2')
      .collection('koszyczki')
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
    <div className="others">
      {' '}
      <h1>Koszyczki i inne</h1>
      {product?.map(({ id, data }) => (
        <Product
          key={id}
          id={id}
          title={data.caption}
          image={data.imageUrl}
          description={data.description}
          amount={data.amount}
          price={data.price}
          collectionId="koszyczki"
        />
      ))}
    </div>
  );
}

export default Others;

import React, { useEffect, useState } from 'react';
import { useStateValue } from '../StateProvider';
import { db, auth } from '../firebase';
import Product from '../components/Product';
import './Decoupage.scss';

function Decoupage() {
  const [{ basket }] = useStateValue();
  const [product, setProduct] = useState(null);


  useEffect(() => {
    db.collection('products')
      .doc('xVN6XLNCssO15UaMb8IymQ2f1as2')
      .collection('decoupage')
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
    <div className="decoupage">
      <h1>Decoupage</h1>
      {product?.map(({ id, data }) => (
        <Product
          key={id}
          id={id}
          title={data.caption}
          image={data.imageUrl}
          description={data.description}
          price={data.price}
          amount={data.amount}
          collectionId="decoupage"
        />
      ))}
    </div>
  );
}

export default Decoupage;

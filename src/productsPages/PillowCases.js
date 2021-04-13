import React, { useEffect, useState } from 'react';
import './PillowCases.scss';
import { useStateValue } from '../StateProvider';
import { db } from '../firebase';
import Product from '../components/Product';

function PillowCases() {
  // const [{ user }] = useStateValue();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    db.collection('products')
      .doc('xVN6XLNCssO15UaMb8IymQ2f1as2')
      .collection('poszewki')
      .onSnapshot((snapshot) =>
        setProduct(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  console.log(product);
  return (
    <div className="pillowCases">
      <h1>Poszewki</h1>

      {product?.map(({ id, data }) => (
        <Product
          key={id}
          id={id}
          title={data.caption}
          image={data.imageUrl}
          description={data.description}
          amount={data.amount}
          price={data.price}
          collectionId="poszewki"
        />
      ))}
    </div>
  );
}

export default PillowCases;

import React, { useEffect, useState } from 'react';
import './Dashboard.scss';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import { storage, db } from './firebase';
import { Button } from '@material-ui/core';
import EditProduct from './EditProduct';

function Dashboard() {
  const [{ user }] = useStateValue();
  const [formData, setFormData] = useState('');

  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);

  const [addMode, setAddMode] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (editMode === true && addMode === false && formData !== '') {
      db.collection('products')
        .doc('xVN6XLNCssO15UaMb8IymQ2f1as2')
        .collection(`${formData}`)
        .onSnapshot((snapshot) =>
          setProduct(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [editMode, addMode, formData]);

  const logout = () => {
    if (user) {
      auth.signOut();
    }
  };

  const add = () => {
    ////
    setAddMode(true);
    setEditMode(false);
    setFormData('');
  };

  const edit = () => {
    ///
    setAddMode(false);
    setEditMode(true);
    setFormData('');
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setFormData(value);
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // progress
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image
            db.collection('products')
              .doc('xVN6XLNCssO15UaMb8IymQ2f1as2')
              .collection(`${formData}`)
              .add({
                caption: caption,
                imageUrl: url,
                amount: parseInt(amount),
                price: parseInt(price),
                description: description,
              });

            setProgress(0);
            setCaption('');
            setImage(null);
            setPrice(0);
            setAmount(0);
          });
      }
    );
  };

  return (
    <div className="dashboard">
      <h1>Panel Administratora</h1>
      <button className="dashboard__logout" onClick={logout}>
        Logout
      </button>
      <div className="dashboard__buttons">
        <button className="dashboard__add" onClick={add}>
          Dodaj
        </button>
        <button className="dashboard__edit" onClick={edit}>
          Edytuj
        </button>
      </div>
      {addMode === true && editMode === false && (
        <div className="dashboard__optionContainer">
          <h2 className="dashboard__addCaption">Dodaj produkt w</h2>
          <div className="dashboard__container">
            <input
              type="radio"
              name="category"
              value="poszewki"
              onChange={handleChange}
            />{' '}
            <h2>Poszewki</h2>
            <input
              type="radio"
              name="category"
              value="poduszki"
              onChange={handleChange}
            />
            <h2>Poduszki</h2>
            <input
              type="radio"
              name="category"
              value="koszyczki"
              onChange={handleChange}
            />
            <h2>Koszyczki i inne</h2>
            <input
              type="radio"
              name="category"
              value="decoupage"
              onChange={handleChange}
            />
            <h2>Decoupage</h2>
          </div>
          {formData !== '' && <p className="choosen">Wybrano: {formData}</p>}

          <div className="imageupload">
            <div className="imageupload__row">
              {' '}
              <h2>Nazwa</h2>
              <input
                type="text"
                placeholder="wpisz nazwę..."
                onChange={(event) => setCaption(event.target.value)}
                value={caption}
              />
              <h2>Opis</h2>
              <input
                type="text"
                placeholder="wpisz opis..."
                onChange={(event) => setDescription(event.target.value)}
                value={description}
              />
            </div>
            <div className="imageupload__row">
              <h2>Ilość produktów</h2>
              <input
                type="number"
                placeholder="Podaj ilość produktów..."
                onChange={(event) => setAmount(event.target.value)}
                value={amount}
              />
              <h2>Cena</h2>
              <input
                type="number"
                step="any"
                placeholder="Podaj cenę..."
                onChange={(event) => setPrice(event.target.value)}
                value={price}
              />
            </div>
            <div className="sumup__row">
              {' '}
              <input type="file" onChange={handleFileChange} />
              <Button className="imageupload__button" onClick={handleUpload}>
                Upload
              </Button>{' '}
            </div>{' '}
            <progress
              className="imageupload__progress"
              value={progress}
              max="100"
            />
          </div>
        </div>
      )}

      {addMode === false && editMode === true && (
        <div className="dashboard__optionContainer">
          <h2 className="dashboard__addCaption">Edytuj produkt w</h2>
          <div className="dashboard__container">
            <input
              type="radio"
              name="category"
              value="poszewki"
              onChange={handleChange}
            />{' '}
            <h2>Poszewki</h2>
            <input
              type="radio"
              name="category"
              value="poduszki"
              onChange={handleChange}
            />
            <h2>Poduszki</h2>
            <input
              type="radio"
              name="category"
              value="koszyczki"
              onChange={handleChange}
            />
            <h2>Koszyczki i inne</h2>
            <input
              type="radio"
              name="category"
              value="decoupage"
              onChange={handleChange}
            />
            <h2>Decoupage</h2>
          </div>
          {formData !== '' && <p className="choosen">Wybrano: {formData}</p>}

          <div className="dashboard__edit">
            {' '}
            {product?.map(({ id, data }) => (
              <EditProduct
                key={id}
                id={id}
                title={data.caption}
                image={data.imageUrl}
                description={data.description}
                price={data.price}
                amount={data.amount}
                collectionId={formData}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

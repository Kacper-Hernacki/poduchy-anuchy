import React, { useState } from 'react';
import './Dashboard.scss';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import { storage, db, firebase } from './firebase';
import { Button } from '@material-ui/core';

function Dashboard() {
  const [{ user }] = useStateValue();
  const [formData, setFormData] = useState('');

  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);

  const logout = () => {
    if (user) {
      auth.signOut();
    }
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
              .doc(user.uid)
              .collection(`${formData}`)
              .add({
                caption: caption,
                imageUrl: url,
                amount: amount,
                price: price,
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
      <h1>Content Managemant System</h1>
      <button onClick={logout}>Logout</button>
      <div className="dashboard__container">
        <h2>Poszewki</h2>
        <input
          type="radio"
          name="category"
          value="poszewki"
          onChange={handleChange}
        />
        <h2>Poduszki</h2>
        <input
          type="radio"
          name="category"
          value="poduszki"
          onChange={handleChange}
        />
        <h2>Koszyczki i inne</h2>
        <input
          type="radio"
          name="category"
          value="koszyczki"
          onChange={handleChange}
        />
        <h2>Decoupage</h2>
        <input
          type="radio"
          name="category"
          value="decoupage"
          onChange={handleChange}
        />
      </div>
      <p>{formData}</p>

      <div className="imageupload">
        <progress
          className="imageupload__progress"
          value={progress}
          max="100"
        />
        <input
          type="text"
          placeholder="wpisz nazwę..."
          onChange={(event) => setCaption(event.target.value)}
          value={caption}
        />
        <input
          type="text"
          placeholder="wpisz nazwę..."
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />
        <h2>Ilość produktów</h2>
        <input
          type="number"
          placeholder="wpisz nazwę..."
          onChange={(event) => setAmount(event.target.value)}
          value={amount}
        />
        <h2>Cena</h2>
        <input
          type="number"
          placeholder="wpisz nazwę..."
          onChange={(event) => setPrice(event.target.value)}
          value={price}
        />
        <input type="file" onChange={handleFileChange} />
        <Button className="imageupload__button" onClick={handleUpload}>
          Upload
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;

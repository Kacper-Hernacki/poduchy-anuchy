import React, { useState } from 'react';
import './EditProduct.scss';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { IconButton } from '@material-ui/core';
import { storage, db } from './firebase';
import { Button } from '@material-ui/core';

function EditProduct({
  title,
  image,
  description,
  price,
  id,
  amount,
  collectionId,
}) {
  const [edit, setEdit] = useState(false);

  const [newCaption, setNewCaption] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newAmount, setNewAmount] = useState(amount);
  const [newPrice, setNewPrice] = useState(price);
  const [progress, setProgress] = useState(0);
  const [newImage, setNewImage] = useState(image);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const editProduct = () => {
    setEdit(true);
  };

  const saveProduct = () => {
    setEdit(false);

    const uploadTask = storage.ref(`images/${newImage.name}`).put(newImage);

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
        storage
          .ref('images')
          .child(newImage.name)
          .getDownloadURL()
          .then((url) => {
            db.collection('products')
              .doc('xVN6XLNCssO15UaMb8IymQ2f1as2')
              .collection(`${collectionId}`)
              .doc(id)
              .update({
                caption: newCaption,
                imageUrl: url,
                amount: parseInt(newAmount),
                price: parseInt(newPrice),
                description: newDescription,
              });

            setNewImage(null);
          });
      }
    );
  };

  return (
    <div className="editProduct">
      <div className="editProduct__left">
        <img src={image} alt="" />
        {edit === true && <input type="file" onChange={handleFileChange} />}
      </div>
      {edit === false && (
        <div className="editProduct__right">
          <h2>{title}</h2>
          <h3>{description}</h3>
          <p>Ilość sztuk dostępnych sztuk: {amount}</p>
          <div className="editProduct__price">
            <h2>Cena: {price} zł</h2>
          </div>
        </div>
      )}
      {edit === true && (
        <div className="editProduct__right">
          <input
            onChange={(event) => setNewCaption(event.target.value)}
            value={newCaption}
            type="text"
            placeholder={title}
          />
          <input
            onChange={(event) => setNewDescription(event.target.value)}
            value={newDescription}
            type="text"
            placeholder={description}
          />
          <input
            onChange={(event) => setNewAmount(event.target.value)}
            value={newAmount}
            type="number"
            placeholder={`ilość: ${amount}`}
          />
          <div className="editProduct__price">
            <input
              onChange={(event) => setNewPrice(event.target.value)}
              value={newPrice}
              type="number"
              placeholder={`cena: ${price}`}
            />
          </div>
        </div>
      )}
      <div className="editProduct__buttons">
        <IconButton>
          <DeleteOutlineIcon
            className="deleteIcon"
            onClick={(event) =>
              db
                .collection('products')
                .doc('xVN6XLNCssO15UaMb8IymQ2f1as2')
                .collection(`${collectionId}`)
                .doc(id)
                .delete()
            }
          />
        </IconButton>
        {edit === false && (
          <IconButton>
            <EditIcon onClick={editProduct} />
          </IconButton>
        )}

        {edit === true && (
          <IconButton>
            <SaveIcon className="saveIcon" onClick={saveProduct} />
          </IconButton>
        )}
      </div>
    </div>
  );
}

export default EditProduct;

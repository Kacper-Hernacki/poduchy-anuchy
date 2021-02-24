import React from 'react';
import './Gallery.scss';
import pillow1 from '../img/CAPP.jpg';
import pillow3 from '../img/CZarna.jpg';
import pillow2 from '../img/DSC_0584.JPG';
import pillow4 from '../img/DSC_0587.JPG';
import pillow5 from '../img/product-1.jpg';
import pillow6 from '../img/SRT.jpg';
import pillow7 from '../img/product-11.jpg';
import pillow8 from '../img/RB.jpg';
import pillow9 from '../img/RBT.jpg';
import pillow10 from '../img/RBT4.jpg';
import pillow11 from '../img/Szara.jpg';
import pillow12 from '../img/ŚRB.jpg';
import pillow13 from '../img/ŚRB2.jpg';
import pillow14 from '../img/TSR.jpg';
import pillow15 from '../img/Turk.jpg';
import pillow16 from '../img/Turk2.jpg';
import pillow17 from '../img/Zielona.jpg';
import pillow18 from '../img/Żółty.jpg';

function Gallery({ setSelectedImg }) {
  return (
    <div className="gallery">
      <h1>Galeria</h1>

      <div className="img-grid">
        <div className="img-wrap" onClick={() => setSelectedImg(pillow1)}>
          <img src={pillow1} alt="" />
        </div>
        <div className="img-wrap" onClick={() => setSelectedImg(pillow3)}>
          <img src={pillow3} alt="" />
        </div>
        <div className="img-wrap" onClick={() => setSelectedImg(pillow2)}>
          <img src={pillow2} alt="" />
        </div>
        <div className="img-wrap" onClick={() => setSelectedImg(pillow4)}>
          <img src={pillow4} alt="" />
        </div>
        <div className="img-wrap" onClick={() => setSelectedImg(pillow5)}>
          <img src={pillow5} alt="" />
        </div>
        <div className="img-wrap" onClick={() => setSelectedImg(pillow6)}>
          <img src={pillow6} alt="" />
        </div>
        <div className="img-wrap" onClick={() => setSelectedImg(pillow7)}>
          <img src={pillow7} alt="" />
        </div>
        <div className="img-wrap" onClick={() => setSelectedImg(pillow8)}>
          <img src={pillow8} alt="" />
        </div>
        <div className="img-wrap" onClick={() => setSelectedImg(pillow9)}>
          <img src={pillow9} alt="" />
        </div>
        <div className="img-wrap" onClick={() => setSelectedImg(pillow10)}>
          <img src={pillow10} alt="" />
        </div>
        <div className="img-wrap" onClick={() => setSelectedImg(pillow11)}>
          <img src={pillow11} alt="" />
        </div>
        <div className="img-wrap" onClick={() => setSelectedImg(pillow12)}>
          <img src={pillow12} alt="" />
        </div>
        <div className="img-wrap" onClick={() => setSelectedImg(pillow13)}>
          <img src={pillow13} alt="" />
        </div>
        <div className="img-wrap" onClick={() => setSelectedImg(pillow14)}>
          <img src={pillow14} alt="" />
        </div>
        <div className="img-wrap" onClick={() => setSelectedImg(pillow15)}>
          <img src={pillow15} alt="" />
        </div>
        <div className="img-wrap" onClick={() => setSelectedImg(pillow16)}>
          <img src={pillow16} alt="" />
        </div>
        <div className="img-wrap" onClick={() => setSelectedImg(pillow17)}>
          <img src={pillow17} alt="" />
        </div>
        <div className="img-wrap" onClick={() => setSelectedImg(pillow18)}>
          <img src={pillow18} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Gallery;

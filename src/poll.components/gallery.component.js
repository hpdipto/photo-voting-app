import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import "../styles/imageGallery.css";

import ImageViewer from "./viewer.component";

// loading proxy from package.json
import proxy from '.././package.json';



// photo gallery source: https://mdbootstrap.com/plugins/jquery/gallery/#filter
function Gallery({ images }) {

    const [modal, setModal] = useState(false);
    const [index, setIndex] = useState(0);


    const openModal = (idx) => {
        setModal(!modal);
        setIndex(idx)
    }

    return (
        <div>
            <div className="gallery">
                {images.map((image, index) => {
                    return (
                        <div key={index} className="mb-3 pics animation all 1" id="photo">
                            <img className="img-fluid" onClick={() => openModal(index)} src={proxy.proxy+image['src']} alt={`image_${index}`} />
                        </div>
                    );
                })}
            </div>

            {modal ? <ImageViewer show={modal} setShow={setModal} images={images} index={index} setIndex={setIndex} /> : null}

        </div>
    );
}

export default Gallery;
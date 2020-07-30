import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import "../styles/imageGallery.css";

// loading proxy from package.json
import proxy from '.././package.json';

import ImageViewer from "./viewer.component";



// photo gallery source: https://mdbootstrap.com/plugins/jquery/gallery/#filter
function Gallery({ imageList }) {

    const [modal, setModal] = useState(false);
    const [index, setIndex] = useState(0);
    const [images, setImages] = useState(imageList);
    // array initialization with 0s: https://stackoverflow.com/a/34104348/9481106
    const [votes, setVotes] = useState(Array(imageList.length).fill(0));


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
                            <img className="img-fluid" onClick={() => openModal(index)} src={proxy.proxy+image['src'].slice(6)} alt={`image_${index}`} />
                        </div>
                    );
                })}
            </div>

            {modal ? <ImageViewer show={modal} setShow={setModal} 
                                  index={index} setIndex={setIndex} 
                                  images={images} setImages={setImages} 
                                  votes={votes} setVotes={setVotes} /> 
                    : null}

        </div>
    );
}

export default Gallery;
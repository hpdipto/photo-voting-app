import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import "../styles/imageViewer.css";

// loading proxy from package.json
import proxy from '.././package.json';

import ModalComponent from "./modal.component";



// photo gallery source: https://mdbootstrap.com/plugins/jquery/gallery/#filter
function ImageViewer({ images }) {

    const [modal, setModal] = useState(false);
    const [imgSrc, setImgSrc] = useState('');


    const openModal = (src) => {
        setModal(!modal);
        setImgSrc(src);
    }

    return (
        <div>
            <div className="gallery">
                {images.map((img, index) => {
                    return (
                        <div key={index} className="mb-3 pics animation all 1" id="photo">
                            <img className="img-fluid" onClick={() => openModal(proxy.proxy+img.slice(6))} src={proxy.proxy+img.slice(6)} />
                        </div>
                    );
                })}
            </div>

            {modal ? <ModalComponent show={modal} setShow={setModal} imgSrc={imgSrc}/> : null}

        </div>
    );
}

export default ImageViewer;
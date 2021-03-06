import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import "../styles/imageGallery.css";


import ImageViewer from "./viewer.component";



// photo gallery source: https://mdbootstrap.com/plugins/jquery/gallery/#filter
function Gallery({ imageList, maxVoteLimit, votes, setVotes, votesLeft, setVotesLeft }) {

    const [modal, setModal] = useState(false);
    const [index, setIndex] = useState(0);
    const [images, setImages] = useState(imageList);


    const openModal = (idx) => {
        setModal(!modal);
        setIndex(idx);
    }

    return (
        <div>
            <div className="gallery">
                {images.map((image, index) => {
                    return (
                        <div key={index} className="mb-3" id="photo">
                            <img className="img-fluid" onClick={() => openModal(index)} src={`/api/poll/image/${image['src']}`} alt={`image_${index}`} />
                        </div>
                    );
                })}
            </div>

            {modal ? <ImageViewer show={modal} setShow={setModal} 
                                  index={index} setIndex={setIndex} 
                                  images={images} setImages={setImages} 
                                  votes={votes} setVotes={setVotes}
                                  votesLeft={votesLeft} setVotesLeft={setVotesLeft} /> 
                    : null}

        </div>
    );
}

export default Gallery;
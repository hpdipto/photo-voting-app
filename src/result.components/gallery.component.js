import React, { useState } from 'react';


import ImageViewer from "./viewer.component";



// result image and text display source: https://stackoverflow.com/a/42252877/9481106
function ResultGallery({ result }) {

    const [modal, setModal] = useState(false);
    const [index, setIndex] = useState(0);

    const openModal = (idx) => {
        setModal(!modal);
        setIndex(idx)
    }

    return (
        <div>
            {result.map((image, index) => {
                return (
                    <div className="card mb-3" onClick={() => openModal(index)} style={{backgroundColor: "transparent"}} key={index}>
                        <div className="row d-flex">
                            <div className="col-sm-6">
                                <img className="img-fluid" src={`/api/poll/image/${image['src']}`} alt={`image_${index}`}/>
                            </div>
                            <div className="col-sm-6 align-self-center">
                                <h5>Points: {image.points}</h5>
                                <h5>Votes Received: {image.votes}</h5>
                            </div>
                        </div>
                    </div>
                );
            })}

            {modal ? <ImageViewer show={modal} setShow={setModal} images={result} index={index} setIndex={setIndex} /> : null}
        </div>
    );
}

export default ResultGallery;
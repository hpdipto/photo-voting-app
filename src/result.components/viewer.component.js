import React from 'react';
import { Modal, Carousel } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';


// loading proxy from package.json
import proxy from '.././package.json';


function ImageViewer({ show, setShow, images, index, setIndex }) {

    return (
        <div>
          {/*animation={false} for avoid a warning*/}
          <Modal show={show} onHide={() => setShow(!show)} animation={false} centered>

            <Modal.Header closeButton>
              <p>Points: {images[index].points} | Vote Recived: {images[index].votes}</p>
            </Modal.Header>

            <Modal.Body>
              <Carousel activeIndex={index} onSelect={(i, e) => setIndex(i)} slide={false} indicators={false} interval={null}>
                { images.map((image, idx) => {
                  return (
                    <Carousel.Item key={idx}>
                      <img className='img-fluid' src={proxy.proxy+image['src'].slice(6)} alt={`image_${idx}`}/>
                    </Carousel.Item>
                  );
                }) }
                </Carousel>
            </Modal.Body>
          </Modal>
        </div>
    );
}

export default ImageViewer;
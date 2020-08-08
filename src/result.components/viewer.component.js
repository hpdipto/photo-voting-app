import React from 'react';
import { Modal, Carousel } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';


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
                      <img className='img-fluid' src={`/api/poll/image/${image['src']}`} alt={`image_${idx}`}/>
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
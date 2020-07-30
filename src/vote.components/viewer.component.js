import React from 'react';
import { Modal, Carousel } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';


// loading proxy from package.json
import proxy from '.././package.json';


function ImageViewer({ show, setShow, index, setIndex, images, setImages, votes, setVotes }) {

  const increaseVote = () => {
    var v = [...votes];
    v[index] = Math.max(...votes) + 1;
    setVotes(v);
  }

  return (
      <div>
        {/*animation={false} for avoid a warning*/}
        <Modal show={show} onHide={() => setShow(!show)} animation={false} centered>

          <Modal.Header closeButton>
            <button type="button"
                    className="btn btn-primary btn-block" 
                    disabled={!votes[index] ? false : true}
                    onClick={increaseVote} >
              {/*if the image is not voted, then vote value should be MaxVote+1
              else currentVote*/}
              {!votes[index] ? Math.max(...votes) + 1 : votes[index]}
            </button>
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
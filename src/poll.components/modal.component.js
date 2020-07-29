import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';


function ModalComponent({ show, setShow, imgSrc }) {

    return (
        <div >
          {/*animation={false} for avoid a warning*/}
          <Modal show={show} onHide={() => setShow(!show)} animation={false} centered>
            {/*<Modal.Header closeButton>
            </Modal.Header>*/}
            <Modal.Body>
                <img className='img-fluid' src={imgSrc} />
            </Modal.Body>
          </Modal>
        </div>
    );
}

export default ModalComponent;
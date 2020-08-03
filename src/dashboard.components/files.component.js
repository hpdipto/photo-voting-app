import React from 'react';
import { Modal } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';

import "../styles/imageGallery.css";


function ShowFiles({ files, setFiles, showModal, setShowModal, formik }) {

    // on remove file we remove file from fileList state
    // and also remove file from formik "images" field
    const removeFile = (fileIndex) => {
      var array = [...files];
      array.splice(fileIndex, 1);
      setFiles([...array]);
      formik.setFieldValue("images", [...array]);
    }

    return (
        <div>
            {/*animation={false} for avoid a warning*/}
            <Modal show={showModal} onHide={() => setShowModal(!showModal)} animation={false} centered>

              <Modal.Header closeButton>
              </Modal.Header>

              <Modal.Body>
              <div className="gallery">
                    {files.map((file, index) => {
                        return (
                            <div key={index} className="mb-3" id="photo">
                                <div className="card">
                                    <img className="img-fluid" src={file.preview} alt={`image_${index}`} />
                                    <button className="btn" onClick={() => removeFile(index)}><i className="fa fa-trash-o" /> Remove</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
              </Modal.Body>
            </Modal>
        </div>
    );
}

export default ShowFiles;
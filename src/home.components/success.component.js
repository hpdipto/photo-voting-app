import React, { useState } from 'react';
// import 'bootswatch/dist/superhero/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

function SuccessItem({message}) {

    const [closeAlert, setCloseAlert] = useState(false);

    const handleClose = () => {
        setCloseAlert(true);
    }

    if(!closeAlert) {
        return (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
                {message}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={handleClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

export default SuccessItem;
import React, { useState } from 'react';
// import 'bootswatch/dist/superhero/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

function WarningItem({ loginStatus, setLoginStatus, messages, setMessages}) {

    const [closeAlert, setCloseAlert] = useState(false);

    const handleClose = () => {
        setCloseAlert(true);

        // back to normal state again
        // and clearning messages
        setLoginStatus(2);
        setMessages([]);
    }

    if(!closeAlert) {

        return (
            <div className="alert alert-primary alert-dismissible fade show" role="alert">
                {messages}
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

export default WarningItem;
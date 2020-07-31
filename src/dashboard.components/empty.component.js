import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import SuccessItem from './success.component';


function SuccessMessages({ messages }) {

    return(
        <div>
            {messages.map((em, index) => {
                return <SuccessItem key={index} message={em} />;
            })}
        </div>
    );
}

function EmptyDashboard({ loginStatus, setLoginStatus }) {

    const [successMessage, setSuccessMessage] = useState([]);

    useEffect(() => {
        // loginStatus 4 denotes vote successfully completed
        // this value was set in /vote.component/open.component
        if(loginStatus === 4) {
            setSuccessMessage(successMessage => [...successMessage, 'Vote completed successfully']);
        }

        // loginStatus 5 denotes a poll successfully created
        // this value was set in /dashboard.component/create.component
        if(loginStatus === 5) {
            setSuccessMessage(successMessage => [...successMessage, 'Poll created successfully']);
        }

        //loginStatus 6 denotes a poll successfully deleted
        // this value was set in /dashboard.component/card.component
        if(loginStatus === 6) {
            setSuccessMessage(successMessage => [...successMessage, 'Poll deleted successfully']);
        }

    }, [loginStatus]);


    return (
        <div className="card card-body text-center">
            {successMessage.length ? <SuccessMessages messages={successMessage} /> : null}
            <h4>No polls to display!</h4>
        </div>
    );

}

export default EmptyDashboard;
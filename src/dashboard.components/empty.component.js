import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import SuccessItem from './success.component';
import WarningItem from './warning.component';


function SuccessMessages({ loginStatus, setLoginStatus, messages, setMessages }) {

    return(
        <div>
            {messages.map((msg, index) => {
                return <SuccessItem key={index} loginStatus={loginStatus} setLoginStatus={setLoginStatus} messages={msg} setMessages={setMessages} />;
            })}
        </div>
    );
}

function WarningMessages({ loginStatus, setLoginStatus, messages, setMessages }) {

    return(
        <div>
            {messages.map((msg, index) => {
                return <WarningItem key={index} loginStatus={loginStatus} setLoginStatus={setLoginStatus} messages={msg} setMessages={setMessages} />;
            })}
        </div>
    );
}



function EmptyDashboard({ loginStatus, setLoginStatus }) {

    const [successMessage, setSuccessMessage] = useState([]);
    const [warningMessage, setWarningMessage] = useState([]);

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
            setWarningMessage(warningMessage => [...warningMessage, 'Poll deleted successfully']);
        }

    }, [loginStatus]);


    return (
        <div className="card card-body text-center" style={{backgroundColor: "transparent"}}>
            {successMessage.length ? <SuccessMessages loginStatus={loginStatus} setLoginStatus={setLoginStatus} messages={successMessage} setMessages={setSuccessMessage} /> : null}
            {warningMessage.length ? <WarningMessages loginStatus={loginStatus} setLoginStatus={setLoginStatus} messages={warningMessage} setMessages={setWarningMessage} /> : null}
            <h4 style={{color: "#385482"}}>No polls to display!</h4>
        </div>
    );

}

export default EmptyDashboard;
import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import CardRow from './cards.component';
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


function DashboardBody({ loginStatus, setLoginStatus, polls }) {

    const [successMessage, setSuccessMessage] = useState([]);

    useEffect(() => {
        // loginStatus 4 denotes vote successfully completed
        // this value was set in /vote.component/open.component
        if(loginStatus === 4) {
            setSuccessMessage(successMessage => [...successMessage, 'Vote completed successfully']);
            // back to normal loginStatus
            setLoginStatus(2);
        }

    }, []);

    // passing 4 polls at a time
    // CardRow will contain 4 polls in a row
    var pollCards = [];
    for (var i = 0; i < polls.length; i+=4) {
        var start = i;
        var end = i + 4;
        end > polls.length ? end = polls.length : end = i + 4;

        var key = [];
        for(var j = start; j < end; j++) {
            key.push(j);
        }

        pollCards.push(<CardRow key={i} polls={polls.slice(start, end)} />);
    }

    return (
        <div className="card card-body">
            {successMessage.length ? <SuccessMessages messages={successMessage} /> : null}
            {pollCards}
        </div>
    );
}


export default DashboardBody;
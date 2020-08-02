import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import CardRow from './cards.component';
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





function DashboardBody({ loginStatus, setLoginStatus, polls }) {

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

        pollCards.push(<CardRow loginStatus={loginStatus} setLoginStatus={setLoginStatus} key={i} polls={polls.slice(start, end)} />);
    }

    return (
        <div className="card card-body">
            {successMessage.length ? <SuccessMessages loginStatus={loginStatus} setLoginStatus={setLoginStatus} messages={successMessage} setMessages={setSuccessMessage} /> : null}
            {warningMessage.length ? <WarningMessages loginStatus={loginStatus} setLoginStatus={setLoginStatus} messages={warningMessage} setMessages={setWarningMessage} /> : null}
            {pollCards}
        </div>
    );
}


export default DashboardBody;
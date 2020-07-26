import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import CardRow from './cards.component';

function DashboardBody({ polls }) {

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
            {pollCards}
        </div>
    );
}


export default DashboardBody;
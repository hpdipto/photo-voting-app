import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import CardRow from './cards.component';

function DashboardBody() {

    var polls = [
        {
            "pollTitle": "New Poll",
            "pollId": "ABC",
            "startDate": new Date(2020, 7, 2),
            "endDate": new Date(2020, 10, 2)
        },
        {
            "pollTitle": "Another Poll",
            "pollId": "XYZ",
            "startDate": new Date(2020, 5, 1),
            "endDate": new Date(2020, 7, 10)
        },
        {
            "pollTitle": "Poll Poll",
            "pollId": "ABCD",
            "startDate": new Date(2020, 8, 1),
            "endDate": new Date(2020, 10, 15)
        },
        {
            "pollTitle": "Meme Poll",
            "pollId": "ABM",
            "startDate": new Date(2020, 7, 5),
            "endDate": new Date(2020, 11, 1)
        },
        {
            "pollTitle": "Coffee Poll",
            "pollId": "CPN",
            "startDate": new Date(2020, 4, 10),
            "endDate": new Date(2020, 10, 30)
        },
        {
            "pollTitle": "Tea Poll",
            "pollId": "TPN",
            "startDate": new Date(2020, 4, 10),
            "endDate": new Date(2020, 10, 30)
        }
    ];

    var pollCards = [];

    // passing 4 polls at a time
    // CardRow will contain 4 polls in a row
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
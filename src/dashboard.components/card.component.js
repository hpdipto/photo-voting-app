import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';


function PollCard({pollTitle, pollId, startDate, endDate}) {

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">{pollTitle}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{pollId}</h6>
            </div>
            <div className="card-body">
                <p className="card-text">Start: {startDate.toDateString()}</p>
                <p className="card-text">End: {endDate.toDateString()}</p>
            </div>
            <div className="card-footer">
                <a className="btn btn-primary">Open</a>
                <button className="btn"><i className="fa fa-trash-o fa-2x" /></button>
            </div>
        </div>
    );
}

export default PollCard;
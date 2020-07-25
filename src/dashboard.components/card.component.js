import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';


function PollCard({pollTitle, pollId, startDate, endDate}) {

    return (
        <div className="col-lg-3">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">{pollTitle}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{pollId}</h6>
                </div>
                <div className="card-body">
                    <p className="card-text">Start Date: {startDate.toDateString()}</p>
                    <p className="card-text">End Date: {endDate.toDateString()}</p>
                </div>
                <div className="card-footer">
                    <a href="#" className="card-link">Open Poll</a>
                </div>
            </div>
        </div>
    );
}

export default PollCard;
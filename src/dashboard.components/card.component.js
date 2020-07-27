import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';


function PollCard({id, pollTitle, pollId, startDate, endDate}) {

    const history = useHistory();

    const openPoll = () => {
        history.push(`/poll/${id}`);
    }

    const deletePoll = () => {
        axios.delete(`/poll/${id}`)
                .then(res => {
                    // empty callback
                });
    }

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
            <div className="card-footer text-center">
                <button className="btn btn-sm" onClick={openPoll}><i className="fa fa-external-link"></i> Open</button>
                <button className="btn btn-sm" onClick={deletePoll}><i className="fa fa-trash-o" /> Delete</button>
            </div>
        </div>
    );
}

export default PollCard;
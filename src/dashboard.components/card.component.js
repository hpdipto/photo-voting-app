import React from 'react';
import { useHistory } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';


function PollCard({id, pollTitle, pollId, startDate, endDate}) {

    const history = useHistory();

    const open = () => {
        history.push(`/poll/${id}`);
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
                <button className="btn btn-sm" onClick={open}><i className="fa fa-external-link"></i> Open</button>
                <button className="btn btn-sm"><i className="fa fa-trash-o" /> Delete</button>
            </div>
        </div>
    );
}

export default PollCard;
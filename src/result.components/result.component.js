import React from 'react';
// using dateformat to display nice format date
// source: https://stackoverflow.com/a/3552496/9481106
import dateformat from 'dateformat';
import { useHistory } from 'react-router-dom';

import ResultGallery from "./gallery.component";


function ResultPoll({ poll, result }) {

    const history = useHistory();

    const getPoll = () => {
        history.push(`/api/poll/${poll._id}`);
    }


    return (
        <div>
            <div className="card card-body" style={{backgroundColor: "transparent"}}>
                {/*disable card border.
                source: https://stackoverflow.com/a/53128227/9481106*/}
                <div className="card border-0 mb-4" style={{backgroundColor: "transparent"}}>
                    <dl className="row">
                        <dt className="col-md-2"><span style={{"fontSize": "1.2rem"}}>Poll Id</span></dt>
                        <dd className="col-md-9"><span style={{"fontSize": "1.2rem"}}>{poll.pollId}</span></dd>
                        
                        <dt className="col-md-2"><span style={{"fontSize": "1.2rem"}}>Poll Passcode</span></dt>
                        <dd className="col-md-9"><span style={{"fontSize": "1.2rem"}}>{poll.pollPasscode}</span></dd>

                        <dt className="col-md-2"><span style={{"fontSize": "1.2rem"}}>Start Date</span></dt>
                        <dd className="col-md-9"><span style={{"fontSize": "1.2rem"}}>{dateformat(poll.startDate, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</span></dd>
                        
                        <dt className="col-md-2"><span style={{"fontSize": "1.2rem"}}>End Date</span></dt>
                        <dd className="col-md-9"><span style={{"fontSize": "1.2rem"}}>{dateformat(poll.endDate, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</span></dd>
                    </dl>

                    <div className="row">
                        <div className="col">
                            <button type="button" className="btn btn-primary btn-block" onClick={getPoll}>Poll</button>
                        </div>
                    </div>
                </div>

                
                {result ? <ResultGallery result={result} /> : null}
                
            </div>
        </div>
    );
};


export default ResultPoll;
import React from 'react';
import axios from 'axios';
import dateformat from 'dateformat';
import { useHistory } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import Gallery from "./gallery.component";


function OpenPoll({ loginStatus, setLoginStatus, poll, imageList, votes, setVotes, votesLeft, setVotesLeft }) {

    const history = useHistory();

    const submitVotes = () => {

        // vote backend
        axios.post(`/api/vote/poll/${poll._id}`, votes)
            .then(res => {
                // loginStatus 4 denotes, a vote complete successfully
                setLoginStatus(4);
                history.push('/dashboard');
            })
            .catch(err => {
                console.log(err);
            });
    }


    return (
        <div>
            <div className="card card-body" style={{backgroundColor: "transparent"}}>
                {/*disable card border.
                source: https://stackoverflow.com/a/53128227/9481106*/}
                <div className="card border-0 mb-4" style={{backgroundColor: "transparent"}}>
                    <dl className="row">
                        <dt className="col-md-2"><span style={{"fontSize": "1.2rem"}}>Start Date</span></dt>
                        <dd className="col-md-9"><span style={{"fontSize": "1.2rem"}}>{dateformat(poll.startDate, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</span></dd>
                        
                        <dt className="col-md-2"><span style={{"fontSize": "1.2rem"}}>End Date</span></dt>
                        <dd className="col-md-9"><span style={{"fontSize": "1.2rem"}}>{dateformat(poll.endDate, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</span></dd>

                        <dt className="col-md-2"><span style={{"fontSize": "1.2rem"}}>Votes Left</span></dt>
                        <dd className="col-md-9"><span style={{"fontSize": "1.2rem"}}>{votesLeft}</span></dd>
                    </dl>

                    <div className="row">
                        <div className="col">
                            <button type="button" className="btn btn-primary btn-block" onClick={submitVotes}>Submit</button>
                        </div>
                    </div>
                </div>            

                {imageList ? 
                            <Gallery imageList={imageList} maxVoteLimit={poll.maxVoteLimit}
                                      votes={votes} setVotes={setVotes}
                                      votesLeft={votesLeft} setVotesLeft={setVotesLeft} />
                            :
                            null
                }

            </div>
        </div>
    );
};


export default OpenPoll;
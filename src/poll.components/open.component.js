import React, { useState, useEffect } from 'react';
import axios from 'axios';
// using dateformat to display nice format date
// source: https://stackoverflow.com/a/3552496/9481106
import dateformat from 'dateformat';
import { useHistory } from 'react-router-dom';

import Gallery from "./gallery.component";


function OpenPoll({ poll, images }) {


    return (
        <div>
            <div className="card card-body">
                {/*disable card border.
                source: https://stackoverflow.com/a/53128227/9481106*/}
                <div className="card border-0 ml-3">
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
                </div>

                {images ? <Gallery images={images} /> : null}
            </div>
        </div>
    );
};


export default OpenPoll;
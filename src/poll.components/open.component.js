import React, { useState, useEffect } from 'react';
import axios from 'axios';
// using dateformat to display nice format date
// source: https://stackoverflow.com/a/3552496/9481106
import dateformat from 'dateformat';
import { useHistory } from 'react-router-dom';

import ImageRow from './images.component';
import ImageCard from "./image.component";


function OpenPoll({ poll, images }) {



    // passing 3 images at a time
    // ImageRow will contain 3 images in a row
    var imageCards = [];
    // if images is loaded
    if(images) {
        for (var i = 0; i < images.length; i+=3) {
            var start = i;
            var end = i + 3;
            end > images.length ? end = images.length : end = i + 3;

            var key = [];
            for(var j = start; j < end; j++) {
                key.push(j);
            }

            imageCards.push(<ImageRow key={i} imageList={images.slice(start, end)} />);
        }
    }


    return (
        <div>
            <div className="card card-body">
                {/*disable card border.
                source: https://stackoverflow.com/a/53128227/9481106*/}
                <div className="card border-0">
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

                {/*images*/}
                {imageCards}
            </div>
        </div>
    );
};


export default OpenPoll;
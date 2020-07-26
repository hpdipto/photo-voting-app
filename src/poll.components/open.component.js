import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
                <div className="card">
                    <h5>Poll Id: {poll.pollId}</h5>
                    <h5>Poll Passcode: {poll.pollPasscode}</h5>
                    <h5>Start Date: {new Date(poll.startDate).toDateString()}</h5>
                    <h5>End Date: {new Date(poll.endDate).toDateString()}</h5>
                </div>

                <h5>Images:</h5>
                {imageCards}
            </div>
        </div>
    );
};


export default OpenPoll;
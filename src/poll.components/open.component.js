import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


function OpenPoll({ poll }) {

    return (
        <div>
            <div className="card card-body">
                <h5>Poll Id: {poll.pollId}</h5>
                <h5>Poll Passcode: {poll.pollPasscode}</h5>
                <h5>Start Date: {new Date(poll.startDate).toDateString()}</h5>
                <h5>End Date: {new Date(poll.endDate).toDateString()}</h5>

                <div className="card">
                    <h2>Image List here...</h2>
                </div>
            </div>
        </div>
    );
};


export default OpenPoll;
import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import ErrorItem from "./error.component";


function ErrorMessages({ messages }) {

    return(
        <div>
            {messages.map((em, index) => {
                return <ErrorItem key={index} message={em} />;
            })}
        </div>
    );
}


function VoteForm({ vote, setVote }) {

    const [errorMessages, setErrorMessages] = useState([]);
    const history = useHistory();

    // form validation
    const validate = values => {
        // initialize validation with empty array
        setErrorMessages(errorMessages => []);

        if(!values.pollId) {
            setErrorMessages(errorMessages => [...errorMessages, 'Please enter a Poll ID']);
        }
        if(!values.pollPasscode) {
            setErrorMessages(errorMessages => [...errorMessages, 'Please enter a Poll Passcode']);
        }
        

    }

    // formik setup
    const formik = useFormik({
        initialValues: {
            pollId: '',
            pollPasscode: ''
        },
        validate,
        // validation will be happened during submission
        validateOnChange: false,
        validateOnBlur: false,
        isValidating: true,
        onSubmit: values => {
            if(errorMessages.length === 0) {
                let poll = {
                    pollId: values.pollId,
                    pollPasscode: values.pollPasscode
                };

                axios.post('/vote/enter', poll)
                    .then(res => {
                        let responseData = res.data;
                        // if we had some error during entering into a poll
                        // from server we'll receive a json object with 'message' property
                        if (responseData.hasOwnProperty('message')) {
                            setErrorMessages(errorMessages => [...errorMessages, responseData['message']]);
                        }
                        // other wise the entering is successful
                        else {
                            // successful entering
                            history.push(`/vote/${responseData._id}`);
                        }
                    })
            }
        }
    })


    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="card card-body mb-4" style={{backgroundColor: "transparent"}}>

                {errorMessages.length ? <ErrorMessages messages={errorMessages} /> : null}
                <div className="form-group">
                    <label htmlFor="pollId">Poll ID</label>
                    <input type="text" id="pollId" className="form-control" onChange={formik.handleChange} value={formik.values.pollId}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="pollPasscode">Poll Passcode</label>
                    <input type="text" id="pollPasscode" className="form-control" onChange={formik.handleChange} value={formik.values.pollPasscode}></input>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Enter</button>
                </div>
            </div>
        </form>
    );
}


export default VoteForm;
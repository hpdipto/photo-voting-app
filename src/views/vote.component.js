import React, { useState } from 'react';
// import 'bootswatch/dist/superhero/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import ErrorItem from "./error.component";


function ErrorMessage({ errorMessages }) {

    return(
        <div>
            {errorMessages.map((em, index) => {
                return <ErrorItem key={index} message={em} />;
            })}
        </div>
    );
}


function Vote() {

    const [voteId, setVoteId] = useState('');
    const [votePasscode, setVotePasscode] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);

    const onChangeVoteId = (e) => {
        setVoteId(e.target.value);
    }

    const onChangeVotePasscode = (e) => {
        setVotePasscode(e.target.value);
    }

    const onSubmit = () => {
        setErrorMessages(errorMessages => []);

        if(voteId === '') {
            setErrorMessages(errorMessages => [...errorMessages, 'Please enter a vote ID']);
        }
        if(votePasscode === '') {
            setErrorMessages(errorMessages => [...errorMessages, 'Please enter vote passcode']);
        }
    }

    return (
        <div className="col-md-6 m-auto">
            <div className="card card-body">
                {/* <form onSubmit={onSubmit}> */}
                    {errorMessages.length ? <ErrorMessage errorMessages={errorMessages} /> : null}
                    <div className="form-group">
                        <label htmlFor="id">Vote ID</label>
                        <input type="text" className="form-control" onChange={onChangeVoteId}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passcode">Vote Passcode</label>
                        <input type="text" className="form-control" onChange={onChangeVotePasscode}></input>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" onClick={onSubmit}>Enter</button>
                {/* </form> */}
            </div>
        </div>
    );
}

export default Vote;
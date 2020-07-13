import React, { useState } from 'react';
// import 'bootswatch/dist/superhero/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';


function ErrorItem({message}) {

    const [closeAlert, setCloseAlert] = useState(false);

    const handleClose = () => {
        setCloseAlert(true);
    }

    if(!closeAlert) {
        return (
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                {message}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={handleClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}


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
        console.log(voteId);
        console.log(votePasscode);

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
                    {errorMessages.length ? <ErrorMessage errorMessages={errorMessages} setErrorMessages={setErrorMessages}/> : null}
                    <label htmlFor="id">Vote ID</label>
                    <input type="text" className="form-control" onChange={onChangeVoteId}></input>
                    <label htmlFor="passcode">Vote Passcode</label>
                    <input type="text" className="form-control" onChange={onChangeVotePasscode}></input>
                    <button type="submit" className="btn btn-primary btn-block" onClick={onSubmit}>Enter</button>
                {/* </form> */}
            </div>
        </div>
    );
}

export default Vote;
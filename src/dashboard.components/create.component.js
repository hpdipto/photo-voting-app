import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import 'bootstrap/dist/css/bootstrap.css';
import "react-datepicker/dist/react-datepicker.css";
import "../styles/createPoll.css";

import ErrorItem from "./error.component";


// may could help
// https://stackoverflow.com/questions/52271766/how-to-use-custom-input-with-formik-in-react

function ErrorMessages({ messages }) {

    return(
        <div>
            {messages.map((em, index) => {
                return <ErrorItem key={index} message={em} />;
            })}
        </div>
    );
}



function CreatePoll({ poll, setPoll }) {

    const [pollTitle, setPollTitle] = useState('');
    const [pollId, setPollId] = useState('');
    const [pollPasscode, setPollPasscode] = useState('');
    const [maxVoteLimit, setMaxVoteLimit] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [errorMessages, setErrorMessages] = useState([]);
    const [submit, setSubmit] = useState(false);

    useState(() => {
      setSubmit(false);
      setErrorMessages([]);

      if(pollTitle.length === 0) {
        setErrorMessages(errorMessages => [...errorMessages, 'Please enter a Poll Title']);
      }
      if(pollId.length < 3) {
        setErrorMessages(errorMessages => [...errorMessages, 'Poll Id should have at least 3 characters']);
      }
      if(pollPasscode.length < 3) {
        setErrorMessages(errorMessages => [...errorMessages, 'Poll Passcode should have at least 3 characters']);
      }
      if(maxVoteLimit < 2) {
        setErrorMessages(errorMessages => [...errorMessages, 'Maximum Vote Limit should at least 2']);
      }
      if(startDate.getTime() === endDate.getTime()) {
        setErrorMessages(errorMessages => [...errorMessages, "Start Date and End Date can't be equal"]);
      }
      if(endDate.getTime() < startDate.getTime()) {
        setErrorMessages(errorMessages => [...errorMessages, "End Date can't be less than Start Date"]);
      }

    }, [pollTitle, pollId, pollPasscode, maxVoteLimit, startDate, endDate, submit]);


    const onChangePollTitle = (e) => {
        setPollTitle(e.target.value);
    }

    const onChangePollId = (e) => {
        setPollId(e.target.value);
    }

    const onChangePollPasscode = (e) => {
        setPollPasscode(e.target.value);
    }

    const onChangeMaxVoteLimit = (e) => {
        setMaxVoteLimit(e.target.value);
    }

    const onChangeStartDate = (date) => {
        setStartDate(date);
    }

    const onChangeEndDate = (date) => {
        setEndDate(date);
    }


    const onSubmit = async () => {
      setSubmit(true);

      console.log(errorMessages.length);
      console.log(submit);

      // if we check errors and had no errors, procced
      if(errorMessages.length === 0) {
        let pollInfo = {
          pollTitle,
          pollId,
          pollPasscode,
          maxVoteLimit,
          startDate,
          endDate
        };

        console.log(pollInfo);
        // after poll creattion unmounting the CreatePoll component
        // setPoll(false);
      }

    }


    return (
        <div className="card card-body">

          {(submit && errorMessages.length) ? <ErrorMessages messages={errorMessages} /> : null}

          <div className="form-group">
              <label htmlFor="pollTitle">Poll Title</label>
              <input type="text" value={pollTitle} className="form-control" id="pollTitle" onChange={onChangePollTitle}/>
          </div>

          <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="pollId">Poll ID</label>
                <input type="text" value={pollId} className="form-control" id="pollId" onChange={onChangePollId}/>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="pollPasscode">Poll Passcode</label>
                <input type="text" value={pollPasscode} className="form-control" id="pollPasscode" onChange={onChangePollPasscode} />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="maxVoteLimit">Maximum Vote Limit</label>
                <input type="number" value={maxVoteLimit} className="form-control" id="maxVoteLimit" onChange={onChangeMaxVoteLimit} />
              </div>
          </div>

          <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="startDate">Start Date</label>
                <br />
                <DatePicker className="form-control" value={startDate} selected={startDate} onChange={onChangeStartDate} showTimeSelect />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="endDate">End Date</label>
                <br />
                <DatePicker className="form-control" value={endDate} selected={endDate} onChange={onChangeEndDate} showTimeSelect />
              </div>
          </div>

          <div>
            <button className="btn btn-info btn-block" onClick={onSubmit}>Create Poll</button>
          </div>
        </div>
    );
}


export default CreatePoll;
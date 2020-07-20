import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import 'bootstrap/dist/css/bootstrap.css';
import "react-datepicker/dist/react-datepicker.css";
import "../styles/createPoll.css"


function CreatePoll({ poll, setPoll }) {

    const [pollTitle, setPollTitle] = useState('');
    const [pollId, setPollId] = useState('');
    const [pollPasscode, setPollPasscode] = useState('');
    const [maxVoteLimit, setMaxVoteLimit] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


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


    const onSubmit = () => {

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
      setPoll(false);
    }


    return (
        <div className="card card-body">
            <div className="form-group">
                <label htmlFor="pollTitle">Poll Title</label>
                <input type="text" className="form-control" id="pollTitle" onChange={onChangePollTitle}/>
            </div>

            <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor="pollId">Poll ID</label>
                  <input type="text" className="form-control" id="pollId" onChange={onChangePollId}/>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="pollPasscode">Poll Passcode</label>
                  <input type="text" className="form-control" id="pollPasscode" onChange={onChangePollPasscode} />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="maxVoteLimit">Max Vote Limit</label>
                  <input type="number" className="form-control" id="maxVoteLimit" onChange={onChangeMaxVoteLimit} />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="startDate">Start Date</label>
                  <br />
                  <DatePicker className="form-control" selected={startDate} onChange={onChangeStartDate} showTimeSelect />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="endDate">End Date</label>
                  <br />
                  <DatePicker className="form-control" selected={endDate} onChange={onChangeEndDate} showTimeSelect />
                </div>
            </div>

            <div>
              <button className="btn btn-info btn-block" onClick={onSubmit}>Create Poll</button>
            </div>
        </div>
    );
}


export default CreatePoll;
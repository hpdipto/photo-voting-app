import React, { useState, useCallback } from 'react'
import { useFormik } from 'formik';
import { useDropzone } from 'react-dropzone';
// import Dropzone from 'react-dropzone';
import DatePicker from "react-datepicker";

import 'bootstrap/dist/css/bootstrap.css';
import "react-datepicker/dist/react-datepicker.css";
// font awesome source: https://stackoverflow.com/a/44985218/9481106
import 'font-awesome/css/font-awesome.min.css';
import "../styles/createPoll.css";

import ErrorItem from "./error.component";


// may could help
// https://blog.logrocket.com/create-a-drag-and-drop-component-with-react-dropzone/

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


    const [errorMessages, setErrorMessages] = useState([]);
    const [fileList, setFileList] = useState([]);



    const onDrop = useCallback(acceptedFiles => {
      acceptedFiles.map(af => setFileList(fileList => [...fileList, af.name]));
    })

    const removeFile = (fileIndex) => {
      var array = [...fileList];
      array.splice(fileIndex, 1);
      setFileList([...array]);
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});



    // form validation
    const validate = values => {
        // initialize validation with empty array
        setErrorMessages(errorMessages => []);

        if(!values.pollTitle) {
            setErrorMessages(errorMessages => [...errorMessages, 'Please enter a Poll Title']);
        }
        if(values.pollId.length < 3) {
            setErrorMessages(errorMessages => [...errorMessages, 'Poll Id should have at least 3 characters']);
        }
        if(values.pollPasscode.length < 3) {
            setErrorMessages(errorMessages => [...errorMessages, 'Poll Passcode should have at least 3 characters']);
        }
        if(values.maxVoteLimit < 2) {
            setErrorMessages(errorMessages => [...errorMessages, 'Maximum Vote Limit should at least 2']);
        }
        if(values.startDate.getTime() === values.endDate.getTime()) {
            setErrorMessages(errorMessages => [...errorMessages, "Start Date and End Date can't be equal"]);
        }
        if(values.startDate.getTime() > values.endDate.getTime()) {
            setErrorMessages(errorMessages => [...errorMessages, "Start Time can't be greater than End Time"]);
        }
    }


    // formik setup
    const formik = useFormik({
      initialValues: {
        pollTitle: '',
        pollId: '',
        pollPasscode: '',
        maxVoteLimit: 0,
        // set to midnight
        // source: https://stackoverflow.com/a/30100627/9481106
        startDate: new Date(new Date().setHours(0,0,0,0)),
        endDate: new Date(new Date().setHours(0,0,0,0))
      },
      validate,
      // validation will be happened during submission
      validateOnChange: false,
      validateOnBlur: false,
      isValidating: true,
      onSubmit: values => {
        if(errorMessages.length === 0) {
          let poll = {
            pollTitle: values.pollTitle,
            pollId: values.pollId,
            pollPasscode: values.pollPasscode,
            maxVoteLimit: values.maxVoteLimit,
            startDate: values.startDate,
            endDate: values.endDate
          };

          console.log(poll);
        }
      }
    })

    


    return (
      <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="card card-body">

          {errorMessages.length ? <ErrorMessages messages={errorMessages} /> : null}

          <div className="form-group">
              <label htmlFor="pollTitle">Poll Title</label>
              <input type="text" id="pollTitle" className="form-control" value={formik.values.pollTitle} onChange={formik.handleChange}/>
          </div>

          <div className="form-row"> 
              <div className="form-group col-md-4">
                <label htmlFor="pollId">Poll ID</label>
                <input type="text" id="pollId" className="form-control" value={formik.values.pollId} onChange={formik.handleChange}/>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="pollPasscode">Poll Passcode</label>
                <input type="text" id="pollPasscode" className="form-control" value={formik.values.pollPasscode} onChange={formik.handleChange} />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="maxVoteLimit">Maximum Vote Limit</label>
                <input type="number" id="maxVoteLimit" className="form-control" value={formik.values.maxVoteLimit} onChange={formik.handleChange} />
              </div>
          </div>

          <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="startDate">Start Date</label>
                <br />
                {/*handling DatePicker with Formik*/}
                {/* source: https://stackoverflow.com/a/52273407/9481106*/}
                <DatePicker id="startDate" className="form-control" value={formik.values.startDate} selected={formik.values.startDate} onChange={date => formik.setFieldValue("startDate", date)} showTimeSelect={true} />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="endDate">End Date</label>
                <br />
                <DatePicker id="endDate" className="form-control" value={formik.values.endDate} selected={formik.values.endDate} onChange={date => formik.setFieldValue("endDate", date)} showTimeSelect />
              </div>
          </div>

          <div>
            <button type="submit" className="btn btn-info btn-block" >Create Poll</button>
          </div>
        </div>
      </form>


        <div className={"form-control dnd " + (isDragActive ? "dnd-focus" : "") } {...getRootProps()}>
          <input {...getInputProps()} />
            <div className="icon mt-4 mb-2">
              <i className="fa fa-5x fa-align-justify fa-upload" aria-hidden="true"></i>
            </div>
            <p align="center">Drop images here or click to upload</p>
        </div>
        <ul className="list-group">
          {fileList.length > 0 && fileList.map((file, index) => (
            <li key={file.length} className="list-group-item list-group-item-success d-flex justify-content-between align-items-center">
              {file}
              <button className="btn btn-close" onClick={() => removeFile(index)}><i className="fa fa-trash-o" /></button>
            </li>
          ))}
        </ul>
        <button onClick={() => console.log(fileList)}>View Files</button>


        <br />
        <br />


      </div>
    );
}


export default CreatePoll;
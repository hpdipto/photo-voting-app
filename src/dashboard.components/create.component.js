import React, { useState, useCallback } from 'react';
import axios from 'axios';
import fs from 'fs';
import { useFormik } from 'formik';
import { useDropzone } from 'react-dropzone';
import DatePicker from "react-datepicker";

import 'bootstrap/dist/css/bootstrap.css';
import "react-datepicker/dist/react-datepicker.css";
// font awesome source: https://stackoverflow.com/a/44985218/9481106
import 'font-awesome/css/font-awesome.min.css';
import "../styles/createPoll.css";

import ErrorItem from "./error.component";

// resource that helped a lot for react-dropzone
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


    // On drop file in the field, we update fileList state
    // and add files to formik "images" field
    const onDrop = useCallback(acceptedFiles => {
      acceptedFiles.map(af => setFileList(fileList => [...fileList, af]));
      formik.setFieldValue("images", [...fileList, ...acceptedFiles]);
    });

    
    // non images are bounced
    const onDropRejected = useCallback(rejectedFiles => {
      alert(`Non image files are ignored!`);
    });


    // on remove file we remove file from fileList state
    // and also remove file from formik "images" field
    const removeFile = (fileIndex) => {
      var array = [...fileList];
      array.splice(fileIndex, 1);
      setFileList([...array]);
      formik.setFieldValue("images", [...array]);
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, onDropRejected, accept: 'image/*'});



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
        if(values.images === null || values.images.length < 2) {
          setErrorMessages(errorMessages => [...errorMessages, "Please upload 2 or more files"]);
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
        endDate: new Date(new Date().setHours(0,0,0,0)),
        images: null
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
            endDate: values.endDate,
            images: values.images
          };

          // console.log(poll);


          var formData = new FormData();
          formData.append("pollTitle", values.pollTitle);
          formData.append("pollId", values.pollId);
          formData.append("pollPasscode", values.pollPasscode);
          formData.append("maxVoteLimit", values.maxVoteLimit);
          formData.append("startDate", values.startDate);
          formData.append("endDate", values.endDate);
          
          for(var i = 0; i < values.images.length; i++) {
            console.log(values.images[i].name);
            formData.append(`images[${i}]`, values.images[i], values.images[i].name);
          }

          for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
          }

          // source: https://stackoverflow.com/a/43014086/9481106
          axios.post('/poll/create', formData, { headers: {'content-type': 'multipart/form-data'}})
              .then(res => console.log("Poll created successfully!"))
              .catch(err => console.log(err));


        }
      }
    })

    


    return (
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

          {/* Drag and Drop section */}
          <div className="form-group">
            <label htmlFor="images">Upload Images</label>
            <div className={"form-control dnd " + (isDragActive ? "dnd-focus" : "") } {...getRootProps()}>
              {/* source: https://stackoverflow.com/a/56161034/9481106 */}
              <input {...getInputProps()} type="file" id="images" name="images" onChange={event => formik.setFieldValue("images", event.currentTarget.files)} multiple />
              <div className="icon mt-4 mb-2">
                <i className="fa fa-5x fa-align-justify fa-upload" aria-hidden="true"></i>
              </div>
              <p align="center">Drop images here or click to upload</p>
            </div>
          </div>

          {/* Display file list */}
          <div className="form-group">
            <ul className="list-group">
              {fileList.length > 0 && fileList.map((file, index) => (
                <li key={index} className="list-group-item list-group-item-success d-flex justify-content-between align-items-center">
                  {file.name}
                  <button className="btn btn-close" onClick={() => removeFile(index)}><i className="fa fa-trash-o" /></button>
                </li>
              ))}
            </ul>
          </div>


          <div className="form-row">
            <button type="submit" className="btn btn-info btn-block">Create Poll</button>
          </div>

        </div>
      </form>
    );
}


export default CreatePoll;
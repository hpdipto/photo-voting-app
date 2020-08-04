import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useDropzone } from 'react-dropzone';
import { ProgressBar } from 'react-bootstrap';
import DatePicker from "react-datepicker";

import 'bootstrap/dist/css/bootstrap.css';
import "react-datepicker/dist/react-datepicker.css";
// font awesome source: https://stackoverflow.com/a/44985218/9481106
import 'font-awesome/css/font-awesome.min.css';
import "../styles/createPoll.css";

import ErrorItem from "./error.component";
import ShowFiles from "./files.component";

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



function CreatePoll({ loginStatus, setLoginStatus, poll, setPoll }) {


    const [errorMessages, setErrorMessages] = useState([]);
    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [submit, setSubmit] = useState(false);


    // On drop file in the field, we update fileList state
    // and add files to formik "images" field
    const onDrop = useCallback(acceptedFiles => {
      // file preview source: https://github.com/react-dropzone/react-dropzone/tree/master/examples/previews
      acceptedFiles.map(file => {
        Object.assign(file, {preview: URL.createObjectURL(file)});
        setFiles(files => [...files, file]);
      });

      formik.setFieldValue("images", [...files, ...acceptedFiles]);
    });

    
    // non images are bounced
    const onDropRejected = useCallback(rejectedFiles => {
      alert(`Non image files are ignored!`);
    });

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, onDropRejected, accept: 'image/*'});



    // form validation
    const validate = values => {
        // initialize validation with empty array
        setErrorMessages(errorMessages => []);

        if(!values.pollTitle) {
            setErrorMessages(errorMessages => [...errorMessages, 'Please enter a Poll Title']);
            setSubmit(false);
        }
        if(values.pollId.length < 3) {
            setErrorMessages(errorMessages => [...errorMessages, 'Poll Id should have at least 3 characters']);
            setSubmit(false);
        }
        if(values.pollPasscode.length < 3) {
            setErrorMessages(errorMessages => [...errorMessages, 'Poll Passcode should have at least 3 characters']);
            setSubmit(false);
        }
        if(values.maxVoteLimit === 0) {
            setErrorMessages(errorMessages => [...errorMessages, 'Maximum Vote Limit can not be 0']);
            setSubmit(false);
        }
        if(values.startDate.getTime() === values.endDate.getTime()) {
            setErrorMessages(errorMessages => [...errorMessages, "Start Date and End Date can't be equal"]);
            setSubmit(false);
        }
        if(values.startDate.getTime() > values.endDate.getTime()) {
            setErrorMessages(errorMessages => [...errorMessages, "Start Time can't be greater than End Time"]);
            setSubmit(false);
        }
        if(values.maxVoteLimit > values.images.length) {
            setErrorMessages(errorMessages => [...errorMessages, 'Maximum Vote Limit can not be larger than uploaded images']);
            setSubmit(false);
        }
        if(values.images === null || values.images.length < 2) {
          setErrorMessages(errorMessages => [...errorMessages, "Please upload 2 or more files"]);
          setSubmit(false);
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

          setSubmit(true);

          var formData = new FormData();
          formData.append("pollTitle", values.pollTitle);
          formData.append("pollId", values.pollId);
          formData.append("pollPasscode", values.pollPasscode);
          formData.append("maxVoteLimit", values.maxVoteLimit);
          formData.append("startDate", values.startDate);
          formData.append("endDate", values.endDate);
          
          for(var i = 0; i < values.images.length; i++) {
            formData.append(`images[${i}]`, values.images[i], values.images[i].name);
          }

          // source: https://stackoverflow.com/a/43014086/9481106
          axios.post('/api/poll/create', formData, 
                          { 
                            headers: {'content-type': 'multipart/form-data'},
                            // calculating upload progress
                            onUploadProgress: (progressEvent) => {
                              const uploadPercentage = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
                              setUploadProgress(uploadPercentage);
                            }
                          })
              // poll created successfully
              .then(res => {
                // after poll created successfully
                // setPoll value to 2, to unmount createPoll component
                // loginStatus to 5, to display flash message
                setPoll(2);
                setLoginStatus(5);
              })
              .catch(err => setErrorMessages(errorMessages => [...errorMessages, 'Poll Id already taken, please use a new one']));
        }
      }
    });

    


    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="card card-body mb-4" style={{backgroundColor: "transparent"}}>

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
                <DatePicker id="startDate" className="form-control" value={formik.values.startDate} selected={formik.values.startDate} onChange={date => formik.setFieldValue("startDate", date)} showTimeSelect />
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
              <input {...getInputProps()} type="file" id="images" name="images" 
                     onChange={event => {
                                  formik.setFieldValue("images", event.currentTarget.files);
                                  {/*also update the 'files' state*/}
                                  var acceptedFiles = Array.from(event.currentTarget.files);
                                  acceptedFiles.map(file => {
                                    Object.assign(file, {preview: URL.createObjectURL(file)});
                                    setFiles(files => [...files, file]);
                                  });
                                }
                              } 
                      multiple />
              <div className="icon mt-4 mb-2">
                <i className="fa fa-5x fa-align-justify fa-upload" aria-hidden="true"></i>
              </div>
              <p align="center">Drop images here or click to upload</p>
            </div>
          </div>

          
          <div className="form-group">
            <button type="button" className="btn btn-link" onClick={() => setShowModal(!showModal)}>{files.length} items added</button>
            {showModal ? <ShowFiles files={files} setFiles={setFiles} showModal={showModal} setShowModal={setShowModal} formik={formik} /> : null}
          </div>

          {uploadProgress ?
              <div className="form-group">
                  <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} variant={"info"}/>
              </div>
                      :
              null
          }

          <div className="form-group">
            <button type="submit" className="btn btn-info btn-block" onClick={formik.handleSubmit} disabled={submit} >Create Poll</button>
          </div>

        </div>
      </form>
    );
}


export default CreatePoll;
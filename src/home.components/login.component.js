import React, { useState, useEffect } from 'react';
import { useFormik } from "formik";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// import 'bootswatch/dist/superhero/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import ErrorItem from "./error.component";
import SuccessItem from "./success.component";

// eable axios cookies
axios.defaults.withCredentials = true;

function ErrorMessages({ messages }) {

    return(
        <div>
            {messages.map((em, index) => {
                return <ErrorItem key={index} message={em} />;
            })}
        </div>
    );
}


function SuccessMessages({ messages }) {

    return(
        <div>
            {messages.map((em, index) => {
                return <SuccessItem key={index} message={em} />;
            })}
        </div>
    );
}



function Login({login, setLogin, register, setRegister}) {

    const [errorMessages, setErrorMessages] = useState([]);
    const [successMessages, setSuccessMessages] = useState([]);

    const history = useHistory();

    useEffect(() => {
        // unauthorized user tried to access dashboard
        // login  value was set from Dashboard.js
        if(login === 3) {
            setErrorMessages(errorMessages => [...errorMessages, 'Please login first']);
        }

        // user registered successfully
        // login value was set from home.components/register.component.js
        if(login === 4) {
            setSuccessMessages(successMessages => [...successMessages, 'Registered successfully']);
        }
    }, []);   // included values to avoid warning


    // form validation
    const validate = values => {
        // initialize validation with empty array
        setErrorMessages(errorMessages => []);

        if((!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))) {
           setErrorMessages(errorMessages => [...errorMessages, 'Please enter a valid email']); 
        }
        if(!values.password) {
            setErrorMessages(errorMessages => [...errorMessages, 'Please enter a password']);
        }
    }


    // formik setup
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        // validation will be happened during submission
        validateOnChange: false,
        validateOnBlur: false,
        isValidating: true,
        onSubmit: values => {
            // submit if there are no client side errors
            if(errorMessages.length === 0) {
                let user = {
                    email: values.email,
                    password: values.password
                };

                axios.post('http://localhost:5000/user/login', user, {withCredentials: true})
                    .then(res => {
                        let responseData = res.data;
                        if (responseData.hasOwnProperty('message')) {
                            setErrorMessages(errorMessages => [...errorMessages, responseData['message']]);
                        }
                        else {
                            // successful login
                            setLogin(2);
                            history.push("/dashboard");
                        }
                    });
            }
        }

    });
    

    // function for toggle register component
    const onClickRegister = () => {
        setRegister(true);
        setLogin(0);
    }


    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="col-xs-6 m-auto">
                <div className="card card-body">
                    {errorMessages.length ? <ErrorMessages messages={errorMessages} /> : null}
                    {successMessages.length ? <SuccessMessages messages={successMessages} /> : null}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" className="form-control" onChange={formik.handleChange} value={formik.values.email}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" className="form-control" onChange={formik.handleChange} value={formik.values.password}></input>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                    </div>
                    <p>Don't have an account? <button className="btn btn-link" onClick={onClickRegister}>Register</button> </p>
                </div>
            </div>
        </form>
    );
}

export default Login;
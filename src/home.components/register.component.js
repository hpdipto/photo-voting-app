import React, { useState} from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
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

function Register({ login, setLogin, register, setRegister }) {

    const [errorMessages, setErrorMessages] = useState([]);


    // form validation
    const validate = values => {
        // initialize validation with empty array
        setErrorMessages(errorMessages => []);

        if(!values.registerName) {
            setErrorMessages(errorMessages => [...errorMessages, 'Please enter a name']);
        }
        if((!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.registerEmail))) {
           setErrorMessages(errorMessages => [...errorMessages, 'Please enter a valid email']); 
        }
        if(!values.registerPassword) {
            setErrorMessages(errorMessages => [...errorMessages, 'Please enter a password']);
        }
        if(values.registerPassword.length < 6) {
            setErrorMessages(errorMessages => [...errorMessages, 'Password length should be at least 6']);
        }
    }


    // formik setup
    const formik = useFormik({
        initialValues: {
            registerName: '',
            registerEmail: '',
            registerPassword: '',
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
                    name: values.registerName,
                    email: values.registerEmail,
                    password: values.registerPassword
                };

                axios.post('/user/add', user)
                    .then(res => {
                        // user registered successfully
                        onClickLogin(4);
                    })  
                    .catch(err => setErrorMessages(errorMessages => [...errorMessages, 'Email already used']));
            }
        }

    });

    // function for toggle login component
    const onClickLogin = (registerStatus) => {

        if(isNaN(registerStatus))
            registerStatus = 1;
        
        setLogin(registerStatus);
        setRegister(false);
    }


    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="col-xs-6 m-auto">
                <div className="card card-body">
                    {errorMessages.length ? <ErrorMessages messages={errorMessages} /> : null}
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="registerName" className="form-control" onChange={formik.handleChange} value={formik.values.registerName}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="registerEmail" className="form-control" onChange={formik.handleChange} value={formik.values.registerEmail}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="registerPassword" className="form-control" onChange={formik.handleChange} value={formik.values.registerPassword}></input>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Register</button>
                    </div>

                    <p>Have an account? <button className="btn btn-link" onClick={onClickLogin}>Login</button> </p>
                </div>
            </div>
        </form>
    );
}

export default Register;
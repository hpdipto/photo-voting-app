import React, { useState, useEffect } from 'react';
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

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
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


    const onChangeEmail = (e) => {
        setLoginEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setLoginPassword(e.target.value);
    }

    const onSubmit = () => {
        setErrorMessages(errorMessages => []);
        
        if(loginEmail === '') {
            setErrorMessages(errorMessages => [...errorMessages, 'Please enter an email']);
        }
        if(loginPassword === '') {
            setErrorMessages(errorMessages => [...errorMessages, 'Please enter a password']);
        }

        let user = {
            "email": loginEmail,
            "password": loginPassword
        };


        axios.post('http://localhost:5000/users/login', user, {withCredentials: true})
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
            })
    }

    const onClickRegister = () => {
        setRegister(true);
        setLogin(0);
    }

    return (
        <div className="col-xs-6 m-auto">
            <div className="card card-body">
                {/* <form onSubmit={onSubmit}> */}
                    {errorMessages.length ? <ErrorMessages messages={errorMessages} /> : null}
                    {successMessages.length ? <SuccessMessages messages={successMessages} /> : null}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" onChange={onChangeEmail}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" onChange={onChangePassword}></input>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block" onClick={onSubmit}>Login</button>
                    </div>
                {/* </form> */}
                    <p>Don't have an account? <button className="btn btn-link" onClick={onClickRegister}>Register</button> </p>
            </div>
        </div>
    );
}

export default Login;
import React, { useState } from 'react';
import axios from 'axios';
// import 'bootswatch/dist/superhero/bootstrap.min.css';
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

    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);

    const onChangeName = (e) => {
        setRegisterName(e.target.value);
    }

    const onChangeEmail = (e) => {
        setRegisterEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setRegisterPassword(e.target.value);
    }

    const onSubmit = (e) => {
        setErrorMessages(errorMessages => []);       

        // Basic errors
        if(registerName === '') {
            setErrorMessages(errorMessages => [...errorMessages, 'Please enter a name']);
        }
        if(registerEmail === '') {
            setErrorMessages(errorMessages => [...errorMessages, 'Please enter an email']);
        }
        if(registerPassword === '') {
            setErrorMessages(errorMessages => [...errorMessages, 'Please enter a password']);
        }
        if(registerPassword.length > 0 && registerPassword.length < 6) {
            setErrorMessages(errorMessages => [...errorMessages, 'Password must be 6 characters or more']);
        }

        // If no errors had, procedding
        if(errorMessages.length === 0) {
            let user = {
                name: registerName,
                email: registerEmail,
                password: registerPassword
            }

            axios.post('http://localhost:5000/users/add', user)
                .then(res => {
                    console.log("User added successfully");
                    onClickLogin(2);
                })  
                .catch(err => setErrorMessages(errorMessages => [...errorMessages, 'Email already used']));
        }
    }

    const onClickLogin = (registerStatus) => {
        setLogin(registerStatus);
        setRegister(false);
    }

    return (
        <div className="col-xs-6 m-auto">
            <div className="card card-body">
                {/* <form onSubmit={onSubmit}> */}
                    {errorMessages.length ? <ErrorMessages messages={errorMessages} /> : null}
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" onChange={onChangeName}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" onChange={onChangeEmail}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" onChange={onChangePassword}></input>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block" onClick={onSubmit}>Register</button>
                    </div>
                {/* </form> */}
                    <p>Have an account? <button className="btn btn-link" onClick={onClickLogin}>Login</button> </p>
            </div>
        </div>
    );
}

export default Register;
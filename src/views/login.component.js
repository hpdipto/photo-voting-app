import React, { useState } from 'react';
// import 'bootswatch/dist/superhero/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import ErrorItem from "./error.component";

function ErrorMessage({ errorMessages }) {

    return(
        <div>
            {errorMessages.map((em, index) => {
                return <ErrorItem key={index} message={em} />;
            })}
        </div>
    );
}


function Login({login, setLogin, register, setRegister}) {

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);

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
    }

    const onClickRegister = () => {
        setLogin(!login);
        setRegister(!register);
    }

    return (
        <div className="col-md-6 m-auto">
            <div className="card card-body">
                {/* <form onSubmit={onSubmit}> */}
                    {errorMessages.length ? <ErrorMessage errorMessages={errorMessages} /> : null}
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
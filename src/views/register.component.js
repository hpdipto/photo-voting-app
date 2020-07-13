import React, { useState } from 'react';
// import 'bootswatch/dist/superhero/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

function ErrorItem({message}) {

    const [closeAlert, setCloseAlert] = useState(false);

    const handleClose = () => {
        setCloseAlert(true);
    }

    if(!closeAlert) {
        return (
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                {message}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={handleClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}


function ErrorMessage({ errorMessages }) {

    return(
        <div>
            {errorMessages.map((em, index) => {
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
        

        // tackle unique email
        // here
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
    }

    const onClickLogin = () => {
        setLogin(!login);
        setRegister(!register);
    }

    return (
        <div className="col-md-6 m-auto">
            <div className="card card-body">
                {/* <form onSubmit={onSubmit}> */}
                    {errorMessages.length ? <ErrorMessage errorMessages={errorMessages} setErrorMessages={setErrorMessages}/> : null}
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" onChange={onChangeName}></input>
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" onChange={onChangeEmail}></input>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" onChange={onChangePassword}></input>
                    <button type="submit" className="btn btn-primary btn-block" onClick={onSubmit}>Register</button>
                {/* </form> */}
                    <p>Have an account? <button className="btn btn-link" onClick={onClickLogin}>Login</button> </p>
            </div>
        </div>
    );
}

export default Register;
import React, { useState } from 'react';
import 'bootswatch/dist/superhero/bootstrap.min.css';

function Register({ login, setLogin, register, setRegister }) {

    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const onChangeName = (e) => {
        setRegisterName(e.target.value);
    }

    const onChangeEmail = (e) => {
        setRegisterEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setRegisterPassword(e.target.value);
    }

    const onSubmit = () => {
        console.log(registerName);
        console.log(registerEmail);
        console.log(registerPassword);
    }

    const onClickLogin = () => {
        setLogin(!login);
        setRegister(!register);
    }

    return (
        <div className="col-md-6 m-auto">
            <div className="card card-body">
                {/* <form onSubmit={onSubmit}> */}
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
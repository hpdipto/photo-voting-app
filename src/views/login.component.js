import React, { useState } from 'react';
import 'bootswatch/dist/superhero/bootstrap.min.css';

function Login({login, setLogin, register, setRegister}) {

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const onChangeEmail = (e) => {
        setLoginEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setLoginPassword(e.target.value);
    }

    const onSubmit = () => {
        console.log(loginEmail);
        console.log(loginPassword);
    }

    const onClickRegister = () => {
        setLogin(!login);
        setRegister(!register);
    }

    return (
        <div className="col-md-6 m-auto">
            <div className="card card-body">
                {/* <form onSubmit={onSubmit}> */}
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" onChange={onChangeEmail}></input>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" onChange={onChangePassword}></input>
                    <button type="submit" className="btn btn-primary btn-block" onClick={onSubmit}>Login</button>
                {/* </form> */}
                    <p>Don't have an account? <button className="btn btn-link" onClick={onClickRegister}>Register</button> </p>
            </div>
        </div>
    );
}

export default Login;
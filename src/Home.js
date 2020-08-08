import React, { useState, useEffect } from 'react';
// import 'bootswatch/dist/superhero/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import Login from "./home.components/login.component";
import Register from "./home.components/register.component";

import pic from "./undraw_voting_nvu7.svg";


function Home({ loginStatus, setLoginStatus, user, setUser }) {

  // this states are used to toggle components
  const [login, setLogin] = useState(loginStatus);
  const [register, setRegister] = useState(false);
  

  useEffect(() => {
    // value login is updated from loginStatus
    // login == 2 denotes user logged in successfully
    if(login === 2) {
      // now all page can understand, a user is logged in
      setLoginStatus(1);
      // after a successful login, we set local state `login`'s value to 0
      // so that the component will unmount
      setLogin(0);
    }

    // login === -1 denotes, a user logged out successfully
    // if a user logged out then we set the value of login to 0
    // so that login component doesn't mount
    if(login === -1) {
      setLogin(0);
    }
  }, [login, setLoginStatus, setLogin]);


  const loginClicked = () => {
    setRegister(false);
    // conditional toggling
    login ? setLogin(0) : setLogin(1);
  }

  const registerClicked = () => {
    setLogin(0);
    register ? setRegister(false) : setRegister(true);
  }

  return (
    <div style={{marginTop: "10vh", marginBottom: "10vh"}}>
        <div className="row mt-5">
          <div className="col-md-6">
            <br />
            <h1>Photo Poll</h1>
          </div>
          <div className="col-md-6">
            <br />
            <div className="card card-body text-center" style={{backgroundColor: "transparent"}}>
              <div className="btn-group">
                <button className="btn btn-primary" onClick={loginClicked}>Log In</button>
                <button className="btn btn-info" onClick={registerClicked}>Register</button>
              </div>
              <br />
            </div>
          </div>
        </div>

        <div className="row">
            <div className="col-md-6 mt-3">
                <img src={pic} alt="homepage" style={{width: "100%", height: "100%"}} />
            </div>
            <div className="col-md-6 mt-2">
              <div></div>
              {login ? <Login login={login} setLogin={setLogin} register={register} setRegister={setRegister} user={user} setUser={setUser} /> : null}
              {register ? <Register login={login} setLogin={setLogin} register={register} setRegister={setRegister} /> : null}
            </div>
        </div>
    </div>
  );
}

export default Home;

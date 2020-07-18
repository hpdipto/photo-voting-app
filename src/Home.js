import React, { useState, useEffect } from 'react';
// import 'bootswatch/dist/superhero/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import Login from "./home.components/login.component";
import Register from "./home.components/register.component";
import Vote from "./home.components/vote.component";


function Home({ loginStatus, setLoginStatus }) {

  const [login, setLogin] = useState(loginStatus);
  const [register, setRegister] = useState(false);
  const [vote, setVote] = useState(false);

  useEffect(() => {
    if(login === 2) {
      setLoginStatus(1);
      setLogin(0);
    }
  }, [login]);   // need to track the changes of `login`


  const arrangeVote = () => {
    setVote(!vote);
    setRegister(false);
    setLogin(0);
  }

  const arrangeLogin = () => {
    setVote(false);
    setRegister(false);
    // conditional toggling
    login ? setLogin(0) : setLogin(1);
  }

  return (
    <div className="row mt-5">
      <div className="col-md-6 m-auto">
        <br />
        <div className="card card-body text-center">
          <p>Welcome to My Photo Voting App</p>
          <div className="btn-group">
            <button className="btn btn-primary" onClick={arrangeVote}>Vote</button>
            <button className="btn btn-secondary" onClick={arrangeLogin}>Arrange</button>
          </div>
        </div>
        <br />
        {vote ? <Vote /> : null}
        {login > 0 ? <Login login={login} setLogin={setLogin} register={register} setRegister={setRegister} /> : null}
        {register ? <Register login={login} setLogin={setLogin} register={register} setRegister={setRegister} /> : null}
      </div>
    </div>
  );
}

export default Home;
import React, { useState } from 'react';
// import 'bootswatch/dist/superhero/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import Login from "./components/login.component";
import Register from "./components/register.component";
import Vote from "./components/vote.component";


function App() {

  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [vote, setVote] = useState(false);

  const arrangeVote = () => {
    setVote(!vote);
    setLogin(false);
    setRegister(false);
  }

  const arrangeLogin = () => {
    setVote(false);
    setRegister(false);
    setLogin(!login);
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
      {login ? <Login login={login} setLogin={setLogin} register={register} setRegister={setRegister} /> : null}
      {register ? <Register login={login} setLogin={setLogin} register={register} setRegister={setRegister} /> : null}
    </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import 'bootswatch/dist/superhero/bootstrap.min.css';

import Login from "./views/login.component";
import Register from "./views/register.component";


function App() {

  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  const arrange = () => {
    setRegister(false);
    setLogin(!login);
  }

  return (
    <div className="col-md-6 m-auto">
      <div className="card card-body text-center">
        <p>Welcome to My Photo Voting App</p>
        <div className="btn-group">
          <button className="btn btn-primary">Vote</button>
          <button className="btn btn-secondary" onClick={arrange}>Arrange</button>
        </div>
      </div>
      {login ? <Login login={login} setLogin={setLogin} register={register} setRegister={setRegister} /> : null}
      {register ? <Register login={login} setLogin={setLogin} register={register} setRegister={setRegister} /> : null}
    </div>
  );
}

export default App;

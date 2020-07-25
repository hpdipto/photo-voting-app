import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

import CreatePoll from "./dashboard.components/create.component";
import DashboardBody from "./dashboard.components/dashboard.component";


function Dashboard({ loginStatus, setLoginStatus }) {

  const [user, setUser] = useState({});
  const [poll, setPoll] = useState(0);
  const history = useHistory();


  useEffect(() => {
    
    if(loginStatus === 0) {
      // unauthorized user tried to access dashboard
      setLoginStatus(3);
      history.push('/');
    }

    // if user is logged in and unauthorized user doesn't tried to access dashboard
    // we'll fetch the data
    if(loginStatus > 0 && loginStatus !== 3) {
      axios.get('/user/dashboard')
          .then(u => setUser(u.data));
    }

    // after a poll successfully created, unmount create poll component
    if(poll === 2) {
      setPoll(0);
    }

  }, [loginStatus, setLoginStatus, history, poll]);   // included  values to avoid warning


  const createPoll = () => {
    poll === 1 ? setPoll(0) : setPoll(1);
  }


  const logOut = () => {
    setUser({});
    axios.get('/user/logout')
        .then(res => {
          // after successful logout loginStatus become -1
          setLoginStatus(-1);
          history.push('/');
        })
        .catch(err => {
          console.log(err)
        });
  }


  return (

    <div>
      {/*nav bar*/}
      <div className="card card-body">
        <nav className="navbar navbar-light" style={{"backgroundColor": "#e3f2fd"}} >
          <p className="navbar-brand"> Dashboard for {user.name} </p>
          <div className="btn-group">
            <button onClick={createPoll} className="btn btn-outline-primary">Create Poll</button>
            <button onClick={logOut} className="btn btn-outline-danger">Log Out</button>
          </div>
        </nav>
      </div>

      <br />

      <div>
        {poll ? <CreatePoll poll={poll} setPoll={setPoll} /> : null}
      </div>

      <div>
        <DashboardBody />
      </div>
    </div>
    
  );
}

export default Dashboard;

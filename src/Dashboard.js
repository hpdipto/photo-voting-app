import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';

import CreatePoll from "./dashboard.components/create.component";
import DashboardBody from "./dashboard.components/dashboard.component";


function Dashboard({ loginStatus, setLoginStatus, user, setUser }) {

  const [poll, setPoll] = useState(0);
  const [polls, setPolls] = useState([]);
  const history = useHistory();


  useEffect(() => {
    
    if(loginStatus === 0) {
      // unauthorized user tried to access dashboard
      setLoginStatus(3);
      history.push('/');
    }

    axios.get('/poll')
          .then(res => {
            setPolls(res.data);
          });


    // after a poll successfully created, unmount create poll component
    if(poll === 2) {
      setPoll(0);
    }

  }, [loginStatus, setLoginStatus, history, poll, polls]);   // included  values to avoid warning


  const createPoll = () => {
    poll === 1 ? setPoll(0) : setPoll(1);
  }


  const logOut = () => {
    axios.get('/user/logout')
        .then(res => {
          // after successful logout loginStatus become -1
          // also set user object to empty {}
          setLoginStatus(-1);
          setUser({});
          history.push('/');
        })
        .catch(err => {
          console.log(err)
        });
  }


  return (

    <div className="container">
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
        {user.polls ? <DashboardBody polls={polls} /> : null}
      </div>
    </div>
    
  );
}

export default Dashboard;

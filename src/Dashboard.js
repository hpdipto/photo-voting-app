import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// import 'bootswatch/dist/superhero/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';


function Dashboard({ loginStatus, setLoginStatus }) {

  const [user, setUser] = useState({});
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
      axios.get('http://localhost:5000/user/dashboard')
          .then(u => setUser(u.data));
    }

  }, []);   // included  values to avoid warning


  const createPoll = () => {
    let data = {
          "pollTitle": "Photo Contest 2",
          "pollId": "abcd",
          "pollPasscode": "1234",
          "startDate": "07-21-2020",
          "endDate": "07-27-2020",
          "maxVoteLimit": 10,
          "createdBy": user.id
        };

    axios.post('http://localhost:5000/poll/create', data)
          .then(d => {
            alert('Poll Created!')
          })
          .catch(e => console.log(e));
  }


  const logOut = () => {
    setUser({});
    axios.get('http://localhost:5000/user/logout')
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
    <div className="card card-body">
      <nav className="navbar navbar-light" style={{"backgroundColor": "#e3f2fd"}} >
        <p className="navbar-brand"> Dashboard for {user.name} </p>
        <div className="btn-group">
          <button onClick={createPoll} className="btn btn-outline-primary">Create Poll</button>
          <button onClick={logOut} className="btn btn-outline-danger">Log Out</button>
        </div>
      </nav>
    </div>
  );
}

export default Dashboard;

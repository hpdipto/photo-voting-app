import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';

import OpenPoll from './poll.components/open.component';


function Poll({ loginStatus, setLoginStatus, user, setUser }) {

  let urlId = useLocation().pathname.slice(useLocation().pathname.lastIndexOf("/")+1);

  const [pollId, setPollId] = useState(urlId);
  const [poll, setPoll] = useState({});
  const history = useHistory();


  useEffect(() => {
    
    if(loginStatus === 0) {
      // unauthorized user tried to access poll
      setLoginStatus(3);
      history.push('/');
    }

    axios.get(`/poll/${pollId}`)
            .then(res => {
                console.log(res.data);
                setPoll(res.data);
            });


  }, []);   // included  values to avoid warning


  const dashboard = () => {
    history.push("/dashboard");
  }


  const logOut = () => {
    axios.get('/user/logout')
        .then(res => {
          // after successful logout loginStatus become -1
          // empty the user data
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
          <h4 className="navbar-brand">{poll.pollTitle}</h4> 
          <div className="btn-group">
            <button onClick={dashboard} className="btn btn-outline-primary">Dashboard</button>
            <button onClick={logOut} className="btn btn-outline-danger">Log Out</button>
          </div>
        </nav>
      </div>

      <br />

      <OpenPoll poll={poll} images={poll.imageList} />

    </div>
    
  );
}

export default Poll;

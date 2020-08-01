import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

import ResultPoll from './result.components/result.component';


function Result({ loginStatus, setLoginStatus, user, setUser }) {

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

    // we'll use axios token cancelation because
    // even after redirecting to some different location
    // axios will try to set `polls` value that causes an error
    // source: https://www.youtube.com/watch?v=_TleXX0mxaY
    let source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get(`/poll/result/${pollId}`, {
          cancelToken: source.token
        });
        setPoll(response.data);
      }
      catch {
        // empty
      }
    }

    fetchData();

    // clean up function for canceling axios request
    return () => {
      source.cancel();
    }

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

    <div>
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
        </div>

        <div className="container-fluid">
          <ResultPoll poll={poll} result={poll.result} />
        </div>
    </div>
    
  );
}

export default Result;

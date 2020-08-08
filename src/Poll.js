import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';

import OpenPoll from './poll.components/open.component';


function Poll({ loginStatus, setLoginStatus, user, setUser }) {

  let urlId = useLocation().pathname.slice(useLocation().pathname.lastIndexOf("/")+1);

  const [poll, setPoll] = useState({});
  const history = useHistory();
  const pollId = urlId;


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
        const response = await axios.get(`/api/poll/${pollId}`, {
          cancelToken: source.token
        });
        setPoll(response.data);
      }
      catch (error) {
        if(axios.isCancel(error)) {
          // console.log('caught cancel');
        }
        else {
          throw error;
        }
      }
      
    }

    fetchData();

    // clean up function for canceling axios request
    return () => {
      source.cancel();
    }

  }, [history, loginStatus, pollId, setLoginStatus]);   // included  values to avoid warning


  const dashboard = () => {
    history.push("/dashboard");
  }


  const logOut = () => {
    axios.get('/api/user/logout')
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
          <div className="card card-body" style={{backgroundColor: "transparent"}}>
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
          <OpenPoll poll={poll} images={poll.imageList} />
        </div>

        <div className="card card-body bottom mt-5" style={{backgroundColor: "transparent"}}>
          <div className="navbar navbar-light" style={{"backgroundColor": "#e3f2fd"}}>
            <div>
              <p>© 2020 Copyright: Haris Development</p>
            </div>
            <div>
              <button className="btn btn-link btn-lg" type="button"><i className="fa fa-facebook-f"></i></button>
              <button className="btn btn-link btn-lg" type="button"><i className="fa fa-twitter"></i></button>
              <button className="btn btn-link btn-lg" type="button"><i className="fa fa-linkedin"></i></button>
              <button className="btn btn-link btn-lg" type="button"><i className="fa fa-instagram"></i></button>
            </div>
          </div>
      </div>
      
    </div>
    
  );
}

export default Poll;

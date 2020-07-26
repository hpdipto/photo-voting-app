import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';


function Poll({ loginStatus, setLoginStatus }) {

  const [user, setUser] = useState({});
  const history = useHistory();


  useEffect(() => {
    
    if(loginStatus === 0) {
      // unauthorized user tried to access dashboard
      setLoginStatus(3);
      history.push('/');
    }


  }, [loginStatus, setLoginStatus, history]);   // included  values to avoid warning


  const dashboard = () => {
    history.push("/dashboard");
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

    <div className="container">
      {/*nav bar*/}
      <div className="card card-body">
        <nav className="navbar navbar-light" style={{"backgroundColor": "#e3f2fd"}} >
          <p className="navbar-brand"> Title </p>
          <div className="btn-group">
            <button onClick={dashboard} className="btn btn-outline-primary">Dashboard</button>
            <button onClick={logOut} className="btn btn-outline-danger">Log Out</button>
          </div>
        </nav>
      </div>

      <br />

    </div>
    
  );
}

export default Poll;

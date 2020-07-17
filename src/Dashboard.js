import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// import 'bootswatch/dist/superhero/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';



function Dashboard({ loginStatus, setLoginStatus }) {

  const [user, setUser] = useState({});
  const history = useHistory();

  if(loginStatus === 0) {
    setLoginStatus(2);
  }

  useEffect(() => {
    
    if(loginStatus === 2) {
      // unauthorized user tried to access dashboard
      history.push("/");
    }

    axios.get('http://localhost:5000/users/dashboard')
        .then(user => setUser(user.data));

  }, [loginStatus, history]);


  const viewUser = () => {
    console.log(user);
  }


  const logOut = () => {
    setUser({});
    axios.get('http://localhost:5000/users/logout')
        .then(res => {
          setLoginStatus(false);
          window.location = "/";
        })
        .catch(err => {
          console.log(err)
        });
  }


  return (
    <div className="card card-body">
      <nav className="navbar navbar-expand navbar-light" style={{"backgroundColor": "#e3f2fd"}} >
        <p className="navbar-brand"> {user.name}'s Dashboard </p>
        <div className="btn-group">
          <button onClick={viewUser} className="btn btn-outline-success">Data</button>
          <button onClick={logOut} className="btn btn-outline-danger">Log Out</button>
        </div>
      </nav>
    </div>
  );
}

export default Dashboard;

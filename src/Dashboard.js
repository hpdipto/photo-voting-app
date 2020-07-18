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

    if(loginStatus > 0 && loginStatus !== 3) {
      axios.get('http://localhost:5000/users/dashboard')
          .then(u => setUser(u.data));
    }

  }, []);   // included  values to avoid warning


  const viewUser = () => {
    console.log(user);
  }


  const logOut = () => {
    setUser({});
    axios.get('http://localhost:5000/users/logout')
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

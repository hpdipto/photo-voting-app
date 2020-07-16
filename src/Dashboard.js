import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import 'bootswatch/dist/superhero/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';



function Dashboard() {

  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/users/dashboard')
        .then(user => setUser(user.data));
  }, []);


  const viewUser = () => {
    console.log(user);
  }


  const logOut = () => {
    setUser({});
    axios.get('http://localhost:5000/users/logout')
        .then(res => {
          window.location = "/";
        })
        .catch(err => {
          console.log(err)
        });
  }


  return (
    <div className="card card-body">
      <nav className="navbar navbar-light" style={{"background-color": "#e3f2fd"}} >
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

import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import 'bootswatch/dist/superhero/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import Home from "./Home";
import Dashboard from "./Dashboard";


function App() {

  const [loginStatus, setLoginStatus] = useState(0);

  return (
    <Router>
      <Route path="/" exact component={() => <Home loginStatus={loginStatus} setLoginStatus={setLoginStatus} />} />
      <Route path="/dashboard" exact 
        component={() => <Dashboard loginStatus={loginStatus} setLoginStatus={setLoginStatus} />}
      />
    </Router>
  );
}

export default App;

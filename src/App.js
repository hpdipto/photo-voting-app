import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import 'bootswatch/dist/superhero/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import Home from "./Home";
import Dashboard from "./Dashboard";
import Poll from "./Poll";


function App() {

  const [login, setLogin] = useState(0);
  const [user, setUser] = useState({});

  return (
    <Router>
      <Route path="/" exact component={() => <Home loginStatus={login} setLoginStatus={setLogin} user={user} setUser={setUser}/>} />
      <Route path="/dashboard" exact 
              component={() => <Dashboard loginStatus={login} setLoginStatus={setLogin} user={user} setUser={setUser}/>} />
      <Route path="/poll/:id" exact component={() => <Poll loginStatus={login} setLoginStatus={setLogin} user={user} setUser={setUser} />} />
    </Router>
  );
}

export default App;

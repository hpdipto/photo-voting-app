import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import 'bootswatch/dist/superhero/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import Home from "./Home";
import Dashboard from "./Dashboard";
import Poll from "./Poll";
import Vote from "./Vote";


function App() {

  const [login, setLogin] = useState(0);
  const [user, setUser] = useState({});

  return (
    <Router>
      <Route exact path="/" component={() => <Home loginStatus={login} setLoginStatus={setLogin} user={user} setUser={setUser}/>} />
      <Route exact path="/dashboard" 
              component={() => <Dashboard loginStatus={login} setLoginStatus={setLogin} user={user} setUser={setUser}/>} />
      <Route exact path="/poll/:id" component={() => <Poll loginStatus={login} setLoginStatus={setLogin} user={user} setUser={setUser} />} />
      <Route exact path="/vote/:id" component={() => <Vote loginStatus={login} setLoginStatus={setLogin} user={user} setUser={setUser} />} />
    </Router>
  );
}

export default App;

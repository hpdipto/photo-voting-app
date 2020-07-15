import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import 'bootswatch/dist/superhero/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import Home from "./Home";
import Dashboard from "./Dashboard";


function App() {

  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/dashboard" exact component={Dashboard} />
    </Router>
  );
}

export default App;

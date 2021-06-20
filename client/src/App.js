import React from 'react';
import './App.css';
import Home from './components/Home';
import Admin from './components/Admin';
import User from './components/User';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/admin" component={Admin}></Route>
          <Route exact path="/user" component={User}></Route>
          <Route exact path="/usergame"></Route>
          <Route exact path="/admingame"></Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

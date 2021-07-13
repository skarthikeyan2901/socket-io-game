import React from 'react';
import './App.css';
import Home from './components/Home';
import Join from './components/Join';
import Game from './components/Game';
import Winner from './components/Winner';
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
          <Route exact path="/join" component={Join}></Route>
          <Route exact path="/game" component={Game}></Route>
          <Route exact path="/winner" component={Winner}></Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

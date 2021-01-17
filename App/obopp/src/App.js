import logo from './logo.svg';
import './App.css';
import React from "react";
import Camera from "./components/Camera"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import Dashboard from "./components/Dashboard"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Cookies from 'js-cookie';

function App() {
  let id = function() {
    if(Cookies.get('user-id')) {
      console.log('cookie found')
      return true
    } else {
      console.log('cookie not found')
      return false
    }
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signin">SignIn</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
            <li>
              <Link to="/ihatedarian">Camera</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        {id()
          ? // If logged in
            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route path="/ihatedarian">
                <Camera />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
            </Switch>
          : // Not logged in
            <Switch>
              <Route exact path="/">
                <SignIn />
              </Route>
              <Route path="/signin">
                <SignIn />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
            </Switch>
        }
      </div>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
} 
export default App
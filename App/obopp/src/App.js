import './App.css';
import React from "react";
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import NavigationBar from "./components/NavigationBar"
import Cookies from 'js-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {

  let id = function () {
    if (Cookies.get('user-id')) {
      console.log('cookie found')
      return true
    } else {
      console.log('cookie not found')
      return false
    }
  }

  return (
    <Router>
      {id() ?
        <Switch>
          <Route exact path="/">
            <NavigationBar />
          </Route>
        </Switch>
        :
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
    </Router>


  );
}

export default App
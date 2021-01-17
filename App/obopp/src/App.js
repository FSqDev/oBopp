import './App.css';
import React from "react";
import SignIn from "./components/SignIn"
import NavigationBar from "./components/NavigationBar"
import Cookies from 'js-cookie';

function App() {return (
  <NavigationBar>
    </NavigationBar>
  );
}

function Home() {
  let id = Cookies.get('socket-id');
  if (!id) {
    console.log('sign in pls');
    return SignIn();
  }
  console.log('already signed in');
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
} 
export default App
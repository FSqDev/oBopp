import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
import SignUp from './components/SignUp';

ReactDOM.render(
  <App />,
=======
import SignIn from './components/SignIn';
import Camera from './components/Camera';

ReactDOM.render(
  <Camera />,
>>>>>>> 260fe6f9e7622b16d8b429902a418a8fdd6bd7a1
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

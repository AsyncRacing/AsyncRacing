// Libraries
import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'

// Local imports
import './index.css'
import { Home } from './pages/Home/Home'
import { reportWebVitals } from './reportWebVitals'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: 'AIzaSyCiT4b8_qyC2ZxF95aRAdE8j4Kej3Dt9kk',
  authDomain: 'asyncracing-d5302.firebaseapp.com',
  databaseURL: 'https://asyncracing-d5302-default-rtdb.firebaseio.com',
  projectId: 'asyncracing-d5302',
  storageBucket: 'asyncracing-d5302.appspot.com',
  messagingSenderId: '468547346614',
  appId: '1:468547346614:web:0a5a388705b91b5b088617',
  measurementId: 'G-199TR40228',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

// Initialize React
ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

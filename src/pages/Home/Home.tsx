import React from 'react'
import './Home.css'
import { GetMapTrack } from '../../components/GetMapTrack/GetMapTrack'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Title } from './Title'
import firebase from 'firebase'

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
var db = firebase.firestore()

export { db }

// Initialize React

export function Home() {
  return (
    <Router>
      <Title />
      <div>
        <ul>
          <li>
            <Link to="/map1">Challenge1</Link>
          </li>
          <li>
            <Link to="/map2">Challenge2</Link>
          </li>
          <li>
            <Link to="/map3">Challenge3</Link>
          </li>
          <li>
            <Link to="/map4">Challenge4</Link>
          </li>
          <li>
            <Link to="/map4">Add New Challenge</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/map1">
            <GetMapTrack />
          </Route>
          <Route path="/map2">
            <GetMapTrack />
          </Route>
          <Route path="/map3">
            <GetMapTrack />
          </Route>
          <Route path="/map4">
            <GetMapTrack />
          </Route>
          <Route path="/map5">
            <GetMapTrack />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

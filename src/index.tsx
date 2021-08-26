import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'

import { IndexChallenges } from './pages/IndexChallenges/IndexChallenges'
import { NewChallenge } from './pages/NewChallenge/NewChallenge'
import { ShowChallenge } from './pages/ShowChallenge/ShowChallenge'
import { reportWebVitals } from './reportWebVitals'
import './index.css'
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <React.StrictMode>
    {/* 👮 I will help redirect URL traffic! 🚥 */}
    <Router>
      <Switch>
        <Route path="/challenges/new">
          <NewChallenge />
        </Route>

        <Route path="/challenges/:challengeId">
          <ShowChallenge />
        </Route>

        <Route path="/challenges">
          <Redirect to="/" />
        </Route>

        <Route path="/">
          <IndexChallenges />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

import React from 'react'
import './Home.css'
import { GetMapTrack } from '../../components/GetMapTrack/GetMapTrack'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Title } from './Title'

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
        </Switch>
      </div>
    </Router>
  )
}

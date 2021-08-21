import React from 'react'
import './Home.css'
import { GetMapTrack } from '../../components/GetMapTrack/GetMapTrack'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Title } from './Title'
import firebase from 'firebase'
// import 'firebase/database'
// import 'firebase/auth'
// import { FirebaseDatabaseProvider } from '@react-firebase/database'
// import { render } from '@testing-library/react'
// import {
//   FirebaseDatabaseProvider,
//   FirebaseDatabaseNode,
// } from '@react-firebase/database'
//import { config } from 'process'

//const s = (a: any) => JSON.stringify(a, null, 2)

export type AppState = {
  limit: number
}

export { firebase }

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

// export class Home extends React.Component<any, AppState> {
//   state = {
//     limit: 2,
//   }
//   render() {
//     return (
//       <div>
//         <FirebaseDatabaseProvider firebase={firebase} {...config}>
//           <FirebaseDatabaseNode
//             path="user_bookmarks/"
//             limitToFirst={this.state.limit}
//             //orderByKey
//             orderByValue={'created_on'}
//           >
//             {(d) => {
//               return (
//                 <>
//                   <pre>Path {d.path}</pre>
//                   <pre style={{ height: 300, overflow: 'auto' }}>
//                     Value {s(d.value)}
//                   </pre>
//                   <button
//                     onClick={() => {
//                       this.setState((state) => ({ limit: state.limit + 2 }))
//                     }}
//                   >
//                     Load more
//                   </button>
//                 </>
//               )
//             }}
//           </FirebaseDatabaseNode>
//         </FirebaseDatabaseProvider>
//       </div>
//     )
//   }
// }

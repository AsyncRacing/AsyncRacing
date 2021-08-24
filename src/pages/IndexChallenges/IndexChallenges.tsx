import React from 'react'
import { Link } from 'react-router-dom'

const IndexChallenges = () => {
  // get challenges from firebase DB
  const challenges: Array<any> = [
    'test challenge 1',
    'challenge 2',
    'other challenge',
  ]
  return (
    <>
      <h2>Home</h2>
      <ul>
        {challenges.map((challenge, challengeID) => {
          return (
            <li>
              <Link to={`/challenges/${challengeID}`}>
                Challenge: {challenge}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to="/challenges/new">New Challenge</Link>
    </>
  )
}

export { IndexChallenges }

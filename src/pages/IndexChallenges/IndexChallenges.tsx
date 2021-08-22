import React from 'react'

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
              <a href={`./challenges/${challengeID}`}>{challenge}</a>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export { IndexChallenges }

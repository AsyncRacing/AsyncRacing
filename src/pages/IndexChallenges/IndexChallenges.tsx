import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Challenge } from '../../model/ChallengeConfiguration'
import { firebaseDB } from '../../model/firebase-config'

const IndexChallenges = () => {
  // get challenges from firebase DB
  const [challengeDB, setChallengeDB] = useState<Record<string, Challenge>>({})
  //const challengeDBRef = firebaseDB.ref(`challenges/${challengeID}`)
  useEffect(() => {
    ;(async () => {
      const challengesFromDB = (await firebaseDB.ref('challenges').get()).val()
      Object.values(challengesFromDB).forEach((challenge: any) => {
        challenge.tracks = {}
        challenge.tracks = Object.values(challenge.tracks)
      })
      setChallengeDB(challengesFromDB)
    })()
  })

  console.log(challengeDB)

  return (
    <>
      <h2>Home</h2>
      <ul>
        {Object.entries(challengeDB).map(([challengeID, challenge]) => {
          return (
            <li>
              <Link to={`/challenges/${challengeID}`}>
                Challenge: {challenge.metadata.title}
                <ul>Creator: {challenge.metadata.creator}</ul>
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

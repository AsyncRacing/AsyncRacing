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

  //   challengeDBRef.on('challenge added', (challenge) => {
  //     const key: string = challenge.key as string
  //     const cRef = firebaseDB.ref(`challenges/${key}`)
  //     cRef.on('value', (snap) => {
  //       setChallengeDB((metadata) => {
  //         return { ...metadata, [key]: snap.val() }
  //       })
  //     })
  //   })
  //   return () => {
  //     list.forEach((ref) => ref.off())
  //   }
  // }, [])
  const challenges: Array<any> = [
    'test challenge 1',
    'challenge 2',
    'other challenge',
  ]
  return (
    <>
      <h2>Home</h2>
      <p>
        {Object.keys(challengeDB).map((challengeID) => (
          <p>{challengeID}</p>
        ))}
      </p>
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

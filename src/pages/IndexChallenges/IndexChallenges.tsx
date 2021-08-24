import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useObjectVal } from 'react-firebase-hooks/database'
import { ChallengeSchema } from '../../model/ChallengeConfiguration'
import { firebaseDB } from '../../model/firebase-config'

const IndexChallenges = () => {
  // get challenges from firebase DB
  const [challenges, loading, error] = useObjectVal<ChallengeSchema>(
    firebaseDB.ref('challenges'),
  )

  return (
    <>
      <h2>Home</h2>
      {challenges && (
        <ul>
          {Object.entries(challenges).map(([challengeID, challenge]) => {
            return (
              <li>
                <Link to={`/challenges/${challengeID}`}>
                  <span>
                    Challenge: {challenge.metadata.title} <br />
                    Creator: {challenge.metadata.creator}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
      {loading && (
        <p>
          <em>Loading Database...</em>
        </p>
      )}
      {error && (
        <p>
          <strong>Database Error!</strong>
        </p>
      )}

      <Link to="/challenges/new">New Challenge</Link>
    </>
  )
}

export { IndexChallenges }

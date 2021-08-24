import React, { useEffect, useState } from 'react'
import { useObjectVal } from 'react-firebase-hooks/database'
import { useParams } from 'react-router-dom'
import {
  ChallengeSchema,
  TrackSchema,
} from '../../model/ChallengeConfiguration'
import { firebaseDB } from '../../model/firebase-config'

interface Params {
  challengeId: string
}

const ShowChallenge = () => {
  const { challengeId } = useParams<Params>()

  // Get challenge data
  const [
    challenge,
    challengeLoading,
    challengeError,
  ] = useObjectVal<ChallengeSchema>(firebaseDB.ref('challenges/' + challengeId))

  // Get tracks data
  const [tracks, tracksLoading, tracksError] = useObjectVal<
    Record<string, TrackSchema>
  >(firebaseDB.ref('tracks'))

  console.log(challenge)

  return (
    <>
      {(challengeError || tracksError) && (
        <p>
          <strong>Error!</strong>
        </p>
      )}
      {(challengeLoading || tracksLoading) && (
        <p>
          <em>Loading...</em>
        </p>
      )}
      {challenge && tracks && (
        <>
          <p>{challenge.metadata.title}</p>
          <p>Tracks: {challenge.tracks.join(', ')}</p>
        </>
      )}
    </>
  )
}

export { ShowChallenge }

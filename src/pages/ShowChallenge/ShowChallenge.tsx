import React from 'react'
import { useObjectVal } from 'react-firebase-hooks/database'
import { useParams } from 'react-router-dom'
import {
  ChallengeSchema,
  Track,
  TrackSchema,
} from '../../model/ChallengeConfiguration'

/* component imports */
//import { RaceMap } from '../../components/RaceMap/RaceMap'
import { Timer } from '../../components/Timer/Timer'

/* helper imports */
import { firebaseDB } from '../../model/firebase-config'

interface Params {
  challengeId: string
}
/* react components */
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
          <div
            style={{
              zIndex: 2,
              position: 'relative',
            }}
          >
            <p>Track Times</p>
            <ul>
              {challenge.tracks.map((trackID) => {
                const track = tracks[trackID]
                return (
                  <li key={trackID}>
                    <p>{track.metadata.title}</p>
                    <Timer track={track as Track} course={challenge.course} />
                  </li>
                )
              })}
            </ul>
          </div>
        </>
      )}
    </>
  )
}

export { ShowChallenge }

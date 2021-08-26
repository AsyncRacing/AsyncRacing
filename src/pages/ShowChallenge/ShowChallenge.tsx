import React, { useEffect, useState } from 'react'
import { useObjectVal } from 'react-firebase-hooks/database'
import { useParams } from 'react-router-dom'
import {
  ChallengeSchema,
  Track,
  TrackSchema,
} from '../../model/ChallengeConfiguration'
//import { RaceMap } from '../../components/RaceMap/RaceMap'

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
  const [trackSchemas, tracksLoading, tracksError] = useObjectVal<
    Record<string, TrackSchema>
  >(firebaseDB.ref('tracks'))
  const [tracks, setTracks] = useState<Record<string, Track>>({})

  useEffect(() => {
    Object.entries(trackSchemas ?? {}).forEach(([trackID, trackSchema]) => {
      const path = trackSchema.path.map((schemaStep) => {
        return {
          ...schemaStep,
          time: new Date(schemaStep.time),
        }
      })
      tracks[trackID] = { ...trackSchema, path }
    })
    setTracks(tracks)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Object.keys(trackSchemas ?? {}).length, trackSchemas])
  return (
    <>
      {/* <RaceMap
        course={challenge?.course ?? { start: null, finish: null }}
        tracks={Object.values(tracks)}
      /> */}
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

      {challenge && trackSchemas && Object.keys(tracks).length > 0 && (
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
                    <Timer track={track} course={challenge.course} />
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

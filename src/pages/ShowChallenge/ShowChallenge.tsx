import React, { useEffect, useState } from 'react'
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
  const [trackSchemas, tracksLoading, tracksError] = useObjectVal<
    Record<string, TrackSchema>
  >(firebaseDB.ref('tracks'))

  const [tracks, setTracks] = useState<Record<string, Track>>({})
  const tracksLength = Object.keys(trackSchemas ?? {}).length

  // useMemo instead of useEffect
  // no need for [tracks, setTracks] = useState(...)
  useEffect(() => {
    const newTracks: Record<string, Track> = {}
    Object.entries(trackSchemas ?? {}).forEach(([trackId, trackSchema]) => {
      newTracks[trackId] = {
        ...trackSchema,
        path: trackSchema.path.map((step) => ({
          ...step,
          time: new Date(step.time),
        })),
      }
    })
    setTracks(newTracks)
  }, [tracksLength, trackSchemas])

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

      {challenge && Object.keys(tracks).length > 0 && trackSchemas && (
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
              {challenge.tracks.map((trackId) => {
                const track = tracks[trackId]
                return (
                  <li key={trackId}>
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

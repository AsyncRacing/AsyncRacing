import React, { useMemo } from 'react'
import { useObjectVal } from 'react-firebase-hooks/database'
import { useParams } from 'react-router-dom'
import {
  ChallengeSchema,
  Step,
  Track,
  TrackSchema,
} from '../../model/ChallengeConfiguration'

/* component imports */
//import { RaceMap } from '../../components/RaceMap/RaceMap'
import { Timer } from '../../components/Timer/Timer'

/* helper imports */
import { firebaseDB } from '../../model/firebase-config'
import { RaceMap } from '../../components/RaceMap/RaceMap'
import { UploadButton } from '../../components/UploadButton/UploadButton'
import { useFiles, useTracks } from '../../model/useFiles'

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

  // Get Track data, starting with the schemas.
  const [trackSchemas, tracksLoading, tracksError] = useObjectVal<
    Record<string, TrackSchema>
  >(firebaseDB.ref('tracks'))

  // Use memoization on tracks via spreadTracks to get tracks variable.
  const spreadTracks = (trackSchemas: Record<string, TrackSchema>) => {
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
    return newTracks
  }
  // See? Getting the tracks here!
  const tracks = useMemo(() => spreadTracks(trackSchemas ?? {}), [trackSchemas])

  // Now, we have to keep the state of the files from the User's UploadButton.
  const [files, , addFiles, clearFiles] = useFiles()
  const userTracks = useTracks(files)

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
          <div
            style={{
              zIndex: 2,
              position: 'relative',
            }}
          >
            <p>{challenge.metadata.title}</p>
            <p>Tracks: {challenge.tracks.join(', ')}</p>
            <form
              onSubmit={async (e) => {
                e.preventDefault()

                // Refer to the challenges object and tracks object.
                const challengeTracksRef = firebaseDB.ref(
                  `challenges/${challengeId}/tracks`,
                )
                const tracksRef = firebaseDB.ref('tracks')

                // Create a new trackRef for each track.
                const newTrackRefs = userTracks.map((track) => {
                  // Fix the time to use json date string before upload.
                  const fixedPath = track.path.map((step: Step) => ({
                    ...step,
                    time: step.time.toJSON(),
                  }))

                  const newTrackRef = tracksRef.push({
                    ...track,
                    path: fixedPath,
                  })
                  return newTrackRef
                })

                // Get the IDs of the tracks.
                const newTrackIds = newTrackRefs.map((ref) => ref.key)
                const newTrackSchemas = [...challenge.tracks, ...newTrackIds]
                challengeTracksRef.set(newTrackSchemas)
              }}
            >
              {/* Show the upload button */}
              <UploadButton
                files={files}
                addFiles={addFiles}
                clearFiles={clearFiles}
              />

              {/*
                Unfortunately we need a way to trigger
                the upload, so here's another button
              */}
              <button type="submit">Upload Tracks!</button>
            </form>
            {/* Temporary placeholder list for track times */}
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

          {/* The map plus challenge lines */}
          <RaceMap tracks={Object.values(tracks)} />
        </>
      )}
    </>
  )
}

export { ShowChallenge }

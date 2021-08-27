import React, { useMemo } from 'react'
import { useObjectVal } from 'react-firebase-hooks/database'
import { useParams } from 'react-router-dom'

/* component imports */
import { Timer } from '../../components/Timer/Timer'
import { RaceMap } from '../../components/RaceMap/RaceMap'
import { UploadButton } from '../../components/UploadButton/UploadButton'
import { Navbar } from '../../components/Navbar/Navbar'

/* helper imports */
import { firebaseDB } from '../../model/firebase-config'
import { useFiles, useTracks } from '../../model/useFiles'
import {
  Challenge,
  ChallengeSchema,
  Step,
  Track,
  TrackSchema,
} from '../../model/ChallengeConfiguration'

/* styling imports */
import { Container, Header, Table, Button } from 'semantic-ui-react'

/* helpers */
const formatPathTimes = (
  trackSchemaPath: TrackSchema['path'],
): Track['path'] => {
  const trackPath = trackSchemaPath.map((schemaStep) => ({
    ...schemaStep,
    time: new Date(schemaStep.time),
  }))
  return trackPath
}

interface Params {
  challengeId: string
}
/* react components */
const ShowChallenge = () => {
  const { challengeId } = useParams<Params>()

  // Get Track data, starting with the schemas.
  const [tracksSchema, tracksLoading, tracksError] = useObjectVal<
    Record<string, TrackSchema>
  >(firebaseDB.ref('tracks'))

  // Get challenge data too
  const [
    challengeSchema,
    challengeLoading,
    challengeError,
  ] = useObjectVal<ChallengeSchema>(firebaseDB.ref('challenges/' + challengeId))

  // Generate a dictionary of id/track pairs from the given schema.
  const tracksById: Record<string, Track> | null = useMemo(() => {
    if (tracksSchema == null || challengeSchema == null) {
      return null
    }
    const tracksById: Record<string, Track> = {}
    const trackIds = challengeSchema.tracks
    trackIds.forEach((trackId) => {
      const trackSchema: TrackSchema = tracksSchema[trackId]
      const track: Track = {
        ...trackSchema,
        path: formatPathTimes(trackSchema.path),
      }
      track.metadata.id = trackId
      tracksById[trackId] = track
    })
    return tracksById
  }, [challengeSchema, tracksSchema])

  // Generate a challenge from the given schema (and include id).
  const challenge: Challenge | null = useMemo(() => {
    if (tracksById == null || challengeSchema == null) {
      return null
    }
    const tracks = Object.values(tracksById)
    const challenge = { ...challengeSchema, tracks }
    challenge.metadata.id = challengeId
    return challenge
  }, [challengeId, challengeSchema, tracksById])

  // Now, we have to keep the state of the files from the User's UploadButton.
  const [files, , addFiles, clearFiles] = useFiles()
  const userTracks = useTracks(files)

  return (
    <>
      <Container
        style={{
          zIndex: 2,
          position: 'relative',
        }}
      >
        <Navbar />
      </Container>
      <Container>
        <div
          style={{
            zIndex: 2,
            position: 'absolute',
            right: 20,
            top: 20,
          }}
        >
          {/* Error State */}
          {(challengeError || tracksError) && (
            <p>
              <strong>Error!</strong>
            </p>
          )}

          {/* Loading State */}
          {(challengeLoading || tracksLoading) && (
            <p>
              <em>Loading...</em>
            </p>
          )}

          {/* Done State */}
          {challenge && tracksById && (
            <>
              <form
                onSubmit={async (e) => {
                  e.preventDefault()

                  // Refer to the challenges object and tracks object.
                  const challengeTracksRef = firebaseDB.ref(
                    `challenges/${challengeId}/tracks`,
                  )
                  const tracksRef = firebaseDB.ref('tracks')

                  // Create a new trackRef for each user-selected track.
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
                  challengeTracksRef.set([
                    ...challenge.tracks.map(
                      (track: Track): string => track.metadata.id as string,
                    ),
                    ...newTrackIds,
                  ])

                  clearFiles()
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
                <Button fluid type="submit" color="green">
                  Upload Tracks!
                </Button>
              </form>

              {/* Temporary placeholder list for track times */}
              <Header textAlign="center" content="Track Times"></Header>
              <Table celled striped singleline collapsing>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Race ID</Table.HeaderCell>
                    <Table.HeaderCell>Time</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {challenge.tracks.map((track) => {
                    return (
                      <Table.Row>
                        <Table.Cell key={track.metadata.id}>
                          {track.metadata.title}
                        </Table.Cell>
                        <Table.Cell>
                          <Timer track={track} course={challenge.course} />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </>
          )}
        </div>
      </Container>

      {/* The map plus challenge lines */}
      <RaceMap tracks={[...userTracks, ...Object.values(tracksById ?? {})]} />
    </>
  )
}

export { ShowChallenge }

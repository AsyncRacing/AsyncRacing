/* module imports */
import React, { useState, useEffect } from 'react'

/* local imports */
import { ChallengeMap } from '../Map/ChallengeMap'
import { useFiles } from '../../model/useFiles'
import { useFilesToTextMap } from '../../model/useFileToText'
import { useFilesToPathMap } from '../../model/useTextToPath'
import { Challenge, Track, TrackPath } from '../../model/ChallengeConfiguration'
import { UploadButton } from '../UploadButton/UploadButton'
import { Link } from 'react-router-dom'
import { Form } from '../Form/Form'
import { Timer } from '../Timer/Timer'

/* helpers & constants */
// This will initialize a challenge from a couple of lines.

/* react components */
const GetMapTrack = () => {
  const emptyChallenge: Challenge = {
    start: null,
    finish: null,
  }
  const [challenge, setChallenge] = useState<Challenge>(emptyChallenge)
  // File upload manipulation
  const [files, , addFiles, clearFiles] = useFiles()
  // Map data to different types so our app can understand
  const filesToTextMap: Map<File, string> = useFilesToTextMap(files)
  const filesToPathMap: Map<File, Array<TrackPath>> = useFilesToPathMap(
    filesToTextMap,
  )
  const [tracks, setTracks] = useState<Array<Track>>([])
  useEffect(() => {
    // This useEffect maps the changes to a type that our app understands.
    // For example, "tracks" in ChallengeMap need to be formatted differently
    //   than "tracks" in the default GeoJSON format or the GpxParser format.
    setTracks(
      [...filesToPathMap.entries()]
        .map(([file, trackPaths]) => {
          return trackPaths.map((trackPath) => ({
            name: file.name,
            path: trackPath,
            color: [0, 0, 255] as [red: number, green: number, blue: number],
          }))
        })
        .flat(1),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesToPathMap.size])

  // When tracks changes, and start and finish are null,
  //  the Challenge will automatically update to the track's start and finish point.
  useEffect(() => {
    let { start, finish } = challenge
    if (tracks.length > 0) {
      if (challenge.start === null) {
        const startPoint = tracks[0].path[0]
        const startLatNudge = startPoint.latitude - 1 / 64
        start = [{ ...startPoint }, { ...startPoint, latitude: startLatNudge }]
      }
      if (challenge.finish === null) {
        const finishPoint = tracks[0].path[tracks[0].path.length - 1]
        const finishLatNudge = finishPoint.latitude + 1 / 64
        finish = [
          { ...finishPoint },
          { ...finishPoint, latitude: finishLatNudge },
        ]
      }
    }
    setChallenge({ ...challenge, start, finish })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks.length])

  return (
    <>
      <ChallengeMap
        challenge={challenge}
        setChallenge={setChallenge}
        tracks={tracks}
      />
      {/* Need to fix width and spacing for p tag and Timer tag and Upload Button div */}
      <div
        style={{
          zIndex: 2,
          position: 'relative',
        }}
      >
        <Form files={files} addFiles={addFiles} clearFiles={clearFiles} />
        <Link to="/">Back</Link>
        <UploadButton
          files={files}
          addFiles={addFiles}
          // setFiles={setFiles}
          clearFiles={clearFiles}
        />
        <p>Track Times</p>
        <ul>
          {tracks.map((track, id) => {
            return (
              <li key={id}>
                <p>{track.name}</p>
                <Timer track={track} challenge={challenge} />
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export { GetMapTrack }

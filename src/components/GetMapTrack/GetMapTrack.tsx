/* module imports */
import React, { useState, useEffect } from 'react'

/* local imports */
import { ChallengeMap } from '../Map/ChallengeMap'
import { UploadButton } from '../UploadButton/UploadButton'
import { useFiles } from '../../model/useFiles'
import { GPXFile } from '../../model/gpx-file'
import { Challenge, Track } from '../../model/ChallengeConfiguration'
import { Timer } from '../Timer/Timer'

/* react components */
const GetMapTrack = () => {
  const emptyChallenge: Challenge = {
    course: {
      start: null,
      finish: null,
    },
    tracks: [],
    metadata: {},
  }
  const [challenge, setChallenge] = useState<Challenge>(emptyChallenge)
  // File upload manipulation
  const [files, , addFiles, clearFiles] = useFiles()
  const [tracks, setTracks] = useState<Array<Track>>([])
  useEffect(
    () => {
      ;(async () => {
        const trackListPromises = files.map((file: GPXFile) => file.tracks())
        const trackList = await Promise.all(trackListPromises)
        setTracks(trackList.flat())
      })()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [files.length],
  )

  // When tracks changes, and start and finish are null,
  //  the Challenge will automatically update to the track's start and finish point.
  useEffect(() => {
    let { start, finish } = challenge.course
    if (tracks.length > 0) {
      if (start === null) {
        const startPoint = tracks[0].path[0]
        const startLatNudge = startPoint.latitude - 1 / 64
        start = [{ ...startPoint }, { ...startPoint, latitude: startLatNudge }]
      }
      if (finish === null) {
        const finishPoint = tracks[0].path[tracks[0].path.length - 1]
        const finishLatNudge = finishPoint.latitude + 1 / 64
        finish = [
          { ...finishPoint },
          { ...finishPoint, latitude: finishLatNudge },
        ]
      }
    }
    setChallenge({
      ...challenge,
      course: { ...challenge.course, start, finish },
    })
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
                <p>{track.metadata.title}</p>
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

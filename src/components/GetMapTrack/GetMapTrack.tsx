/* module imports */
import React, { useState, useEffect } from 'react'

/* local imports */
import { ChallengeMap } from '../Map/ChallengeMap'
import { UploadButton } from '../UploadButton/UploadButton'
import { useFiles } from '../../model/useFiles'
import { GPXFile } from '../../model/gpx-file'
import { Challenge, Track } from '../../model/ChallengeConfiguration'
import { defaultChallenge } from '../../examples/default-challenge'

/* helpers & constants */
// This will initialize a challenge from a couple of lines.
type color = [red: number, green: number, blue: number]

/* react components */
const GetMapTrack = () => {
  const [challenge, setChallenge] = useState<Challenge>(defaultChallenge)
  // File upload manipulation
  const [files, , addFiles, clearFiles] = useFiles()
  const [tracks, setTracks] = useState<Array<Track>>([])
  useEffect(
    () => {
      ;(async () => {
        const gpxPromises = files.map((file: GPXFile) => file.gpx())
        const gpxParsers = await Promise.all(gpxPromises)

        // Get all the tracks from the parsers now.
        const newTracks: Array<Track> = []
        gpxParsers.forEach((gpx, index) => {
          const file = files[index]

          // A file can have more than one track.
          // Add each one, even if there is only one.
          gpx.tracks.forEach((track) => {
            newTracks.push({
              name: file.name,
              color: [255, 0, 0] as color,
              path: track.points.map((point) => ({
                latitude: point.lat,
                longitude: point.lon,
                time: point.time,
              })),
            })
          })
        })

        // Set the tracks
        setTracks(newTracks)
      })()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [files.length],
  )

  return (
    <>
      <ChallengeMap
        challenge={challenge}
        setChallenge={setChallenge}
        tracks={tracks}
      />

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
      </div>
    </>
  )
}

export { GetMapTrack }

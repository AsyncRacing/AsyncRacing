/* module imports */
import React, { useState, useEffect } from 'react'

/* local imports */
import { ChallengeMap } from '../Map/ChallengeMap'
import { UploadButton } from '../UploadButton/UploadButton'
import { useFiles } from '../../model/useFiles'
import { useFilesToTextMap } from '../../model/useFileToText'
import { useFilesToPathMap } from '../../model/useTextToPath'
import { Challenge, Track, TrackPath } from '../../model/ChallengeConfiguration'

/* helpers & constants */
// This will initialize a challenge from a couple of lines.
const defaultChallenge: Challenge = {
  start: [
    {
      longitude: -122.4,
      latitude: 37.7,
    },
    {
      longitude: -122.4,
      latitude: 37.8,
    },
  ],
  finish: [
    {
      longitude: -122.5,
      latitude: 37.7,
    },
    {
      longitude: -122.5,
      latitude: 37.8,
    },
  ],
}

/* react components */
const GetMapTrack = () => {
  const [challenge, setChallenge] = useState<Challenge>(defaultChallenge)
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

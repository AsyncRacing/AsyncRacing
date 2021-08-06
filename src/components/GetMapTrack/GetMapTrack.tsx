import React, { useState } from 'react'
import { ChallengeMap } from '../Map/ChallengeMap'
import { UploadButton } from '../UploadButton/UploadButton'
import { useFiles } from '../../model/useFiles'
import { useFilesToTextMap } from '../../model/useFileToText'
import { useFilesToPathMap } from '../../model/useTextToPath'
import { Track, TrackPath } from '../../model/ChallengeConfiguration'
import { useEffect } from 'react'

const GetMapTrack = () => {
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
  }, [filesToPathMap.size])

  return (
    <>
      <ChallengeMap tracks={tracks} />

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

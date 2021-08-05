import React, { useState } from 'react'
import { ChallengeMap } from '../Map/ChallengeMap'
import { UploadButton } from '../UploadButton/UploadButton'
import { useFiles } from '../../model/useFiles'
import { useFilesToTextMap } from '../../model/useFileToText'
import { useFilesToTrackMap } from '../../model/useTextToPath'
import { Track } from '../../model/ChallengeConfiguration'
import { useEffect } from 'react'

const GetMapTrack = () => {
  const [files, , addFiles, clearFiles] = useFiles()
  // file upload manipulation
  const fileTextMap = useFilesToTextMap(files)
  const filePathMap = useFilesToTrackMap(files, fileTextMap)

  // Testing. This should console.log only when filePathMap changes.
  useEffect(() => {
    console.log('FILES HAVE CHANGED')
    console.log(files)
  }, [files.length])

  useEffect(() => {
    console.log('TEXT MAP HAS CHANGED')
    console.log(fileTextMap)
  }, [fileTextMap.size])

  useEffect(() => {
    console.log('PATH MAP HAS ALSO CHANGED')
    console.log(filePathMap)
  }, [filePathMap.size])

  /*
  const [tracks, setTracks] = useState<Array<Track>>([])
  useEffect(() => {
    console.log('TRANSFORMING STEP!')
    console.log(filePathMap)
    setTracks(
      [...filePathMap.entries()]
        .map(([file, trackPaths]) => {
          return trackPaths.map((trackPath) => ({
            name: file.name,
            path: trackPath,
            color: [0, 0, 255] as [red: number, green: number, blue: number],
          }))
        })
        .flat(1),
    )
  }, [filePathMap])
  */

  return (
    <>
      {/* <ChallengeMap tracks={tracks} /> */}

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

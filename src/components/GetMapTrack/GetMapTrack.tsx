import React from 'react'
import { ChallengeMap } from '../Map/ChallengeMap'
import { UploadButton } from '../UploadButton/UploadButton'
import { useFiles } from '../../model/useFiles'
import { useFilesToTextMap } from '../../model/useFileToText'
import { useFilesToTrackMap } from '../../model/useTextToPath'

const GetMapTrack = () => {
  const [files, , addFiles, clearFiles] = useFiles()
  // file upload manipulation
  const fileTextMap = useFilesToTextMap(files)
  const filePathMap = useFilesToTrackMap(files, fileTextMap)
  return (
    <>
      <ChallengeMap
        tracks={[...filePathMap.entries()]
          .map(([file, trackPaths]) => {
            return trackPaths.map((trackPath) => ({
              name: file.name,
              path: trackPath,
              color: [
                255 * Math.random(),
                255 * Math.random(),
                255 * Math.random(),
              ] as [red: number, green: number, blue: number],
            }))
          })
          .flat(1)}
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

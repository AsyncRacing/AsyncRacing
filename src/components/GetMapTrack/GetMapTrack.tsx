import React from 'react'
import { ChallengeMap } from '../Map/ChallengeMap'
import { UploadButton } from '../UploadButton/UploadButton'
import { useFiles } from '../../model/useFiles'
import { useFilesToTextMap } from '../../model/useFileToText'
import { parseGpxData } from '../../model/useTextToPath'

const GetMapTrack = () => {
  const [files, , addFiles, clearFiles] = useFiles()
  // file upload manipulation
  const fileTextMap = useFilesToTextMap(files)
  return (
    <>
      <ChallengeMap
        tracks={[...fileTextMap.entries()].map(([file, fileText]) => ({
          name: file.name,
          path: parseGpxData(fileText ?? ''),
          color: [0, 0, 255],
        }))}
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

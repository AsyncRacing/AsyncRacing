import React from 'react'
import { UploadButton } from '../UploadButton/UploadButton'
import { useFiles } from '../../model/useFiles'

const GetMapTrack = () => {
  const [files, , addFiles, clearFiles] = useFiles()
  // // file upload manipulation
  // const fileText = useFileToText(file)
  return (
    <>
      {/*
      <ChallengeMap
        tracks={[
          {
            name: file?.name ?? 'no track selected',
            path: parseGpxData(fileContent ?? ''),
            color: [0, 0, 255],
          },
        ]}
      />
      */}

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

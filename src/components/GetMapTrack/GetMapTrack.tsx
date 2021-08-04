import React from 'react'
import { UploadButton } from '../UploadButton/UploadButton'
import { useStateFiles } from '../UploadButton/useStateFiles'

const GetMapTrack = () => {
  const [files, , addFiles, clearFiles] = useStateFiles()
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

/* module imports */
import React, { useState } from 'react'

/* local imports */
import { ChallengeMap } from '../Map/ChallengeMap'
import { UploadButton } from '../UploadButton/UploadButton'
import { useFileContent } from '../UploadButton/useFileContent'
import { Challenge } from '../../model/ChallengeConfiguration'
import { parseGpxData } from '../../model/parser'

/* helpers & constants */
// This will initialize a challenge from a couple of lines.
const defaultChallenge: Challenge = {
  start: {
    firstPoint: {
      lon: -122.4,
      lat: 37.7,
    },
    secondPoint: {
      lon: -122.4,
      lat: 37.8,
    },
  },
  finish: {
    firstPoint: {
      lon: -122.5,
      lat: 37.7,
    },
    secondPoint: {
      lon: -122.5,
      lat: 37.8,
    },
  },
}

/* react components */
const GetMapTrack = () => {
  const [file, setFile] = useState<File | null>(null)
  const [challenge, setChallenge] = useState<Challenge>(defaultChallenge)
  const fileContent = useFileContent(file)
  return (
    <>
      <ChallengeMap
        challenge={challenge}
        setChallenge={setChallenge}
        tracks={[
          {
            name: file?.name ?? 'no track selected',
            path: parseGpxData(fileContent ?? ''),
            color: [0, 0, 255],
          },
        ]}
      />

      <div
        style={{
          zIndex: 2,
          position: 'relative',
        }}
      >
        <UploadButton setFile={setFile} />
      </div>
    </>
  )
}

export { GetMapTrack }

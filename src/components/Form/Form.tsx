import React, { useState } from 'react'
import './Form.css'
import { UploadButton } from '../UploadButton/UploadButton'
import { Challenge, Course } from '../../model/ChallengeConfiguration'
import { GPXFile } from '../../model/gpx-file'
import { title } from 'process'
import { firebaseDB } from '../../model/firebase-config'
import { useTracks } from '../../model/useFiles'

interface FormProps {
  addFiles: (file: any) => void
  clearFiles: () => void
  files: Array<GPXFile>
  course: Course
}

export const Form = ({ files, addFiles, clearFiles, course }: FormProps) => {
  const tracks = useTracks(files)
  const [metadata, setMetadata] = useState<Challenge['metadata']>({})

  return (
    <div className="wrapper">
      <div>
        <h1>AsyncRacing</h1>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const challengesRef = firebaseDB.ref('challenges')
          const newChallengeRef = challengesRef.push({
            course: {
              start: null,
              finish: null,
            },
            tracks: [],
            metadata: {},
          })
          newChallengeRef.set({
            tracks: tracks,
            course: course,
            metadata: {
              title: title,
              description: metadata.description,
              creator: metadata.creator,
            },
          })
        }}
      >
        <fieldset>
          <label>
            <p>Creator's Name</p>
            <input
              name="creator"
              value={metadata.creator}
              onChange={(e) => {
                const creator = e.target.value
                setMetadata({
                  ...metadata,
                  creator,
                })
              }}
            />
          </label>
          <label>
            <p>Challenge Title</p>
            <input
              name="title"
              value={metadata.title}
              onChange={(e) => {
                const title = e.target.value
                setMetadata({
                  ...metadata,
                  title,
                })
              }}
            />
          </label>
          <label>
            <p>Select a track by selecting the choose file button</p>
            <UploadButton
              files={files}
              addFiles={addFiles}
              clearFiles={clearFiles}
            />
          </label>
          <label>
            <p>Description</p>
            <input
              name="description"
              value={metadata.description}
              onChange={(e) => {
                const description = e.target.value
                setMetadata({
                  ...metadata,
                  description,
                })
              }}
            />
          </label>
          <button type="submit">Save</button>
        </fieldset>
      </form>
    </div>
  )
}

import React, { useState } from 'react'
import './Form.css'
import { UploadButton } from '../UploadButton/UploadButton'
import { Challenge, Course } from '../../model/ChallengeConfiguration'
import { GPXFile } from '../../model/gpx-file'
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
    <>
      <h1>AsyncRacing</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault()

          // Refer to the challenges object and tracks object.
          const challengesRef = firebaseDB.ref('challenges')
          const tracksRef = firebaseDB.ref('tracks')

          // Create a new trackRef for each track.
          const newTrackRefs = tracks.map((track) => {
            const newTrackRef = tracksRef.push({ ...track })
            return newTrackRef
          })

          // Get the IDs of the tracks.
          const newTrackIds = newTrackRefs.map((ref) => ref.key)

          // Create a new challenge containing those trackIDs.
          const newChallengeRef = challengesRef.push({
            course: {
              start: null,
              finish: null,
            },
            tracks: newTrackIds,
            metadata: {
              title: metadata.title,
              description: metadata.description,
              creator: metadata.creator,
            },
          })

          // Redirect to URL using newChallengeRef's key.
          // TODO: Implement redirect.
          const redirect = `/challenges/${newChallengeRef.key}`
          console.warn('Need to redirect to', redirect)
        }}
      >
        <fieldset>
          <label>
            <p>Upload GPX Files</p>
            <UploadButton
              files={files}
              addFiles={addFiles}
              clearFiles={clearFiles}
            />
          </label>

          <label>
            <p>Creator's Name</p>
            <input
              name="creator"
              value={metadata.creator}
              onChange={(e) => {
                const creator = e.target.value
                setMetadata({ ...metadata, creator })
              }}
            />
          </label>

          <label>
            <p>Title</p>
            <input
              name="title"
              value={metadata.title}
              onChange={(e) => {
                const title = e.target.value
                setMetadata({ ...metadata, title })
              }}
            />
          </label>

          <label>
            <p>Description</p>
            <input
              name="description"
              value={metadata.description}
              onChange={(e) => {
                const description = e.target.value
                setMetadata({ ...metadata, description })
              }}
            />
          </label>

          <button type="submit">Save</button>
        </fieldset>
      </form>
    </>
  )
}

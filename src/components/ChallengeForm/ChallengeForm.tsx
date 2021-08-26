import React, { useState } from 'react'
import './ChallengeForm.css'
import { UploadButton } from '../UploadButton/UploadButton'
import { Challenge, Course, Step } from '../../model/ChallengeConfiguration'
import { GPXFile } from '../../model/gpx-file'
import { firebaseDB } from '../../model/firebase-config'
import { useTracks } from '../../model/useFiles'

/* css library import */
import { Form, Button, Icon } from 'semantic-ui-react'

interface FormProps {
  addFiles: (file: any) => void
  clearFiles: () => void
  files: Array<GPXFile>
  course: Course
}

export const ChallengeForm = ({
  files,
  addFiles,
  clearFiles,
  course,
}: FormProps) => {
  const tracks = useTracks(files)
  const [metadata, setMetadata] = useState<Challenge['metadata']>({
    id: undefined,
    title: undefined,
    creator: undefined,
    uploadDate: undefined,
  })
  return (
    <>
      <h1>AsyncRacing</h1>
      <Form
        className="form__main"
        onSubmit={async (event) => {
          event.preventDefault()

          // Refer to the challenges object and tracks object.
          const challengesRef = firebaseDB.ref('challenges')
          const tracksRef = firebaseDB.ref('tracks')

          // Create a new trackRef for each track.
          const newTrackRefs = tracks.map((track) => {
            const fixedPath = track.path.map((step: Step) => ({
              ...step,
              time: step.time.toJSON(),
            }))

            const newTrackRef = tracksRef.push({ ...track, path: fixedPath })
            return newTrackRef
          })

          // Get the IDs of the tracks.
          const newTrackIds = newTrackRefs.map((ref) => ref.key)

          // Create a new challenge containing those trackIDs.
          const newChallengeRef = challengesRef.push({
            course: {
              start: course.start,
              finish: course.finish,
            },
            tracks: newTrackIds,
            metadata: {
              title: metadata.title,
              description: metadata.description,
              creator: metadata.creator,
            },
          })

          // Redirect to URL using newChallengeRef's key.
          const redirect = `/challenges/${newChallengeRef.key}`
          console.warn('Need to redirect to', redirect)
        }}
      >
        <Form.Group>
          <Form.Field>
            <label htmlFor="upload-button">Upload GPX Files</label>
            <UploadButton
              id="upload-button"
              files={files}
              addFiles={addFiles}
              clearFiles={clearFiles}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field>
            <label htmlFor="creator">Creator's Name</label>
            <input
              type="text"
              name="creator"
              value={metadata.creator}
              onChange={(event) => {
                const creator = event.target.value
                setMetadata({ ...metadata, creator })
              }}
            />
          </Form.Field>

          <Form.Field>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={metadata.title}
              onChange={(event) => {
                const title = event.target.value
                setMetadata({ ...metadata, title })
              }}
            />
          </Form.Field>
        </Form.Group>

        <Form.TextArea
          label="Description"
          name="description"
          value={metadata.description}
          placeholder="Tell us about your race"
          onChange={(event) => {
            const description = event.target.value
            setMetadata({ ...metadata, description })
          }}
        />

        <Form.Group fluid>
          <Button positive animated>
            <Button.Content visible>Save Race</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </Form.Group>
      </Form>
    </>
  )
}

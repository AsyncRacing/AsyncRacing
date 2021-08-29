import React, { useMemo, useState } from 'react'
import './ChallengeForm.css'
import { UploadButton } from '../UploadButton/UploadButton'
import { Challenge, Course, Step } from '../../model/ChallengeConfiguration'
import { GPXFile } from '../../model/gpx-file'
import { firebaseDB } from '../../model/firebase-config'
import { useTracks } from '../../model/useFiles'
import { shareTrack } from '../ShareMapTrack/sms-track'

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
    title: undefined,
    creator: undefined,
    uploadDate: undefined,
  })
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const formattedPhoneNumber = useMemo(() => {
    let newPhoneNumber = phoneNumber.replace(/-/g, '')
    newPhoneNumber = `+1${newPhoneNumber}`
    return newPhoneNumber
  }, [phoneNumber])
  return (
    <>
      <h1>AsyncRacing</h1>
      <Form
        className="form__main"
        onSubmit={async (event) => {
          event.preventDefault()

          if (!(metadata.title && metadata.creator)) {
            alert('Please enter your name and the title.')
            return
          }
          if (!(tracks.length > 0)) {
            alert('Please upload a valid .GPX file')
            return
          }

          // Refer to the challenges object and tracks object.
          const challengesRef = firebaseDB.ref('challenges')
          const tracksRef = firebaseDB.ref('tracks')

          // Create a new trackRef for each track.
          const newTrackRefs = tracks.map((track) => {
            // Fix the time to use json date string before upload.
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
          const newChallengeRef = await challengesRef.push({
            course: {
              start: course.start,
              finish: course.finish,
            },
            tracks: newTrackIds,
            metadata: {
              title: metadata.title,
              description: metadata.description ?? '',
              creator: metadata.creator,
              uploadDate: new Date(Date.now()).toJSON(),
            },
          })

          // Redirect to URL using newChallengeRef's key.
          const redirect = `/challenges/${newChallengeRef.key}`
          const sendwithRedirect = `${newChallengeRef.key}`
          shareTrack(sendwithRedirect, formattedPhoneNumber)
          const onHandleClick = () => {
            var link = `${redirect}`
            window.location.assign(link)
          }
          onHandleClick()
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

        <Form.Group>
          <Form.Field>
            <label htmlFor="phone-number">Phone Number</label>
            <input
              type="tel"
              name="phone-number"
              value={phoneNumber}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              onChange={(event) => {
                let number = event.target.value
                setPhoneNumber(number)
              }}
            />
          </Form.Field>
        </Form.Group>

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

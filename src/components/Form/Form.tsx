import React, { useState, useMemo } from 'react'
import './Form.css'
import { UploadButton } from '../UploadButton/UploadButton'
import { Challenge, Course, Step } from '../../model/ChallengeConfiguration'
import { GPXFile } from '../../model/gpx-file'
import { firebaseDB } from '../../model/firebase-config'
import { useTracks } from '../../model/useFiles'
import { shareTrack } from '../ShareMapTrack/sms-track'

interface FormProps {
  addFiles: (file: any) => void
  clearFiles: () => void
  files: Array<GPXFile>
  course: Course
}

export const Form = ({ files, addFiles, clearFiles, course }: FormProps) => {
  const tracks = useTracks(files)
  const [metadata, setMetadata] = useState<Challenge['metadata']>({
    id: undefined,
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
      <form
        onSubmit={async (e) => {
          e.preventDefault()

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
          // TODO: Implement redirect.
          const redirect = `/challenges/${newChallengeRef.key}`
          console.warn('Need to redirect to', redirect)
          const sendwithRedirect = `${newChallengeRef.key}`
          shareTrack(sendwithRedirect, formattedPhoneNumber)
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
          <label>
            <p>Phone Number</p>
            <input
              name="phoneNumber"
              value={phoneNumber}
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              onChange={(e) => {
                let number = e.target.value
                setPhoneNumber(number)
              }}
            />
          </label>
          <div>
            <button type="submit">Save</button>
          </div>
        </fieldset>
      </form>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import './Form.css'
import { UploadButton } from '../UploadButton/UploadButton'
import { Challenge, Course, Track } from '../../model/ChallengeConfiguration'
import { GPXFile } from '../../model/gpx-file'
import { title } from 'process'
import firebase from 'firebase'

interface FormProps {
  addFiles: (file: any) => void
  clearFiles: () => void
  files: Array<GPXFile>
}
var firebaseConfig = {
  apiKey: 'AIzaSyCiT4b8_qyC2ZxF95aRAdE8j4Kej3Dt9kk',
  authDomain: 'asyncracing-d5302.firebaseapp.com',
  databaseURL: 'https://asyncracing-d5302-default-rtdb.firebaseio.com',
  projectId: 'asyncracing-d5302',
  storageBucket: 'asyncracing-d5302.appspot.com',
  messagingSenderId: '468547346614',
  appId: '1:468547346614:web:0a5a388705b91b5b088617',
  measurementId: 'G-199TR40228',
}

firebase.initializeApp(firebaseConfig)

firebase.analytics()

const db = firebase.database()

export const Form = ({ addFiles, clearFiles, files }: FormProps) => {
  const [metadata, setMetadata] = useState<Challenge['metadata']>({})
  const [course, setCourse] = useState<Course>({ start: null, finish: null })
  const [tracks, setTracks] = useState<Array<Track>>([])

  useEffect(() => {
    ;(async () => {
      const newTracksPromises = files.map((file: GPXFile) => {
        return file.tracks()
      })
      const newTracks = await Promise.all(newTracksPromises)

      //do this
      setTracks(newTracks.flat())
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files.length])

  return (
    <div className="wrapper">
      <div>
        <h1>AsyncRacing</h1>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const challengeRef = db.ref('challenges')
          const challenge = await challengeRef.get()
          const newChallengeRef = challengeRef.push({
            course: {
              start: null,
              finish: null,
            },
            tracks: [],
            metadata: {},
          })
          newChallengeRef.set({
            ...challenge.val(),
            tracks: tracks,
            course: course,
            metadata: {
              ...(challenge.val()?.metadata ?? {}),
              title: title,
              description: metadata.description,
              creator: metadata.creator,
              //uploadDate: metadata.uploadDate,
              phoneNumber: metadata.phoneNumber,
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
          <label>
            <p>Share Track</p>
            <input
              name="phoneNumber"
              value={metadata.phoneNumber}
              onChange={(e) => {
                const phoneNumber = e.target.value
                setMetadata({
                  ...metadata,
                  phoneNumber,
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

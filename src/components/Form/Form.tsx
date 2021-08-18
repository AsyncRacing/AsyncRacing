import React from 'react'
import './Form.css'
// import firebase from 'firebase'
// import { UploadButton } from '../UploadButton/UploadButton'
// import { useFileContent } from '../UploadButton/useFileContent'

// var firebaseConfig = {
//   apiKey: 'AIzaSyCiT4b8_qyC2ZxF95aRAdE8j4Kej3Dt9kk',
//   authDomain: 'asyncracing-d5302.firebaseapp.com',
//   databaseURL: 'https://asyncracing-d5302-default-rtdb.firebaseio.com',
//   projectId: 'asyncracing-d5302',
//   storageBucket: 'asyncracing-d5302.appspot.com',
//   messagingSenderId: '468547346614',
//   appId: '1:468547346614:web:0a5a388705b91b5b088617',
//   measurementId: 'G-199TR40228',
// }

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig)
// firebase.analytics()

export function Form() {
  return (
    <div className="wrapper">
      <div>
        <h1>AsyncRacing</h1>
      </div>
      <form>
        <fieldset>
          <label>
            <p>Challenger's Name</p>
            <input name="name" />
          </label>
          <label>
            <p>Challenge Name</p>
            <input name="challengeName" />
          </label>
          <label>
            <p>Select a track by selecting the choose file button</p>
          </label>
          <label>
            <p>Description</p>
            <input name="description" />
          </label>
          <label>
            <p>Share Track</p>
            <input name="phoneNumber" />
          </label>
          <button type="submit">Save</button>
        </fieldset>
      </form>
    </div>
  )
}

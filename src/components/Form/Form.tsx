import React, { useState } from 'react'
import './Form.css'
//import { useForm } from 'react-hook-form'
import { db } from '../../pages/Home/Home'
import { UploadButton } from '../UploadButton/UploadButton'

interface FormProps {
  addFiles: (file: any) => void
  clearFiles: () => void
  files: Array<File>
}

export const Form = ({ addFiles, clearFiles, files }: FormProps) => {
  const [Name, setName] = useState('')
  const [challengeName, setChallengeName] = useState('')
  const [description, setDescription] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    db.collection('Challenge')
      .add({
        Name: Name,
        challengeName: challengeName,
        description: description,
        phoneNumber: phoneNumber,
      })
      .then(() => {
        alert('Challenge Submitted')
      })
      .catch((error) => {
        alert(error.message)
      })
    setName('')
    setChallengeName('')
    setDescription('')
    setPhoneNumber('')
  }

  return (
    <div className="wrapper">
      <div>
        <h1>AsyncRacing</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Challenger's Name</p>
            <input
              name="Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <p>Challenge Name</p>
            <input
              name="challengeName"
              value={challengeName}
              onChange={(e) => setChallengeName(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            <p>Share Track</p>
            <input
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          <button type="submit">Save</button>
        </fieldset>
      </form>
    </div>
  )
}

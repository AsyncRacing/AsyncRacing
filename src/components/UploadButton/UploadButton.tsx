import React from 'react'
import { GPXFile } from '../../model/gpx-file'

interface PropTypes {
  id?: string
  // This type comes from a built-in React method.
  // Essentially, its typed to the "setState" function.
  files: Array<File>
  addFiles: any // Dispatch<SetStateAction<Array<File>>>
  clearFiles: any
}

// Primary UI component for user interaction
const UploadButton = ({ id, files, addFiles, clearFiles }: PropTypes) => (
  <>
    {/* This input allows for uploading files. */}
    <input
      type="file"
      id={id}
      multiple={true}
      onChange={(onChangeEvent) => {
        // Get the data of this file uploader HTML element.
        const fileUploader = onChangeEvent.currentTarget

        // Make sure it has the files.
        if (fileUploader.files === null || fileUploader.files.length < 1) {
          return
        }

        // Per the documentation of <input>, the files array is a FileList type.
        // It can be converted into a normal array by using the spread operator.
        const selectedFiles: FileList = fileUploader.files

        // Our application uses the custom GPXFile class over the built-in File class.
        // To convert the files, use the static method GPXFile.createFromFile.
        const convertedFiles: Array<GPXFile> = [...selectedFiles].map((file) =>
          GPXFile.createFromFile(file),
        )

        // Set the selected files.
        addFiles(...convertedFiles)
      }}
    />

    {/* These tags describe the currently-active files. */}
    {files.map((file, index) => {
      return <p key={index}>{file.name}</p>
    })}

    {/* This button clears the filelist. */}
    <button onClick={clearFiles}>Clear Files</button>
  </>
)

export { UploadButton }

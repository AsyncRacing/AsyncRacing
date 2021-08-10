import { Dispatch, SetStateAction, useState } from 'react'

// Helper function: loosely determine if two files are equivalent.
const isSameFile = (file01: File, file02: File) => {
  const properties: Array<keyof File> = ['lastModified', 'name', 'size', 'type']
  for (const property of properties) {
    if (file01[property] !== file02[property]) {
      return false
    }
  }
  return true
}

// Primary react hook.
const useFiles = (
  initialFiles = [],
): [
  Array<File>,
  Dispatch<SetStateAction<Array<File>>>,
  (...selectedFiles: Array<File>) => void,
  () => void,
] => {
  const [files, setFiles]: [
    Array<File>,
    Dispatch<SetStateAction<Array<File>>>,
  ] = useState<Array<File>>(initialFiles)

  // Add files to the state.
  const addFiles = (...selectedFiles: Array<File>) => {
    // Filter out the selected files that are already in the existing files array.
    // Loop through selected files.
    const newFiles = selectedFiles.filter((selectedFile) => {
      // Loop through existing files until a match or end is found.
      return !files.some((file) => {
        // Use helper function to loosely check for matching files.
        return isSameFile(file, selectedFile)
      })
    })

    // Set the files
    setFiles([...files, ...newFiles])
  }

  // Clear the state.
  const clearFiles = () => {
    setFiles([])
  }

  return [files, setFiles, addFiles, clearFiles]
}

export { useFiles }

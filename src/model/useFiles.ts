import { Dispatch, SetStateAction, useState } from 'react'
import { GPXFile } from './gpx-file'

// Primary react hook.
const useFiles = (
  initialFiles = [],
): [
  Array<GPXFile>,
  Dispatch<SetStateAction<Array<GPXFile>>>,
  (...selectedFiles: Array<GPXFile>) => void,
  () => void,
] => {
  const [files, setFiles]: [
    Array<GPXFile>,
    Dispatch<SetStateAction<Array<GPXFile>>>,
  ] = useState<Array<GPXFile>>(initialFiles)

  // Add files to the state.
  const addFiles = (...selectedFiles: Array<GPXFile>) => {
    // Filter out the selected files that are already in the existing files array.
    // Loop through selected files.
    const newFiles = selectedFiles.filter((selectedFile) => {
      // Loop through existing files until a match or end is found.
      return !files.some((file) => {
        // Use helper function to loosely check for matching files.
        return GPXFile.areSame(file, selectedFile)
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

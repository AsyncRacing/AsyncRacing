import React, { Dispatch, SetStateAction, useState } from 'react'

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
    setFiles([...files, ...selectedFiles])
  }

  // Clear the state.
  const clearFiles = () => {
    setFiles([])
  }

  return [files, setFiles, addFiles, clearFiles]
}

export { useFiles }

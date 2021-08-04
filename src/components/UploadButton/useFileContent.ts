import { useEffect, useState } from 'react'

// Create a file-reader helper function here.
const readFileToText = (file: File, callback: (fileText: string) => any) => {
  // Use the "FileReader" JS Web API to read variables with type "File".
  const reader: FileReader = new FileReader()

  // Assign properties to various functions to execute onEvent.
  // This will set up the file reader for use.
  reader.onload = (onLoadEvent) => {
    // Ensure the event target...exists!
    if (onLoadEvent.target === null) {
      return
    }

    // Gather the file's text content and then set it.
    const fileText: string = onLoadEvent.target.result as string
    callback(fileText)
  }

  if (file !== null) {
    // Use the reader to obtain fileData as text.
    reader.readAsText(file)
  }
}

const useFileToText = (file: File): string => {
  // Use react state for the hook!
  const [fileText, setFileText] = useState<string>('')

  // Use react effect hooks as well for watching changes.
  // This enables more declaritive programming styles.
  useEffect(() => {
    readFileToText(file, setFileText)
  }, [file])

  // Return the fileText value only, as its hooked into useEffect.
  return fileText
}

const useFilesToTextMap = (files: Array<File>): Map<File, String> => {
  // Use react state for the hook!
  const [fileTextMap, setFileTextMap] = useState<Map<File, String>>(new Map())

  // Use react effect hooks as well for watching changes.
  // This enables more declaritive programming styles.
  useEffect(() => {
    const newFileTextMap = new Map()
    files.forEach((file) => {
      // The callback here is adding to the map via map.set().
      const setFileText = (fileText: string) => {
        newFileTextMap.set(file, fileText)
      }
      readFileToText(file, setFileText)
    })

    // 🔧 FIXME:
    //    The stateful setFileTextMap gets called before the callbacks are finished calling!
    //    The callback, setFileText, doesn't have a chance to get called in readFileToText.
    //    This is because it takes time for readFileToText to run (FileReader is asyncronous).
    setFileTextMap(newFileTextMap)
  }, [files])

  // Return the fileText value only, as its hooked into useEffect.
  return fileTextMap
}

export { useFileToText, useFilesToTextMap }

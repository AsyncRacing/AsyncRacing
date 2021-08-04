import { useEffect, useState } from 'react'

// Create a file-reader helper function here.
const readFileToText = (file: File): Promise<string> => {
  // Use the "FileReader" JS Web API to read variables with type "File".
  const reader: FileReader = new FileReader()

  return new Promise((resolve, reject) => {
    // Assign properties to various functions to execute onEvent.
    // This will set up the file reader for use.
    reader.onload = (onLoadEvent) => {
      // Ensure the event target...exists!
      if (onLoadEvent.target === null) {
        return reject(onLoadEvent)
      }

      // Gather the file's text content and then set it.
      const fileText: string = onLoadEvent.target.result as string
      return resolve(fileText)
    }
    reader.onerror = (onErrorEvent) => reject(onErrorEvent)

    // Read the file as text.
    reader.readAsText(file)
  })
}

const useFileToText = (file: File): string => {
  // Use react state for the hook!
  const [fileText, setFileText] = useState<string>('')

  // Use react effect hooks as well for watching changes.
  // This enables more declaritive programming styles.
  useEffect(() => {
    ;(async () => {
      const fileText: string = await readFileToText(file)
      setFileText(fileText)
    })()
  }, [file])

  // Return the fileText value only, as its hooked into useEffect.
  return fileText
}

const useFilesToTextMap = (files: Array<File>): Map<File, string> => {
  // Use react state for the hook!
  const [fileTextMap, setFileTextMap] = useState<Map<File, string>>(new Map())

  // Use react effect hooks as well for watching changes.
  // This enables more declaritive programming styles.
  useEffect(() => {
    // Initialize the returnable map.
    const newFileTextMap: Map<File, string | Promise<string>> = new Map()

    // Loop through all the given files.
    files.forEach((file) => {
      // 🔩 NOTE: This populates our map with promises.
      //    We'll ensure all the promises resolve before setting the map.
      const fileTextPromise: Promise<string> = readFileToText(file)
      newFileTextMap.set(file, fileTextPromise)
    })

    // Resolve the promises within the map values.
    // Can't use Promise.all because the map is not an array!
    ;(async () => {
      for (const [file, fileTextPromise] of [...newFileTextMap.entries()]) {
        const fileText = await fileTextPromise
        newFileTextMap.set(file, fileText)
      }

      // When all the promises resolve, setFileTextMap can finally be called.
      setFileTextMap(newFileTextMap as Map<File, string>)
    })()
  }, [files])

  // Return the fileText value only, as its hooked into useEffect.
  return fileTextMap
}

export { useFileToText, useFilesToTextMap }

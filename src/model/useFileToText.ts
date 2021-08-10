import { useEffect, useState } from 'react'

/* HELPERS */
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

/* CUSTOM HOOKS */
const useFilesToTextMap = (files: Array<File>): Map<File, string> => {
  // Use react state for the hook!
  const [filesToTextMap, setFilesToTextMap] = useState<Map<File, string>>(
    new Map(),
  )

  // Use react effect hooks as well for watching changes.
  // This enables more declaritive programming styles.
  useEffect(() => {
    // Initializes a data-collector for the new files.
    const newFilesToTextMap: Map<File, string> = new Map()
    // 🔩 NOTE: We will populate the following map with promises.
    //    We'll ensure all the promises resolve before setting any data.
    const newFilesToTextMapAdditions: Map<File, Promise<string>> = new Map()
    // When the promises resolve to strings, they will be added to newFilesToTextMap.

    // Loop through all the given files.
    files.forEach((file) => {
      // Get the fileText if the file exists in the old map
      if (filesToTextMap.has(file)) {
        const fileText = filesToTextMap.get(file) as string
        newFilesToTextMap.set(file, fileText)
      }
      // Otherwise, we'll have to set a promise and resolve it later.
      else {
        const fileTextPromise: Promise<string> = readFileToText(file)
        newFilesToTextMapAdditions.set(file, fileTextPromise)
      }
    })

    // Resolve the promises within the map values.
    // Can't use Promise.all because the map is not an array!
    ;(async () => {
      for (const [file, fileTextPromise] of newFilesToTextMapAdditions) {
        const fileText = await fileTextPromise
        newFilesToTextMap.set(file, fileText)
      }

      // When all the promises resolve, setFilesToTextMap can finally be called.
      setFilesToTextMap(newFilesToTextMap as Map<File, string>)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files.length])

  // Return the fileText value only, as its hooked into useEffect.
  return filesToTextMap
}

const useFilesToText = (files: Array<File>): Array<string> => {
  // Re-use our other custom hooks!!
  const filesToTextMap = useFilesToTextMap(files)
  return [...filesToTextMap.values()]
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

export { useFilesToTextMap, useFilesToText, useFileToText }

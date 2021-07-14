import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

const useFileContentString = (
  file: null | File = null
): string | null => {

  const [fileContent, setFileContent] = useState<string | null>(null)



  useEffect(() => {
    // Create a file-reader function here.
    const readFileContent = (file: null | File) => {
      // Keep track of the file's data, which will be returned.

      // Use the "FileReader" JS Web API to read variables with type "File".
      const reader: FileReader = new FileReader()
      // Assign properties to various functions to execute onEvent.
      // This will set up the file reader for use.
      reader.onload = (onLoadEvent) => {
        // Ensure the event target...exists!
        if (onLoadEvent.target === null) {
          return
        }
        /*
          NOTE: TypeScript is giving an unneeded warning here.
          Because reader.onload will only ever run from reader.readAsText(),
          fileData will only ever end up being a string or null.
        */
        const fileData: string | null = onLoadEvent.target.result as string
        setFileContent(fileData)
      }


      if (file !== null) {
        setFileContent("...loading")
        // Use the reader to obtain fileData.
        reader.readAsText(file)
      }
    }
    readFileContent(file)
  }, [file])

  // Return both the starting value and the setting function,
  // which also both use my custom readFileContentString() function.
  return fileContent
}

export default useFileContentString;

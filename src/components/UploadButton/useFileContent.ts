import React, {
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

// Create a file-reader function here.
const readFileContentString = (file: null | File): null | string => {
  // Keep track of the file's data, which will be returned.
  let fileData: string | null = null

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
    */ // @ts-expect-error
    fileData = onLoadEvent.target.result
  }

  if (file !== null) {
    // Use the reader to obtain fileData.
    reader.readAsText(file)
    console.log(fileData)
  }

  // Return the fileData obtained from the reader.
  return fileData
}

const useFileContentString = (
  defaultFile: null | File = null
): [
  string | null,
  Dispatch<SetStateAction<any>>,
] => {
  // Use react state for the hook!
  // Prepare the proper fileContent from the given file.
  const [fileContentString, setFile] = useState(readFileContentString(defaultFile))
  // Prepare the proper setFileContent function from the given setFile function.
  const setFileContentString = (file: null | File) => setFile(readFileContentString(file))
  // Return both the starting value and the setting function,
  // which also both use my custom readFileContentString() function.
  return [fileContentString, setFileContentString]
}

export default useFileContentString;

const useFileContentString = (file: null | File): string => {

  /*****************************************************************************
  // Use the "FileReader" JS Web API to read variables with type "File".
  const reader: FileReader = new FileReader()
  // Assign properties to various functions to execute onEvent.
  // This will set up the file reader for use.
  reader.onload = (onLoadEvent) => {
    // Ensure the event target...exists!
    if (onLoadEvent.target === null) {
      return
    }

    /\
      NOTE: TypeScript is giving an unneeded warning here.
      Because reader.onload will only ever run from reader.readAsText(),
      fileData will only ever end up being a string or null.
    \/ // @ts-expect-error
    const fileData: string | null = onLoadEvent.target.result
    setFile(fileData)
  }
  // Use the reader.
  reader.readAsText(selectedFile)
  *****************************************************************************/

  return ''
}

export {
  useFileContentString,
};

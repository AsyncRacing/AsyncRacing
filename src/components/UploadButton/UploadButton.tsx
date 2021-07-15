import React, {
  Dispatch,
  HTMLProps,
} from 'react';
import './UploadButton.css';

interface PropTypes extends Omit<
  HTMLProps<HTMLInputElement>,
  "type" | "onChange"
> {
  // Button contents
  label?: string,

  // This type comes from a built-in React method.
  // Essentially, its typed to the "setState" function.
  setFile: Dispatch<File | null>
};

// Primary UI component for user interaction
const UploadButton = ({
  label="Upload a File...",
  setFile,
  ...props
}: PropTypes) => {
  // Set the state of the file.
  return (
    <input
      type="file"
      onChange={(onChangeEvent) => {
        // Get the data of this file uploader HTML element.
        const fileUploader = onChangeEvent.currentTarget
        // Make sure it has the files.
        if (fileUploader.files === null || fileUploader.files.length < 1) {
          return
        }

        // Per the documentation of <input>, there is only one file
        // in the files array unless the multiple property is enabled.
        // Also, file is type "File", which is a JS Web API.
        const selectedFile: File = fileUploader.files[0]
        // Set the selected file.
        setFile(selectedFile)
      }}
      {...props}
    />
  );
};

export default UploadButton;

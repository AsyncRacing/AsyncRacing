import React from 'react';
import './UploadButton.css';

interface PropTypes {
  // Button contents
  label?: string;
  // This type comes from a built-in React method.
  // Essentially, its typed to the "setState" function.
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

// Primary UI component for user interaction
const UploadButton = ({
  label="Upload a File...",
  setFile,
  ...props
}: PropTypes) => {
  // Set the state of the file.
  return (
    <div>
      <label htmlFor="file-uploader">
        {label}
      </label>

      <input
        id="file-uploader"
        name="file"
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
    </div>
  );
};

export default UploadButton;

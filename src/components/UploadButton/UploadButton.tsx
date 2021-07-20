import React, {
  Dispatch,
} from 'react';
import './UploadButton.css';

interface PropTypes {
  id?: string,
  // This type comes from a built-in React method.
  // Essentially, its typed to the "setState" function.
  setFile: Dispatch<File | null>,
}

// Primary UI component for user interaction
const UploadButton = ({
  id,
  setFile,
}: PropTypes) => (
  <input
    type="file"
    id={id}
    onChange={(onChangeEvent) => {
      // Get the data of this file uploader HTML element.
      const fileUploader = onChangeEvent.currentTarget;
      // Make sure it has the files.
      if (fileUploader.files === null || fileUploader.files.length < 1) {
        return;
      }

      // Per the documentation of <input>, there is only one file
      // in the files array unless the multiple property is enabled.
      // Also, file is type "File", which is a JS Web API.
      const selectedFile: File = fileUploader.files[0];
      // Set the selected file.
      setFile(selectedFile);
    }}
  />
);

export default UploadButton;

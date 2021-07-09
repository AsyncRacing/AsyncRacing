import React from 'react';
import './UploadButton.css';

interface PropTypes {
  // Button contents
  label: string;
};

// Primary UI component for user interaction
const UploadButton = ({
  label,
  ...props
}: PropTypes) => {
  // Set the state of the file.
  const [file, setFile] = React.useState(null)
  return (
    <div>
      <label htmlFor="gpx-file-uploader">
        {label}
      </label>

      <input
        id="gpx-file-uploader"
        name="gpx-file"
        type="file"
        onChange={(onChangeEvent) => {
          // Get the data of this file uploader HTML element.
          const gpxFileUploader = onChangeEvent.currentTarget
          // Make sure it has the files.
          if (gpxFileUploader.files === null || gpxFileUploader.files.length < 1) {
            return
          }

          // Per the documentation of input, there is only one file
          // in the files array unless the multiple property is enabled.
          // Also, gpxFile is type "File", which is a JS Web API.
          const gpxFile: File = gpxFileUploader.files[0]

          // Use the "FileReader" JS Web API to read variables with type "File".
          const reader: FileReader = new FileReader()
          // Assign properties to various functions to execute onEvent.
          reader.onload = (onLoadEvent) => {
            const data = onLoadEvent.target.result
            console.dir(data)
          }
          // Use the reader.
          reader.readAsText(gpxFile)
        }}
        {...props}
      />
    </div>
  );
};

export default UploadButton;

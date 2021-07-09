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
          console.dir(gpxFileUploader)
        }}
        {...props}
      />
    </div>
  );
};

export default UploadButton;

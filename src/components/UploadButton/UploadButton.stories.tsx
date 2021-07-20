import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import UploadButton from './UploadButton';
import useFileContent from './useFileContent';

export default {
  title: 'components/UploadButton',
  component: UploadButton,
} as ComponentMeta<typeof UploadButton>;

const Template: ComponentStory<typeof UploadButton> = () => {
  const [file, setFile] = useState<File | null>(null);
  const fileContent = useFileContent(file);

  return (
    <>
      <label htmlFor="file-uploader">
        Upload a File
      </label>

      <br />

      <UploadButton
        id="file-uploader"
        setFile={setFile}
      />

      <hr />

      <textarea
        value={fileContent ?? ''}
        style={{
          width: '100%',
          height: '500px',
        }}
        disabled
        readOnly
      />
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {};

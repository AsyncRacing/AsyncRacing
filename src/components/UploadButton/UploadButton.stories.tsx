import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import UploadButton from './UploadButton';
import useFileContent from './useFileContent';

export default {
  title: 'components/UploadButton',
  component: UploadButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof UploadButton>;

const Template: ComponentStory<typeof UploadButton> = (args) => {
  const [file, setFile] = useState<File | null>(null)
  const fileContent = useFileContent(file)

  return (
    <>
      <UploadButton
        {...args}
        setFile={setFile}
      />
      <textarea
        value={fileContent ?? ""}
        disabled
        readOnly
      />
    </>
  );
}

export const Primary = Template.bind({});
Primary.args = {};

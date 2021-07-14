import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import UploadButton from './UploadButton';
import useFileContentString from './useFileContent';

export default {
  title: 'components/UploadButton',
  component: UploadButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof UploadButton>;

const Template: ComponentStory<typeof UploadButton> = (args) => {
  const [fileContentString, setFileContentString] = useFileContentString()
  return (
    <>
      <UploadButton
        {...args}
        setFile={setFileContentString}
      />
      <textarea
        value={fileContentString ?? ""}
        disabled
        readOnly
      />
    </>
  );
}

export const Primary = Template.bind({});
Primary.args = {};

import React from 'react';
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
  const [fileContent, setFileContent] = useFileContent()
  return (
    <>
      <UploadButton
        {...args}
        setFile={setFileContent}
      />
      <textarea
        value={fileContent.text ?? ""}
        disabled
        readOnly
      />
    </>
  );
}

export const Primary = Template.bind({});
Primary.args = {};

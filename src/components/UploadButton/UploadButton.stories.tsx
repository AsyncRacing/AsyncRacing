import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import UploadButton from './UploadButton';

export default {
  title: 'components/UploadButton',
  component: UploadButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof UploadButton>;

const Template: ComponentStory<typeof UploadButton> = (args) => {
  const [file, setFile] = React.useState<null|File>(null);
  return (
    <>
      <UploadButton
        {...args}
        setFile={setFile}
      />
      <textarea
        value={file ? "Input has data." : "Input wants data."} // ! temporary value until hook is introduced
        disabled
        readOnly
      />
    </>
  );
}

export const Primary = Template.bind({});
Primary.args = {};

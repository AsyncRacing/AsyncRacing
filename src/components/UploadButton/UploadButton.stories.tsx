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
  const [file, setFile] = React.useState<null|string>(null);
  return (
    <>
      <UploadButton
        {...args}
        setFile={setFile}
      />
      <textarea
        value={file ?? ""}
        disabled
        readOnly
      />
    </>
  );
}

export const Primary = Template.bind({});
Primary.args = {};

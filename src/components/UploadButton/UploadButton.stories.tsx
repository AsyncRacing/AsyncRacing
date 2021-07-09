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

const Template: ComponentStory<typeof UploadButton> = (args) => <UploadButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Upload a File...',
};

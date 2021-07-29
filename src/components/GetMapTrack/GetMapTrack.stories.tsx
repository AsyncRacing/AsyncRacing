import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { GetMapTrack } from './GetMapTrack'

export default {
  title: 'components/GetMapTrack',
  component: GetMapTrack,
} as ComponentMeta<typeof GetMapTrack>

const Template: ComponentStory<typeof GetMapTrack> = () => <GetMapTrack />

export const Primary = Template.bind({})
Primary.args = {}

import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { NewChallenge } from './NewChallenge'

export default {
  title: 'components/GetMapTrack',
  component: NewChallenge,
} as ComponentMeta<typeof NewChallenge>

const Template: ComponentStory<typeof NewChallenge> = () => <NewChallenge />

export const Primary = Template.bind({})
Primary.args = {}

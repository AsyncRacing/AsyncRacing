import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import path from '../../examples/ian-motorcycle-ride-path'

import { Timer } from './Timer'
import { defaultChallenge } from '../../examples/default-challenge'

export default {
  title: 'components/Timer',
  component: Timer,
} as ComponentMeta<typeof Timer>

const Template: ComponentStory<typeof Timer> = () => {
  return <Timer path={path} challenge={defaultChallenge} />
}

export const Primary = Template.bind({})
Primary.args = {}

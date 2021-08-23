import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import path from '../../examples/ian-motorcycle-ride-path'
import { DateTime } from 'luxon'

import { Timer } from './Timer'
import { defaultChallenge } from '../../examples/default-challenge'

export default {
  title: 'components/Timer',
  component: Timer,
} as ComponentMeta<typeof Timer>

const Template: ComponentStory<typeof Timer> = () => {
  return (
    <Timer
      track={{
        path: path.map(({ time, ...path }) => {
          return { ...path, time: DateTime.fromISO(time).toJSDate() }
        }),
        metadata: {
          title: 'New Track',
          color: [0, 250, 250],
        },
      }}
      course={defaultChallenge.course}
    />
  )
}

export const Primary = Template.bind({})
Primary.args = {}

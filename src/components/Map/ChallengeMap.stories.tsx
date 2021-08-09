import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Challenge } from '../../model/ChallengeConfiguration'
import { defaultChallenge } from '../../examples/default-challenge'
import { ChallengeMap } from './ChallengeMap'

export default {
  title: 'Components/ChallengeMap',
  component: ChallengeMap,
} as ComponentMeta<typeof ChallengeMap>

const Template: ComponentStory<typeof ChallengeMap> = (args) => {
  const [challenge, setChallenge] = useState<Challenge>(defaultChallenge)
  return (
    <ChallengeMap {...args} challenge={challenge} setChallenge={setChallenge} />
  )
}

export const EmptyTrack = Template.bind({})
EmptyTrack.args = {
  tracks: [],
}

export const OneRedTrack = Template.bind({})
OneRedTrack.args = {
  tracks: [
    {
      path: [
        {
          lon: -122.49005,
          lat: 37.68493,
          time: new Date(),
        },
        {
          lon: -122.41737904607598,
          lat: 37.7866555224718,
          time: new Date(),
        },
      ],
      name: 'Geary - Daly City',
      color: [255, 0, 0],
    },
  ],
}

export const TwoTracks = Template.bind({})
TwoTracks.args = {
  tracks: [
    {
      path: [
        {
          lon: -122.49005,
          lat: 37.68493,
          time: new Date(),
        },
        {
          lon: -122.41737904607598,
          lat: 37.7866555224718,
          time: new Date(),
        },
      ],
      name: 'Geary - Daly City',
      color: [255, 0, 0],
    },
    {
      path: [
        {
          lon: -122.490569,
          lat: 37.684839,
          time: new Date(),
        },
        {
          lon: -122.490562,
          lat: 37.68481,
          time: new Date(),
        },
      ],
      name: 'Daly City',
      color: [0, 255, 0],
    },
  ],
}

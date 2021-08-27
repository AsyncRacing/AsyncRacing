import { ComponentStory, ComponentMeta } from '@storybook/react'
import { RaceMap } from './RaceMap'

export default {
  title: 'Components/ChallengeMap',
  component: RaceMap,
} as ComponentMeta<typeof RaceMap>

const Template: ComponentStory<typeof RaceMap> = (args) => <RaceMap {...args} />

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
          longitude: -122.49005,
          latitude: 37.68493,
          time: new Date(),
        },
        {
          longitude: -122.41737904607598,
          latitude: 37.7866555224718,
          time: new Date(),
        },
      ],
      metadata: {
        title: 'Geary - Daly City',
        color: [255, 0, 0],
      },
    },
  ],
}

export const TwoTracks = Template.bind({})
TwoTracks.args = {
  tracks: [
    {
      path: [
        {
          longitude: -122.49005,
          latitude: 37.68493,
          time: new Date(),
        },
        {
          longitude: -122.41737904607598,
          latitude: 37.7866555224718,
          time: new Date(),
        },
      ],
      metadata: {
        title: 'Geary - Daly City',
        color: [255, 0, 0],
      },
    },
    {
      path: [
        {
          longitude: -122.490569,
          latitude: 37.684839,
          time: new Date(),
        },
        {
          longitude: -122.490562,
          latitude: 37.68481,
          time: new Date(),
        },
      ],
      metadata: {
        title: 'Daly City',
        color: [0, 255, 0],
      },
    },
  ],
}

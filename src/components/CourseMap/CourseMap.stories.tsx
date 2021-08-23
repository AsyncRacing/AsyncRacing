import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Course } from '../../model/ChallengeConfiguration'
import { CourseMap } from './CourseMap'

export default {
  title: 'Components/ChallengeMap',
  component: CourseMap,
} as ComponentMeta<typeof CourseMap>

const Template: ComponentStory<typeof CourseMap> = (args) => {
  const emptyCourse: Course = {
    start: null,
    finish: null,
  }
  const [course, setCourse] = useState<Course>(emptyCourse)
  return <CourseMap {...args} course={course} setCourse={setCourse} />
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

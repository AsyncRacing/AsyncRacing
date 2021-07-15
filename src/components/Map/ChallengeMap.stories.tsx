import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ChallengeMap } from './ChallengeMap';


export default {
  title: 'Components/ChallengeMap',
  component: ChallengeMap,
  argTypes: {
  },
} as ComponentMeta<typeof ChallengeMap>;

const Template: ComponentStory<typeof ChallengeMap> = (args) => <ChallengeMap  {...args}/>;

export const NoTrack = Template.bind({});
export const OneRedTrack = Template.bind({});
OneRedTrack.args = {
  tracks:   [ 
    {
    path: [[-122.490050, 37.68493], [-122.41737904607598, 37.7866555224718]],
    name: 'Geary - Daly City',
    color:[255,0,0]
  },
  ]
};
export const TwoTracks = Template.bind({});
TwoTracks.args = {
  tracks:   [ 
    {
    path: [[-122.490050, 37.68493], [-122.41737904607598, 37.7866555224718]],
    name: 'Geary - Daly City',
    color:[255,0,0]
  },
  {
    path: [[-122.490569,  37.684839], [-122.490562, 37.684810]],
    name: 'daly city',
    color:[0,255,0]
  }]
};
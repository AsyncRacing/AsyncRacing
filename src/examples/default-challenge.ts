import { Challenge } from '../model/ChallengeConfiguration'

const defaultChallenge: Challenge = {
  start: [
    {
      longitude: -122.4,
      latitude: 37.7,
    },
    {
      longitude: -122.4,
      latitude: 37.8,
    },
  ],
  finish: [
    {
      longitude: -122.5,
      latitude: 37.7,
    },
    {
      longitude: -122.5,
      latitude: 37.8,
    },
  ],
}

export { defaultChallenge }
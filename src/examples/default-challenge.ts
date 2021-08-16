import { Challenge } from '../model/ChallengeConfiguration'

const defaultChallenge: Challenge = {
  start: {
    points: [
      {
        longitude: -122.45,
        latitude: 37.75,
      },
      {
        longitude: -122.4,
        latitude: 37.8,
      },
    ],
  },
  finish: {
    points: [
      {
        longitude: -122.5,
        latitude: 37.7,
      },
      {
        longitude: -122.5,
        latitude: 37.8,
      },
    ],
  },
}

export { defaultChallenge }

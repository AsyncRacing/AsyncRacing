import { Challenge } from '../../model/ChallengeConfiguration'
import track from '../../examples/ian-motorcycle-ride-path'
import { getTimes } from './timer'
import { DateTime } from 'luxon'
/**
 * import gpx path data
 * read data from file and get string from data
 * convert string data to be a TrackPath
 */
const testTimer = test('returns time from component', () => {
  const defaultChallenge: Challenge = {
    start: {
      firstPoint: {
        lon: -122.5,
        lat: 37.7,
      },
      secondPoint: {
        lon: -122.5,
        lat: 37.8,
      },
    },
    finish: {
      firstPoint: {
        lon: -122.5,
        lat: 37.7,
      },
      secondPoint: {
        lon: -122.5,
        lat: 37.8,
      },
    },
  }
  const result = getTimes({
    path: track.map(({ time, ...track }) => {
      return { ...track, time: DateTime.fromISO(time).toJSDate() }
    }),
    challenge: defaultChallenge,
  })
  console.log(result)
})

export { testTimer }

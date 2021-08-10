import track from '../../examples/ian-motorcycle-ride-path'
import { getTimes } from './timer'
import { DateTime } from 'luxon'
import { defaultChallenge } from '../../examples/default-challenge'

test('returns time from component', () => {
  const result = getTimes({
    path: track.map(({ time, ...track }) => {
      return { ...track, time: DateTime.fromISO(time).toJSDate() }
    }),
    challenge: defaultChallenge,
  })
  console.log(result)
})

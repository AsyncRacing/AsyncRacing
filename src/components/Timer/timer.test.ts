import path from '../../examples/ian-motorcycle-ride-path'
import { getTimes } from './getTime'
import { DateTime } from 'luxon'
import { defaultChallenge } from '../../examples/default-challenge'

test('returns the milliseconds between start and end points for default challenge', () => {
  const result = getTimes({
    path: path.map(({ time, ...path }) => {
      return { ...path, time: DateTime.fromISO(time).toJSDate() }
    }),
    challenge: defaultChallenge,
  })
  expect(result).toBe(60363000)
})

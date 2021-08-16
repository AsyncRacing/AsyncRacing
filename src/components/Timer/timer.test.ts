import path from '../../examples/ian-motorcycle-ride-path'
import { getTimes, formatMilliseconds } from './getTime'
import { DateTime } from 'luxon'
import { defaultChallenge } from '../../examples/default-challenge'

test('returns milliseconds', () => {
  const result = getTimes({
    path: path.map(({ time, ...path }) => {
      return { ...path, time: DateTime.fromISO(time).toJSDate() }
    }),
    challenge: defaultChallenge,
  })
  expect(result).toBe(60363000)
})

test('returns hour,minutes and seconds between start and end points for default challenge', () => {
  const result = getTimes({
    path: path.map(({ time, ...path }) => {
      return { ...path, time: DateTime.fromISO(time).toJSDate() }
    }),
    challenge: defaultChallenge,
  })
  expect(formatMilliseconds(result)).toBe('16:46:03')
})

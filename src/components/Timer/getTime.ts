import { TrackPath, Challenge } from '../../model/ChallengeConfiguration'
import * as turf from '@turf/turf'
import { DateTime as LuxonDate } from 'luxon'
import { Duration } from 'luxon'

interface Props {
  path: TrackPath
  challenge: Challenge
}

const getTimes = ({ path, challenge }: Props): number | null | string => {
  // Convert from an array of points -> the format that Turf.js wants
  const startLineTurf = turf.lineString([
    [challenge.start[0].latitude, challenge.start[0].longitude],
    [challenge.start[1].latitude, challenge.start[1].longitude],
  ])
  const endLineTurf = turf.lineString([
    [challenge.finish[0].latitude, challenge.finish[0].longitude],
    [challenge.finish[1].latitude, challenge.finish[1].longitude],
  ])
  let startLuxonTime: LuxonDate | null = null
  let endLuxonTime: LuxonDate | null = null
  for (let i = 0; i < path.length - 1; i++) {
    // Defining the points that make up the line as the current point, and the next point
    const segmentEndpoints = [
      [path[i].latitude, path[i].longitude],
      [path[i + 1].latitude, path[i + 1].longitude],
    ]
    // Convert into a line
    const lineToCheck = turf.lineString(segmentEndpoints)
    const sentinelLuxonTime = LuxonDate.fromJSDate(path[i].time)
    if (turf.lineIntersect(lineToCheck, startLineTurf).features.length > 0) {
      // BUG: sentinelLuxonTime is logging an invalid input from path[i].time -> Date
      console.log('path:', path[i].time)
      if (startLuxonTime === null) startLuxonTime = sentinelLuxonTime
      else if (startLuxonTime < sentinelLuxonTime)
        startLuxonTime = sentinelLuxonTime
    }
    if (turf.lineIntersect(lineToCheck, endLineTurf).features.length > 0) {
      if (endLuxonTime === null) endLuxonTime = sentinelLuxonTime
      else if (endLuxonTime > sentinelLuxonTime)
        endLuxonTime = sentinelLuxonTime
    }
  }
  if (startLuxonTime === null || endLuxonTime === null) {
    return null
  }
  let luxonMilliseconds = endLuxonTime.toMillis() - startLuxonTime.toMillis()
  return Duration.fromObject({ milliseconds: luxonMilliseconds }).toFormat(
    'hh:mm:ss',
  )
}
export { getTimes }

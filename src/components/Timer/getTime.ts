import { Course, Path } from '../../model/ChallengeConfiguration'
import * as turf from '@turf/turf'
import { DateTime as LuxonDate } from 'luxon'
import { Duration } from 'luxon'

interface Props {
  path: Path
  course: Course
}

const getTimes = ({ path, course }: Props): number | null => {
  if (course.start === null || course.finish === null) {
    return null
  }
  // Convert from an array of points -> the format that Turf.js wants
  const startLineTurf = turf.lineString([
    [course.start[0].latitude, course.start[0].longitude],
    [course.start[1].latitude, course.start[1].longitude],
  ])
  const endLineTurf = turf.lineString([
    [course.finish[0].latitude, course.finish[0].longitude],
    [course.finish[1].latitude, course.finish[1].longitude],
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
  } else if (endLuxonTime.toMillis() - startLuxonTime.toMillis() < 0) {
    return null
  }
  let luxonMilliseconds = endLuxonTime.toMillis() - startLuxonTime.toMillis()
  return luxonMilliseconds
}

const formatMilliseconds = (milliseconds: number | null): string | null => {
  if (milliseconds === null) return null
  return Duration.fromObject({ milliseconds }).toFormat('hh:mm:ss')
}
export { getTimes, formatMilliseconds }

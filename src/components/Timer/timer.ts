import { TrackPath, Challenge } from '../../model/ChallengeConfiguration'
import * as turf from '@turf/turf'

// interface Challenge {
//   start: StartStopLine
//   finish: StartStopLine
// }
interface Props {
  path: TrackPath
  challenge: Challenge
}

function getTimes({ path, challenge }: Props) {
  // Convert from an array of points -> the format that Turf.js wants
  const startLineTurf = turf.lineString([
    [challenge.start[0].latitude, challenge.start[0].longitude],
    [challenge.start[1].latitude, challenge.start[1].longitude],
  ])
  const endLineTurf = turf.lineString([
    [challenge.finish[0].latitude, challenge.finish[0].longitude],
    [challenge.finish[1].latitude, challenge.finish[1].longitude],
  ])
  let startTime: Date
  let endTime: Date
  for (let i = 0; i < path.length - 1; i++) {
    // Defining the points that make up the line as the current point, and the next point
    const segmentEndpoints = [
      [path[i].latitude, path[i].longitude],
      [path[i + 1].latitude, path[i + 1].longitude],
    ]
    // Convert into a line
    const lineToCheck = turf.lineString(segmentEndpoints)
    if (turf.lineIntersect(lineToCheck, startLineTurf).features.length > 0) {
      startTime = path[i].time
      console.log(startTime)
    }
    if (turf.lineIntersect(lineToCheck, endLineTurf).features.length > 0) {
      endTime = path[i].time
    }
  }
  return { startTime, endTime }
}
export { getTimes }

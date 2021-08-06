import { TrackPath, Challenge } from '../../model/ChallengeConfiguration'
import * as turf from '@turf/turf'
interface TrackPoint {
  lat: Number
  lon: Number
  time: Date
}
// type TrackPath = TrackPoint[]
interface StartStopLine {
  firstPoint: TrackPath
  endPoint: TrackPath
}
// interface Challenge {
//   start: StartStopLine
//   finish: StartStopLine
// }
interface Props {
  path: TrackPath
  challenge: Challenge
}
{
  /* <LineIntersect path={pathfromUploadedFile} challenge={defaultChallenge} /> */
}
function getTimes({ path, challenge }: Props) {
  // Convert from an array of points -> the format that Turf.js wants
  const startLineTurf = turf.lineString([
    [challenge.start.firstPoint.lat, challenge.start.firstPoint.lon],
    [challenge.start.secondPoint.lat, challenge.start.secondPoint.lon],
  ])
  const endLineTurf = turf.lineString([
    [challenge.finish.firstPoint.lat, challenge.finish.firstPoint.lon],
    [challenge.finish.secondPoint.lat, challenge.finish.secondPoint.lon],
  ])
  let startTime: Date
  let endTime: Date
  for (let i = 0; i < path.length - 1; i++) {
    // Defining the points that make up the line as the current point, and the next point
    const segmentEndpoints = [
      [path[i].lat, path[i].lon],
      [path[i + 1].lat, path[i + 1].lon],
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
  // return { startTime, endTime }
}
export { getTimes }

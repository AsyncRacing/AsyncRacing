interface Point {
  latitude: number // 90° > latitude > -90°
  longitude: number // 180° > longitude > -180°
}

// This is just a point that has a time.
// Steps are intended to be chained to eachother in order.
// The Path type displays this behavior.
interface Step extends Point {
  time: Date // time
}

// A bunch of track points is a track path!
type Path = Array<Step>

// A track has other metadata to be kept, like name and color.
interface Track {
  name: string
  color: [red: number, green: number, blue: number]
  path: Path
}

// A Waypoint is a line that demarcates a challenge
//  into start and finish lines, plus possible checkpoints.
// A start line and finish line are both types of waypoints.
//
// IMPROVEMENT:
// In the future, maybe a waypoint can two or more points.
// Maybe it could curve, or "close" like a square or circle.
interface Waypoint {
  type?: 'line'
  points: [Point, Point]
}

// The configuration for a race or challenge
interface Challenge {
  start: Waypoint
  checkpoints?: Array<Waypoint>
  finish: Waypoint
}

export type { Challenge, Path, Point, Step, Track, Waypoint }

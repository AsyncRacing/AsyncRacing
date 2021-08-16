interface GPSPoint {
  latitude: number // 90° > latitude > -90°
  longitude: number // 180° > longitude > -180°
}

interface TrackPoint extends GPSPoint {
  time: Date // time
}

// A bunch of track points is a track path!
type TrackPath = Array<TrackPoint>

// A track has other metadata to be kept, like name and color.
interface Track {
  name: string
  color: [red: number, green: number, blue: number]
  path: TrackPath
}

// For start & finish lines, plus waypoints
type GPSLine = [GPSPoint, GPSPoint]

// The configuration for a race or challenge
interface Challenge {
  start: GPSLine | null
  finish: GPSLine | null
}

export type { GPSPoint, TrackPoint, TrackPath, Track, GPSLine, Challenge }

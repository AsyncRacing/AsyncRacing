interface GPSPoint {
  lat: number // latitude
  lon: number // longitude
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
  start: GPSLine
  finish: GPSLine
}

export type { GPSPoint, TrackPoint, TrackPath, Track, GPSLine, Challenge }

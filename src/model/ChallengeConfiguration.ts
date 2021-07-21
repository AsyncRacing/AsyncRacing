interface GPSPoint {
  lat: number, // latitude
  lon: number, // longitude
}

interface TrackPoint extends GPSPoint {
  dur: number, // duration
}

// A bunch of track points is a track path!
type TrackPath = Array<TrackPoint>

// For start & finish lines, plus waypoints
interface GPSLine {
  firstPoint: GPSPoint,
  secondPoint: GPSPoint,
}

// The configuration for a race or challenge
interface Challenge {
  start: GPSLine,
  finish: GPSLine,
}

export type {
  GPSPoint,
  TrackPoint,
  TrackPath,
  GPSLine,
  Challenge,
};

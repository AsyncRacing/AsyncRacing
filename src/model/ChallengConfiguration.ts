interface GPSPoint {
  lat: number, // latitude
  lon: number, // longitude
}

interface TrackPoint extends GPSPoint {
  dur: number, // duration
}

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
  GPSLine,
  Challenge,
};

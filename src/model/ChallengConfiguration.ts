interface GPSPoint {
  lat: number,
  lon: number,
}

interface GPSLine {
  firstPoint: GPSPoint,
  secondPoint: GPSPoint,
}

interface Challenge {
  start: GPSLine,
  finish: GPSLine,
}

export type {
  GPSPoint,
  GPSLine,
  Challenge,
};

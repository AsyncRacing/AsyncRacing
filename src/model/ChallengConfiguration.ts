interface Challenge {
  start: GPSLine,
  finish: GPSLine,
}

interface GPSLine {
  firstPoint: GPSPoint,
  secondPoint: GPSPoint,
}

interface GPSPoint {
  lat: number,
  lon: number,
}

export type {
  Challenge,
  GPSLine,
  GPSPoint,
};

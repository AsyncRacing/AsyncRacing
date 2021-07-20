import GpxParser from 'gpxparser';

interface TrackPoint {
  lat: number
  lon: number
  time: Date
}

const parseGpxData = (data: string): TrackPoint[] => {
  const gpx = new GpxParser();
  gpx.parse(data);

  return gpx
    .tracks[0]
    .points
    .map((point) => ({
      lat: point.lat,
      lon: point.lon,
      time: point.time,
    }));
};

export { parseGpxData };

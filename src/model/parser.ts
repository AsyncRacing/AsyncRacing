import GpxParser from 'gpxparser';

interface TrackPoint {
  lat: number,
  lon: number,
  time: Date,
}

const parseGpxData = (data: string): TrackPoint[] => {
  const gpxParser = new GpxParser();
  gpxParser.parse(data);

  if (gpxParser.tracks.length < 1) {
    return [];
  }

  return gpxParser
    .tracks[0]
    .points
    .map((point) => ({
      lat: point.lat,
      lon: point.lon,
      time: point.time,
    }));
};

export { parseGpxData };

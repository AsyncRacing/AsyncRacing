import GpxParser from 'gpxparser';
import { TrackPath } from './ChallengeConfiguration';

const parseGpxData = (data: string): TrackPath => {
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

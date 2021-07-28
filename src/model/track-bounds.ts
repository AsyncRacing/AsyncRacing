import { Track } from './ChallengeConfiguration';

// eslint-disable-next-line max-len
export const trackBounds = (track: Track): [nwCorner: [number, number], seCorner: [number, number]] => {
  if (track.path.length > 0) {
    const northEastCorner = [track.path[0].lat, track.path[0].lon] as [number, number];
    const swCorner = [track.path[0].lat, track.path[0].lon] as [number, number];

    return [northEastCorner, swCorner];
  }

  throw new Error('invalid: track is empty');
};

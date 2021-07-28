import { Track } from './ChallengeConfiguration';

// eslint-disable-next-line max-len
export const trackBounds = (track: Track): [nwCorner: [number, number], seCorner: [number, number]] => {
  if (track.path.length > 0) {
    const northEastCorner = [-140, 55] as [number, number];
    const swCorner = [-130, 50] as [number, number];

    return [northEastCorner, swCorner];
  }

  throw new Error('invalid: track is empty');
};

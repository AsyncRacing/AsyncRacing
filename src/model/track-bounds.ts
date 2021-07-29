import { TrackPath } from './ChallengeConfiguration';

// eslint-disable-next-line max-len

export const trackBounds = (path: TrackPath): [northEastCorner: [number, number],
southWestCorner: [number, number]] => {
  if (path.length > 0) {
    // eslint-disable-next-line no-shadow
    const eastPoint = path.reduce((accumulator, currentPoint) => {
      const currentValue = currentPoint.lat;
      const accumulatorValue = accumulator.lat;
      if (accumulatorValue > currentValue) {
        return accumulator;
      }
      return currentPoint;
    });
    const westPoint = path.reduce((accumulator, currentPoint) => {
      const currentValue = currentPoint.lat;
      const accumulatorValue = accumulator.lat;
      if (accumulatorValue < currentValue) {
        return accumulator;
      }
      return currentPoint;
    });
    const northPoint = path.reduce((accumulator, currentPoint) => {
      const currentValue = currentPoint.lon;
      const accumulatorValue = accumulator.lon;
      if (accumulatorValue > currentValue) {
        return accumulator;
      }
      return currentPoint;
    });
    const southPoint = path.reduce((accumulator, currentPoint) => {
      const currentValue = currentPoint.lon;
      const accumulatorValue = accumulator.lon;
      if (accumulatorValue < currentValue) {
        return accumulator;
      }
      return currentPoint;
    });

    const northEastCorner = [eastPoint.lat, northPoint.lon] as [number, number];
    const southWestCorner = [westPoint.lat, southPoint.lon] as [number, number];

    return [northEastCorner, southWestCorner];
  }

  throw new Error('invalid: track is empty');
};

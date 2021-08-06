import { TrackPath } from './ChallengeConfiguration'

export const trackBounds = (
  path: TrackPath,
): [northEastCorner: [number, number], southWestCorner: [number, number]] => {
  if (path.length > 0) {
    const eastPoint = path.reduce((accumulator, currentPoint) => {
      const currentValue = currentPoint.lat
      const accumulatorValue = accumulator.lat
      if (accumulatorValue > currentValue) {
        return accumulator
      }
      return currentPoint
    })
    const westPoint = path.reduce((accumulator, currentPoint) => {
      const currentValue = currentPoint.lat
      const accumulatorValue = accumulator.lat
      if (accumulatorValue < currentValue) {
        return accumulator
      }
      return currentPoint
    })
    const northPoint = path.reduce((accumulator, currentPoint) => {
      const currentValue = currentPoint.lon
      const accumulatorValue = accumulator.lon
      if (accumulatorValue > currentValue) {
        return accumulator
      }
      return currentPoint
    })
    const southPoint = path.reduce((accumulator, currentPoint) => {
      const currentValue = currentPoint.lon
      const accumulatorValue = accumulator.lon
      if (accumulatorValue < currentValue) {
        return accumulator
      }
      return currentPoint
    })

    const northEastCorner = [northPoint.lon, eastPoint.lat] as [number, number]
    const southWestCorner = [southPoint.lon, westPoint.lat] as [number, number]

    return [northEastCorner, southWestCorner]
  }

  throw new Error('invalid: track is empty')
}

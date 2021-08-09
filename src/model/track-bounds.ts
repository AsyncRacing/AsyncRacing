import { TrackPath } from './ChallengeConfiguration'

export const trackBounds = (
  path: TrackPath,
): [northEastCorner: [number, number], southWestCorner: [number, number]] => {
  if (path.length > 0) {
    const eastPoint = path.reduce((accumulator, currentPoint) => {
      const currentValue = currentPoint.latitude
      const accumulatorValue = accumulator.latitude
      if (accumulatorValue > currentValue) {
        return accumulator
      }
      return currentPoint
    })
    const westPoint = path.reduce((accumulator, currentPoint) => {
      const currentValue = currentPoint.latitude
      const accumulatorValue = accumulator.latitude
      if (accumulatorValue < currentValue) {
        return accumulator
      }
      return currentPoint
    })
    const northPoint = path.reduce((accumulator, currentPoint) => {
      const currentValue = currentPoint.longitude
      const accumulatorValue = accumulator.longitude
      if (accumulatorValue > currentValue) {
        return accumulator
      }
      return currentPoint
    })
    const southPoint = path.reduce((accumulator, currentPoint) => {
      const currentValue = currentPoint.longitude
      const accumulatorValue = accumulator.longitude
      if (accumulatorValue < currentValue) {
        return accumulator
      }
      return currentPoint
    })

    const northEastCorner = [northPoint.longitude, eastPoint.latitude] as [
      number,
      number,
    ]
    const southWestCorner = [southPoint.longitude, westPoint.latitude] as [
      number,
      number,
    ]

    return [northEastCorner, southWestCorner]
  }

  throw new Error('invalid: track is empty')
}

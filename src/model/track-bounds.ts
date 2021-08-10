import { GPSPoint } from './ChallengeConfiguration'

export const trackBounds = (
  points: Array<GPSPoint>,
): [northEastCorner: [number, number], southWestCorner: [number, number]] => {
  if (points.length > 0) {
    const eastPoint = points.reduce((accumulator, currentPoint) => {
      const currentValue = currentPoint.latitude
      const accumulatorValue = accumulator.latitude
      if (accumulatorValue > currentValue) {
        return accumulator
      }
      return currentPoint
    })
    const westPoint = points.reduce((accumulator, currentPoint) => {
      const currentValue = currentPoint.latitude
      const accumulatorValue = accumulator.latitude
      if (accumulatorValue < currentValue) {
        return accumulator
      }
      return currentPoint
    })
    const northPoint = points.reduce((accumulator, currentPoint) => {
      const currentValue = currentPoint.longitude
      const accumulatorValue = accumulator.longitude
      if (accumulatorValue > currentValue) {
        return accumulator
      }
      return currentPoint
    })
    const southPoint = points.reduce((accumulator, currentPoint) => {
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

import { GPSPoint } from './ChallengeConfiguration'

export const trackBounds = (
  points: Array<GPSPoint>,
): [northEastCorner: [number, number], southWestCorner: [number, number]] => {
  if (points.length > 0) {
    const eastPoint = points.reduce((accumulator, currentPoint) => {
      const currentValue = currentPoint.lat
      const accumulatorValue = accumulator.lat
      if (accumulatorValue > currentValue) {
        return accumulator
      }
      return currentPoint
    })
    const westPoint = points.reduce((accumulator, currentPoint) => {
      const currentValue = currentPoint.lat
      const accumulatorValue = accumulator.lat
      if (accumulatorValue < currentValue) {
        return accumulator
      }
      return currentPoint
    })
    const northPoint = points.reduce((accumulator, currentPoint) => {
      const currentValue = currentPoint.lon
      const accumulatorValue = accumulator.lon
      if (accumulatorValue > currentValue) {
        return accumulator
      }
      return currentPoint
    })
    const southPoint = points.reduce((accumulator, currentPoint) => {
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

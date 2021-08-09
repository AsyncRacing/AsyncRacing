/* module imports */
import React, { useCallback } from 'react'
import { Marker, SVGOverlay } from 'react-map-gl'

/* local imports */
import {
  Challenge,
  GPSLine,
  GPSPoint,
} from '../../model/ChallengeConfiguration'
import pinImg from '../../assets/red-pin.png'

/* interfaces & types */
interface PinProps {
  point: GPSPoint
  setPoint: any
}

interface CourseProps {
  challenge: Challenge
  setChallenge: any
}

interface WaypointProps {
  line: GPSLine
  setLine: any
}

/* helpers & constants */
// ...

/* react components */
// helper component
const Pin = ({ point, setPoint }: PinProps) => {
  const onDrag = useCallback(
    (event: any) => {
      setPoint({
        lon: event.lngLat[0],
        lat: event.lngLat[1],
      })
    },
    [setPoint],
  )

  return (
    <Marker
      longitude={point.lon}
      latitude={point.lat}
      offsetTop={-50}
      offsetLeft={-25}
      draggable
      onDrag={onDrag}
    >
      <img
        alt="pin"
        src={pinImg}
        style={{ height: '50px', pointerEvents: 'none' }}
      />
    </Marker>
  )
}

// helper component
const Waypoint = ({ line, setLine }: WaypointProps) => {
  // This function must be updated with our line points every time it changes.
  const redraw = ({ project }: { project: any }) => {
    // The `project()` function is sort of a "magic" function that ReactMapGL
    //   passes in as a parameter to the redraw function.
    // Given an input of lon/lat coords on the globe,
    //   it converts it to HTML-readable X/Y coords on the page.
    const [x1, y1] = project([line[0].lon, line[0].lat])
    const [x2, y2] = project([line[1].lon, line[1].lat])

    // The app expects redraw to return SVG-compatible JSX elements.
    return (
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="blue" strokeWidth="15" />
    )
  }

  const getSetPointAt = useCallback(
    (index: number) => (point: GPSPoint) => {
      const newLine = [...line]
      newLine[index] = point
      return setLine(newLine)
    },
    [line, setLine],
  )

  return (
    <>
      <SVGOverlay redraw={redraw} style={{ 'pointer-events': 'none' }} />
      <Pin point={line[0]} setPoint={getSetPointAt(0)} />
      <Pin point={line[1]} setPoint={getSetPointAt(1)} />
    </>
  )
}

// exported component
const ChallengeCourse = ({ challenge, setChallenge }: CourseProps) => {
  const { start, finish } = challenge

  const getSetLineOf = useCallback(
    (name: string) => (line: GPSLine) =>
      setChallenge({ ...challenge, [name]: line }),
    [challenge, setChallenge],
  )

  return (
    <>
      <Waypoint line={start} setLine={getSetLineOf('start')} />
      <Waypoint line={finish} setLine={getSetLineOf('finish')} />
    </>
  )
}

export { ChallengeCourse }

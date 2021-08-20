/* module imports */
import React, { useCallback } from 'react'
import { Marker, SVGOverlay } from 'react-map-gl'

/* local imports */
import { Challenge, Point, Waypoint } from '../../model/ChallengeConfiguration'
import pinImg from '../../assets/red-pin.png'

/* interfaces & types */
interface PinProps {
  point: Point
  setPoint: any
}

interface CourseProps {
  challenge: Challenge
  setChallenge: any
}

interface LineProps {
  waypoint: Waypoint
  setWaypoint: any
  color: any
}

/* helpers & constants */
// ...

/* react components */
// helper component
const Pin = ({ point, setPoint }: PinProps) => {
  const onDrag = useCallback(
    (event: any) => {
      setPoint({
        longitude: event.lngLat[0],
        latitude: event.lngLat[1],
      })
    },
    [setPoint],
  )

  return (
    <Marker
      longitude={point.longitude}
      latitude={point.latitude}
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
const Line = ({ waypoint, setWaypoint, color }: LineProps) => {
  // This function must be updated with our waypoint points every time it changes.
  const redraw = ({ project }: { project: any }) => {
    // The `project()` function is sort of a "magic" function that ReactMapGL
    //   passes in as a parameter to the redraw function.
    // Given an input of lon/lat coords on the globe,
    //   it converts it to HTML-readable X/Y coords on the page.
    const [x1, y1] = project([waypoint[0].longitude, waypoint[0].latitude])
    const [x2, y2] = project([waypoint[1].longitude, waypoint[1].latitude])

    // The app expects redraw to return SVG-compatible JSX elements.
    return (
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="15" />
    )
  }

  const getSetPointAt = useCallback(
    (index: number) => (point: Point) => {
      // Modify waypoint
      waypoint[index] = point
      // Set waypoint state
      return setWaypoint(waypoint)
    },
    [waypoint, setWaypoint],
  )

  return (
    <>
      <SVGOverlay redraw={redraw} style={{ 'pointer-events': 'none' }} />
      <Pin point={waypoint[0]} setPoint={getSetPointAt(0)} />
      <Pin point={waypoint[1]} setPoint={getSetPointAt(1)} />
    </>
  )
}

// exported component
const ChallengeCourse = ({ challenge, setChallenge }: CourseProps) => {
  const { start, finish } = challenge.course

  const getSetWaypointOf = useCallback(
    (name: string) => (waypoint: Waypoint) =>
      setChallenge({
        ...challenge,
        course: {
          ...challenge.course,
          [name]: waypoint,
        },
      }),
    [challenge, setChallenge],
  )

  return (
    <>
      {(() => {
        if (start !== null) {
          return (
            <Line
              key="start"
              waypoint={start}
              setWaypoint={getSetWaypointOf('start')}
              color="green"
            />
          )
        }
      })()}
      {(() => {
        if (finish !== null) {
          return (
            <Line
              key="finish"
              waypoint={finish}
              setWaypoint={getSetWaypointOf('finish')}
              color="red"
            />
          )
        }
      })()}
    </>
  )
}

export { ChallengeCourse }

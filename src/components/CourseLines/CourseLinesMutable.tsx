/* module imports */
import React from 'react'
import { Marker, SVGOverlay } from 'react-map-gl'

/* local imports */
import { Course, Point, Waypoint } from '../../model/ChallengeConfiguration'
import pinImg from '../../assets/red-pin.png'
import { useCallback } from 'react'

/* COURSE ENDPOINT */
interface CourseEndpointProps {
  point: Point
  setPoint: any // TODO: declare setState type
}

const CourseEndpoint = ({ point, setPoint }: CourseEndpointProps) => {
  const onDrag = useCallback(
    (event: any) => {
      const newPoint = {
        longitude: event.lngLat[0],
        latitude: event.lngLat[1],
      }
      setPoint(newPoint)
    },
    [setPoint],
  )

  return (
    <Marker
      longitude={point.longitude}
      latitude={point.latitude}
      offsetTop={-30}
      offsetLeft={-15}
      draggable={true}
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

/* COURSE LINE (SINGULAR) */
interface CourseLineProps {
  type: 'start' | 'checkpoint' | 'finish'
  waypoint: Waypoint
  setWaypoint: any // TODO: declare setState type
  index?: number
}

const CourseLine = ({
  type,
  waypoint,
  setWaypoint,
  index,
}: CourseLineProps) => {
  // Get the associated setState functions for a given point.
  const setPointAt = useCallback(
    (pointIndex: number) => {
      const setPoint = (point: Point) => {
        const newWaypoint = [...waypoint]
        newWaypoint[pointIndex] = point
        setWaypoint(newWaypoint, index)
      }
      return setPoint
    },
    [waypoint, setWaypoint, index],
  )

  // This function must be updated with our waypoint points every time it changes.
  const redraw = ({ project }: { project: any }) => {
    /*
      The `project()` function is sort of a "magic" projection algorithm
        that ReactMapGL passes in as a parameter to the redraw function.
      Given an input of lon/lat coords on the globe,
        it converts it to HTML-readable X/Y coords on the page.
    */
    const [x1, y1] = project([waypoint[0].longitude, waypoint[0].latitude])
    const [x2, y2] = project([waypoint[1].longitude, waypoint[1].latitude])

    // The app expects redraw to return SVG-compatible JSX elements.
    return (
      <>
        {/* Decide line patterning */}
        {type === 'start' && (
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="green"
            strokeWidth="6"
          />
        )}
        {type === 'checkpoint' && (
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="blue" strokeWidth="4" />
        )}
        {type === 'finish' && (
          <>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="black"
              strokeWidth="6"
            />
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="white"
              strokeDasharray="6"
              strokeWidth="6"
            />
          </>
        )}
      </>
    )
  }

  return (
    waypoint && (
      <>
        <SVGOverlay redraw={redraw} style={{ pointerEvents: 'none' }} />
        <CourseEndpoint point={waypoint[0]} setPoint={setPointAt(0)} />
        <CourseEndpoint point={waypoint[1]} setPoint={setPointAt(1)} />
      </>
    )
  )
}

/* COURSE LINES (PLURAL) */
interface CourseLinesProps {
  course: Course
  setCourse?: any // TODO: declare setState type
}

const CourseLinesMutable = ({ course, setCourse }: CourseLinesProps) => {
  // HACK: Placeholder setcourse
  setCourse = setCourse ?? (() => {})
  // Get the start & finish waypoints.
  const { start, checkpoints, finish } = course

  // Get the associated setState functions for these waypoints.
  const setStart = useCallback(
    (newStart: Waypoint, index: void) =>
      setCourse({ ...course, start: newStart }),
    [course, setCourse],
  )

  const setFinish = useCallback(
    (newFinish: Waypoint, index: void) =>
      setCourse({ ...course, finish: newFinish }),
    [course, setCourse],
  )

  const setCheckpoint = useCallback(
    (checkpoint: Waypoint, index: number) => {
      const newCheckpoints = [...(course.checkpoints as Array<Waypoint>)]
      newCheckpoints[index] = checkpoint
      setCourse({ ...course, checkpoints: newCheckpoints })
    },
    [course, setCourse],
  )

  return (
    <>
      {/* Get the start line here.*/}
      {start && (
        <CourseLine type="start" waypoint={start} setWaypoint={setStart} />
      )}

      {/* Get the optional checkpoint lines here. */}
      {checkpoints && (
        <>
          {/* Map each checkpoint to a line. */}
          {checkpoints.map((checkpoint, index) => (
            <CourseLine
              type="checkpoint"
              waypoint={checkpoint}
              setWaypoint={setCheckpoint}
              index={index}
            />
          ))}
        </>
      )}

      {/* Get the finish line here. */}
      {finish && (
        <CourseLine type="finish" waypoint={finish} setWaypoint={setFinish} />
      )}
    </>
  )
}

export { CourseLinesMutable }

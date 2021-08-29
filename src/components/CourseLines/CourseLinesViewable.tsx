/* module imports */
import React from 'react'
import { Marker, SVGOverlay } from 'react-map-gl'

/* local imports */
import { Course, Point, Waypoint } from '../../model/ChallengeConfiguration'
import pinImg from '../../assets/flag-pin.png'

/* COURSE ENDPOINT */
interface CourseEndpointProps {
  point: Point
}

const CourseEndpoint = ({ point }: CourseEndpointProps) => {
  return (
    <Marker
      longitude={point.longitude}
      latitude={point.latitude}
      offsetTop={-30}
      offsetLeft={-10}
      draggable={false}
    >
      <img
        alt="pin"
        src={pinImg}
        style={{ height: '30px', pointerEvents: 'none' }}
      />
    </Marker>
  )
}

/* COURSE LINE (SINGULAR) */
interface CourseLineProps {
  type: 'start' | 'checkpoint' | 'finish'
  waypoint: Waypoint
  index?: number
}

const CourseLine = ({ type, waypoint, index }: CourseLineProps) => {
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
        <CourseEndpoint point={waypoint[0]} />
        <CourseEndpoint point={waypoint[1]} />
      </>
    )
  )
}

/* COURSE LINES (PLURAL) */
interface CourseLinesProps {
  course: Course
}

const CourseLinesViewable = ({ course }: CourseLinesProps) => {
  // Get the start & finish waypoints.
  const { start, checkpoints, finish } = course

  return (
    <>
      {/* Get the start line here.*/}
      {start && <CourseLine type="start" waypoint={start} />}

      {/* Get the optional checkpoint lines here. */}
      {checkpoints && (
        <>
          {/* Map each checkpoint to a line. */}
          {checkpoints.map((checkpoint, index) => (
            <CourseLine type="checkpoint" waypoint={checkpoint} index={index} />
          ))}
        </>
      )}

      {/* Get the finish line here. */}
      {finish && <CourseLine type="finish" waypoint={finish} />}
    </>
  )
}

export { CourseLinesViewable }

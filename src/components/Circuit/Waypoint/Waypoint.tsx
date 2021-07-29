/* module imports */
import React from 'react';
import { SVGOverlay } from 'react-map-gl';

/* local imports */
import {
  GPSLine,
} from '../../../model/ChallengeConfiguration';

/* interfaces & types */
interface PropTypes {
  line: GPSLine
}

/* helpers & constants */
// This will initialize a challenge from a couple of lines.
const getRedrawFx = (line: GPSLine) => {
  // Deconstruct the given GPSLine.
  const { firstPoint, secondPoint } = line;

  // This function must be updated with our line ppoints every time it changes.
  const redraw = ({ project }: { project: any }) => {
    // The `project()` function is sort of a "magic" function that ReactMapGL
    //   passes in as a parameter to the redraw function.
    // Given an input of lon/lat coords on the globe,
    //   it converts it to HTML-readable X/Y coords on the page.
    const [x1, y1] = project([firstPoint.lon, firstPoint.lat]);
    const [x2, y2] = project([secondPoint.lon, secondPoint.lat]);

    // The app expects redraw to return SVG-compatible JSX elements.
    return (
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="blue"
        strokeWidth="15"
      />
    );
  };

  // getRedrawFx returns the updated function.
  return redraw;
};

/* react component */
const Waypoint = ({ line }: PropTypes) => {
  const redraw = React.useCallback(getRedrawFx(line), [line]);
  return (
    <SVGOverlay redraw={redraw} />
  );
};
export { Waypoint };

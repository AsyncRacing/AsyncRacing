// module imports
import React from 'react';
import { Marker } from 'react-map-gl';

// local imports
import { GPSLine } from '../../model/ChallengeConfiguration';

interface PropTypes {
  coordinates: GPSLine
}

const Waypoint = ({ coordinates }: PropTypes) => {
  const { firstPoint, secondPoint } = coordinates;
  return (
    <>
      <Marker
        latitude={firstPoint.lat}
        longitude={firstPoint.lon}
      />

      <Marker
        latitude={secondPoint.lat}
        longitude={secondPoint.lon}
      />
    </>
  );
};

export { Waypoint };

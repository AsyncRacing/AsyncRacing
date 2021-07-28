// module imports
import React from 'react';
import { Marker } from 'react-map-gl';

// local imports
import { GPSLine } from '../../../model/ChallengeConfiguration';
import flatpin from '../../../assets/red-pin.png';

interface PropTypes {
  line: GPSLine
}

const Waypoint = ({ line: coordinates }: PropTypes) => {
  const { firstPoint, secondPoint } = coordinates;
  return (
    <>
      <Marker
        latitude={firstPoint.lat}
        longitude={firstPoint.lon}
      >
        <img
          style={{ height: '50px' }}
          src={flatpin}
          alt="pin"
        />
      </Marker>

      <Marker
        latitude={secondPoint.lat}
        longitude={secondPoint.lon}
      >
        <img
          style={{ height: '50px' }}
          src={flatpin}
          alt="pin"
        />
      </Marker>
    </>
  );
};

export { Waypoint };

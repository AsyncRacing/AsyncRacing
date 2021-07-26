// module imports
import DeckGL from '@deck.gl/react';
import React, {
  useCallback,
  useState,
} from 'react';
import { InteractiveMap } from 'react-map-gl';
import { PathLayer } from '@deck.gl/layers';
import { ViewState } from 'react-map-gl/src/mapbox/mapbox';

// local imports
import { Track } from '../../model/ChallengeConfiguration';

// interfaces & types
interface PropTypes {
  tracks: Track[];
}

// react component
const ChallengeMap = ({ tracks }: PropTypes) => {
  // This defaults to showing San Francisco.
  const defaultView: ViewState = {
    latitude: 37.78,
    longitude: -122.45,
    zoom: 14,
  };
  const [viewState, setViewState] = useState<ViewState>(defaultView);

  const handleViewStateChange = useCallback(
    (args: { viewState: ViewState }) => {
      setViewState(args.viewState);
    },
    [],
  );

  const layers = [
    new PathLayer({
      id: 'path-layer',
      data: tracks,
      pickable: true,
      widthMinPixels: 2,
      getPath: (d) => (
        d.path.map((point) => ([
          point.lon,
          point.lat,
        ]))
      ),
      getColor: (d) => d.color,
      getWidth: () => 5,
    }),
  ];

  return (
    <DeckGL
      controller
      layers={layers}
      viewState={viewState}
      onViewStateChange={handleViewStateChange}
    >
      <InteractiveMap
        {...viewState}
        mapboxApiAccessToken="pk.eyJ1IjoiaXJvbmVzOTQiLCJhIjoiY2txenprY2YzMW4yaDJ2bGZrb3ozbXRzMSJ9.DaLs0HwX916WhZ0f3Z9VKw"
      />
    </DeckGL>
  );
};

export { ChallengeMap };

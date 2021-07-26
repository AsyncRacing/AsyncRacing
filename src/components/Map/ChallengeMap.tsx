// module imports
import * as React from 'react';
import { InteractiveMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { PathLayer } from '@deck.gl/layers';
import { ViewState } from 'react-map-gl/src/mapbox/mapbox';

// local imports
import { Track } from '../../model/ChallengeConfiguration';

interface PropTypes {
  tracks: Track[];
}

const ChallengeMap = ({ tracks }: PropTypes) => {
  const defaultView: ViewState = {
    latitude: 37.78,
    longitude: -122.45,
    zoom: 14,
  };

  const [viewState, setViewState] = React.useState<ViewState>(defaultView);

  const handleViewStateChange = React.useCallback(
    (args: { viewState: any }) => {
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

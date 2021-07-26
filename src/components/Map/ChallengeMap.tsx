// module imports
import * as React from "react";
import {
  InteractiveMap,
  FlyToInterpolator,
  WebMercatorViewport,
  // Marker,
} from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { PathLayer } from "@deck.gl/layers";
// import d3 from 'd3-ease'; // 3rd-party easing functions
import { ViewState } from "react-map-gl/src/mapbox/mapbox";

// local imports
// import flatpin from './assets/images/red-pin.png';
import { Track } from "../../model/ChallengeConfiguration";

interface PropTypes {
  tracks: Track[];
}

const ChallengeMap = ({ tracks }: PropTypes) => {
  const defaultView: ViewState = {
    latitude: 37.78,
    longitude: -122.45,
    zoom: 12,
  };

  const [viewState, setViewState] = React.useState<ViewState>(defaultView);

  const handleViewStateChange = React.useCallback(
    (args: { viewState: any }) => {
      setViewState(args.viewState);
    },
    []
  );

  const goToSF = React.useCallback(() => {
    setViewState((viewport: ViewState) => {
      // When deck-gl is initialized the viewport contains additional keys width and height
      // which are required to create a WebMercatorViewport and calculate bounds.
      if ("width" in viewport && "height" in viewport) {
        const { longitude, latitude, zoom } = new WebMercatorViewport(
          viewport as ViewState & { width: number; height: number }
        ).fitBounds(
          [
            [-122.4, 37.7],
            [-122.5, 37.8],
          ],
          {
            padding: 20,
            offset: [0, -100],
          }
        );

        return {
          ...viewport,
          longitude,
          latitude,
          zoom,
          transitionDuration: 5000,
          transitionInterpolator: new FlyToInterpolator(),
          // transitionEasing: d3.easeCubic
        };
      }

      return viewport;
    });
  }, []);

  const layers = [
    new PathLayer({
      id: "path-layer",
      data: tracks,
      pickable: true,
      widthMinPixels: 2,
      getPath: (d) => d.path.map((point) => [point.lon, point.lat]),
      getColor: (d) => d.color,
      getWidth: () => 5,
    }),
  ];

  return (
    <>
      <DeckGL
        controller
        layers={layers}
        viewState={viewState}
        onViewStateChange={handleViewStateChange}
      >
        <InteractiveMap
          {...viewState}
          mapboxApiAccessToken="pk.eyJ1IjoiaXJvbmVzOTQiLCJhIjoiY2txenprY2YzMW4yaDJ2bGZrb3ozbXRzMSJ9.DaLs0HwX916WhZ0f3Z9VKw"
        >
          {/* <Marker
          latitude={37.68493}
          longitude={-122.4905}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <img
            style={{ height: '50px' }}
            src={flatpin}
            alt="pin"
          />
        </Marker>
        <Marker
          latitude={37.7866555224718}
          longitude={-122.41737904607598}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <img
            style={{ height: '50px' }}
            src={flatpin}
            alt="pin"
          />
        </Marker> */}
        </InteractiveMap>
      </DeckGL>
      <button type="button" onClick={goToSF}>
        San Francisco
      </button>
    </>
  );
};

export { ChallengeMap };

/* module imports */
import DeckGL from '@deck.gl/react'
import React, { useCallback, useState } from 'react'
import { InteractiveMap } from 'react-map-gl'
import { PathLayer } from '@deck.gl/layers'
import { ViewState } from 'react-map-gl/src/mapbox/mapbox'

/* local imports */
import { Challenge, Track } from '../../model/ChallengeConfiguration'
import { Circuit } from '../Circuit/Circuit'
import { trackBounds } from '../../model/track-bounds'
import { WebMercatorViewport } from '@deck.gl/core'

/* interfaces & types */
interface PropTypes {
  tracks: Track[]
}

/* helpers & constants */
// This will initialize a challenge from a couple of lines.
const defaultChallenge: Challenge = {
  start: {
    firstPoint: {
      lon: -122.4,
      lat: 37.7,
    },
    secondPoint: {
      lon: -122.4,
      lat: 37.8,
    },
  },
  finish: {
    firstPoint: {
      lon: -122.5,
      lat: 37.7,
    },
    secondPoint: {
      lon: -122.5,
      lat: 37.8,
    },
  },
}

// This constant defaults to showing San Francisco.
const defaultView: ViewState = {
  latitude: 37.78,
  longitude: -122.45,
  zoom: 12,
}

/* react component */
const ChallengeMap = ({ tracks }: PropTypes) => {
  // Map's viewstate
  const [viewState, setViewState] = useState<ViewState>(defaultView)
  const handleViewStateChange = useCallback(
    (args: { viewState: ViewState }) => {
      setViewState(args.viewState)
    },
    [],
  )

  React.useEffect(() => {
    if (tracks.length > 0 && tracks[0].path.length > 0) {
      const bounds = trackBounds(tracks[0].path)
      setViewState((vs) => {
        if (!('width' in vs) || !('height' in vs)) {
          return vs
        }
        const newViewState = new WebMercatorViewport(
          vs as ViewState & { width: number; height: number },
        ).fitBounds(bounds, {
          padding: 20,
          offset: [0, -100],
        })
        const newVS = {
          ...newViewState,
          transitionDuration: 5000,
          transitionInterpolator: new FlyToInterpolator(),
        }
        return newVS
      })
    }
  }, [tracks])

  // Challenge's start & finish states
  const challenge = defaultChallenge

  const layers = [
    new PathLayer({
      id: 'path-layer',
      data: tracks,
      pickable: true,
      widthMinPixels: 2,
      getPath: (d) => d.path.map((point) => [point.lon, point.lat]),
      getColor: (d) => d.color,
      getWidth: () => 5,
    }),
  ]

  return (
    <DeckGL
      controller
      layers={layers}
      viewState={viewState}
      onViewStateChange={handleViewStateChange}
    >
      <InteractiveMap
        {...viewState}
        mapboxApiAccessToken="pk.eyJ1IjoiYXN5bmNyYWNpbmciLCJhIjoiY2tybWNrcjZzMWQyNDJwcDh6cHlva2Q1eSJ9._Nazy17wuseOnfKuo3_zCA"
      >
        <Circuit challenge={challenge} />
      </InteractiveMap>
    </DeckGL>
  )
}

export { ChallengeMap }

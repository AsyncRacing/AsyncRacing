/* module imports */
import DeckGL from '@deck.gl/react'
import React, { useCallback, useState } from 'react'
import ReactMapGL, { _MapContext } from 'react-map-gl'
import { PathLayer } from '@deck.gl/layers'
import { ViewState } from 'react-map-gl/src/mapbox/mapbox'

/* local imports */
import { Challenge, Track } from '../../model/ChallengeConfiguration'
import { Circuit } from '../Circuit/Circuit'
import { trackBounds } from '../../model/track-bounds'
import { FlyToInterpolator } from '@deck.gl/core'
import { WebMercatorViewport } from 'react-map-gl'
import { ChallengeCourse } from '../Course/ChallengeCourse'

/* interfaces & types */
interface PropTypes {
  tracks: Track[]
  challenge: Challenge
  setChallenge: any
}

/* helpers & constants */
// This constant defaults to showing San Francisco.
const defaultView: ViewState = {
  longitude: -122.45,
  latitude: 37.78,
  zoom: 12,
}

/* react component */
const ChallengeMap = ({ tracks, challenge, setChallenge }: PropTypes) => {
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
        const { longitude, latitude, zoom } = new WebMercatorViewport({
          ...vs,
          width: window.innerWidth,
          height: window.innerHeight,
        }).fitBounds(bounds, {
          padding: 20,
          offset: [0, -100],
        })
        const newVS = {
          longitude,
          latitude,
          zoom,
          transitionDuration: 2000,
          transitionInterpolator: new FlyToInterpolator(),
        }
        return newVS
      })
    }
  }, [tracks])

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
      ContextProvider={_MapContext.Provider}
    >
      <ReactMapGL
        {...viewState}
        mapboxApiAccessToken="pk.eyJ1IjoiYXN5bmNyYWNpbmciLCJhIjoiY2tybWNrcjZzMWQyNDJwcDh6cHlva2Q1eSJ9._Nazy17wuseOnfKuo3_zCA"
        width="100%"
        height="100%"
      />
      <ChallengeCourse challenge={challenge} setChallenge={setChallenge} />
    </DeckGL>
  )
}

export { ChallengeMap }

/* module imports */
import DeckGL from '@deck.gl/react'
import React, { useCallback, useState } from 'react'
import ReactMapGL, { _MapContext } from 'react-map-gl'
import { PathLayer } from '@deck.gl/layers'
import { ViewState } from 'react-map-gl/src/mapbox/mapbox'

/* local imports */
import { Course, Track } from '../../model/ChallengeConfiguration'
import { trackBounds } from '../../model/track-bounds'
import { FlyToInterpolator } from '@deck.gl/core'
import { WebMercatorViewport } from 'react-map-gl'
import { CourseSlider } from '../CourseSlider/CourseSlider'

/* interfaces & types */
interface PropTypes {
  tracks: Track[]
  course: Course
  setCourse: any
}

/* helpers & constants */
// This constant defaults to showing San Francisco.
const defaultView: ViewState = {
  longitude: -122.45,
  latitude: 37.78,
  zoom: 12,
}

/* react component */
const CourseMap = ({ tracks, course, setCourse }: PropTypes) => {
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
      const bounds = trackBounds(tracks.map((track) => track.path).flat(1))
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
      getPath: (d) => d.path.map((point) => [point.longitude, point.latitude]),
      getColor: (track: Track) => track.metadata.color || [0, 0, 255],
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
      <CourseSlider course={course} setCourse={setCourse} />
    </DeckGL>
  )
}

export { CourseMap }

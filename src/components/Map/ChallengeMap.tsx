import * as React from 'react';
import {InteractiveMap, FlyToInterpolator, WebMercatorViewport, Marker} from 'react-map-gl';
import DeckGL from '@deck.gl/react'
import {PathLayer} from '@deck.gl/layers'
// 3rd-party easing functions
// import d3 from 'd3-ease';
import flatpin from './assets/images/red-pin.png'

export interface Track {
  name: string,
  color: [red: number, green: number, blue: number]
  path: Array<[lon:number, lat: number]>
}


interface IProps {
  tracks: Track[]
}


export function ChallengeMap({tracks}: IProps) {
  const [viewport, setViewport] = React.useState<WebMercatorViewport>({
    width: 800,
    height: 600,
    latitude: 37.78,
    longitude: -122.45,
    zoom: 14
  } as WebMercatorViewport);

  const goToSF = React.useCallback(() => {
    setViewport((viewport: any) => {
      const {longitude, latitude, zoom} = new WebMercatorViewport(viewport)
      .fitBounds([[-122.4, 37.7], [-122.5, 37.8]], {
          padding: 20,
          offset: [0, -100]
        });
      return {
      ...viewport,
      longitude,
      latitude,
      zoom,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      // transitionEasing: d3.easeCubic
    } 
  }) }, [])

  const layers = [
    new PathLayer({
          id:"path-layer",
          data: tracks,
          pickable:true,
          // widthScale:20,
          widthMinPixels: 2,
          getPath: (d: any) => d.path,
          getColor:d => d.color,
          getWidth:d => 5,

    })
  ]

  return (
    <div>
      <DeckGL initialViewState={{
          longitude: viewport.longitude,
          latitude: viewport.latitude,
          zoom: viewport.zoom,
          pitch: 0,
          bearing: 0
        }} controller layers={layers}
        >
        <InteractiveMap {...viewport} onViewportChange={setViewport as any} mapboxApiAccessToken={'pk.eyJ1IjoiaXJvbmVzOTQiLCJhIjoiY2txenprY2YzMW4yaDJ2bGZrb3ozbXRzMSJ9.DaLs0HwX916WhZ0f3Z9VKw'}>
          <Marker latitude={37.68493} longitude={-122.49050} offsetLeft={-20} offsetTop={-10}>
            <img style={{"height": "50px"}} src={flatpin} alt="pin"/>
          </Marker>
          <Marker latitude={37.7866555224718} longitude={-122.41737904607598} offsetLeft={-20} offsetTop={-10}>
            <img style={{"height": "50px"}} src={flatpin} alt="pin"/>
          </Marker>
        </InteractiveMap>
        <button onClick={goToSF}>San Francisco</button>
      </DeckGL>
    </div>
  );
}
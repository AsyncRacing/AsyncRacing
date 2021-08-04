import GpxParser, { Track as GpxTrack } from 'gpxparser'
import { useEffect, useState } from 'react'
import { Track, TrackPath } from './ChallengeConfiguration'

// Create a string-parser helper function here.
const parseGpxText = (textData: string): Array<TrackPath> => {
  const gpx = new GpxParser()
  gpx.parse(textData)
  return gpx.tracks.map((track) =>
    track.points.map((point) => ({
      lat: point.lat,
      lon: point.lon,
      time: point.time,
    })),
  )
}

// Create custom hooks here.
const useFilesToTrackMap = (
  files: Array<File>,
  fileTextMap: Map<File, string>,
) => {
  // Use react state for the hook!
  const [fileTracksMap, setFileTracksMap] = useState<
    Map<File, Array<TrackPath>>
  >(new Map())

  // Use react effect hooks as well for watching changes.
  // This enables more declaritive programming styles.
  useEffect(() => {
    // Our file data maps to an array of track paths.
    // A single file can have multiple tracks!!!
    const newFileTracksMap: Map<File, Array<TrackPath>> = new Map()

    // We'll have to loop over every file that we have to get its text data.
    fileTextMap.forEach((fileText, file) => {
      // Now, we parse the file text with the GpxParser library.
      const tracks = parseGpxText(fileText)
      newFileTracksMap.set(file, tracks)
    })

    // Set the state using this newly parsed track data!
    setFileTracksMap(newFileTracksMap)
  }, [files, fileTextMap])

  return fileTracksMap
}

export { useFilesToTrackMap }

import GpxParser from 'gpxparser'
import { useEffect, useState } from 'react'
import { TrackPath } from './ChallengeConfiguration'

/* HELPERS */
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

/* CUSTOM HOOKS */
const useFilesToPathMap = (filesToTextMap: Map<File, string>) => {
  // Use react state for the hook!
  const [filesToPathMap, setFilesToPathMap] = useState<
    Map<File, Array<TrackPath>>
  >(new Map())

  // Use react effect hooks as well for watching changes.
  // This enables more declaritive programming styles.
  useEffect(() => {
    // Our file data maps to an array of track paths.
    // A single file can have multiple tracks!!!
    const newFilesToPathMap: Map<File, Array<TrackPath>> = new Map()

    // We'll have to loop over every file that we have to get its text data.
    filesToTextMap.forEach((fileText, file) => {
      // Now, we parse the file text with the GpxParser library.
      const fileTracks = parseGpxText(fileText)
      newFilesToPathMap.set(file, fileTracks)
    })

    // Set the state using this newly parsed track data!
    setFilesToPathMap(newFilesToPathMap)
  }, [filesToTextMap.size])

  return filesToPathMap
}

export { useFilesToPathMap }

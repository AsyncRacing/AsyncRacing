import GPXParser from 'gpxparser'
import { Track } from './ChallengeConfiguration'

type color = [red: number, green: number, blue: number]

class GPXFile extends File {
  #gpx: GPXParser | null = null

  static areSame(file1: File, file2: File) {
    const properties: Array<keyof File> = [
      'lastModified',
      'name',
      'size',
      'type',
    ]
    for (const property of properties) {
      if (file1[property] !== file2[property]) {
        return false
      }
    }
    return true
  }

  static createFromFile(file: File) {
    const { name, type, lastModified } = file
    // CHECKME: Test if this is running correctly.
    // It could be that "[file]" mismatches "type". Maybe.
    return new GPXFile([file], name, { type, lastModified })
  }

  static loadStringParser(gpxString: string): GPXParser {
    const gpx = new GPXParser()
    gpx.parse(gpxString)
    return gpx
  }

  async gpx(): Promise<GPXParser> {
    if (this.#gpx === null) {
      const gpxString = await this.text()
      this.#gpx = GPXFile.loadStringParser(gpxString)
    }
    return this.#gpx
  }

  async tracks(): Promise<Array<Track>> {
    const cleanedTracks: Array<Track> = []
    const gpx = await this.gpx()

    // A file can have more than one track, or no tracks.
    // Clean each existant track, even if there's just one.
    gpx.tracks.forEach((track) => {
      cleanedTracks.push({
        path: track.points.map((point) => ({
          latitude: point.lat,
          longitude: point.lon,
          time: point.time,
        })),
        metadata: {
          title: this.name,
          uploadDate: new Date(Date.now()),
          color: [255, 0, 0] as color,
        },
      })
    })

    return cleanedTracks
  }
}

export { GPXFile }

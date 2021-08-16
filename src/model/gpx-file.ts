import GPXParser from 'gpxparser'

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
    // It could be that [file] mismatches type. Maybe.
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
}

export { GPXFile }

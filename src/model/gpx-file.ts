import GPXParser from 'gpxparser'

class GPXFile extends File {
  #gpx: GPXParser | null = null
  #text: string | null = null

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
      return GPXFile.loadStringParser(gpxString)
    } else {
      return this.#gpx
    }
  }
}

export { GPXFile }

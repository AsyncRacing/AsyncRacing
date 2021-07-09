import {readFileSync} from 'fs'
import {parseGpxData} from './parser'

it('can parse a file', () => {
    const gpxData = readFileSync(__dirname + '/../../test/ben/ben1.gpx', 'utf-8')

    const points = parseGpxData(gpxData)

    expect(points).toHaveLength(3)
    expect(points[0]).toMatchObject({
        latitude: 38.5439,
        longitude: -121.7039
        ,
        time: Date.parse('2021-07-09T18:18:21Z')
    })
})

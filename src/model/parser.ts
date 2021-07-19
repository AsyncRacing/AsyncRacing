
// interface TrackPoint {
//     latitude: number
//     longitude: number
//     time: number
// }

// export const parseGpxData = (data: string) : TrackPoint[] => {
//     console.log(data)
//     return []
// }

import gpxParser, { Track } from 'gpxparser';
import fs from 'fs';

interface TrackPoint {
    lat: number
    lon: number
    time: Date
}

export function parseGpxData(data: string): TrackPoint[] {
    var gpx = new gpxParser();
    gpx.parse(data);
    
    return gpx.tracks[0].points
        .map(point => ({ lat: point.lat, lon: point.lon, time: point.time }));
        
}


const file = fs.readFileSync('./ben1.gpx').toString();
console.log(parseGpxData(file));
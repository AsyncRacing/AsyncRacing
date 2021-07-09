interface TrackPoint {
    latitude: number
    longitude: number
    time: number
}


export const parseGpxData = (data: string) : TrackPoint[] => {
    console.log(data)
    return []
}
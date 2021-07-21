export interface ChallengeConfiguration {
    start: GPSLine
    finish: GPSLine
}

export interface GPSLine {
    firstPoint: Point
    secondPoint: Point
}

export interface Point {
    lat: number
    lon: number
}
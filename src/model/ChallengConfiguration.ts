interface ChallengeConfiguration {
    start: GPSLine
    finish: GPSLine
}

interface GPSLine {
    firstPoint: Point
    secondPoint: Point
}

interface Point {
    lat: number
    lon: number
}


export { ChallengeConfiguration, GPSLine, Point }
/*
GPS POSITION DATA TYPES
=======================

Position data types like these will always have latitude and longitude.
Sometimes they might also have elevation or time associated with them.
But, these types are always a single position, not a group of positions.
*/

interface Point {
  latitude: number // 90° >= latitude >= -90°
  longitude: number // 180° >= longitude >= -180°
}

// This is just a point that has a time.
// Steps are intended to be chained to eachother in order.
// The Path type displays this behavior.
interface Step extends Point {
  time: Date // time
}

/*
GPS LINE-DRAWING DATA TYPES
===========================

Line-drawing data types will use positions to create logical lines.
The most obvious example is an array of positions to create a path.
Since its an array, note that order matters.
Every entry in the array connects with the next and previous entry.
*/

// A path is a series of gps positions.
// However, each point *must* also have time data associated.
type Path = Array<Step>

// Contains a path plus other metadata to be kept.
interface Track {
  path: Path
  metadata: {
    title?: string
    creator?: string
    uploadDate?: Date
    color?: [red: number, green: number, blue: number]
  }
}

// A Waypoint is a line that demarcates a challenge
//  into start and finish lines, plus possible checkpoints.
// A start line and finish line are both types of waypoints.
//
// IMPROVEMENT:
// In the future, maybe a waypoint can two or more points.
// Maybe it could curve, or "close" like a square or circle.
type Waypoint = [Point, Point]

// Contains data about the shape of the race.
// The start, finish, and checkpoints decide the shape.
interface Course {
  start: Waypoint | null
  checkpoints?: Array<Waypoint>
  finish: Waypoint | null
}

// Contains a course and tracks, plus other metadata.
interface Challenge {
  course: Course
  tracks: Array<Track> // SEE FOOTNOTE
  metadata: {
    title?: string
    description?: string
    creator?: string
    uploadDate?: Date
    phoneNumber?: string
  }
}
// FOOTNOTE:
// The type declares that "tracks" is an ARRAY, like [<track>].
// In the schema, "tracks" is a DICTIONARY, like <trackID>: {...<track>}.
// The schema randomly decides what <trackID> is.
// We won't be able to immediately access the ID in the frontend for types.

export type { Challenge, Course, Path, Point, Step, Track, Waypoint }

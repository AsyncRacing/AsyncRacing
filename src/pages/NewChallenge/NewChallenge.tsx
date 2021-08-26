/* module imports */
import React, { useState, useEffect } from 'react'

/* component imports */
import { RaceMap } from '../../components/RaceMap/RaceMap'
import { Form } from '../../components/Form/Form'
import { Timer } from '../../components/Timer/Timer'

/* helper imports */
import { useFiles, useTracks } from '../../model/useFiles'
import { Course } from '../../model/ChallengeConfiguration'
import { CourseSlider } from '../../components/CourseSlider/CourseSlider'

/* react components */
const NewChallenge = () => {
  const emptyCourse: Course = {
    start: null,
    finish: null,
  }
  const [course, setCourse] = useState<Course>(emptyCourse)
  // File upload manipulation
  const [files, , addFiles, clearFiles] = useFiles()
  const tracks = useTracks(files)

  // When tracks changes, and start and finish are null,
  //  the Challenge will automatically update to the track's start and finish point.
  useEffect(() => {
    let { start, finish } = course
    if (tracks.length > 0) {
      if (start === null) {
        const startPoint = tracks[0].path[0]
        const startLatNudge = startPoint.latitude - 1 / 64
        start = [{ ...startPoint }, { ...startPoint, latitude: startLatNudge }]
      }
      if (finish === null) {
        const finishPoint = tracks[0].path[tracks[0].path.length - 1]
        const finishLatNudge = finishPoint.latitude + 1 / 64
        finish = [
          { ...finishPoint },
          { ...finishPoint, latitude: finishLatNudge },
        ]
      }
    }
    setCourse({
      ...course,
      start,
      finish,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks.length])

  // HERE IS WHAT WE WANT TO RETURN:
  // ===============================
  // Map
  // - Track Lines
  // - Track Times
  // - Challenge Checkpoints
  // Form
  // - Upload Button for tracks

  return (
    <>
      <div
        style={{
          zIndex: 2,
          position: 'relative',
        }}
      >
        {/* Show the challenge creation form */}
        <Form
          course={course}
          files={files}
          addFiles={addFiles}
          clearFiles={clearFiles}
        />

        {/* Temporary placeholder list for track times */}
        <p>Track Times</p>
        <ul>
          {tracks.map((track, id) => {
            return (
              <li key={id}>
                <p>{track.metadata.title}</p>
                <Timer track={track} course={course} />
              </li>
            )
          })}
        </ul>
      </div>

      {/* The map plus challenge slider */}
      <RaceMap tracks={tracks}>
        <CourseSlider course={course} setCourse={setCourse} />
      </RaceMap>
    </>
  )
}

export { NewChallenge }

/* module imports */
import React, { useState, useEffect } from 'react'

/* style import */
import { Container } from 'semantic-ui-react'
import './NewChallenge.css'

/* component imports */
import { ChallengeForm } from '../../components/ChallengeForm/ChallengeForm'
import { Navbar } from '../../components/Navbar/Navbar'
import { RaceMap } from '../../components/RaceMap/RaceMap'
import { Timer } from '../../components/Timer/Timer'

/* helper imports */
import { Course } from '../../model/ChallengeConfiguration'
import { CourseSlider } from '../../components/CourseSlider/CourseSlider'
import { useFiles, useTracks } from '../../model/useFiles'

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
  // ChallengeForm
  // - Upload Button for tracks

  return (
    <>
      <div
        style={{
          zIndex: 2,
          position: 'relative',
        }}
      >
        {/* Need to fix width and spacing for p tag and Timer tag and Upload Button div */}
        <Container>
          <Navbar />
        </Container>

        {/* Show the challenge creation form */}
        <div className="new__challenge_div_wrapper">
          <ChallengeForm
            course={course}
            files={files}
            addFiles={addFiles}
            clearFiles={clearFiles}
          />

          {/* Temporary placeholder list for track times */}
          <p>Track Times</p>
          <ul className="new__challenge_list">
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
      </div>

      {/* The map plus challenge slider */}
      <RaceMap tracks={tracks}>
        <CourseSlider course={course} setCourse={setCourse} />
      </RaceMap>
    </>
  )
}

export { NewChallenge }

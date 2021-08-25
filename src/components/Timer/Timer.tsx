import React, { useState, useEffect } from 'react'
import { Course, Track } from '../../model/ChallengeConfiguration'
import { formatMilliseconds, getTimes } from './getTime'

interface Props {
  track: Track
  course: Course
}

const Timer = ({ track, course }: Props) => {
  const [time, setTime] = useState<null | string>(null)
  useEffect(() => {
    // console.log({ path: track.path, course })
    // console.log(getTimes({ path: track.path, course }))
    // console.log(formatMilliseconds(getTimes({ path: track.path, course })))
    setTime(formatMilliseconds(getTimes({ path: track.path, course })))
  }, [track, course])
  return <div>{time}</div>
}

export { Timer }

import React, { useState, useEffect } from 'react'
import { Challenge, Track } from '../../model/ChallengeConfiguration'
import { formatMilliseconds, getTimes } from './getTime'

interface Props {
  track: Track
  challenge: Challenge
}

const Timer = ({ track, challenge }: Props) => {
  const [time, setTime] = useState<null | string>(null)
  useEffect(() => {
    setTime(formatMilliseconds(getTimes({ path: track.path, challenge })))
  }, [track, challenge])
  return <div>{time}</div>
}

export { Timer }

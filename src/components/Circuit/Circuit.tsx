/* module imports */
import React from 'react'

/* local imports */
import { Challenge } from '../../model/ChallengeConfiguration'
import { Waypoint } from './Waypoint/Waypoint'

/* interfaces & types */
interface PropTypes {
  challenge: Challenge
}

/* react component */
const Circuit = ({ challenge }: PropTypes) => {
  const { start, finish } = challenge
  return (
    <>
      <Waypoint line={start} />
      <Waypoint line={finish} />
    </>
  )
}

export { Circuit }

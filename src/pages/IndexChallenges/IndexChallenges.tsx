import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Challenge } from '../../model/ChallengeConfiguration'
import { firebaseDB } from '../../model/firebase-config'
import { Button, Icon, List, Table, Container, Header } from 'semantic-ui-react'

/* css import */
import './IndexChallenges.css'
import { Navbar } from '../../components/Navbar/Navbar'

const IndexChallenges = () => {
  // get challenges from firebase DB
  const [challengeDB, setChallengeDB] = useState<Record<string, Challenge>>({})
  //const challengeDBRef = firebaseDB.ref(`challenges/${challengeID}`)
  useEffect(() => {
    ;(async () => {
      const challengesFromDB = (await firebaseDB.ref('challenges').get()).val()
      Object.values(challengesFromDB).forEach((challenge: any) => {
        challenge.tracks = {}
        challenge.tracks = Object.values(challenge.tracks)
      })
      setChallengeDB(challengesFromDB)
    })()
  })

  return (
    <>
      <Container textAlign="center">
        <Navbar />
      </Container>
      <div className="homepage__container">
        <div className="homepage__wrapper">
          <Header as="h1" content="All Challenges"></Header>
          <Table cell striped>
            <Table.Header position="center">
              <Table.Row>
                <Table.HeaderCell colSpan="1">Challenge</Table.HeaderCell>
                <Table.HeaderCell colSpan="2" textAlign="right">
                  Created By
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.entries(challengeDB).map(([challengeID, challenge]) => {
                return (
                  <Table.Row>
                    <Table.Cell>
                      <Header
                        as={Link}
                        to={`/challenges/${challengeID}`}
                        color="blue"
                      >
                        {challenge.metadata.title}
                      </Header>
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      {challenge.metadata.creator}
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
          <List as="ul" className="homepage__list"></List>
          <Button as={Link} to="/challenges/new" primary animated>
            <Button.Content visible>New Challenge</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </div>
      </div>
    </>
  )
}

export { IndexChallenges }

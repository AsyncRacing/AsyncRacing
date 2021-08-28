import React from 'react'
import { Link } from 'react-router-dom'
import { useObjectVal } from 'react-firebase-hooks/database'
import { ChallengeSchema } from '../../model/ChallengeConfiguration'
import { firebaseDB } from '../../model/firebase-config'
import { Button, Icon, Table, Container, Header } from 'semantic-ui-react'
import { DateTime, DateTime as LuxonDate } from 'luxon'

/* css import */
import './IndexChallenges.css'
import { Navbar } from '../../components/Navbar/Navbar'

const IndexChallenges = () => {
  // get challenges from firebase DB
  const [challenges, loading, error] = useObjectVal<ChallengeSchema>(
    firebaseDB.ref('challenges'),
  )

  return (
    <>
      <Container textAlign="center">
        <Navbar />
      </Container>
      <Container>
        <Container>
          <Header as="h1" content="All Challenges"></Header>
          <Button as={Link} to="/challenges/new" primary animated>
            <Button.Content visible>New Challenge</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </Container>
        {challenges && (
          <>
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
                {Object.entries(challenges).map(([challengeId, challenge]) => {
                  return (
                    <Table.Row>
                      <Table.Cell>
                        <Header
                          as={Link}
                          to={`/challenges/${challengeId}`}
                          color="blue"
                        >
                          {challenge.metadata.title}
                        </Header>
                      </Table.Cell>
                      <Table.Cell>
                        {LuxonDate.fromISO(
                          challenge.metadata.uploadDate,
                        ).toLocaleString(DateTime.DATETIME_SHORT)}
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        {challenge.metadata.creator}
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          </>
        )}
        {loading && (
          <p>
            <em>Loading Database...</em>
          </p>
        )}

        {error && (
          <p>
            <strong>Database Error!</strong>
          </p>
        )}
      </Container>
    </>
  )
}

export { IndexChallenges }

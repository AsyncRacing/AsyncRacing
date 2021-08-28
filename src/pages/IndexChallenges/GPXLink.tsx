import React from 'react'
import { Button, Icon, Container } from 'semantic-ui-react'

const GPXLink = () => {
  const onHandleClick = () => {
    var link = 'https://apps.apple.com/us/app/open-gpx-tracker/id984503772'
    window.open(link, '_blank')
  }
  const onHandleClick2 = () => {
    var link =
      'https://play.google.com/store/apps/details?id=com.vecturagames.android.app.gpxviewer'
    window.open(link, '_blank')
  }
  return (
    <Container>
      <Container>
        <div>
          <br></br>
          <h3>
            A course challenge website that lets you compete with a friend in a
            race using GPX tracking data. <br></br>It tracks the start and
            finish lines specified by the creator using a GPX file. Here are the
            steps you need to set up your Challenge:
          </h3>
          <br></br>
          <ul>
            <li>
              <b>1. </b>Download one of the GPX Tracking apps on your mobile
              device by clicking on one of the buttons below
            </li>
            <li>
              <b>2. </b>Start the tracker in the app to create a path
            </li>
            <li>
              <b>3. </b>Download the path file on your computer as a <b>.GPX</b>{' '}
              file
            </li>
            <li>
              <b>4. </b>Click on the <b>New Challenge</b> button to start a new
              course challenge
            </li>
            <li>
              <b>5. </b>Upload your <b>GPX</b> file to the map and set the start
              and finish lines for your track
            </li>
            <li>
              <b>6. </b>Fill out the form including a valid US phone number to
              share your track with a friend<br></br>
              <i>(Only a number in "000-000-0000" format will be accepted)</i>
            </li>
            <li>
              <b>7. </b>Click <b>Save</b> and your track will be on the
              challenges list
            </li>
            <li>
              <b>8. </b>Now your invited friends can follow the same steps and
              synchronize races!
            </li>
          </ul>
        </div>
      </Container>
      <Button onClick={onHandleClick} primary animated>
        <Button.Content visible>GPX Tracker for IOS</Button.Content>
        <Button.Content hidden>
          <Icon name="arrow right" />
        </Button.Content>
      </Button>
      <Button onClick={onHandleClick2} primary animated>
        <Button.Content visible>GPX Tracker for Android</Button.Content>
        <Button.Content hidden>
          <Icon name="arrow right" />
        </Button.Content>
      </Button>
    </Container>
  )
}

export { GPXLink }

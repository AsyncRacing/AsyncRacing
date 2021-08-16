import { Twilio } from 'twilio'
import 'dotenv/config'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioNumber = process.env.TWILIO_PHONE_NUMBER
const myNumber = process.env.MY_NUMBER

export const shareTrack = () => {
  if (accountSid && authToken && myNumber && twilioNumber) {
    const client = new Twilio(accountSid, authToken)
    console.log(client)
    client.messages
      .create({
        from: twilioNumber,
        to: myNumber,
        body: 'This is a test text message',
      })
      .then((message) => console.log(message.sid))
  } else {
    console.error(
      'You are missing one of the variables you need to send a message',
    )
  }
}

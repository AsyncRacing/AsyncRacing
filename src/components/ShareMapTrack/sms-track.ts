import { Twilio } from 'twilio'
import 'dotenv/config'

const accountSid = 'AC6f971ad775eb523a3a7c3a1bc7c51931'
const authToken = '5fcbfa2550962597a54b4e0764b23fc4'
const twilioNumber = '+15622491768'
//const myNumber = process.env.MY_NUMBER

export const shareTrack = (challengeID: string, phoneNumber: string) => {
  if (accountSid && authToken && phoneNumber && twilioNumber && challengeID) {
    // const body = {
    //   from: twilioNumber,
    //   to: phoneNumber,
    //   body: `I challenge you to a race! Follow this link www.asyncracing.com/challenges/${challengeID}`,
    // }
    // const options = {
    //   headers: {
    //     'Content-Type': 'application/json',

    //   },
    //   body: JSON.stringify(body),
    //   method: undefined, //need to define
    //   //credentials: 'include'
    // }
    // const url = 'https://api.twilio.com/2010-04-01'
    // fetch(url, options)
    const client = new Twilio(accountSid, authToken)
    client.messages
      .create({
        from: twilioNumber,
        to: phoneNumber,
        body: `I challenge you to a race! Follow this link www.asyncracing.com/challenges/${challengeID}`,
      })
      .then((message) => console.log(message.sid))
  } else {
    console.log({ accountSid })
    console.log({ authToken })
    console.log({ phoneNumber })
    console.log({ challengeID })
    console.error(
      'You are missing one of the variables you need to send a message',
    )
  }
}

// await(axios.post("https://api.twilio.com/2010-04-01/Accounts/" + sid + "/Messages.json", qs.stringify({
//   Body: message,
//   From: from,
//   To: to
// }), {
//   auth: {
//     username: sid,
//     password: token
//   }
// }));

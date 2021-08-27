const functions = require('firebase-functions')
const accountSid = functions.config().twilio.sid
const authToken = functions.config().twilio.token
const twilioNumber = functions.config().twilio.twilionum
const client = require('twilio')(accountSid, authToken)

exports.sendChallengeMessage = functions.https.onRequest(async (req, res) => {
  try {
    const challengeID = req.query.challengeID
    const phoneNumber = req.query.phoneNumber
    await client.messages.create({
      body: `I challenge you to a race! Follow this link www.asyncracing.com/challenges/${challengeID}`,
      from: twilioNumber,
      to: phoneNumber,
    })

    res.send('success')
  } catch (err) {
    res.send(err.toString())
  }
})

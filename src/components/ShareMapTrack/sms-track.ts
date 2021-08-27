//const myNumber = process.env.MY_NUMBER

export const shareTrack = (challengeID: string, phoneNumber: string) => {
  fetch(
    `https://us-central1-async-racing.cloudfunctions.net/sendChallengeMessage?phoneNumber=${phoneNumber}&challengeID=${challengeID}`,
  )
}

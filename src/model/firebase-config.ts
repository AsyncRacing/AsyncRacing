import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyAR0KWU4upIojuCm5xTbXp8MFfWawEmzQo',
  authDomain: 'async-racing.firebaseapp.com',
  databaseURL: 'https://async-racing-default-rtdb.firebaseio.com',
  projectId: 'async-racing',
  storageBucket: 'async-racing.appspot.com',
  messagingSenderId: '760576542523',
  appId: '1:760576542523:web:c900b137ce43757936991e',
  measurementId: 'G-W4E4RRES3J',
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()
const firebaseDB = firebase.database()

export { firebaseDB }

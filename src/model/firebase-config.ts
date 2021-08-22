import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCiT4b8_qyC2ZxF95aRAdE8j4Kej3Dt9kk',
  authDomain: 'asyncracing-d5302.firebaseapp.com',
  databaseURL: 'https://asyncracing-d5302-default-rtdb.firebaseio.com',
  projectId: 'asyncracing-d5302',
  storageBucket: 'asyncracing-d5302.appspot.com',
  messagingSenderId: '468547346614',
  appId: '1:468547346614:web:0a5a388705b91b5b088617',
  measurementId: 'G-199TR40228',
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()
const firebaseDB = firebase.database()

export { firebaseDB }

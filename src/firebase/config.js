import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA3Lo0NOg-F7Qib56_g5MbgyM1eF8M0xCc',
  authDomain: 'miniblog-d91b8.firebaseapp.com',
  projectId: 'miniblog-d91b8',
  storageBucket: 'miniblog-d91b8.appspot.com',
  messagingSenderId: '394928631034',
  appId: '1:394928631034:web:c612a5ed0ca2c31a80ad43'
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export { db }

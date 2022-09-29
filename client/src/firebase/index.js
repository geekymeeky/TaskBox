// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCf30lO-zCzWfquUoejmCfpWkO7W8tavnI',
  authDomain: 'task-box-548b3.firebaseapp.com',
  projectId: 'task-box-548b3',
  storageBucket: 'task-box-548b3.appspot.com',
  messagingSenderId: '181852309803',
  appId: '1:181852309803:web:18a38439963d117e9d5d6e',
  measurementId: 'G-K210GZN90Z',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app)

export { app as default }

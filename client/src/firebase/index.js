import { getStorage } from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyCU3OsvUHdsuJo0vxGzcZk0G7PzYrm4a1g',
  authDomain: 'taskbox-57a52.firebaseapp.com',
  projectId: 'taskbox-57a52',
  storageBucket: 'taskbox-57a52.appspot.com',
  messagingSenderId: '1066766858686',
  appId: '1:1066766858686:web:aa8e04d623e701b15921ef',
  measurementId: 'G-JQ5M0DMDHQ',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app)

export { app as default }

import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: 'AIzaSyAtwyi0IBYnjrf9d6AlcHqR3VttvU59Euk',
  authDomain: 'proyectocelulares1.firebaseapp.com',
  projectId: 'proyectocelulares1',
  storageBucket: 'proyectocelulares1.appspot.com',
  messagingSenderId: '854108681643',
  appId: '1:854108681643:web:7990289f46ae6323678eee'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)
const storage = getStorage(app)

export { db, boot, storage }

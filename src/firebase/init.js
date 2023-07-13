// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from '@/stores/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD7kyYnv6UY9DzhNXRbHv-NmaAEH1FZHcc',
  authDomain: 'shortform-fbd64.firebaseapp.com',
  projectId: 'shortform-fbd64',
  storageBucket: 'shortform-fbd64.appspot.com',
  messagingSenderId: '973559603103',
  appId: '1:973559603103:web:f20032407b1d471b9ce7aa'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth()

onAuthStateChanged(auth, (user) => {
  const firebaseAuth = useFirebaseAuth()
  if (user) {
    firebaseAuth.login()
  } else {
    firebaseAuth.handleSignOut()
  }
})

const db = getFirestore(app)
export { db }

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

let app = null
let auth = null
let db = null

export const initFirebase = (config) => {
  app = initializeApp(config)
  auth = getAuth(app)
  db = getFirestore(app)

  return { app, auth, db }
}

export const getFirebaseAuth = () => auth
export const getFirebaseDb = () => db
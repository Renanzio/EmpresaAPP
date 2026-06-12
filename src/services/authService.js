import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

import { getFirebaseAuth } from './firebase'

export const register = (email, password) => {
  const auth = getFirebaseAuth()
  return createUserWithEmailAndPassword(auth, email, password)
}

export const login = (email, password) => {
  const auth = getFirebaseAuth()
  return signInWithEmailAndPassword(auth, email, password)
}

export const logout = () => {
  const auth = getFirebaseAuth()
  return signOut(auth)
}

export const observeAuth = (callback) => {
  const auth = getFirebaseAuth()
  return onAuthStateChanged(auth, callback)
}
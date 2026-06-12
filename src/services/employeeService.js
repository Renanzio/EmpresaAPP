import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore'

import { getFirebaseDb } from './firebase'

const COLLECTION = 'employees'

export async function getEmployees() {
  const db = getFirebaseDb()

  const q = query(
    collection(db, COLLECTION),
    orderBy('createdAt', 'desc')
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

export async function createEmployee(employee) {
  const db = getFirebaseDb()

  await addDoc(collection(db, COLLECTION), {
    ...employee,
    createdAt: serverTimestamp()
  })
}

export async function updateEmployee(id, employee) {
  const db = getFirebaseDb()

  await updateDoc(
    doc(db, COLLECTION, id),
    employee
  )
}

export async function deleteEmployeeById(id) {
  const db = getFirebaseDb()

  await deleteDoc(
    doc(db, COLLECTION, id)
  )
}
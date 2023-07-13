import { isNil, keys, cloneDeep } from 'lodash'
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
  serverTimestamp,
  deleteDoc
} from 'firebase/firestore'
import { db } from '@/firebase/init'
import { nanoid } from 'nanoid'

export default class GenericDB {
  constructor(collectionPath) {
    this.collectionRef = collection(db, collectionPath)
  }

  getDocRef(id) {
    return doc(this.collectionRef, id)
  }

  /**
   * Create a document in the collection
   * @param data
   * @param id
   */
  async create(data, id) {
    const uid = isNil(id) ? nanoid() : id
    const dataToCreate = {
      id: uid,
      ...data,
      createdTimestamp: serverTimestamp(),
      updatedTimestamp: serverTimestamp()
    }

    await setDoc(doc(this.collectionRef, uid), dataToCreate)

    return {
      id: uid,
      ...data,
      createdTimestamp: new Date(),
      updatedTimestamp: new Date()
    }
  }

  /**
   * Read a document in the collection
   * @param id
   */
  async read(id) {
    const docRef = doc(this.collectionRef, id)
    const docSnap = await getDoc(docRef)

    const data = docSnap.exists() ? docSnap.data() : null

    if (isNil(data)) return null

    this.convertObjectTimestampPropertiesToDate(data)
    return { id, ...data }
  }

  /**
   * Update a document in the collection
   * @param data
   */
  async update(data) {
    const { id } = data
    const clonedData = cloneDeep(data)
    delete clonedData.id
    const docRef = doc(this.collectionRef, id)

    await updateDoc(docRef, {
      ...clonedData,
      updatedTimestamp: serverTimestamp()
    })

    return id
  }

  async updateViewedTimestamp(data) {
    const { id } = data

    await updateDoc(doc(this.collectionRef, id), {
      viewedTimestamp: serverTimestamp()
    })
    return id
  }

  /**
   * Add a field to a document in the collection
   * @param data
   */
  async add(data) {
    let id = data.id
    if (!id) {
      id = nanoid()
    }

    await setDoc(
      doc(this.collectionRef, id),
      {
        created: serverTimestamp(),
        ...data,
        updatedTimestamp: serverTimestamp()
      },
      { merge: true }
    )
    return id
  }

  /**
   * Delete a document in the collection
   * @param id
   */
  async delete(id) {
    return await deleteDoc(doc(this.collectionRef, id))
  }

  /**
   * Convert all object Timestamp properties to date
   * @param obj
   */
  convertObjectTimestampPropertiesToDate(obj) {
    const newObj = {}

    keys(obj)
      .filter((prop) => obj[prop] instanceof Object)
      .forEach((prop) => {
        if (obj[prop] instanceof serverTimestamp) {
          newObj[prop] = obj[prop].toDate()
        } else {
          this.convertObjectTimestampPropertiesToDate(obj[prop])
        }
      })

    return {
      ...obj,
      ...newObj
    }
  }
}

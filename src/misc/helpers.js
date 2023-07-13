import { nanoid } from 'nanoid'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updateProfile
} from 'firebase/auth'
import UsersDB from '@/firebase/users-db'

/**
 * Reusable Delay Function
 */
export const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export const formatDataString = (str, length = 20) => {
  return str
    .replace('_', ' ')
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
    .substring(0, length)
}

/**
 * Create new user from user login details
 */
export const createNewUser = async (displayName, email, password) => {
  const auth = getAuth()
  await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(auth.currentUser, {
    displayName
  })

  const user = {
    email,
    displayName
  }

  await new UsersDB().create(user, auth.currentUser.uid)
}

export const sortedObjectsByTimestamp = (objOfObjs) => {
  const arrayOfObjs = Object.entries(objOfObjs).map((e) => e[1])
  return arrayOfObjs.sort((a, b) => {
    return new Date(a.timestamp.toDate()) - new Date(b.timestamp.toDate())
  })
}

/**
 * Login existing user from user login details
 */
export const loginExistingUser = async (email, password) => {
  const auth = getAuth()
  await signInWithEmailAndPassword(auth, email, password)
  const authorizedUser = auth.currentUser
  return new UsersDB().read(authorizedUser.uid)
}

export const getShortDate = () => {
  return new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'short'
  })
}

export const getTimeOfDay = () => {
  const today = new Date()
  const curHr = today.getHours()

  if (curHr < 12) {
    return 'Good Morning'
  } else if (curHr < 17) {
    return 'Good Afternoon'
  } else {
    return 'Good Evening'
  }
}

export const formatTimestampLong = (timestamp) => {
  return new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })
}

export const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long'
  })
}

export const formatPhoneNumber = (phoneNumberString) => {
  const cleaned = `${phoneNumberString}`.replace(/\D/g, '')
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    const intlCode = match[1] ? '+1 ' : ''
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
  }
  return null
}

import { defineStore } from 'pinia'
import {
  signOut,
  sendEmailVerification,
  EmailAuthProvider,
  updateEmail,
  updateProfile,
  updatePassword,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  getAuth
} from 'firebase/auth'
import UsersDB from '@/firebase/users-db'
import { isNil } from 'lodash'
import { createNewUser, loginExistingUser } from '@/misc/helpers'
import { useApp } from '@/stores/app'

export const useFirebaseAuth = defineStore('auth', {
  state: () => ({
    user: null,
    accessRights: null
  }),
  persist: true,
  actions: {
    async updateUserDisplayName(displayName) {
      const app = useApp()
      app.moduleLoadingStarted()
      try {
        const auth = getAuth()
        await updateProfile(auth.currentUser, {
          displayName
        })

        const userDB = await new UsersDB()
        await userDB.update({ id: this.user.id, displayName })
        this.user = await userDB.read(this.user.id)
      } catch (error) {
        console.log(error)
        app.addNotification({
          title: 'Error updating name',
          type: 'error'
        })
      }
      app.moduleLoadingComplete()
    },
    async updateUserEmail(email, password) {
      const app = useApp()
      app.moduleLoadingStarted()
      try {
        const auth = getAuth()
        const credentials = EmailAuthProvider.credential(
          this.user.email,
          password
        )
        await reauthenticateWithCredential(auth.currentUser, credentials)
        await updateEmail(auth.currentUser, email)
        const userDB = await new UsersDB()
        await userDB.update({ id: this.user.id, email })
        this.user = await userDB.read(this.user.id)
      } catch (error) {
        switch (error.code) {
          case 'auth/requires-recent-login':
            app.addNotification({
              title: 'Please login again to change password',
              type: 'error'
            })
            break
          case 'auth/wrong-password':
            app.addNotification({
              title: 'Incorrect password',
              type: 'error'
            })
            break
          default:
            app.addNotification({
              title: 'Internal Error',
              type: 'error'
            })
            break
        }
      }
      app.moduleLoadingComplete()
    },
    async updateUserPassword(oldPassword, newPassword) {
      const app = useApp()
      app.moduleLoadingStarted()
      try {
        const auth = getAuth()
        const credentials = EmailAuthProvider.credential(
          this.user.email,
          oldPassword
        )
        await reauthenticateWithCredential(auth.currentUser, credentials)
        await updatePassword(auth.currentUser, newPassword)
      } catch (error) {
        switch (error.code) {
          case 'auth/wrong-password':
            app.addNotification({
              title: 'Incorrect password',
              type: 'error'
            })
            break
          default:
            app.addNotification({
              title: 'Internal Error',
              type: 'error'
            })
            break
        }
      }
      app.moduleLoadingComplete()
    },
    async login(email, password) {
      const app = useApp()
      app.appLoadingStarted()
      try {
        const auth = getAuth()
        const authorizedUser = auth.currentUser
        const userData = isNil(authorizedUser)
          ? await loginExistingUser(email, password)
          : await new UsersDB().read(authorizedUser.uid)

        const idTokenResult = await auth.currentUser.getIdTokenResult()
        this.accessRights = idTokenResult.claims
        this.user = userData
      } catch (error) {
        switch (error.code) {
          case 'auth/invalid-email':
            app.addNotification({
              title: 'Invalid email',
              type: 'error'
            })
            break
          case 'auth/user-not-found':
            app.addNotification({
              title: 'No account with that email was found',
              type: 'error'
            })
            break
          case 'auth/wrong-password':
            app.addNotification({
              title: 'Incorrect password',
              type: 'error'
            })
            break
          default:
            console.log(error)
            app.addNotification({
              title: error,
              type: 'error'
            })
            break
        }
      }
      app.appLoadingComplete()
    },
    async verifyEmail() {
      const app = useApp()
      app.appLoadingStarted()
      try {
        const auth = getAuth()
        await sendEmailVerification(auth.currentUser)
      } catch (error) {
        console.log(error)
      }
      app.appLoadingComplete()
    },
    async resetPassword(email) {
      const app = useApp()
      app.appLoadingStarted()
      try {
        const url = `http://Gambert.app/login`
        const actionCodeSettings = { url }
        await sendPasswordResetEmail(email, actionCodeSettings)

        app.addNotification({
          title: 'Password reset email sent',
          type: 'success'
        })
      } catch (error) {
        app.addNotification({
          title: 'Internal Error',
          type: 'error'
        })
      }
      app.appLoadingComplete()
    },
    async register(displayName, email, password, type) {
      const app = useApp()
      app.appLoadingStarted()
      try {
        const newAccount = await createNewUser(
          displayName,
          email,
          password,
          type
        )
        const auth = getAuth()
        this.user = auth.currentUser
        await this.verifyEmail()
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            app.addNotification({
              title: 'Email already in use',
              type: 'error'
            })
            break
        }
      }
      app.appLoadingComplete()
    },
    async handleSignOut() {
      const app = useApp()
      app.appLoadingStarted()
      try {
        const auth = getAuth()
        await signOut(auth)
        this.user = null
        this.dashboardApiKey = null
        this.fabricsApiKey = null
      } catch (error) {
        app.addNotification({
          title: 'Internal Error',
          type: 'error'
        })
      }
      app.appLoadingComplete()
    }
  },
  getters: {
    getAccessRights(state) {
      return state.accessRights
    },
    getUser(state) {
      return state.user
    },
    isUserLoggedIn(state) {
      return !isNil(state.user)
    },
    authProvider() {
      const auth = getAuth()
      return auth.currentUser?.providerData[0]?.providerId
    }
  }
})

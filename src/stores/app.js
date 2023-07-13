import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

export const useApp = defineStore('app', {
  state: () => ({
    appTitle: import.meta.env.VITE_APP_TITLE,
    appShortTitle: import.meta.env.VITE_APP_SHORT_TITLE,
    networkOnLine: true,
    SWRegistrationForNewContent: null,
    showAddToHomeScreenModalForApple: false,
    notifications: [],
    appLoading: false,
    moduleLoading: false,
    nav: '',
    activeSettingsLink: 'account',
    mobileMenu: false,
    homeMobileMenu: false,
    modal: null,
    modalData: null
  }),
  persist: true,
  actions: {
    setActiveSettingsLink(link) {
      this.activeSettingsLink = link
    },
    appLoadingStarted() {
      this.appLoading = true
    },
    appLoadingComplete() {
      this.appLoading = false
    },
    moduleLoadingStarted() {
      this.moduleLoading = true
    },
    moduleLoadingComplete() {
      this.moduleLoading = false
    },
    clearNotifications() {
      this.notifications = []
    },
    activeNav(nav) {
      this.nav = nav
    },
    toggleModal(modal) {
      this.modal = modal
    },
    setModalData(data) {
      this.modalData = data
    },
    toggleMobileMenu() {
      this.mobileMenu = !this.mobileMenu
    },
    toggleHomeMobileMenu() {
      this.homeMobileMenu = !this.homeMobileMenu
    },
    addNotification(notification) {
      const duration = notification.duration || 5000
      const app = useApp()
      const uid = nanoid()

      const timeOut = setTimeout(() => {
        app.dismissNotification(uid)
      }, duration)

      this.notifications.push({
        id: uid,
        data: notification,
        TimeOut: timeOut
      })
    },
    dismissNotification(id) {
      const i = this.notifications.findIndex((object) => {
        return object.id === id
      })
      if (i !== -1) {
        clearTimeout(this.notifications[i].TimeOut)
        this.notifications.splice(i, 1)
      }
    }
  },
  getters: {
    isLoading(state) {
      return state.appLoading
    },
    getModal(state) {
      return state.modal
    },
    getModalData(state) {
      return state.modalData
    },
    isModuleLoading(state) {
      return state.moduleLoading
    }
  }
})

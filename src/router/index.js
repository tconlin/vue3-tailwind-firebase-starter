import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useApp } from '@/stores/app'
import { useFirebaseAuth } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        import(
          /* webpackChunkName: "client-chunk-index" */ '@/views/Static/Index.vue'
        ),
      meta: {
        title: 'Home',
        requiresAuth: false,
        nav: 'home'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(
          /* webpackChunkName: "client-chunk-auth" */ '@/views/Auth/Index.vue'
        ),
      meta: {
        title: 'Login',
        requiresAuth: false,
        nav: 'none'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () =>
        import(
          /* webpackChunkName: "client-chunk-auth" */ '@/views/Auth/Index.vue'
        ),
      meta: {
        title: 'Register',
        requiresAuth: false,
        nav: 'none'
      }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () =>
        import(
          /* webpackChunkName: "client-chunk-auth" */ '@/views/Auth/Index.vue'
        ),
      meta: {
        title: 'Forgot Password',
        requiresAuth: false,
        nav: 'none'
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard-home',
      component: () =>
        import(
          /* webpackChunkName: "client-chunk-dashboard" */ '@/views/Dashboard/Index.vue'
        ),
      meta: {
        title: 'Home',
        requiresAuth: true,
        nav: 'dashboard'
      }
    },
    {
      path: '/dashboard/settings',
      redirect: '/dashboard/settings/account'
    },
    {
      path: '/dashboard/settings/account',
      name: 'settings-account',
      component: () =>
        import(
          /* webpackChunkName: "client-chunk-dashboard-settings" */ '@/views/Dashboard/Settings/Index.vue'
        ),
      meta: {
        title: 'Account Settings',
        requiresAuth: true,
        nav: 'dashboard'
      }
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'page-not-found',
      component: () =>
        import(
          /* webpackChunkName: "client-chunk-page-not-found" */ '@/views/Static/404.vue'
        ),
      meta: {
        title: 'Page Not Found',
        requiresAuth: false,
        nav: 'none'
      }
    }
  ]
})

/**
 * Handle user redirections
 */
const getCurrentUser = () =>
  new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title
    ? `${to.meta.title} | Shortform Index Cards`
    : `Shortform Index Cards`

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      if (to.matched.some((record) => record.meta.adminOnly)) {
        const auth = useFirebaseAuth()
        if (
          auth.getAccessRights.accountType === 'admin' ||
          auth.getAccessRights.accountType === 'operator'
        ) {
          next()
        } else {
          next('/dashboard')
        }
      } else {
        next()
      }
    } else {
      next('/')
    }
  } else {
    next()
  }
})

/**
 * Handle navigation UI rendering
 */

router.afterEach((to, from) => {
  const app = useApp()
  if (to.meta && to.meta.nav === 'dashboard') {
    app.activeNav('dashboard')
  } else if (to.meta && to.meta.nav === 'home') {
    app.activeNav('home')
  } else if (to.meta && to.meta.nav === 'none') {
    app.activeNav('none')
  }
})

export default router

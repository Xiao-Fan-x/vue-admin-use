import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken, removeToken} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({showSpinner: false}) // NProgress Configuration

const whiteList = ['/login', '/register', '/login2'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    console.log('存在 token')
    if (to.path === '/login') {
      console.log('path to /login')
      // if is logged in, redirect to the home page
      next({path: '/'})
      NProgress.done()
    } else {
      console.log('--name--')
      const hasGetUserInfo = store.getters.userId
      if (hasGetUserInfo) {
        console.log('存在  name')
        setTimeout(() => {

        }, 1000)
        next()
      } else {
        try {
          const roles = store.getters.roles
          // console.log(roles)
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          console.log(accessRoutes)

          // dynamically add accessible routes
          // router.addRoutes(accessRoutes)
          next({...to, replace: true})
        } catch (error) {
          removeToken()
          console.log('error -> login2')
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          // Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      console.log('白名单')
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login2?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

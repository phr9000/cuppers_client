import { route } from 'quasar/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import routes from './routes'

import { Notify } from 'quasar'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store } /* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    if (
      to.matched.some(
        (record) =>
          record.meta.requiresAuth && !store.getters['auth/isLoggedIn']
      )
    ) {
      // console.log('로그인이 필요한 메뉴입니다. 로그인 페이지로 이동합니다.')
      Notify.create({
        position: 'top',
        timeout: 1000,
        message: '로그인이 필요한 메뉴입니다. 로그인 페이지로 이동합니다.',
        color: 'primary'
      })
      next({
        path: '/login'
      })
    } else {
      next()
    }
  })

  return Router
})

import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _e6957390 = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _70cebb4a = () => interopDefault(import('..\\pages\\blog\\index.vue' /* webpackChunkName: "pages/blog/index" */))
const _36f96c8b = () => interopDefault(import('..\\pages\\contact.vue' /* webpackChunkName: "pages/contact" */))
const _23e08304 = () => interopDefault(import('..\\pages\\home.vue' /* webpackChunkName: "pages/home" */))
const _e6144fe6 = () => interopDefault(import('..\\pages\\search.vue' /* webpackChunkName: "pages/search" */))
const _41a1c788 = () => interopDefault(import('..\\pages\\tools\\index.vue' /* webpackChunkName: "pages/tools/index" */))
const _78628ed0 = () => interopDefault(import('..\\pages\\blog\\detail.vue' /* webpackChunkName: "pages/blog/detail" */))
const _452de054 = () => interopDefault(import('..\\pages\\tools\\to-do-list.vue' /* webpackChunkName: "pages/tools/to-do-list" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _e6957390,
    name: "about"
  }, {
    path: "/blog",
    component: _70cebb4a,
    name: "blog"
  }, {
    path: "/contact",
    component: _36f96c8b,
    name: "contact"
  }, {
    path: "/home",
    component: _23e08304,
    name: "home"
  }, {
    path: "/search",
    component: _e6144fe6,
    name: "search"
  }, {
    path: "/tools",
    component: _41a1c788,
    name: "tools"
  }, {
    path: "/blog/detail",
    component: _78628ed0,
    name: "blog-detail"
  }, {
    path: "/tools/to-do-list",
    component: _452de054,
    name: "tools-to-do-list"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}

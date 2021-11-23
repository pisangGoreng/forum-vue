import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import ThreadShow from '../pages/ThreadShow.vue'
import NotFound from '../pages/NotFound.vue'
import Forum from '../pages/Forum.vue'
import sourceData from '../data.json'
import Category from '../pages/Category.vue'
import Profile from '../pages/Profile.vue'

// defines all routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/me',
    name: 'Profile',
    component: Profile,
    meta: { toTop: true, smoothScroll: true } // ! make scroll to top
  },
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    component: Profile,
    props: { edit: true }
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: Category,
    props: true
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    props: true,
    component: Forum
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow', // name for navigate
    props: true, // ! make the component can receive props. PROPS not PROP
    component: ThreadShow,
    beforeEnter(to, from, next) {
      // ! route guards example
      // check if the thread exist
      const threadExist = sourceData.threads.find(
        (thread) => thread.id === to.params.id
      )
      // if exist, continue
      if (threadExist) {
        next()
      } else {
        // if doest exist, navigate to not found
        next({
          name: 'NotFound',
          params: { pathMatch: to.path.subString(1).split('/') },
          query: to.query,
          hash: to.hash
        })
      }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouter({
  history: createWebHistory(), // ! use createWebHistory
  routes,
  scrollBehavior(to) {
    const scroll = {}
    if (to.meta.toTop) scroll.top = 0
    if (to.meta.smoothScroll) scroll.behavior = 'smooth'
    return scroll
  }
})

import { createRouter, createWebHistory } from 'vue-router'

import { findById } from '@/helpers'

import Home from '../pages/Home.vue'
import ThreadShow from '../pages/ThreadShow.vue'
import ThreadCreate from '../pages/ThreadCreate.vue'
import ThreadEdit from '../pages/ThreadEdit.vue'
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
    component: ThreadShow
    // beforeEnter(to, from, next) { // ! disable for a while when connect to firebase
    //   // ! route guards example
    //   // check if the thread exist
    //   const threadExists = findById(sourceData.threads, to.params.id)
    //   // if exist, continue
    //   if (threadExists) {
    //     next()
    //   } else {
    //     // if doest exist, navigate to not found
    //     next({
    //       name: 'NotFound',
    //       params: { pathMatch: to.path.subString(1).split('/') },
    //       query: to.query,
    //       hash: to.hash
    //     })
    //   }
    // }
  },
  {
    path: '/forum/:forumId/thread/create',
    name: 'ThreadCreate',
    component: ThreadCreate,
    props: true
  },
  {
    path: '/thread/:id/edit',
    name: 'ThreadEdit',
    component: ThreadEdit,
    props: true
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

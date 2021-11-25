const dotenv = require('dotenv')
console.log('oke', process.env)

import { createApp } from 'vue'
import firebase from 'firebase'
import { firebaseConfig } from './config/firebase'

import router from './router'
import App from './App.vue'
import store from './store'

firebase.initializeApp(firebaseConfig)

const forumApp = createApp(App)
forumApp.use(router)
forumApp.use(store) // to connecting vuex

// ! auto registers components di dalam folder component jadi global component
// ! pakai prefix App... .vue
const requireComponent = require.context(
  './components',
  true,
  /App[A-Z]\w+\.(vue|js)$/
)
requireComponent.keys().forEach(function (fileName) {
  let baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  const baseComponentName =
    baseComponentConfig.name ||
    fileName.replace(/^.+\//, '').replace(/\.\w+$/, '')
  forumApp.component(baseComponentName, baseComponentConfig)
})

// forumApp.component('AppDate', AppDate) // ! make AppDate as global component || CARA MANUAL
forumApp.mount('#app')

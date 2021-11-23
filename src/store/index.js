import { createStore } from 'vuex'
import sourceData from '../data.json'

export default createStore({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  getters: {
    authUser: (state) => {
      const user = state.users.find((user) => user.id === state.authId)
      if (!user) return null

      // ! wajib pakai keyword get
      return {
        ...user,

        get posts() {
          return state.posts.filter((post) => post.userId === user.id)
        },
        get postsCount() {
          return this.posts.length
        },
        get threads() {
          return state.threads.filter((thread) => thread.userId === user.id)
        },
        get threadsCount() {
          return this.threads.length
        }
      }
    }
  },
  actions: {
    createPost({ commit, state }, post) {
      post.id = 'gggg' + Math.random()
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)

      // ! commit => execute mutations
      commit('setPost', { post }) // set the post
      commit('appendPostToThread', {
        // append post to thread
        postId: post.id,
        threadId: post.threadId
      })
    },
    updateUser({ commit }, user) {
      commit('setUser', { user, userId: user.id })
    }
  },
  mutations: {
    setPost(state, { post }) {
      state.posts.push(post)
    },
    setUser(state, { user, userId }) {
      const userIndex = state.users.findIndex((user) => user.id === userId)
      state.users[userIndex] = user
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = state.threads.find((thread) => thread.id === threadId)
      thread.posts.push(postId)
    }
  }
})

// VUEX
/*
  STORE -> ACTIONS -> MUTATIONS

  1. buat store terlebih dahulu
  2. daftarkan store
  3. nanti bisa langsung di akses dengan this.$state
*/

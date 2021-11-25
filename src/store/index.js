import { createStore } from 'vuex'
// import sourceData from '../data.json'

import { findById, upsert } from '@/helpers'

function makeAppendChildToParentMutation({ parent, child }) {
  return (state, { childId, parentId }) => {
    const resource = findById(state[parent], parentId)
    resource[child] = resource[child] || []
    const test = resource.posts || []

    if (!resource[child].includes(childId)) {
      resource[child].push(childId)
    }
  }
}

export default createStore({
  state: {
    // ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
    categories: [],
    forums: [],
    threads: [],
    posts: [],
    users: []
  },
  getters: {
    authUser: (state, getters) => {
      return getters.user(state.authId)
    },
    user: (state) => {
      return (id) => {
        const user = findById(state.users, id)
        // ! wajib pakai GET keyword
        if (!user) return null
        return {
          ...user,
          get posts() {
            return state.posts.filter((post) => post.userId === user.id)
          },
          get postsCount() {
            return this.posts.length
          },
          get threads() {
            return state.threads.filter((post) => post.userId === user.id)
          },
          get threadsCount() {
            return this.threads.length
          }
        }
      }
    },
    thread: (state) => {
      return (id) => {
        const thread = findById(state.threads, id)
        return {
          ...thread,
          get author() {
            return findById(state.users, thread.userId)
          },
          get repliesCount() {
            return thread.posts.length - 1
          },
          get contributorsCount() {
            return thread.contributors.length
          }
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
      commit('appendContributorToThread', {
        childId: state.authId,
        parentId: post.threadId
      })
    },
    async createThread({ commit, state, dispatch }, { text, title, forumId }) {
      const id = 'ggqq' + Math.random()
      const userId = state.authId
      const publishedAt = Math.floor(Date.now() / 1000)
      const thread = { forumId, title, publishedAt, userId, id }
      commit('setThread', { thread })
      commit('appendThreadToUser', { userId, threadId: id })
      commit('appendThreadToForum', { forumId, threadId: id })
      dispatch('createPost', { text, threadId: id }) // ! execute another actions inside actions

      return findById(state.threads, id)
    },
    async updateThread({ commit, state }, { title, text, id }) {
      const thread = findById(state.threads, id)
      const post = findById(state.posts, thread.posts[0])
      const newThread = { ...thread, title }
      const newPost = { ...post, text }
      commit('setThread', { thread: newThread })
      commit('setPost', { post: newPost })
      return newThread
    },
    updateUser({ commit }, user) {
      commit('setUser', { user, userId: user.id })
    }
  },
  mutations: {
    setPost(state, { post }) {
      upsert(state.posts, post)
    },
    setThread(state, { thread }) {
      upsert(state.threads, thread)
    },
    setUser(state, { user }) {
      upsert(state.users, user)
    },
    appendPostToThread: makeAppendChildToParentMutation({
      parent: 'threads',
      child: 'posts'
    }),
    appendThreadToForum: makeAppendChildToParentMutation({
      parent: 'forums',
      child: 'threads'
    }),
    appendThreadToUser: makeAppendChildToParentMutation({
      parent: 'users',
      child: 'threads'
    }),
    appendContributorToThread: makeAppendChildToParentMutation({
      parent: 'threads',
      child: 'contributors'
    })
  }
})

// VUEX
/*
  STORE -> ACTIONS -> MUTATIONS

  1. buat store terlebih dahulu
  2. daftarkan store
  3. nanti bisa langsung di akses dengan this.$state
*/

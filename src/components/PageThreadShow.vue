<template>
  <div v-if="thread" class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <div class="post-list">
      <div class="post" v-for="postId in thread.posts" :key="postId">
        <div class="user-info">
          <a href="#" class="user-name">{{
            userById(postById(postId).userId).name
          }}</a>

          <a href="#"
            ><img
              class="avatar-large"
              :src="userById(postById(postId).userId).avatar"
              alt=""
            />
          </a>

          <p class="dekstop-only text-small">107 posts</p>
        </div>

        <div class="post-content">
          <div>
            <p>{{ postById(postId).text }}</p>
          </div>
        </div>

        <div class="post-date text-fad">
          {{ postById(postId).publushedAt }}
        </div>
      </div>
    </div>
  </div>

  <div v-else class="col-full text-center">
    <h1>This thread was not found</h1>
    <router-link :to="{ name: 'Home' }">Read some cool threads</router-link>
  </div>
</template>

<script>
import sourceData from '../data.json'
export default {
  props: {
    id: {
      // get ID from this.$route.params.id
      required: true,
      type: String
    }
  },
  data() {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts,
      users: sourceData.users
    }
  },
  computed: {
    thread() {
      let cb = this.threads.find((thread) => thread.id === this.id) // also available under this.$route.params.id
      console.log(cb)
      return cb
    }
  },
  methods: {
    postById(postId) {
      // ! use old function style to access this.data
      console.log(this)
      return this.posts.find((p) => p.id === postId)
    },
    userById(userId) {
      return this.users.find((p) => p.id === userId)
    }
  }
}
</script>

<style></style>

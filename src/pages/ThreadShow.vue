<template>
  <div v-if="thread" class="col-large push-top">
    <h1>{{ thread.title }}</h1>

    <post-list :posts="threadPosts" />

    <post-editor @save="addPost" />
  </div>

  <div v-else class="col-full text-center">
    <h1>This thread was not found</h1>
    <router-link :to="{ name: 'Home' }">Read some cool threads</router-link>
  </div>
</template>

<script>
import PostList from '../components/PostList.vue'
import PostEditor from '../components/PostEditor.vue'

export default {
  name: 'ThreadShow',
  components: {
    PostList, // add here to use children components
    PostEditor
  },
  props: {
    id: {
      // get ID from this.$route.params.id
      required: true,
      type: String
    }
  },
  data() {
    return {
      // threads: this.$store.state.threads,
      // posts: this.$store.state.posts,
      newPostText: ''
    }
  },
  computed: {
    threads() {
      return this.$store.state.threads
    },
    posts() {
      return this.$store.state.posts
    },
    thread() {
      return this.threads.find((thread) => thread.id === this.id) // also available under this.$route.params.id
    },
    threadPosts() {
      return this.posts.filter((post) => post.threadId === this.id)
    }
  },
  methods: {
    addPost(eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id
      }

      this.$store.dispatch('createPost', post) // execute vuex actions

      this.newPostText = ''
    }
  }
}
</script>

<style></style>

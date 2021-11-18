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
import sourceData from '../data.json'
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
      threads: sourceData.threads,
      posts: sourceData.posts,
      newPostText: ''
    }
  },
  computed: {
    thread() {
      return this.threads.find((thread) => thread.id === this.id) // also available under this.$route.params.id
    },
    threadPosts() {
      return this.posts.filter((post) => post.threadId === this.id)
    }
  },
  methods: {
    addPost(eventData) {
      console.log(
        '🚀 ~ file: ThreadShow.vue ~ line 51 ~ addPost ~ eventData',
        eventData
      )
      const post = {
        ...eventData.post,
        threadId: this.id
      }

      this.posts.push(post)
      this.thread.posts.push(post.id)

      this.newPostText = ''
    }
  }
}
</script>

<style></style>

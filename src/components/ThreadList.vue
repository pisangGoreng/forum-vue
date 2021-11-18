<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>

      <div v-for="thread in threads" :key="thread.id" class="thread">
        <div>
          <p>
            <router-link
              :to="{ name: 'ThreadShow', params: { id: thread.id } }"
              >{{ thread.title }}</router-link
            >
          </p>
          <p class="text-faded text-xsmall">
            By <a href="#">{{ userById(thread.userId).name }}</a
            >, <app-date :timestamp="thread.publishedAt" />
          </p>
        </div>

        <div class="activity">
          <p class="replies-count">{{ thread.posts.length }} replies</p>

          <img
            :src="userById(thread.userId).avatar"
            alt=""
            class="avatar-medium"
          />

          <div>
            <p class="text-xsmall">
              <a href="#">{{ userById(thread.userId).name }}</a>
            </p>
            <p class="text-xsmall text-faded">
              <app-date :timestamp="thread.publishedAt" />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sourceData from '../data.json'
export default {
  props: {
    threads: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      posts: sourceData.posts,
      users: sourceData.users
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

//
<div class="pagination">
//       <button class="btn-circle" disabled="">
//         <i class="fa fa-angle left"></i>
//       </button>
//       1 of 3
//       <button class="btn-circle">
//         <i class="fa fa-angle right"></i>
//       </button>
//     </div>
